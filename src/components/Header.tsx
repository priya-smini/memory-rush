interface HeaderProps {
  timeLeft: number;
  timeLimit: number;
  level: number;
}

export default function Header({ timeLeft, timeLimit, level }: HeaderProps) {
  const percent = (timeLeft / timeLimit) * 100;

  return (
    <header className="w-full px-4 py-3 bg-gray-900 text-white">
      <div className="flex justify-between items-center mb-1">
        <span>❤️ x3</span>
        <h1 className="text-xl font-semibold">Memory Rush - {level} Level</h1>
        <span>⏱️ {timeLeft}s</span>
      </div>
      <div className="w-full h-2 bg-gray-700 rounded">
        <div
          className="h-full bg-green-400 rounded transition-all duration-500"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </header>
  );
}
