import { spawn } from 'child_process';
import { Readable } from 'stream';
import path from 'path';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const videoId = searchParams.get('id');

    if (!videoId) {
        return new Response('Missing video ID', { status: 400 });
    }
    const targetUrl = `https://www.youtube.com/watch?v=${videoId}`;

    const ytDlpPath = path.join(process.cwd(), 'yt-dlp.exe');

    const ytdlp = spawn(ytDlpPath, [
        '-f', 'bestaudio',
        '--js-runtimes', 'node',
        '-q',              
        '-o', '-',         
        targetUrl
    ]);

    ytdlp.stderr.on('data', (data) => {
        console.error('yt-dlp Error:', data.toString());
    });

    req.signal.addEventListener('abort', () => {
        if (ytdlp && ytdlp.exitCode === null) {
            ytdlp.kill('SIGTERM'); // Send a gentle signal
        }
    });

    try {
        const webStream = Readable.toWeb(ytdlp.stdout);
    } catch (err) {
        if (err.code !== 'ERR_INVALID_STATE') {
        console.error('Stream Setup Error:', err);
        }
        return new Response('Stream failed', { status: 500 });
    }

    return new Response(webStream, {
        headers: {
            'Content-Type': 'audio/webm',
            'Transfer-Encoding': 'chunked',
        },
    });
    
}