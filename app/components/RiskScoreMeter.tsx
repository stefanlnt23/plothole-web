export function RiskScoreMeter({ score }: { score: number }) {
  const normalized = Math.max(0, Math.min(10, score));
  const angle = `${(normalized / 10) * 180}deg`;

  return (
    <div className="space-y-2">
      <div className="relative h-24 w-48 overflow-hidden rounded-t-full border border-border bg-gradient-to-r from-forest via-warning to-danger">
        <div className="absolute bottom-0 left-1/2 h-20 w-[2px] origin-bottom bg-ink" style={{ transform: `translateX(-50%) rotate(${angle})` }} />
        <div className="absolute inset-x-0 bottom-0 h-12 bg-paper" />
      </div>
      <p className="text-4xl font-bold">{normalized}/10</p>
    </div>
  );
}
