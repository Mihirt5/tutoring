import Link from "next/link";
import { LoginForm } from "./login-form";

const NOTICES: Record<string, string> = {
  confirmation_failed:
    "That confirmation link was invalid or expired. Log in below, or sign up again for a fresh link.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const notice = error ? NOTICES[error] : undefined;

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

        {notice && <p className="auth-error">{notice}</p>}

        <LoginForm />

        <p className="auth-switch">
          No account yet? <Link href="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
