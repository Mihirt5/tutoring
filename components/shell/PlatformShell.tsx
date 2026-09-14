"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useProgress } from "@/lib/store";
import { levelProgress } from "@/lib/engine/xp";
import { dueItems } from "@/lib/engine/srs";
import { signOut } from "@/lib/supabase/actions";
import { useUser } from "@/lib/supabase/useUser";

const NAV = [
  { href: "/learn", label: "Learn", glyph: "∂" },
  { href: "/courses", label: "Courses", glyph: "▤" },
  { href: "/problems", label: "Problems", glyph: "Σ" },
  { href: "/contests", label: "Contests", glyph: "⊕" },
  { href: "/review", label: "Review", glyph: "↻" },
  { href: "/dashboard", label: "Dashboard", glyph: "∇" },
  { href: "/coach", label: "AI Coach", glyph: "λ" },
];

const SECONDARY = [
  { href: "/mentor", label: "Mentor view" },
  { href: "/parent", label: "Parent view" },
];

export function PlatformShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, loading } = useUser();
  const p = useProgress();
  const lp = levelProgress(p.xp);
  const due = dueItems(p.reviews).length;

  const active = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <div className="shell">
      <a className="shell-skip" href="#platform-content">
        Skip to main content
      </a>
      <aside className="shell-side">
        <Link className="brand shell-brand" href="/">
          <svg className="brand-mark" viewBox="0 0 32 32" aria-hidden="true">
            <circle
              cx="16"
              cy="16"
              r="13"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              opacity="0.55"
            />
            <path
              d="M16 6 L25.5 22 L6.5 22 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
          <span className="brand-name">LUCID</span>
        </Link>

        <nav className="shell-nav" aria-label="Platform">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`shell-link${active(item.href) ? " active" : ""}`}
            >
              <span className="shell-glyph mono" aria-hidden="true">
                {item.glyph}
              </span>
              {item.label}
              {item.href === "/review" && due > 0 && (
                <span className="shell-badge mono">{due}</span>
              )}
            </Link>
          ))}
        </nav>

        <div className="shell-secondary">
          <p className="mono shell-sec-label">Observers</p>
          {SECONDARY.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`shell-link small${active(item.href) ? " active" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </aside>

      <div className="shell-main">
        <header className="shell-top">
          <div className="shell-top-stats mono">
            <span className="top-stat" title="Daily streak">
              <span className="top-stat-key">STREAK</span> {p.streak.count}d
            </span>
            <span
              className="top-stat"
              title={`${lp.into}/${lp.needed} XP into level ${lp.level}`}
            >
              <span className="top-stat-key">LV {lp.level}</span> {p.xp} XP
              <span className="top-xpbar" aria-hidden="true">
                <span
                  style={{
                    width: `${Math.min(100, (lp.into / lp.needed) * 100)}%`,
                  }}
                />
              </span>
            </span>
          </div>
          <div className="shell-account">
            {!loading &&
              (user ? (
                <form action={signOut}>
                  <span className="mono shell-account-email">{user.email}</span>
                  <button className="btn btn-small btn-ghost" type="submit">
                    Log out
                  </button>
                </form>
              ) : (
                <Link className="btn btn-small btn-ghost" href="/login">
                  Log in
                </Link>
              ))}
          </div>
          <Link className="btn btn-small btn-ghost" href="/">
            Institute site
          </Link>
        </header>
        <main className="shell-content" id="platform-content" tabIndex={-1}>
          {children}
        </main>
      </div>

      <nav className="shell-mobile" aria-label="Platform (mobile)">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`shell-mlink${active(item.href) ? " active" : ""}`}
          >
            <span className="mono" aria-hidden="true">
              {item.glyph}
            </span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
