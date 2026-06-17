import { create } from 'zustand';

const usePlayerStore = create((set) => ({
    currentSong: null,
    isPlaying: false,
    playSong: (song) => set({ currentSong: song, isPlaying: true }),
    togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying})),

    likedSongs: {},
    toggleLike: async (song) => {
        const res = await fetch('/api/like', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                vidId: song.vidId,
                title: song.title,
                artist: song.artist,
                coverArt: song.coverArt,
                duration: song.duration,
            })
        })
        const data = await res.json();

        if(data.action === "added") {
            set(state => {
                const newDict = { ...state.likedSongs };
                newDict[song.vidId] = song;
                return { likedSongs: newDict };
            })
        } else if (data.action === "removed") {
            set(state => {
                const newDict = { ...state.likedSongs };
                delete newDict[song.vidId];
                return { likedSongs: newDict };
            })
        }
    },
    fetchSongs: async () => {
        try {
            const res = await fetch('/api/like');
            const data = await res.json();
            
            const dict = {};
            data.forEach(song => {
                dict[song.vidId] = song;
            });

            set({ likedSongs: dict })
        } catch (error) {
            console.log(`Error while fetchSongs: ${error}`);
        }
    }
}));

export default usePlayerStore;