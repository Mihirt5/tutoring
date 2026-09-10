"use client";

// Timed contest simulator: blueprint-sampled exam, countdown timer,
// answer sheet with flagging, per-problem time capture, official
// scoring, and post-exam analytics with review recommendations.

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { Problem, Track } from "@/lib/types";
import { generateContest, scoreContest } from "@/lib/contest";
import { recordAttempt, recordContestRun, useProgress } from "@/lib/store";
import { MathText } from "./MathText";
import { BarRow, CHART } from "./charts";
import { topicName } from "@/content/topics";
import { lessonsForTopic } from "@/lib/engine/recommend";

type Phase = "brief" | "running" | "done";

export function ContestRunner({ track }: { track: Track }) {
  const [phase, setPhase] = useState<Phase>("brief");
  const [seed] = useState(() => Math.floor(Math.random() * 100000));
  const problems = useMemo<Problem[]>(() => generateContest(track, seed), [track, seed]);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() => problems.map(() => null));
  const [numeric, setNumeric] = useState("");
  const [flags, setFlags] = useState<Set<number>>(new Set());
  const [remaining, setRemaining] = useState(track.minutes * 60);
  const perProblem = useRef<number[]>(problems.map(() => 0));
  const lastTick = useRef(Date.now());
  const [result, setResult] = useState<ReturnType<typeof scoreContest> | null>(null);
  useProgress(); // re-render on store changes

  useEffect(() => {
    if (phase !== "running") return;
    lastTick.current = Date.now();
    const t = setInterval(() => {
      const now = Date.now();
      const dt = (now - lastTick.current) / 1000;
      lastTick.current = now;
      perProblem.current[idxRef.current] += dt;
      setRemaining(r => {
        if (r - dt <= 0) { finish(); return 0; }
        return r - dt;
      });
    }, 1000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const idxRef = useRef(idx);
  idxRef.current = idx;

  const setAnswer = (i: number, v: number | null) => {
    setAnswers(a => a.map((x, j) => (j === i ? v : x)));
  };

  const goto = (i: number) => {
    // persist numeric input of the current problem before moving
    if (problems[idx].answerType === "integer") {
      setAnswer(idx, numeric.trim() === "" ? null : Number(numeric));
    }
    setIdx(i);
    const next = answers[i];
    setNumeric(problems[i].answerType === "integer" && next !== null ? String(next) : "");
  };

  function finish() {
    const finalAnswers = answers.map((a, i) => {
      if (i === idxRef.current && problems[i].answerType === "integer") {
        return numeric.trim() === "" ? null : Number(numeric);
      }
      return a;
    });
    const s = scoreContest(track, problems, finalAnswers);
    setResult(s);
    setPhase("done");
    const runId = `${track.id}-${Date.now()}`;
    recordContestRun({
      id: runId,
      trackId: track.id,
      ts: Date.now(),
      problemIds: problems.map(p => p.id),
      answers: finalAnswers,
      perProblemSeconds: perProblem.current.map(x => Math.round(x)),
      score: s.score,
      maxScore: s.maxScore,
      correct: s.correct,
      blank: s.blank,
      wrong: s.wrong,
    });
    // answered problems feed the mastery engine
    problems.forEach((p, i) => {
      const a = finalAnswers[i];
      if (a !== null) {
        recordAttempt(p, {
          correct: a === p.answer,
          seconds: Math.max(5, Math.round(perProblem.current[i])),
          hintsUsed: 0,
          context: "contest",
        });
      }
    });
  }

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

  // ── briefing ──────────────────────────────────────────────────
  if (phase === "brief") {
    return (
      <div className="cr-brief glass">
        <p className="eyebrow">{track.name} · Compact simulation</p>
        <h1>{track.problemCount} problems · {track.minutes} minutes</h1>
        <p className="cr-desc">{track.description}</p>
        <ul className="cr-rules">
          <li>Scoring: <strong>{track.scoring.correct}</strong> per correct
            {track.scoring.blank > 0 && <> · <strong>{track.scoring.blank}</strong> per blank</>} · <strong>{track.scoring.wrong}</strong> per wrong</li>
          <li>Problems are sampled fresh from the bank to match the official difficulty curve.</li>
          <li>The timer is authentic. Flag problems and return; blanks are a strategic choice.</li>
          {track.proofBased && <li className="cr-proofnote">This is the answer-only readiness gauntlet — full proofs are graded in mentor tiers.</li>}
        </ul>
        <button className="btn btn-solid btn-large" onClick={() => setPhase("running")}>
          Begin — the clock starts immediately
        </button>
      </div>
    );
  }

  // ── results ───────────────────────────────────────────────────
  if (phase === "done" && result) {
    const wrongTopics = [...new Set(problems
      .filter((p, i) => answers[i] !== null && answers[i] !== p.answer)
      .map(p => p.topicId))];
    const reviewLessons = [...new Set(wrongTopics.flatMap(t => lessonsForTopic(t)))]
      .filter(l => l.status === "full").slice(0, 4);
    const maxTime = Math.max(...perProblem.current, 1);
    return (
      <div className="cr-results">
        <header className="cr-score glass">
          <p className="eyebrow">{track.name} · Result</p>
          <p className="cr-score-big">{result.score}<span className="cr-score-max"> / {result.maxScore}</span></p>
          <div className="cr-breakdown mono">
            <span style={{ color: CHART.good }}>✓ {result.correct} correct</span>
            <span style={{ color: CHART.ink }}>○ {result.blank} blank</span>
            <span style={{ color: CHART.serious }}>✗ {result.wrong} wrong</span>
          </div>
        </header>

        <section className="cr-perproblem glass">
          <p className="mono lp-tag">Time per problem</p>
          {problems.map((p, i) => {
            const a = answers[i];
            const status = a === null ? "blank" : a === p.answer ? "correct" : "wrong";
            const color = status === "correct" ? CHART.good : status === "wrong" ? CHART.serious : "#c9d4e2";
            return (
              <div key={p.id} className="cr-row">
                <BarRow
                  label={`#${i + 1} · ${topicName(p.topicId)}`}
                  value={perProblem.current[i]}
                  max={maxTime}
                  sublabel="s"
                  color={color}
                />
                <Link className="mono cr-review-link" href={`/problems/${p.id}`}>
                  {status === "correct" ? "✓" : status === "wrong" ? "✗ review" : "○ try it"}
                </Link>
              </div>
            );
          })}
        </section>

        {reviewLessons.length > 0 && (
          <section className="cr-suggest glass">
            <p className="mono lp-tag">Suggested review — your misses cluster here</p>
            {reviewLessons.map(l => (
              <Link key={l.slug} className="pw-related" href={`/lesson/${l.slug}`}>
                {l.title} · {topicName(l.topicId)} · ~{l.estMinutes} min
              </Link>
            ))}
          </section>
        )}

        <div className="cr-actions">
          <Link className="btn btn-ghost" href="/contests">All contests</Link>
          <Link className="btn btn-ghost" href="/dashboard">Dashboard</Link>
          <button className="btn btn-solid" onClick={() => location.reload()}>Retake (new problems)</button>
        </div>
      </div>
    );
  }

  // ── running ───────────────────────────────────────────────────
  const p = problems[idx];
  return (
    <div className="cr-run">
      <header className="cr-topbar">
        <span className="mono">{track.name} · #{idx + 1} / {problems.length}</span>
        <span className={`cr-timer mono${remaining < 120 ? " low" : ""}`}>{fmt(remaining)}</span>
        <button className="btn btn-small btn-ghost" onClick={finish}>Submit exam</button>
      </header>

      <div className="cr-body">
        <div className="cr-problem glass">
          <div className="pw-meta mono">
            <span>{topicName(p.topicId)}</span>
            <span title={`Difficulty ${p.difficulty}/10`}>
              {"●".repeat(Math.ceil(p.difficulty / 2))}{"○".repeat(5 - Math.ceil(p.difficulty / 2))}
            </span>
          </div>
          <div className="pw-statement"><MathText text={p.statement} /></div>

          {p.answerType === "mcq" ? (
            <div className="lp-choices">
              {p.choices!.map((c, i) => (
                <button
                  key={i}
                  className={`lp-choice${answers[idx] === i ? " picked" : ""}`}
                  onClick={() => setAnswer(idx, answers[idx] === i ? null : i)}
                >
                  <span className="mono lp-choice-letter">{String.fromCharCode(65 + i)}</span>
                  <MathText text={c} />
                </button>
              ))}
            </div>
          ) : (
            <input
              className="lp-numeric"
              inputMode="numeric"
              placeholder="Integer answer (blank to skip)"
              value={numeric}
              onChange={e => setNumeric(e.target.value.replace(/[^0-9-]/g, ""))}
            />
          )}

          <div className="cr-nav">
            <button className="btn btn-ghost btn-small" onClick={() => goto(Math.max(0, idx - 1))} disabled={idx === 0}>← Prev</button>
            <button
              className={`btn btn-small ${flags.has(idx) ? "btn-solid" : "btn-ghost"}`}
              onClick={() => setFlags(f => {
                const n = new Set(f);
                if (n.has(idx)) n.delete(idx); else n.add(idx);
                return n;
              })}
            >
              ⚑ {flags.has(idx) ? "Flagged" : "Flag"}
            </button>
            <button className="btn btn-ghost btn-small" onClick={() => goto(Math.min(problems.length - 1, idx + 1))} disabled={idx === problems.length - 1}>Next →</button>
          </div>
        </div>

        <aside className="cr-sheet glass">
          <p className="mono lp-tag">Answer sheet</p>
          <div className="cr-grid">
            {problems.map((prob, i) => {
              const answered = i === idx
                ? (prob.answerType === "integer" ? numeric.trim() !== "" : answers[i] !== null)
                : answers[i] !== null;
              return (
                <button
                  key={i}
                  className={`cr-cell${i === idx ? " current" : ""}${answered ? " answered" : ""}${flags.has(i) ? " flagged" : ""}`}
                  onClick={() => goto(i)}
                  title={`Problem ${i + 1}${flags.has(i) ? " (flagged)" : ""}`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
          <p className="mono cr-sheet-note">■ answered · ⚑ flagged</p>
        </aside>
      </div>
    </div>
  );
}
