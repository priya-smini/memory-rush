export interface LevelSettings {
  rows: number;
  cols: number;
  timeLimit: number; //seconds
}

export const getLevelSetting = (level: number): LevelSettings => {
  if (level <= 2) return { rows: 2, cols: 2, timeLimit: 10 }; // 4 cards
  if (level <= 4) return { rows: 2, cols: 4, timeLimit: 50 }; // 8 cards
  if (level <= 6) return { rows: 3, cols: 4, timeLimit: 40 }; // 12 cards
  if (level <= 10) return { rows: 4, cols: 4, timeLimit: 35 }; // 16 cards
  if (level <= 15) return { rows: 4, cols: 5, timeLimit: 30 }; // 20 cards
  if (level <= 20) return { rows: 5, cols: 5, timeLimit: 25 }; // 25 cards
  if (level <= 30) return { rows: 5, cols: 6, timeLimit: 20 }; // 30 cards
  if (level <= 40) return { rows: 6, cols: 6, timeLimit: 15 }; // 36 cards
  return { rows: 6, cols: 7, timeLimit: 20 }; // 42 cards
};
