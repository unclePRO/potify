import ytSearch from 'yt-search';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const songName = searchParams.get('q');

    if (!songName) return Response.json({ error: 'Missing song name' }, { status: 400 });

    try {
        const searchResults = await ytSearch(songName);
        
        const videos = searchResults.videos || [];

        const pureSongs = videos.filter(song => {
            const title = (song.title || '').toLowerCase();
            const durationSeconds = song.seconds || 0;
            
            // removew if longer than 20 minutes (1200 seconds)
            if (durationSeconds > 1200) return false;
            
            // remove if title contains junk
            if (title.includes('karaoke') || title.includes('1 hour') || title.includes('live')) return false;
            
            return true;
        });

        const cleanSongsList = pureSongs.slice(0, 10).map((song) => {
            return {
                vidId: song.videoId,
                title: song.title,
                artist: song.author?.name || "Unknown Artist",
                duration: song.timestamp || "0:00",
                coverArt: song.thumbnail || '/song-cover.png'
            };
        });

        return Response.json(cleanSongsList);

    } catch (error) {
        console.error("API search Error:", error);
        return Response.json({ error: 'Failed to fetch search results' }, { status: 500 });
    }
}