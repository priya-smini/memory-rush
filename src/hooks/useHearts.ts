import { useState, useCallback, useRef, useEffect } from "react";

export function useHearts(initialHearts = 3, regenTimePerHeart = 50) {
  const [hearts, setHearts] = useState(initialHearts);
  //   const [regenQueue, setRegenQueue] = useState(0);
  const [regenTime, setRegenTime] = useState(0);
  const [isRegenerating, setIsRegenerating] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const regenQueueRef = useRef(0);
  const isRegeneratingRef = useRef(false);

  //keep ref sync with state
  useEffect(() => {
    isRegeneratingRef.current = isRegenerating;
  }, [isRegenerating]);

  const startRegenerating = useCallback(() => {
    if (regenQueueRef.current <= 0 || hearts >= initialHearts) return;
    if (isRegeneratingRef.current) return; //prevent multiple starts

    console.log("Starting regeneration, queue:", regenQueueRef.current);
    setIsRegenerating(true);
    setRegenTime(regenTimePerHeart);

    //clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    intervalRef.current = setInterval(() => {
      setRegenTime((prev) => {
        if (prev <= 1) {
          //stop current interval
          if (intervalRef.current) {
            clearInterval(intervalRef.current!);
            intervalRef.current = null;
          }

          // Add 1 heart
          setHearts((h) => {
            const newHearts = Math.min(initialHearts, h + 1);
            console.log("Regenerated heart. Old:", h, "New:", newHearts);
            return newHearts;
          });

          //decrease queue
          regenQueueRef.current--;

          //check if there are more hearts to regenerate
          if (regenQueueRef.current > 0) {
            console.log(
              "Starting next regeneration, remaining queue:",
              regenQueueRef.current
            );
            startRegenerating();
          } else {
            setIsRegenerating(false);
          }

          //decrease queue
          //   setRegenQueue((q) => {
          //     const newQ = q - 1;
          //     if (newQ > 0) {
          //       //chain next regeneration after a small delay
          //       setTimeout(() => {
          //         startRegenerating();
          //       }, 500);
          //     } else {
          //       setIsRegenerating(false);
          //     }
          //     return newQ;
          //   });

          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [regenTimePerHeart, initialHearts]);

  const loseHeart = useCallback(() => {
    console.log("inside lose heart");
    setHearts((h) => {
      if (h > 0) {
        return h - 1;
      } else {
        return h;
      }
    });

    // setRegenQueue((q) => {
    //   const newQ = q + 1;
    //   if (!isRegenerating && newQ > 0) {
    //     startRegenerating();
    //   }
    //   return newQ;
    // });

    // Add to queue and start regeneration if not already running
    regenQueueRef.current++;
    console.log(
      "Added to regeneration queue. New queue size:",
      regenQueueRef.current
    );

    if (!isRegeneratingRef.current && regenQueueRef.current > 0) {
      console.log("Starting regeneration process");
      startRegenerating();
    }
  }, [hearts, startRegenerating]);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    hearts,
    regenTime,
    loseHeart,
  };
}
