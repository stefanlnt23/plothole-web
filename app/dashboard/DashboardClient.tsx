"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "../components/AuthProvider";
import { CreditsWidget } from "../components/CreditsWidget";
import { VerdictBadge } from "../components/Badges";
import { AnalysisPolling } from "../components/AnalysisPolling";

const loadingMessages = ["Reading your contract...", "Identifying risk clauses...", "Calculating your risk score..."];

export function DashboardClient({ email, credits, analyses }: { email: string; credits: number; analyses: any[] }) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [analysisId, setAnalysisId] = useState<string | null>(null);
  const [messageIndex, setMessageIndex] = useState(0);
  const supabase = useSupabase();
  const router = useRouter();

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);

    const form = new FormData();
    form.append("file", file);
    const response = await fetch("/api/analyse", { method: "POST", body: form });
    const data = await response.json();
    setAnalysisId(data.analysis_id);

    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % loadingMessages.length;
      setMessageIndex(idx);
    }, 3000);

    setTimeout(() => clearInterval(interval), 30000);
  };

  const statusText = useMemo(() => loadingMessages[messageIndex], [messageIndex]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
        <h1 className="font-serif text-3xl">PlotHole</h1>
        <div className="flex items-center gap-3">
          <CreditsWidget credits={credits} />
          <div className="text-sm">{email}</div>
          <button className="rounded-md border border-border px-3 py-2" onClick={async () => { await supabase.auth.signOut(); router.push("/auth"); }}>Sign Out</button>
        </div>
      </header>

      <section className="rounded-2xl border-2 border-dashed border-border bg-white p-8 text-center">
        <form onSubmit={submit} className="space-y-4">
          <p className="text-lg">Drop your contract here, or click to browse</p>
          <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} className="mx-auto block" />
          {file && <p className="text-sm text-secondary">Selected: {file.name}</p>}
          <button disabled={!file || loading} className="rounded-md bg-forest px-5 py-2 text-white disabled:opacity-50">Analyse Contract</button>
          {loading && <p className="text-secondary animate-fadeIn">{statusText}</p>}
        </form>
      </section>

      <section className="mt-10">
        <h2 className="font-serif text-2xl">Past Analyses</h2>
        {analyses.length === 0 ? (
          <div className="mt-4 rounded-xl border border-border p-10 text-center text-secondary">📄 Upload your first contract above to get started</div>
        ) : (
          <div className="mt-4 overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-left text-sm">
              <thead className="bg-white"><tr><th className="p-3">Date</th><th>Filename</th><th>Document Type</th><th>Score</th><th>Verdict</th><th>Action</th></tr></thead>
              <tbody>
                {analyses.map((a) => (
                  <tr key={a.id} className="border-t border-border">
                    <td className="p-3">{new Date(a.created_at).toLocaleDateString("en-GB")}</td>
                    <td>{a.filename}</td>
                    <td>{a.document_type || "—"}</td>
                    <td>{a.risk_score ?? "—"}</td>
                    <td><VerdictBadge verdict={a.verdict || "Caution"} /></td>
                    <td><a href={`/report/${a.id}`} className="text-forest underline">View Report</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
      <AnalysisPolling analysisId={analysisId} />
    </main>
  );
}
