import { create } from "zustand";

interface GameState {
    level: number;
    setLevel: (newLevel: number) => void;
    resetLevel: () => void;
}

export const useGameStore = create<GameState>((set) => ({
    level: 1,
    setLevel: (newLevel) => set({level: newLevel}),
    resetLevel: () => set({level: 1})
}))