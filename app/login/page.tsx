"use client";

import Link from "next/link";
import { useActionState } from "react";
import { login } from "./actions";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, null);
  const notConnected = state?.error?.startsWith("Supabase isn't connected");

  return (
    <div className="auth-shell">
      <Link className="brand auth-brand" href="/">
        <svg className="brand-mark" viewBox="0 0 32 32" aria-hidden="true">
          <circle cx="16" cy="16" r="13" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.55" />
          <path d="M16 6 L25.5 22 L6.5 22 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <span className="brand-name">LUCID</span>
      </Link>

      <div className="card glass auth-card">
        <p className="mono auth-eyebrow">Welcome back</p>
        <h1 className="auth-title">Log in</h1>

        <form className="auth-form" action={formAction}>
          <label className="auth-field">
            <span className="mono auth-label">Email</span>
            <input className="auth-input" type="email" name="email" autoComplete="email" required />
          </label>
          <label className="auth-field">
            <span className="mono auth-label">Password</span>
            <input className="auth-input" type="password" name="password" autoComplete="current-password" required />
          </label>

          {state?.error && <p className="auth-error">{state.error}</p>}

          <button className="btn btn-solid btn-block" type="submit" disabled={pending}>
            {pending ? "Logging in…" : "Log in"}
          </button>
        </form>

        <p className="auth-switch">
          No account yet? <Link href="/signup">Sign up</Link>
        </p>

        {notConnected && (
          <div className="auth-setup-note">
            <p className="mono">Setup</p>
            <p>
              Create a Supabase project, then set <code className="mono">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
              <code className="mono">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in your environment and redeploy.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
