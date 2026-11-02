"use client";

// Pattern-recognition drill: see an AoPS-style problem, name the
// strategy that unlocks it. Normal mode is a fixed, untimed set;
// timed mode races a countdown for speed under pressure.

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { nextRound, type PatternRound } from "@/lib/pattern";
import { recordQuiz } from "@/lib/store";
import { topicName } from "@/content/topics";
import { lessonsForTopic } from "@/lib/engine/recommend";
import { MathText } from "./MathText";

type Phase = "brief" | "running" | "done";
type Mode = "normal" | "timed";

const ROUND_COUNT = 12;
const DURATIONS = [30, 60, 90];

export function PatternGame() {
  const [phase, setPhase] = useState<Phase>("brief");
  const [mode, setMode] = useState<Mode>("normal");
  const [duration, setDuration] = useState(60);

  const [round, setRound] = useState<PatternRound | null>(null);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [attempted, setAttempted] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [missed, setMissed] = useState<Set<string>>(new Set());
  const [remaining, setRemaining] = useState(duration);

  const usedRef = useRef<Set<string>>(new Set());
  const roundNoRef = useRef(0);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
  }, []);

  useEffect(() => {
    if (phase !== "running" || mode !== "timed") return;
    const t = setInterval(() => setRemaining((r) => Math.max(0, r - 1)), 1000);
    return () => clearInterval(t);
  }, [phase, mode]);

  useEffect(() => {
    if (phase === "running" && mode === "timed" && remaining === 0) finish();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remaining]);

  function genRound(): PatternRound {
    const r = nextRound(usedRef.current);
    usedRef.current.add(r.problem.id);
    return r;
  }

  function start(m: Mode) {
    usedRef.current = new Set();
    roundNoRef.current = 0;
    setMode(m);
    setScore(0);
    setAttempted(0);
    setStreak(0);
    setBestStreak(0);
    setMissed(new Set());
    setRemaining(duration);
    setPicked(null);
    setRound(genRound());
    setPhase("running");
  }

  function choose(i: number) {
    if (picked !== null || !round) return;
    setPicked(i);
    const correct = i === round.correctIndex;
    setAttempted((a) => a + 1);
    if (correct) {
      setScore((s) => s + 1);
      setStreak((s) => {
        const n = s + 1;
        setBestStreak((b) => Math.max(b, n));
        return n;
      });
    } else {
      setStreak(0);
      setMissed((m) => new Set(m).add(round.problem.topicId));
    }
    recordQuiz(round.problem.topicId, round.problem.difficulty, correct);

    if (mode === "timed") {
      advanceTimer.current = setTimeout(advance, correct ? 450 : 850);
    }
  }

  function advance() {
    roundNoRef.current += 1;
    if (mode === "normal" && roundNoRef.current >= ROUND_COUNT) {
      finish();
      return;
    }
    setPicked(null);
    setRound(genRound());
  }

  function finish() {
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    setPhase("done");
  }

  // ── brief ─────────────────────────────────────────────────────
  if (phase === "brief") {
    return (
      <div className="cr-brief glass">
        <p className="eyebrow">Pattern Recognition</p>
        <h1>Which strategy unlocks this problem?</h1>
        <p className="cr-desc">
          You&apos;ll see a problem. Pick the topic that names how it actually
          gets solved — not just one that shares a word with it.
        </p>
        <div className="pm-modes">
          <div className="pm-mode-card">
            <h2>Normal</h2>
            <p>{ROUND_COUNT} rounds, no clock. Read, think, choose.</p>
            <button className="btn btn-solid" onClick={() => start("normal")}>
              Start
            </button>
          </div>
          <div className="pm-mode-card">
            <h2>Timed challenge</h2>
            <p>Race the clock — answer as many as you can.</p>
            <div className="pm-durations" role="group" aria-label="Duration">
              {DURATIONS.map((d) => (
                <button
                  key={d}
                  className={`chip clickable mono${duration === d ? " active" : ""}`}
                  onClick={() => setDuration(d)}
                >
                  {d}s
                </button>
              ))}
            </div>
            <button className="btn btn-solid" onClick={() => start("timed")}>
              Start
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── done ──────────────────────────────────────────────────────
  if (phase === "done") {
    const accuracy = attempted > 0 ? Math.round((score / attempted) * 100) : 0;
    const missedTopics = [...missed];
    const reviewLessons = [
      ...new Set(missedTopics.flatMap((t) => lessonsForTopic(t))),
    ]
      .filter((l) => l.status === "full")
      .slice(0, 4);

    return (
      <div className="cr-results">
        <header className="cr-score glass">
          <p className="eyebrow">Pattern Recognition · Result</p>
          <p className="cr-score-big">
            {score}
            <span className="cr-score-max"> / {attempted}</span>
          </p>
          <div className="cr-breakdown mono">
            <span>{accuracy}% accuracy</span>
            <span>Best streak {bestStreak}</span>
          </div>
        </header>

        {missedTopics.length > 0 && (
          <section className="cr-suggest glass">
            <p className="mono lp-tag">Topics that tripped you up</p>
            <p className="pm-missed">
              {missedTopics.map((t) => topicName(t)).join(" · ")}
            </p>
          </section>
        )}

        {reviewLessons.length > 0 && (
          <section className="cr-suggest glass">
            <p className="mono lp-tag">Suggested review</p>
            {reviewLessons.map((l) => (
              <Link key={l.slug} className="pw-related" href={`/lesson/${l.slug}`}>
                {l.title} · {topicName(l.topicId)} · ~{l.estMinutes} min
              </Link>
            ))}
          </section>
        )}

        <div className="cr-actions">
          <button className="btn btn-solid" onClick={() => setPhase("brief")}>
            Play again
          </button>
          <Link className="btn btn-ghost" href="/dashboard">
            Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // ── running ───────────────────────────────────────────────────
  if (!round) return null;
  const p = round.problem;
  const done = picked !== null;
  const isLast = mode === "normal" && roundNoRef.current + 1 >= ROUND_COUNT;

  return (
    <div className="pm-run">
      <header className="cr-topbar">
        <span className="mono">
          {mode === "normal"
            ? `Round ${roundNoRef.current + 1} / ${ROUND_COUNT}`
            : "Timed challenge"}
        </span>
        <div className="pm-topbar-right">
          {mode === "timed" && (
            <span className={`cr-timer mono${remaining <= 10 ? " low" : ""}`}>
              {remaining}s
            </span>
          )}
          <span className="mono">
            Score {score}
            {attempted > 0 && ` · ${Math.round((score / attempted) * 100)}%`}
          </span>
          <button className="btn btn-small btn-ghost" onClick={finish}>
            End
          </button>
        </div>
      </header>

      <div className="cr-problem pm-problem glass">
        <div className="pw-meta mono">
          <span title={`Difficulty ${p.difficulty}/10`}>
            {"●".repeat(Math.ceil(p.difficulty / 2))}
            {"○".repeat(5 - Math.ceil(p.difficulty / 2))}
          </span>
          {streak > 1 && <span className="pm-streak">streak {streak}</span>}
        </div>
        <div className="pw-statement">
          <MathText text={p.statement} />
        </div>

        <div className="lp-choices">
          {round.options.map((t, i) => (
            <button
              key={t.id}
              className={`lp-choice${picked === i ? " picked" : ""}${
                done && i === round.correctIndex ? " right" : ""
              }`}
              onClick={() => choose(i)}
              disabled={done}
            >
              <span className="mono lp-choice-letter">
                {String.fromCharCode(65 + i)}
              </span>
              {t.name}
            </button>
          ))}
        </div>

        {done && (
          <div className="pm-feedback">
            <p className={`lp-feedback ${picked === round.correctIndex ? "right" : "wrong"}`}>
              {picked === round.correctIndex
                ? `Correct — ${round.options[round.correctIndex].name}.`
                : `Not quite — the move here is ${round.options[round.correctIndex].name}.`}{" "}
              {p.subtopic}.
            </p>
            {mode === "normal" && (
              <button className="btn btn-solid btn-small" onClick={advance}>
                {isLast ? "See results" : "Next →"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
