"use client";

import { motion } from "framer-motion";

interface CardProps {
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
  content: string;
}

export default function Card({
  isFlipped,
  isMatched,
  onClick,
  content,
}: CardProps) {
  return (
    <motion.div
      onClick={onClick}
      className={`w-16 h-20 m-2 perspective cursor-pointer ${
        isMatched ? "opacity-50" : ""
      }`}
    >
      <motion.div
        className="relative w-full h-full text-2xl font-bold rounded shadow-lg"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.4 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="absolute w-full h-full flex items-center justify-center bg-black text-white rounded"
          style={{ backfaceVisibility: "hidden" }}
        >
          ❓
        </div>
        <div
          className="absolute w-full h-full flex items-center justify-center bg-yellow-300 text-black rounded"
          style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
        >
          {content}
        </div>
      </motion.div>
    </motion.div>
  );
}
