import { cn } from "@/lib/utils";

export function CreditsWidget({ credits }: { credits: number }) {
  const state = credits > 2 ? "text-forest border-forest/30" : credits > 0 ? "text-warning border-warning/30" : "text-danger border-danger/30";

  return (
    <div className={cn("rounded-xl border bg-white px-4 py-3", state)}>
      <p className="text-xs uppercase">Credits Remaining</p>
      <p className="text-2xl font-semibold">{credits}</p>
      {credits === 0 && <button className="mt-2 rounded-md bg-forest px-3 py-1.5 text-sm text-white">Top Up</button>}
    </div>
  );
}
