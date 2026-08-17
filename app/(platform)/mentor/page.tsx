"use client";

import Link from "next/link";
import { useProgress, seedDemoData } from "@/lib/store";
import { trackById, TRACKS } from "@/content/tracks";
import { TOPICS, topicName } from "@/content/topics";
import { weakTopics } from "@/lib/engine/recommend";
import { dueItems } from "@/lib/engine/srs";
import { predictScore } from "@/lib/engine/predictor";
import { BarRow, heatColor } from "@/components/charts";
import { problemById } from "@/content/problems";

// Mentor console (v1 demo): a read-only analytic view over the same
// progress store a real mentor would see server-side in v2.

export default function MentorPage() {
  const p = useProgress();
  const track = trackById.get(p.track) ?? TRACKS[2];
  const mistakes = [...p.attempts].reverse().filter(a => !a.correct).slice(0, 6);
  const due = dueItems(p.reviews);
  const weak = weakTopics(p, track, 5);
  const lessonsDone = Object.entries(p.lessons).filter(([, l]) => l.completed);
  const empty = p.attempts.length === 0;

  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">Mentor Console · demo view</p>
        <h1>Student: Local Learner</h1>
        <p className="page-sub">
          Everything a mentor needs before a session: the mastery map, the
          mistakes, the homework state, and where the student is headed.
          {empty && <> No data yet — <button className="linklike" onClick={seedDemoData}>load the demo student</button>.</>}
        </p>
      </header>

      <div className="stat-tiles">
        <div className="stat-tile glass">
          <p className="stat-tile-v">{predictScore(track, p.mastery)}</p>
          <p className="mono stat-tile-k">Predicted {track.short}</p>
        </div>
        <div className="stat-tile glass">
          <p className="stat-tile-v">{lessonsDone.length}</p>
          <p className="mono stat-tile-k">Lessons complete</p>
        </div>
        <div className="stat-tile glass">
          <p className="stat-tile-v">{due.length}</p>
          <p className="mono stat-tile-k">Reviews outstanding</p>
        </div>
        <div className="stat-tile glass">
          <p className="stat-tile-v">{p.contests.length}</p>
          <p className="mono stat-tile-k">Mock contests</p>
        </div>
      </div>

      <div className="dash-cols">
        <section className="glass dash-panel">
          <p className="mono lp-tag">Full mastery map</p>
          <div className="dash-heat wide">
            {TOPICS.map(t => {
              const r = p.mastery[t.id]?.rating ?? 0;
              const n = p.mastery[t.id]?.n ?? 0;
              return (
                <div key={t.id} className="dash-heat-cell"
                  style={{ background: heatColor(r / 100) }}
                  title={`${t.name}: ${Math.round(r)}/100 (${n} attempts)`}>
                  <span>{t.name.split(" ")[0]}</span>
                  <span className="mono">{n > 0 ? Math.round(r) : "—"}</span>
                </div>
              );
            })}
          </div>

          <p className="mono lp-tag" style={{ marginTop: "1.6rem" }}>Priority topics (weakest, track-weighted)</p>
          {weak.map(w => (
            <BarRow key={w.topicId} label={topicName(w.topicId)} value={w.rating} max={100} />
          ))}
        </section>

        <div className="dash-stack">
          <section className="glass dash-panel">
            <p className="mono lp-tag">Recent mistakes — session material</p>
            {mistakes.length === 0 && <p className="dash-none">No recorded misses.</p>}
            {mistakes.map((a, i) => {
              const prob = problemById.get(a.problemId);
              return (
                <Link key={i} href={`/problems/${a.problemId}`} className="dash-attempt">
                  <span className="dash-attempt-dot" aria-hidden="true" />
                  <span className="dash-attempt-txt">{prob ? topicName(prob.topicId) : a.problemId}</span>
                  <span className="mono">d{prob?.difficulty} · {a.hintsUsed} hints · {Math.round(a.seconds)}s</span>
                </Link>
              );
            })}
          </section>

          <section className="glass dash-panel">
            <p className="mono lp-tag">Completed lessons</p>
            {lessonsDone.length === 0 && <p className="dash-none">None yet.</p>}
            {lessonsDone.slice(0, 8).map(([slug, l]) => (
              <p key={slug} className="mentor-lesson">
                <span>{slug.replace(/-/g, " ")}</span>
                <span className="mono">{new Date(l.ts).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
              </p>
            ))}
            <p className="mono lp-tag" style={{ marginTop: "1.4rem" }}>Contest history</p>
            {p.contests.length === 0 && <p className="dash-none">No mocks yet.</p>}
            {p.contests.slice(-4).reverse().map(run => (
              <p key={run.id} className="mentor-lesson">
                <span>{TRACKS.find(t => t.id === run.trackId)?.name}</span>
                <span className="mono">{run.score}/{run.maxScore} · ✓{run.correct} ○{run.blank} ✗{run.wrong}</span>
              </p>
            ))}
          </section>
        </div>
      </div>

      <p className="mono demo-note">
        v2: live rosters, assignment pushing, proof grading, and parent-report
        composition — see ARCHITECTURE.md §9.
      </p>
    </div>
  );
}
