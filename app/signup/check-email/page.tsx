import Link from "next/link";

export default function CheckEmailPage() {
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
          We sent a confirmation link to the address you signed up with. Click it to
          activate your account, then log in.
        </p>
        <Link className="btn btn-ghost btn-block" href="/login">Back to log in</Link>
      </div>
    </div>
  );
}
