"use client";

import { createContext, useContext, useMemo } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { SupabaseClient } from "@supabase/supabase-js";

const AuthContext = createContext<SupabaseClient | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const client = useMemo(() => createSupabaseBrowserClient(), []);
  return <AuthContext.Provider value={client}>{children}</AuthContext.Provider>;
}

export const useSupabase = () => {
  const client = useContext(AuthContext);
  if (!client) throw new Error("useSupabase must be used inside AuthProvider");
  return client;
};
