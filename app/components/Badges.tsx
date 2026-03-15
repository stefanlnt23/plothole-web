import { cn } from "@/lib/utils";

export function VerdictBadge({ verdict }: { verdict: string }) {
  const className =
    verdict === "High Risk"
      ? "bg-danger/10 text-danger border-danger/30"
      : verdict === "Caution"
      ? "bg-warning/10 text-warning border-warning/30"
      : "bg-forest/10 text-forest border-forest/30";

  return <span className={cn("rounded-full border px-3 py-1 text-xs font-medium", className)}>{verdict}</span>;
}

export function SeverityBadge({ severity }: { severity: "high" | "medium" | "low" }) {
  const className =
    severity === "high"
      ? "bg-danger/10 text-danger border-danger/30"
      : severity === "medium"
      ? "bg-warning/10 text-warning border-warning/30"
      : "bg-forest/10 text-forest border-forest/30";

  return <span className={cn("rounded-full border px-2.5 py-1 text-xs uppercase", className)}>{severity}</span>;
}
