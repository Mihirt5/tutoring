"use client";

import Link from "next/link";
import { useProgress, seedDemoData, resetProgress } from "@/lib/store";
import { trackById, TRACKS } from "@/content/tracks";
import { TOPICS, topicName } from "@/content/topics";
import { predictScore, qualificationProbability, readiness } from "@/lib/engine/predictor";
import { recommendLessons } from "@/lib/engine/recommend";
import { BADGES, levelProgress } from "@/lib/engine/xp";
import { confidence } from "@/lib/engine/mastery";
import { ActivityBars, BarRow, Ring, heatColor } from "@/components/charts";
import { problemById } from "@/content/problems";

export default function DashboardPage() {
  const p = useProgress();
  const track = trackById.get(p.track) ?? TRACKS[2];
  const lp = levelProgress(p.xp);
  const solved = p.attempts.filter(a => a.correct).length;
  const lessonsDone = Object.values(p.lessons).filter(l => l.completed).length;
  const pred = predictScore(track, p.mastery);
  const qual = qualificationProbability(track, p.mastery);

  const week = (() => {
    const now = Date.now();
    let mins = 0, probs = 0;
    for (let i = 0; i < 7; i++) {
      const d = new Date(now - i * 86400000);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      mins += p.minutesByDay[key] ?? 0;
    }
    probs = p.attempts.filter(a => a.ts > now - 7 * 86400000).length;
    return { mins: Math.round(mins), probs };
  })();

  const ratedTopics = TOPICS
    .map(t => ({ t, m: p.mastery[t.id] }))
    .filter(x => x.m && x.m.n > 0)
    .sort((a, b) => b.m!.rating - a.m!.rating);

  const empty = p.attempts.length === 0 && lessonsDone === 0;
  const recs = recommendLessons(p, track, 4);
  const recentAttempts = [...p.attempts].reverse().slice(0, 8);

  return (
    <div className="page">
      <header className="page-head dash-head">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h1>The state of your mathematics.</h1>
        </div>
        <div className="dash-head-actions">
          {empty && (
            <button className="btn btn-solid btn-small" onClick={seedDemoData}>
              Load demo student
            </button>
          )}
          {!empty && (
            <button
              className="btn btn-ghost btn-small"
              onClick={() => { if (confirm("Erase all progress? This cannot be undone.")) resetProgress(); }}
            >
              Reset progress
            </button>
          )}
        </div>
      </header>

      {empty && (
        <div className="glass dash-empty">
          <p>No data yet — your dashboard assembles itself from every problem you touch.
            Start a lesson, or load a demo student to see the instrumentation live.</p>
        </div>
      )}

      {/* stat tiles */}
      <div className="stat-tiles">
        <div className="stat-tile glass">
          <p className="stat-tile-v">{p.streak.count}<span>d</span></p>
          <p className="mono stat-tile-k">Streak</p>
        </div>
        <div className="stat-tile glass">
          <p className="stat-tile-v">{p.xp}<span> xp</span></p>
          <p className="mono stat-tile-k">Level {lp.level} · {lp.into}/{lp.needed}</p>
        </div>
        <div className="stat-tile glass">
          <p className="stat-tile-v">{solved}</p>
          <p className="mono stat-tile-k">Problems solved</p>
        </div>
        <div className="stat-tile glass">
          <p className="stat-tile-v">{lessonsDone}</p>
          <p className="mono stat-tile-k">Lessons complete</p>
        </div>
      </div>

      {/* prediction */}
      <section className="glass dash-predict">
        <div className="dash-predict-main">
          <p className="mono lp-tag">Contest projection · {track.name}</p>
          <p className="dash-predict-score">
            {pred}<span className="mono"> / {track.officialMax}</span>
          </p>
          {qual !== null && track.cutoff && (
            <p className="dash-predict-qual">
              <strong>{Math.round(qual * 100)}%</strong> probability of clearing {track.cutoff.score}
              <span className="mono"> · {track.cutoff.label}</span>
            </p>
          )}
          <p className="dash-predict-note mono">
            Projection = topic mastery × official difficulty curve, {track.id.startsWith("amc1") ? "with optimal blank strategy" : "answer-only model"}.
          </p>
        </div>
        <Ring value={readiness(track, p.mastery)} label="readiness" size={110} />
      </section>

      <div className="dash-cols">
        {/* mastery bars */}
        <section className="glass dash-panel">
          <p className="mono lp-tag">Topic mastery</p>
          {ratedTopics.length === 0 && <p className="dash-none">Solve problems to calibrate ratings.</p>}
          {ratedTopics.slice(0, 12).map(({ t, m }) => (
            <BarRow
              key={t.id}
              label={t.name}
              value={m!.rating}
              max={100}
              sublabel={`· conf ${Math.round(confidence(m!) * 100)}%`}
            />
          ))}
        </section>

        {/* heatmap + goals */}
        <div className="dash-stack">
          <section className="glass dash-panel">
            <p className="mono lp-tag">Strengths & gaps · {track.name} topics</p>
            <div className="dash-heat">
              {Object.keys(track.topicWeights).map(tid => {
                const r = p.mastery[tid]?.rating ?? 0;
                return (
                  <div key={tid} className="dash-heat-cell"
                    style={{ background: heatColor(r / 100) }}
                    title={`${topicName(tid)}: ${Math.round(r)}/100`}>
                    <span>{topicName(tid).split(" ")[0]}</span>
                    <span className="mono">{Math.round(r)}</span>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="glass dash-panel">
            <p className="mono lp-tag">This week</p>
            <BarRow label="Study minutes" value={week.mins} max={Math.max(180, week.mins)} sublabel="/ 180 goal" />
            <BarRow label="Problems attempted" value={week.probs} max={Math.max(20, week.probs)} sublabel="/ 20 goal" />
            <p className="mono lp-tag" style={{ marginTop: "1.2rem" }}>Last 28 days</p>
            <ActivityBars minutesByDay={p.minutesByDay} />
          </section>
        </div>
      </div>

      {/* recommendations + badges + timeline */}
      <div className="dash-cols">
        <section className="glass dash-panel">
          <p className="mono lp-tag">Recommended next lessons</p>
          {recs.map(l => (
            <Link key={l.slug} className="learn-rec" href={`/lesson/${l.slug}`}>
              <span>{l.title}</span>
              <span className="mono">{topicName(l.topicId)} →</span>
            </Link>
          ))}
          <p className="mono lp-tag" style={{ marginTop: "1.6rem" }}>Achievements</p>
          <div className="badge-grid">
            {BADGES.map(b => {
              const earned = p.badges.includes(b.id);
              return (
                <div key={b.id} className={`badge${earned ? " earned" : ""}`} title={b.desc}>
                  <span className="badge-mark mono">{earned ? "◆" : "◇"}</span>
                  <span>{b.name}</span>
                </div>
              );
            })}
          </div>
        </section>

        <section className="glass dash-panel">
          <p className="mono lp-tag">Recent activity</p>
          {recentAttempts.length === 0 && <p className="dash-none">No attempts yet.</p>}
          {recentAttempts.map((a, i) => {
            const prob = problemById.get(a.problemId);
            return (
              <Link key={i} href={`/problems/${a.problemId}`} className="dash-attempt">
                <span className={`dash-attempt-dot${a.correct ? " ok" : ""}`} aria-hidden="true" />
                <span className="dash-attempt-txt">
                  {prob ? topicName(prob.topicId) : a.problemId} · d{prob?.difficulty ?? "?"}
                </span>
                <span className="mono">
                  {a.correct ? "solved" : "missed"} · {Math.round(a.seconds)}s
                  {a.hintsUsed > 0 ? ` · ${a.hintsUsed}h` : ""} · {a.context}
                </span>
              </Link>
            );
          })}
        </section>
      </div>
    </div>
  );
}
