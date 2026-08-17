"use client";

import Link from "next/link";
import { TRACKS } from "@/content/tracks";
import { useProgress } from "@/lib/store";
import { predictScore, readiness } from "@/lib/engine/predictor";
import { Ring } from "@/components/charts";

export default function ContestsPage() {
  const p = useProgress();

  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">Mock Contests</p>
        <h1>The clock is part of the problem.</h1>
        <p className="page-sub">
          Compact simulations sampled live from the bank to match each contest's
          difficulty curve — authentic scoring, per-problem timing, forensic review.
        </p>
      </header>

      <div className="contest-grid">
        {TRACKS.map(t => {
          const runs = p.contests.filter(c => c.trackId === t.id);
          const best = runs.length ? Math.max(...runs.map(r => r.score)) : null;
          return (
            <div key={t.id} className="contest-card glass plus-corners">
              <div className="contest-card-head">
                <div>
                  <h2>{t.name}</h2>
                  <p className="mono contest-meta">
                    {t.problemCount} problems · {t.minutes} min ·
                    {" "}{t.scoring.correct}/{t.scoring.blank}/{t.scoring.wrong} scoring
                  </p>
                </div>
                <Ring value={readiness(t, p.mastery)} label="ready" size={72} />
              </div>
              <p className="contest-desc">{t.description}</p>
              <div className="contest-stats mono">
                <span>Predicted: <strong>{predictScore(t, p.mastery)}</strong>/{t.officialMax}</span>
                <span>{runs.length} attempt{runs.length === 1 ? "" : "s"}</span>
                {best !== null && <span>Best: <strong>{best}</strong>/{runs[0]?.maxScore ?? t.maxScore}</span>}
              </div>
              <Link className="btn btn-solid btn-block" href={`/contests/${t.id}`}>
                {t.proofBased ? "Enter the gauntlet" : "Start simulation"}
              </Link>
            </div>
          );
        })}
      </div>

      {p.contests.length > 0 && (
        <section className="contest-history glass">
          <p className="mono lp-tag">Contest history</p>
          <table className="ch-table">
            <thead>
              <tr className="mono"><th>Date</th><th>Contest</th><th>Score</th><th>✓</th><th>○</th><th>✗</th></tr>
            </thead>
            <tbody>
              {[...p.contests].reverse().map(run => (
                <tr key={run.id}>
                  <td className="mono">{new Date(run.ts).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</td>
                  <td>{TRACKS.find(t => t.id === run.trackId)?.name ?? run.trackId}</td>
                  <td className="mono"><strong>{run.score}</strong>/{run.maxScore}</td>
                  <td className="mono">{run.correct}</td>
                  <td className="mono">{run.blank}</td>
                  <td className="mono">{run.wrong}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
}
