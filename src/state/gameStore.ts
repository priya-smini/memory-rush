import { create } from "zustand";

interface GameState {
  level: number;
  setLevel: (newLevel: number) => void;
  loadLevel: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  level: 1, // default
  setLevel: (newLevel) => {
    set({ level: newLevel });
    if (typeof window !== "undefined") {
      localStorage.setItem("level", String(newLevel));
    }
  },
  loadLevel: () => {
    if (typeof window !== "undefined") {
      const savedLevel = localStorage.getItem("level");
      if (savedLevel) {
        set({ level: Number(savedLevel) });
      }
    }
  },
}));
