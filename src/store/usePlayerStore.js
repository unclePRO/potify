import { create } from 'zustand';

const usePlayerStore = create((set) => ({
    currentSong: null,
    isPlaying: false,
    playSong: (song) => set({ currentSong: song, isPlaying: true }),
    togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying}))
}));

export default usePlayerStore;