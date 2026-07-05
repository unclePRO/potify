import { create } from 'zustand';

const usePlayerStore = create((set) => ({
    currentSong: null,
    songIndex: -1,
    isPlaying: false,
    queue: [],

    togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying})),

    playSong: (song) => set((state) => {
        if (state.currentSong?.vidId === song.vidId) {
            return { isPlaying: true };
        }
        const filteredQueue =  state.queue.filter((s) => s.vidId != song.vidId);
        const newQueue = [...filteredQueue, song];
        console.log(newQueue);
        if (newQueue.length > 500) {
            newQueue = newQueue.slice(-100); 
        }

        return { 
            queue: newQueue, 
            songIndex: newQueue.length - 1,
            currentSong: song, 
            isPlaying: true 
        }
    }),

    playNext: () => set((state) => {
        const currQueue = state.queue;
        const currIndex = state.songIndex;
        const nextSong = currQueue[currIndex + 1];

        if(!nextSong) {
            usePlayerStore.setState({ isPlaying: false });
            // add related songs!!!! here later
            // temp suggestion
            const suggestions = [
                {
                    "vidId": "M2cckDmNLMI",
                    "title": "米津玄師 Kenshi Yonezu - KICKBACK",
                    "artist": "Kenshi Yonezu  米津玄師",
                    "duration": "3:48",
                    "coverArt": "https://i.ytimg.com/vi/M2cckDmNLMI/hq720.jpg"
                }
            ];
            const uniqueSuggestions = suggestions.filter((suggestedSong) => {
                const isDuplicate = currQueue.find((existingSong) => existingSong.vidId === suggestedSong.vidId);

                if (isDuplicate) return false;
                else return true;
            });
            const newQueue = [...currQueue, ...uniqueSuggestions];
            const newNextSong = newQueue[currIndex + 1];

            if (!newNextSong) {
                return { isPlaying: false };
            }

            return { 
                queue: newQueue,
                songIndex: currIndex + 1,
                currentSong: newNextSong,
                isPlaying: true,
            }
        }

        return {
            songIndex: currIndex + 1,
            currentSong: nextSong,
            isPlaying: true,
        }
    }),

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