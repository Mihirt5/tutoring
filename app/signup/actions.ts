"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { AuthFormState } from "@/app/login/actions";

export async function signup(_prevState: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const supabase = await createClient();
  if (!supabase) {
    return { error: "Supabase isn't connected yet — see the setup notes below." };
  }

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  const origin = (await headers()).get("origin");

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: `${origin}/auth/confirm` },
  });
  if (error) return { error: error.message };

  redirect("/signup/check-email");
}
