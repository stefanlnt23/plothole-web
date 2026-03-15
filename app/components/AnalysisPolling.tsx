"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "./AuthProvider";

export function AnalysisPolling({ analysisId }: { analysisId: string | null }) {
  const supabase = useSupabase();
  const router = useRouter();

  useEffect(() => {
    if (!analysisId) return;

    const timer = setInterval(async () => {
      const { data } = await supabase.from("analyses").select("status").eq("id", analysisId).single();
      if (data?.status === "complete") {
        clearInterval(timer);
        router.push(`/report/${analysisId}`);
      }
      if (data?.status === "failed") clearInterval(timer);
    }, 3000);

    return () => clearInterval(timer);
  }, [analysisId, router, supabase]);

  return null;
}
