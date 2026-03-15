import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createSupabaseServer } from "@/lib/supabase";

export async function POST(request: Request) {
  const supabaseAuth = createSupabaseServer();
  const { data: { user } } = await supabaseAuth.auth.getUser();

  if (!user) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file || file.type !== "application/pdf") {
    return NextResponse.json({ success: false, error: "Please upload a PDF" }, { status: 400 });
  }

  if (file.size > 15 * 1024 * 1024) {
    return NextResponse.json({ success: false, error: "File exceeds 15MB" }, { status: 400 });
  }

  const service = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: userRecord } = await service.from("users").select("credits").eq("id", user.id).single();

  if (!userRecord || userRecord.credits <= 0) {
    return NextResponse.json({ success: false, error: "No credits remaining" }, { status: 402 });
  }

  const bytes = await file.arrayBuffer();
  const pdf_base64 = Buffer.from(bytes).toString("base64");

  const { data: analysis, error } = await service
    .from("analyses")
    .insert({ user_id: user.id, filename: file.name, status: "pending" })
    .select("id")
    .single();

  if (error || !analysis) {
    return NextResponse.json({ success: false, error: "Unable to create analysis" }, { status: 500 });
  }

  await fetch(process.env.N8N_WEBHOOK_URL || "https://stefanlenta.app.n8n.cloud/webhook/plothole-analyse", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ analysis_id: analysis.id, user_id: user.id, filename: file.name, pdf_base64 }),
  });

  return NextResponse.json({ success: true, analysis_id: analysis.id });
}
