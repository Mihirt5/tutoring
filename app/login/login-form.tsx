"use client";

import { useActionState } from "react";
import { login } from "./actions";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, null);
  const notConnected = state?.error?.startsWith("Supabase isn't connected");

  return (
    <>
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

      {notConnected && (
        <div className="auth-setup-note">
          <p className="mono">Setup</p>
          <p>
            Create a Supabase project, then set <code className="mono">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
            <code className="mono">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in your environment and redeploy.
          </p>
        </div>
      )}
    </>
  );
}
