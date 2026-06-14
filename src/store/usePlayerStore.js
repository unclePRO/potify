import { create } from 'zustand';

const usePlayerStore = create((set) => ({
    currentSong: {
        title: "Bohemian Rhapsody",
        artist: "Queen",
        coverArt: "https://i.ytimg.com/vi/bR-gZQLO26w/hqdefault.jpg",
        duration: 355,
        id: "",
    },
    isPlaying: false,
    playSong: (song) => set({ currentSong: song, isPlaying: true }),
    togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying}))
}));

export default usePlayerStore;