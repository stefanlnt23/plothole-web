import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { DashboardClient } from "./DashboardClient";

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth");

  const [{ data: profile }, { data: analyses }] = await Promise.all([
    supabase.from("users").select("credits,email").eq("id", user.id).single(),
    supabase.from("analyses").select("id,created_at,filename,document_type,risk_score,verdict").eq("user_id", user.id).order("created_at", { ascending: false })
  ]);

  return <DashboardClient email={profile?.email || user.email || ""} credits={profile?.credits ?? 0} analyses={analyses || []} />;
}
