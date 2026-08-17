"use client";

import { useProgress, seedDemoData } from "@/lib/store";
import { trackById, TRACKS } from "@/content/tracks";
import { predictScore } from "@/lib/engine/predictor";
import { ActivityBars, BarRow } from "@/components/charts";
import { dayKey } from "@/lib/engine/xp";

// Parent dashboard (v1 demo): weekly progress, time studied, and
// plain-language signals — no jargon, no mastery calculus.

export default function ParentPage() {
  const p = useProgress();
  const track = trackById.get(p.track) ?? TRACKS[2];
  const empty = p.attempts.length === 0;

  const weekly: { label: string; mins: number; probs: number }[] = [];
  const now = Date.now();
  for (let w = 3; w >= 0; w--) {
    let mins = 0;
    for (let d = 0; d < 7; d++) {
      const key = dayKey(now - (w * 7 + d) * 86400000);
      mins += p.minutesByDay[key] ?? 0;
    }
    const probs = p.attempts.filter(a =>
      a.ts > now - (w + 1) * 7 * 86400000 && a.ts <= now - w * 7 * 86400000).length;
    weekly.push({ label: w === 0 ? "This week" : `${w} wk ago`, mins: Math.round(mins), probs });
  }
  const maxMins = Math.max(60, ...weekly.map(w => w.mins));

  const solved = p.attempts.filter(a => a.correct).length;
  const accuracy = p.attempts.length ? Math.round((solved / p.attempts.length) * 100) : 0;
  const lessonsDone = Object.values(p.lessons).filter(l => l.completed).length;

  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">Parent Dashboard · demo view</p>
        <h1>How it's going.</h1>
        <p className="page-sub">
          The honest weekly picture: time invested, work completed, and trajectory —
          without the technical instrumentation.
          {empty && <> No data yet — <button className="linklike" onClick={seedDemoData}>load the demo student</button>.</>}
        </p>
      </header>

      <div className="stat-tiles">
        <div className="stat-tile glass">
          <p className="stat-tile-v">{weekly[3].mins}<span>m</span></p>
          <p className="mono stat-tile-k">Studied this week</p>
        </div>
        <div className="stat-tile glass">
          <p className="stat-tile-v">{lessonsDone}</p>
          <p className="mono stat-tile-k">Lessons finished</p>
        </div>
        <div className="stat-tile glass">
          <p className="stat-tile-v">{accuracy}<span>%</span></p>
          <p className="mono stat-tile-k">Solve rate</p>
        </div>
        <div className="stat-tile glass">
          <p className="stat-tile-v">{p.streak.count}<span>d</span></p>
          <p className="mono stat-tile-k">Current streak</p>
        </div>
      </div>

      <div className="dash-cols">
        <section className="glass dash-panel">
          <p className="mono lp-tag">Weekly study time</p>
          {weekly.map(w => (
            <BarRow key={w.label} label={w.label} value={w.mins} max={maxMins} sublabel={`min · ${w.probs} problems`} />
          ))}
          <p className="mono lp-tag" style={{ marginTop: "1.4rem" }}>Daily rhythm — last 28 days</p>
          <ActivityBars minutesByDay={p.minutesByDay} />
        </section>

        <section className="glass dash-panel">
          <p className="mono lp-tag">Where they're headed</p>
          <p className="parent-line">
            Training track: <strong>{track.name}</strong>. Current projection:{" "}
            <strong>{predictScore(track, p.mastery)} / {track.officialMax}</strong>
            {track.cutoff && <> — the meaningful threshold is {track.cutoff.score} ({track.cutoff.label.toLowerCase()}).</>}
          </p>
          <p className="parent-line">
            {solved} problems solved across {p.attempts.length} attempts. In competition
            mathematics a {accuracy}% solve rate at rising difficulty is the goal state —
            struggle is the curriculum, not a warning sign.
          </p>
          <p className="mono lp-tag" style={{ marginTop: "1.4rem" }}>Mentor's note</p>
          <p className="parent-quote">
            “Consistency is ahead of intensity this month — exactly the right order.
            Next cycle we shift one session per week to timed conditions.”
          </p>
          <p className="mono lp-tag" style={{ marginTop: "1.4rem" }}>Upcoming</p>
          <p className="parent-line mono">
            AMC 10/12 A · Nov 5, 2026 &nbsp;·&nbsp; AMC 10/12 B · Nov 11, 2026 &nbsp;·&nbsp; AIME I · Feb 2027
          </p>
        </section>
      </div>

      <p className="mono demo-note">
        v2: parent accounts with weekly email digests and mentor-authored reports — see ARCHITECTURE.md §9.
      </p>
    </div>
  );
}
