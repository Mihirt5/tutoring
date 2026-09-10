import Link from "next/link";
import { ResendForm } from "./resend-form";

export default async function CheckEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = await searchParams;

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
        <p className="mono auth-eyebrow">Almost there</p>
        <h1 className="auth-title">Check your email</h1>
        <p className="auth-note">
          We sent a confirmation link to{" "}
          {email ? <strong>{email}</strong> : "the address you signed up with"}. Click it to
          activate your account, then log in.
        </p>
        <p className="auth-hint">
          Nothing after a minute? Check your spam folder{email ? ", or resend it below" : ""}. Links
          expire after 24 hours.
        </p>

        {email ? <ResendForm email={email} /> : null}

        <Link className="auth-switch" href="/login">
          Back to log in
        </Link>
      </div>
    </div>
  );
}
