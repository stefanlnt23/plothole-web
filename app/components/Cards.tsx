import { SeverityBadge } from "./Badges";

export function ClauseCard({ clause }: { clause: any }) {
  return (
    <article className="space-y-3 rounded-xl border border-border bg-white p-5 shadow-subtle">
      <div className="flex flex-wrap items-center gap-2">
        <SeverityBadge severity={clause.severity} />
        <span className="text-sm font-medium">{clause.type}</span>
        <span className={`rounded-full px-2 py-1 text-xs ${clause.is_common ? "bg-forest/10 text-forest" : "bg-danger/10 text-danger"}`}>
          {clause.is_common ? "Standard Clause" : "Unusual Clause"}
        </span>
      </div>
      <blockquote className="border-l-2 border-border pl-3 text-sm text-secondary">{clause.clause_text}</blockquote>
      <p>{clause.reason}</p>
      <p className="text-sm italic text-secondary">{clause.common_context}</p>
    </article>
  );
}

export function MissingProtectionCard({ item }: { item: any }) {
  return (
    <article className="rounded-xl border border-danger/30 bg-danger/5 p-4">
      <div className="mb-2 flex items-center justify-between">
        <h4 className="font-semibold">{item.name}</h4>
        <SeverityBadge severity={item.severity} />
      </div>
      <p className="text-sm text-secondary">{item.explanation}</p>
      <p className="mt-2 text-sm"><strong>Recommendation:</strong> {item.recommendation}</p>
    </article>
  );
}
