import { useEffect, useState } from "react";

export function useTimer(initialTime: number, onTimeout: () => void) {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [currentInitialTime, setCurrentInitialTime] = useState(initialTime);

  useEffect(() => {
    setTimeLeft(initialTime);
    setCurrentInitialTime(initialTime);
  }, [initialTime]);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeout();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [timeLeft]);

  const resetTimer = () => {
    setTimeLeft(currentInitialTime);
  };

  const restartTimer = (restartTime: number) => {
    // for new level
    setTimeLeft(restartTime);
    setCurrentInitialTime(restartTime);
  };

  return { timeLeft, resetTimer, restartTimer };
}
