"use server";

import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";

export type ResendState = { error: string } | { ok: true } | null;

export async function resendConfirmation(
  _prevState: ResendState,
  formData: FormData,
): Promise<ResendState> {
  const email = String(formData.get("email") ?? "").trim();
  if (!email) return { error: "Missing email address — head back and sign up again." };

  const supabase = await createClient();
  if (!supabase) return { error: "Auth isn't connected yet." };

  const origin = (await headers()).get("origin");

  const { error } = await supabase.auth.resend({
    type: "signup",
    email,
    options: { emailRedirectTo: `${origin}/auth/confirm` },
  });
  if (error) return { error: error.message };

  return { ok: true };
}
