"use client";
import GameBoard from "@/src/components/GameBoard";

export default function GamePage() {
  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center">
      <GameBoard />
      <button className="mt-4 px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600">
        Restart
      </button>
    </main>
  );
}
