"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type AuthFormState = { error: string } | null;

export async function login(_prevState: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const supabase = await createClient();
  if (!supabase) {
    return { error: "Supabase isn't connected yet — see the setup notes below." };
  }

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: error.message };

  redirect("/learn");
}
