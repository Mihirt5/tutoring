import type { EmailOtpType } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Handles both confirmation-link shapes Supabase can send:
//  - token_hash + type   → when the "Confirm signup" email template is set to
//    `{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email`
//  - code                → the default template, which routes through Supabase's
//    own verify endpoint and lands here with a PKCE `code` to exchange
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const code = searchParams.get("code");
  const next = safeNext(searchParams.get("next"));

  const supabase = await createClient();

  if (supabase) {
    if (tokenHash && type) {
      const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash });
      if (!error) return NextResponse.redirect(new URL(next, request.url));
    } else if (code) {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) return NextResponse.redirect(new URL(next, request.url));
    }
  }

  return NextResponse.redirect(new URL("/login?error=confirmation_failed", request.url));
}

// Only allow in-app relative paths so `next` can't be turned into an open redirect.
function safeNext(value: string | null): string {
  if (value && value.startsWith("/") && !value.startsWith("//")) return value;
  return "/learn";
}
