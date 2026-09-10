"use client";

import { useActionState } from "react";
import { resendConfirmation, type ResendState } from "./actions";

export function ResendForm({ email }: { email: string }) {
  const [state, formAction, pending] = useActionState<ResendState, FormData>(
    resendConfirmation,
    null,
  );

  const errored = state && "error" in state;
  const sent = state && "ok" in state;

  return (
    <form className="auth-resend" action={formAction}>
      <input type="hidden" name="email" value={email} />
      {errored && <p className="auth-error">{state.error}</p>}
      {sent && <p className="auth-info">Sent again — check your inbox (and spam).</p>}
      <button className="btn btn-ghost btn-block" type="submit" disabled={pending || Boolean(sent)}>
        {pending ? "Sending…" : sent ? "Email resent" : "Resend confirmation email"}
      </button>
    </form>
  );
}
