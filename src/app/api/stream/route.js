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
        console.log('Browser closed the connection. Killing yt-dlp...');
        ytdlp.kill();
    });

    const webStream = Readable.toWeb(ytdlp.stdout);

    return new Response(webStream, {
        headers: {
            'Content-Type': 'audio/webm',
            'Transfer-Encoding': 'chunked',
        },
    });
    
}