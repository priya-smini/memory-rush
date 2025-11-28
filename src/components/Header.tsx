interface HeaderProps {
  timeLeft: number;
  timeLimit: number;
  level: number;
  hearts: number;
  regenTime: number;
}

export default function Header({
  timeLeft,
  timeLimit,
  level,
  hearts,
  regenTime,
}: HeaderProps) {
  const percent = (timeLeft / timeLimit) * 100;
  console.log("regen time in header", regenTime);
  return (
    <header className="w-full px-4 py-3 bg-gray-900 text-white">
      <div className="flex justify-between items-center mb-1">
        <div className="flex gap-1">
          <div className="flex items-center gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <span key={i}>{i < hearts ? "❤️" : "🖤"}</span>
            ))}
            {regenTime > 0 && <span>⏳ {regenTime}s</span>}
          </div>
        </div>
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
