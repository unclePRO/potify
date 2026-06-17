import { platform } from 'os';
import { spawn } from 'child_process';
import path from 'path';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const songName = searchParams.get('q');

    if (!songName) return Response.json({ error: 'Missing song name' }, { status: 400 });
    
    const ytDlpPath = path.join(process.cwd(), 'yt-dlp.exe');
    const ytDlpCommand = platform() === 'win32' ? ytDlpPath : 'yt-dlp';     // for both windows and linux
    

    try {
        const rawJsonString = await new Promise((resolve, reject) => {
            const ytdlp = spawn(ytDlpCommand, [
                `ytsearch20:${songName}`, 
                '--dump-json', 
                '--flat-playlist',
                '--extractor-args', 'youtube:player_client=android',
                '--quiet',
                '--no-warnings'
            ]);

            let rawData = '';
            
            ytdlp.stdout.on('data', (chunk) => rawData += chunk.toString());
            ytdlp.stderr.on('data', (data) => console.error(`ytdlp search warning: ${data}`));

            ytdlp.on('close', (code) => {
                if (code !== 0) reject(new Error('yt-dlp process failed (search)'));
                else resolve(rawData);
            });
        });

        let rawEntries = [];
        try {
            const fullData = JSON.parse(rawJsonString);
            rawEntries = fullData.entries || [fullData];
        } catch (e) {
            const lines = rawJsonString.trim().split('\n');
            rawEntries = lines.filter(line => line.trim() !== '').map(line => JSON.parse(line));
        }

        const pureSongs = rawEntries.filter(song => {
            const title = (song.title || '').toLowerCase();
            const duration = song.duration || 0;
            
            // Drop if longer than 20 minutes (1200 seconds)
            if (duration > 1200) return false;
            // Drop if title contains junk
            if (title.includes('karaoke') || title.includes('1 hour') || title.includes('live')) return false;
            
            return true;
        });

        const cleanSongsList = pureSongs.map((song) => {
            const bestThumbnail = song.thumbnails && song.thumbnails.length > 0 
                ? song.thumbnails[song.thumbnails.length - 1].url 
                : '/song-cover.png'; 

            return {
                vidId: song.id,
                title: song.title,
                artist: song.channel || song.uploader || "Unknown Artist",
                duration: song.duration_string || "0:00",
                coverArt: bestThumbnail
            };
        });

        return Response.json(cleanSongsList);

    } catch (error) {
        console.error("API search Error:", error);
        return Response.json({ error: 'Failed to fetch search results' }, { status: 500 });
    }
}