"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "../components/AuthProvider";

export default function AuthPage() {
  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const supabase = useSupabase();
  const router = useRouter();

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (tab === "signup" && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const action = tab === "signin"
      ? supabase.auth.signInWithPassword({ email, password })
      : supabase.auth.signUp({ email, password });

    const { error: authError } = await action;
    if (authError) return setError(authError.message);

    router.push("/dashboard");
  };

  const signInGoogle = async () => {
    await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: `${window.location.origin}/dashboard` } });
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center px-6">
      <div className="w-full rounded-2xl border border-border bg-white p-8 shadow-subtle">
        <h1 className="font-serif text-3xl">PlotHole</h1>
        <div className="mt-5 grid grid-cols-2 rounded-lg border border-border p-1 text-sm">
          <button onClick={() => setTab("signin")} className={`rounded-md px-3 py-2 ${tab === "signin" ? "bg-forest text-white" : ""}`}>Sign In</button>
          <button onClick={() => setTab("signup")} className={`rounded-md px-3 py-2 ${tab === "signup" ? "bg-forest text-white" : ""}`}>Create Account</button>
        </div>

        <form className="mt-5 space-y-3" onSubmit={submit}>
          <input required type="email" placeholder="Email" className="w-full rounded-md border border-border px-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input required type="password" placeholder="Password" className="w-full rounded-md border border-border px-3 py-2" value={password} onChange={(e) => setPassword(e.target.value)} />
          {tab === "signup" && <input required type="password" placeholder="Confirm Password" className="w-full rounded-md border border-border px-3 py-2" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />}
          {error && <p className="text-sm text-danger">{error}</p>}
          <button className="w-full rounded-md bg-forest py-2 text-white">{tab === "signin" ? "Sign In" : "Create Account"}</button>
        </form>

        <button onClick={signInGoogle} className="mt-3 w-full rounded-md border border-border py-2">Continue with Google</button>
        <p className="mt-4 text-xs text-secondary">By creating an account you agree to our Terms of Service and Privacy Policy</p>
      </div>
    </main>
  );
}
