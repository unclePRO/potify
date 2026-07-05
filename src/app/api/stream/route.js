import { platform } from 'os';
import { spawn } from 'child_process';
import { Readable, PassThrough } from 'stream';
import { enforceCacheLimit } from '@/lib/cacheManager';
import path from 'path';
import fs from 'fs';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const videoId = searchParams.get('id');

    if (!videoId) {
        return new Response('Missing video ID', { status: 400 });
    }

    //////// CACHE SETUP FOR SONGS (to reduce load on api) /////////

    const USE_CACHE = true;
    const cacheDir = path.join(process.cwd(), 'songs_cache');
    const cachedFilePath = path.join(cacheDir, `${videoId}.m4a`);

    if (USE_CACHE && !fs.existsSync(cacheDir)) {
        fs.mkdirSync(cacheDir, { recursive: true });
    }

    // play from cache
    if (USE_CACHE && fs.existsSync(cachedFilePath)) {
        const stats = fs.statSync(cachedFilePath);
        
        if (stats.size > 50000) {
            console.log(`Playing ${videoId} from HDD Cache`);
            
            const fileStream = fs.createReadStream(cachedFilePath);
            
            req.signal.addEventListener('abort', () => {
                fileStream.destroy();
            });

            return new Response(Readable.toWeb(fileStream), {
                headers: {
                    'Content-Type': 'audio/mp4',
                    'Transfer-Encoding': 'chunked',
                },
            });
        } else {
            console.log(`Corrupt cache file found for ${videoId}. Deleting...`);
            fs.unlinkSync(cachedFilePath);
        }
    }

    // play from ytdlp
    console.log(`Fetching ${videoId} live from YouTube`);

    const ytDlpPath = path.join(process.cwd(), 'src', 'services', 'yt-dlp.exe');
    const ytDlpCommand = platform() === 'win32' ? ytDlpPath : 'yt-dlp';

    const ytdlp = spawn(ytDlpCommand, [
        '-o', '-',                 
        '-f', 'ba[ext=m4a]/ba/b[height<=360]/b', 
        '--no-playlist',           
        '--quiet',                 
        '--no-warnings', 
        '--add-header', 'referer:youtube.com', 
        '--add-header', 'user-agent:Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        '--js-runtimes', 'node', 
        `https://www.youtube.com/watch?v=${videoId}` 
    ]);

    // 2nd stream to create song file in cache
    const browserStream = new PassThrough();
    ytdlp.stdout.pipe(browserStream);

    let writeStream = null;

    if (USE_CACHE) {
        writeStream = fs.createWriteStream(cachedFilePath);
        ytdlp.stdout.pipe(writeStream);
        
        writeStream.on('error', (err) => {
            console.error('HDD Write Error:', err);
            if (fs.existsSync(cachedFilePath)) fs.unlinkSync(cachedFilePath);
        });

        writeStream.on('finish', () => {
            enforceCacheLimit();
        });
    }

    req.signal.addEventListener('abort', () => {
        if (ytdlp && ytdlp.exitCode === null) {
            console.log(`Connection aborted by user. Killing process for ${videoId}`);
            ytdlp.stdout.destroy(); 
            ytdlp.stderr.destroy();
            browserStream.destroy();
            if (writeStream) writeStream.destroy();
            ytdlp.kill('SIGKILL'); 
            
            if (USE_CACHE && fs.existsSync(cachedFilePath)) {
                fs.unlinkSync(cachedFilePath); 
            }
        }
    });

    ytdlp.stdout.on('error', (err) => {
        if (err.code === 'ERR_INVALID_STATE' || err.code === 'EPIPE') return;
    });

    ytdlp.stderr.on('data', (data) => {
        const msg = data.toString();
        if (msg.includes('Errno 22') || msg.includes('Broken pipe') || msg.includes('Exception ignored')) {
            return; 
        }
        console.error('yt-dlp Error:', msg);
    });

    let webStream;
    try {
        webStream = Readable.toWeb(browserStream);
    } catch (err) {
        return new Response('Stream failed', { status: 500 });
    }

    return new Response(webStream, {
        headers: {
            'Content-Type': 'audio/mp4', 
            'Transfer-Encoding': 'chunked',
        },
    });
}