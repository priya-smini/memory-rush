export const generateCards = (settings: {cols: number, rows: number}) => {
    const totalCards = settings.cols * settings.rows;
    const pairs = totalCards / 2;
    const pool = [
      "🐶",
      "🐱",
      "🐭",
      "🦊",
      "🐻",
      "🐼",
      "🐨",
      "🦁",
      "🐸",
      "🐷",
      "🐔",
      "🐧",
      "🐵",
      "🦄",
      "🐯",
      "🐙",
      "🐞",
      "🐢",
      "🦕",
      "🦖",
      "🐳",
    ];

    const selected = pool.slice(0, pairs);
    const cards = [...selected, ...selected] // duplicate for pairs
      .map((content, i) => ({
        id: i,
        content,
        isFlipped: false,
        isMatched: false,
      }))
      .sort(() => Math.random() - 0.5); // shuffle
    return cards;
  };