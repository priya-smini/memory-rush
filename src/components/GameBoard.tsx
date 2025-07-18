"use client";
import { useEffect, useState } from "react";
import Card from "./Card";
import { useGameStore } from "../state/gameStore";
import { getLevelSetting } from "../utils/levelconfig";
import { generateCards } from "../utils/generateCards";
import { useTimer } from "../hooks/useTimer";
import Header from "./Header";

export default function GameBoard() {
  const { level, setLevel } = useGameStore();
  const [settings, setSettings] = useState(getLevelSetting(level));
  const [cards, setCards] = useState(generateCards(settings));
  const [flipped, setFlipped] = useState<number[]>([]);
  const { timeLeft, resetTimer, restartTimer } = useTimer(
    settings.timeLimit,
    () => {
      alert("⏰ Time's up! Restarting level.");
      setCards(generateCards(settings));
      resetTimer();
    }
  );

  useEffect(() => {
    const allMatched = cards.every((card) => card.isMatched);
    if (allMatched && cards.length > 0) {
      setTimeout(() => {
        alert(`🎉 Level ${level} Complete!`);
        setLevel(level + 1);
      }, 1000);
    }
  }, [cards]);

  useEffect(() => {
    console.log(
      "level useeffect called with timelest and level " +
        level +
        " -> " +
        settings.timeLimit
    );
    setSettings(getLevelSetting(level));
    setCards(generateCards(getLevelSetting(level)));
    console.log("changes level");
    restartTimer(settings.timeLimit); // restart timer
  }, [level]);

  const handleCardClick = (index: number) => {
    if (
      cards[index].isFlipped ||
      cards[index].isMatched ||
      flipped.length === 2
    )
      return;

    const updated = [...cards];
    updated[index].isFlipped = true;
    const newFlipped = [...flipped, index];

    setCards(updated);
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      setTimeout(() => {
        const next = [...updated];
        if (next[first].content === next[second].content) {
          next[first].isMatched = true;
          next[second].isMatched = true;
        } else {
          next[first].isFlipped = false;
          next[second].isFlipped = false;
        }
        setCards(next);
        setFlipped([]);
      }, 800);
    }
  };

  return (
    <>
      <Header
        timeLeft={timeLeft}
        timeLimit={settings.timeLimit}
        level={level}
      />
      <div
        className="grid gap-4 p-4"
        style={{
          gridTemplateColumns: `repeat(${settings.cols}, minmax(0, 1fr))`,
        }}
      >
        {cards.map((card, index) => (
          <Card
            key={card.id}
            isFlipped={card.isFlipped || card.isMatched}
            isMatched={card.isMatched}
            onClick={() => handleCardClick(index)}
            content={card.content}
          />
        ))}
      </div>
    </>
  );
}
