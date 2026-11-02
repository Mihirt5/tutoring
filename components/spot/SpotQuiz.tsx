"use client";

// Spot the Concept: see a contest problem, name the concept that unlocks
// it. The student never solves it here unless they choose to ("Now solve
// it"); the skill being trained is recognition.

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MathText } from "@/components/MathText";
import {
  CONCEPTS,
  SPOT_PROBLEMS,
  areaOf,
  conceptById,
  spotProblemById,
} from "@/lib/spot/bank";
import {
  TIMED_SECONDS,
  aopsLink,
  buildQuiz,
  checkSolve,
  confusions,
  grade,
  isDue,
  quizPool,
  tallyBy,
  type QuizConfig,
  type QuizItem,
  type SpotAttempt,
  type SpotMode,
  type Verdict,
} from "@/lib/spot/engine";
import {
  AREAS,
  AREA_NAMES,
  LEVEL_NAMES,
  PROBLEM_LEVELS,
  type Area,
  type ProblemLevel,
} from "@/lib/spot/schema";
import {
  recordSpotAttempt,
  updateSpotAttempt,
  useProgress,
  XP_SPOT,
} from "@/lib/store";

type Phase = "setup" | "play" | "done";

const MODES: { id: SpotMode; name: string; blurb: string }[] = [
  {
    id: "mixed",
    name: "Mixed",
    blurb: "Like a real test: the area isn't given away.",
  },
  {
    id: "area",
    name: "By area",
    blurb: "Stay inside one area of the syllabus.",
  },
  {
    id: "level",
    name: "By level",
    blurb: "AMC 10, AMC 12, or AIME problems only.",
  },
  {
    id: "confusion",
    name: "Confusion drill",
    blurb: "Only problems that pit the concepts you mix up against each other.",
  },
  {
    id: "timed",
    name: "Timed",
    blurb: `${TIMED_SECONDS} seconds a question. Recognition should be fast.`,
  },
];

const conceptName = (id: string) => conceptById.get(id)?.name ?? id;

export function SpotQuiz() {
  const p = useProgress();
  const [phase, setPhase] = useState<Phase>("setup");
  const [cfg, setCfg] = useState<QuizConfig>({
    mode: "mixed",
    area: "algebra",
    level: "10",
  });
  const [items, setItems] = useState<QuizItem[]>([]);
  const [runIds, setRunIds] = useState<string[]>([]);
  const [run, setRun] = useState(0);

  const start = () => {
    setItems(buildQuiz(cfg, SPOT_PROBLEMS, conceptById, p.spot, Date.now()));
    setRunIds([]);
    setRun((n) => n + 1);
    setPhase("play");
  };

  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">
          Spot the Concept · <Link href="/spot/concepts">Concept cards</Link>
        </p>
        <h1>Which concept is this problem really testing?</h1>
        <p className="page-sub">
          Don&apos;t solve it. Read the problem and name the tool that unlocks
          it. Strong contest solvers recognize the key idea before they start
          computing.
        </p>
      </header>

      {phase === "setup" && <Setup cfg={cfg} setCfg={setCfg} onStart={start} />}
      {phase === "play" && (
        <Round
          key={run}
          items={items}
          mode={cfg.mode}
          onAnswered={(id) => setRunIds((ids) => [...ids, id])}
          onFinish={() => setPhase("done")}
        />
      )}
      {phase === "done" && (
        <Results
          runIds={runIds}
          onAgain={start}
          onSetup={() => setPhase("setup")}
        />
      )}
    </div>
  );
}

// ── setup ───────────────────────────────────────────────────────

function Setup({
  cfg,
  setCfg,
  onStart,
}: {
  cfg: QuizConfig;
  setCfg: (c: QuizConfig) => void;
  onStart: () => void;
}) {
  const p = useProgress();
  const pool = quizPool(cfg, SPOT_PROBLEMS, conceptById, p.spot);
  const top = confusions(p.spot.attempts).slice(0, 5);
  const now = Date.now();
  const due = CONCEPTS.filter(
    (c) => p.spot.boxes[c.id] && isDue(p.spot.boxes[c.id], now),
  ).length;

  return (
    <section className="glass spot-panel">
      <p className="mono lp-tag">Mode</p>
      <div className="spot-chips" role="radiogroup" aria-label="Mode">
        {MODES.map((m) => (
          <button
            key={m.id}
            role="radio"
            aria-checked={cfg.mode === m.id}
            className={`chip clickable${cfg.mode === m.id ? " active" : ""}`}
            onClick={() => setCfg({ ...cfg, mode: m.id })}
          >
            {m.name}
          </button>
        ))}
      </div>
      <p className="spot-blurb">
        {MODES.find((m) => m.id === cfg.mode)!.blurb}
      </p>

      {cfg.mode === "area" && (
        <div className="spot-chips" role="radiogroup" aria-label="Area">
          {AREAS.map((a) => (
            <button
              key={a}
              role="radio"
              aria-checked={cfg.area === a}
              className={`chip clickable${cfg.area === a ? " active" : ""}`}
              onClick={() => setCfg({ ...cfg, area: a as Area })}
            >
              {AREA_NAMES[a]}
            </button>
          ))}
        </div>
      )}
      {cfg.mode === "level" && (
        <div className="spot-chips" role="radiogroup" aria-label="Level">
          {PROBLEM_LEVELS.map((l) => (
            <button
              key={l}
              role="radio"
              aria-checked={cfg.level === l}
              className={`chip clickable${cfg.level === l ? " active" : ""}`}
              onClick={() => setCfg({ ...cfg, level: l as ProblemLevel })}
            >
              {LEVEL_NAMES[l]}
            </button>
          ))}
        </div>
      )}
      {cfg.mode === "confusion" && (
        <div className="spot-pairs">
          {top.length === 0 ? (
            <p className="spot-muted">
              No confusions yet. Take a mixed quiz first; this mode drills the
              pairs you actually mix up.
            </p>
          ) : (
            <ul>
              {top.map((c) => (
                <li key={`${c.picked}>${c.answer}`}>
                  <strong>{conceptName(c.answer)}</strong> vs{" "}
                  {conceptName(c.picked)}
                  <span className="mono spot-muted"> ×{c.count}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="spot-actions">
        <button
          className="btn btn-solid"
          onClick={onStart}
          disabled={pool.length === 0}
        >
          Start · {Math.min(pool.length, 10)} problem
          {Math.min(pool.length, 10) === 1 ? "" : "s"}
        </button>
        {due > 0 && (
          <span className="mono spot-muted">
            {due} concept{due === 1 ? "" : "s"} due for review; they come first
          </span>
        )}
      </div>
      {cfg.mode === "confusion" && top.length > 0 && pool.length === 0 && (
        <p className="spot-muted">
          The bank has no problems for these pairs yet.
        </p>
      )}
    </section>
  );
}

// ── one round ───────────────────────────────────────────────────

function Round({
  items,
  mode,
  onAnswered,
  onFinish,
}: {
  items: QuizItem[];
  mode: SpotMode;
  onAnswered: (attemptId: string) => void;
  onFinish: () => void;
}) {
  const [idx, setIdx] = useState(0);
  const [attempt, setAttempt] = useState<SpotAttempt | null>(null);
  const [highlight, setHighlight] = useState("");
  const [left, setLeft] = useState(TIMED_SECONDS);
  const startedAt = useRef(0);
  const locked = useRef(false);
  const stmtRef = useRef<HTMLDivElement>(null);
  const item = items[idx];
  const problem = spotProblemById.get(item.problemId)!;
  const timed = mode === "timed";

  const answer = useCallback(
    (picked: string | null) => {
      if (locked.current) return;
      locked.current = true;
      const now = Date.now();
      const a: SpotAttempt = {
        id: `${now}-${problem.id}`,
        problemId: problem.id,
        conceptId: problem.primary_concept,
        picked,
        verdict: grade(problem, picked),
        ms: Math.min(
          now - startedAt.current,
          timed ? TIMED_SECONDS * 1000 : Infinity,
        ),
        mode,
        ...(highlight ? { highlight } : {}),
        ts: now,
      };
      recordSpotAttempt(a);
      onAnswered(a.id);
      setAttempt(a);
    },
    [problem, highlight, mode, timed, onAnswered],
  );
  const answerRef = useRef(answer);
  useEffect(() => {
    answerRef.current = answer;
  });

  const next = useCallback(() => {
    if (idx + 1 >= items.length) return onFinish();
    setIdx(idx + 1);
    setAttempt(null);
    setHighlight("");
  }, [idx, items.length, onFinish]);

  // Start the clock for each question; in timed mode, run out with no pick.
  useEffect(() => {
    startedAt.current = Date.now();
    locked.current = false;
    setLeft(TIMED_SECONDS);
    if (!timed) return;
    const t = setInterval(() => {
      const remaining = TIMED_SECONDS - (Date.now() - startedAt.current) / 1000;
      setLeft(Math.max(0, remaining));
      if (remaining <= 0) {
        clearInterval(t);
        answerRef.current(null);
      }
    }, 100);
    return () => clearInterval(t);
  }, [idx, timed]);

  useEffect(() => {
    if (attempt) return;
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement | null)?.closest("input, textarea")) return;
      const n = Number(e.key);
      if (n >= 1 && n <= item.choices.length) answer(item.choices[n - 1]);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [attempt, item, answer]);

  // The tip-off phrase: whatever the student selects inside the statement.
  const captureHighlight = () => {
    if (attempt) return;
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || !stmtRef.current?.contains(sel.anchorNode))
      return;
    const text = sel.toString().replace(/\s+/g, " ").trim().slice(0, 200);
    if (text) setHighlight(text);
  };

  return (
    <section className="glass spot-panel spot-stage">
      <div className="spot-progress mono">
        <span>
          {idx + 1} / {items.length} · {LEVEL_NAMES[problem.level]}
          {mode !== "mixed" && mode !== "timed"
            ? ` · ${AREA_NAMES[areaOf(problem)]}`
            : ""}
        </span>
        {timed && (
          <span
            className={!attempt && left <= 8 ? "spot-clock low" : "spot-clock"}
          >
            {attempt ? "·" : `${Math.ceil(left)}s`}
          </span>
        )}
      </div>
      {timed && (
        <div className="spot-timer" aria-hidden="true">
          <span
            style={{ width: `${attempt ? 0 : (left / TIMED_SECONDS) * 100}%` }}
          />
        </div>
      )}

      <div
        ref={stmtRef}
        className="spot-stmt"
        onMouseUp={captureHighlight}
        onTouchEnd={captureHighlight}
      >
        <MathText text={problem.problem} />
      </div>

      {!attempt && (
        <p className="spot-muted spot-hint">
          {highlight ? (
            <>
              Tip-off: <span className="spot-quote">“{highlight}”</span>{" "}
              <button className="spot-link" onClick={() => setHighlight("")}>
                clear
              </button>
            </>
          ) : (
            "Optional: highlight the phrase that tipped you off."
          )}
        </p>
      )}

      <p className="mono lp-tag">
        Which concept is this problem really testing?
      </p>
      <div className="spot-choices">
        {item.choices.map((id, i) => {
          const state = !attempt
            ? ""
            : id === problem.primary_concept
              ? " right"
              : id === attempt.picked
                ? attempt.verdict === "also-valid"
                  ? " valid"
                  : " wrong"
                : "";
          return (
            <button
              key={id}
              className={`lp-choice spot-choice${state}`}
              disabled={!!attempt}
              onClick={() => answer(id)}
            >
              <span className="mono lp-choice-letter">{i + 1}</span>
              {conceptName(id)}
            </button>
          );
        })}
      </div>

      {attempt && (
        <Reveal
          key={attempt.id}
          attempt={attempt}
          onNext={next}
          last={idx + 1 >= items.length}
        />
      )}
    </section>
  );
}

const VERDICT_TEXT: Record<Verdict, string> = {
  correct: "Correct.",
  "also-valid": "Valid route, but not the key idea.",
  wrong: "Not quite.",
  timeout: "Time's up.",
};

function Reveal({
  attempt,
  onNext,
  last,
}: {
  attempt: SpotAttempt;
  onNext: () => void;
  last: boolean;
}) {
  const problem = spotProblemById.get(attempt.problemId)!;
  const primary = conceptById.get(problem.primary_concept)!;
  const [showSolution, setShowSolution] = useState(false);
  const [solving, setSolving] = useState(false);
  const [guess, setGuess] = useState("");
  const [solved, setSolved] = useState<boolean | null>(null);
  const ref = attempt.picked;
  const link = problem.inspired_by ? aopsLink(problem.inspired_by) : null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guess.trim()) return;
    const ok = checkSolve(problem.answer, guess);
    setSolved(ok);
    updateSpotAttempt(attempt.id, { solved: ok });
  };

  return (
    <div className="spot-reveal">
      <p className={`spot-verdict ${attempt.verdict}`}>
        {VERDICT_TEXT[attempt.verdict]}{" "}
        {attempt.verdict !== "correct" && (
          <>
            The key idea is <strong>{primary.name}</strong>.
          </>
        )}
        {XP_SPOT[attempt.verdict] > 0 && (
          <span className="mono spot-xp"> +{XP_SPOT[attempt.verdict]} XP</span>
        )}
      </p>

      {attempt.verdict === "also-valid" && ref && (
        <Panel label={`About ${conceptName(ref)}`}>
          <MathText text={problem.also_valid_notes[ref]} />
        </Panel>
      )}
      <Panel label="The trigger">
        <MathText text={problem.trigger_explanation} />
      </Panel>
      {attempt.verdict === "wrong" && ref && problem.why_not[ref] && (
        <Panel label={`Why not ${conceptName(ref)}`}>
          <MathText text={problem.why_not[ref]} />
        </Panel>
      )}
      <Panel label="First move">
        <MathText text={problem.first_move} />
      </Panel>
      {attempt.highlight && (
        <p className="spot-muted">
          You flagged <span className="spot-quote">“{attempt.highlight}”</span>
        </p>
      )}

      <div className="spot-actions">
        <button className="btn btn-solid btn-small" onClick={onNext} autoFocus>
          {last ? "See results" : "Next"}
        </button>
        <button
          className="btn btn-ghost btn-small"
          onClick={() => setSolving((s) => !s)}
        >
          {solving ? "Hide" : "Now solve it"}
        </button>
        <button
          className="btn btn-ghost btn-small"
          onClick={() => setShowSolution((s) => !s)}
        >
          {showSolution ? "Hide solution" : "Show full solution"}
        </button>
        <Link
          className="btn btn-ghost btn-small"
          href={`/spot/concepts/${primary.id}`}
        >
          Concept card
        </Link>
      </div>

      {solving && (
        <form className="spot-solve" onSubmit={submit}>
          <label className="mono lp-tag" htmlFor="spot-guess">
            Your answer
          </label>
          <div className="spot-solve-row">
            <input
              id="spot-guess"
              className="lp-numeric"
              inputMode="decimal"
              placeholder="e.g. 12 or 7/9"
              value={guess}
              onChange={(e) => {
                setGuess(e.target.value);
                setSolved(null);
              }}
            />
            <button className="btn btn-solid btn-small" type="submit">
              Check
            </button>
          </div>
          {solved !== null && (
            <p className={`lp-feedback ${solved ? "right" : "wrong"}`}>
              {solved
                ? "That's it. Recognition turned into a solve."
                : "Not that. Try the first move again."}
            </p>
          )}
        </form>
      )}

      {showSolution && (
        <Panel label={`Answer: ${problem.answer}`}>
          <MathText text={problem.solution_sketch} />
        </Panel>
      )}

      {problem.inspired_by && (
        <p className="spot-muted spot-ref">
          Similar to {problem.inspired_by}
          {link && (
            <>
              {" · "}
              <a href={link} target="_blank" rel="noreferrer">
                look it up on AoPS ↗
              </a>
            </>
          )}
        </p>
      )}
    </div>
  );
}

function Panel({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="spot-detail">
      <p className="mono lp-tag">{label}</p>
      <p>{children}</p>
    </div>
  );
}

// ── results ─────────────────────────────────────────────────────

function Results({
  runIds,
  onAgain,
  onSetup,
}: {
  runIds: string[];
  onAgain: () => void;
  onSetup: () => void;
}) {
  const p = useProgress();
  const ids = new Set(runIds);
  const run = p.spot.attempts.filter((a) => ids.has(a.id));
  const correct = run.filter((a) => a.verdict === "correct").length;
  const valid = run.filter((a) => a.verdict === "also-valid").length;
  const top = confusions(p.spot.attempts).slice(0, 3);
  const byArea = tallyBy(
    p.spot.attempts,
    (a) => conceptById.get(a.conceptId)?.area,
  );

  return (
    <>
      <div className="stat-tiles spot-tiles">
        <div className="glass stat-tile">
          <div className="stat-tile-v">
            {correct}
            <span>/{run.length}</span>
          </div>
          <div className="mono stat-tile-k">Key idea spotted</div>
        </div>
        <div className="glass stat-tile">
          <div className="stat-tile-v">{valid}</div>
          <div className="mono stat-tile-k">Valid other routes</div>
        </div>
        <div className="glass stat-tile">
          <div className="stat-tile-v">
            +{run.reduce((s, a) => s + XP_SPOT[a.verdict], 0)}
          </div>
          <div className="mono stat-tile-k">XP</div>
        </div>
      </div>

      <section className="glass spot-panel">
        <p className="mono lp-tag">Your top confusions (all quizzes)</p>
        {top.length === 0 ? (
          <p className="spot-muted">No confusions recorded yet.</p>
        ) : (
          <ol className="spot-confusions">
            {top.map((c) => (
              <li key={`${c.picked}>${c.answer}`}>
                You chose <strong>{conceptName(c.picked)}</strong> when the
                answer was{" "}
                <Link href={`/spot/concepts/${c.answer}`}>
                  {conceptName(c.answer)}
                </Link>
                <span className="mono spot-muted"> ×{c.count}</span>
              </li>
            ))}
          </ol>
        )}
      </section>

      <section className="glass spot-panel">
        <p className="mono lp-tag">This round</p>
        <ul className="spot-review">
          {run.map((a) => {
            const prob = spotProblemById.get(a.problemId);
            const mark =
              a.verdict === "correct"
                ? "✓"
                : a.verdict === "also-valid"
                  ? "~"
                  : "✗";
            return (
              <li key={a.id} className={a.verdict}>
                <span className="mono spot-mark">{mark}</span>
                <span className="spot-review-main">
                  <Link href={`/spot/concepts/${a.conceptId}`}>
                    {conceptName(a.conceptId)}
                  </Link>
                  <span className="spot-muted">
                    {a.verdict === "timeout"
                      ? "ran out of time"
                      : a.verdict === "correct"
                        ? `${(a.ms / 1000).toFixed(1)}s`
                        : `you picked ${conceptName(a.picked!)}`}
                    {prob ? ` · ${LEVEL_NAMES[prob.level]}` : ""}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="glass spot-panel">
        <p className="mono lp-tag">Accuracy by area (all quizzes)</p>
        <ul className="spot-bars">
          {AREAS.map((area) => {
            const t = byArea[area];
            const pct = t ? t.correct / t.n : 0;
            return (
              <li key={area}>
                <span>{AREA_NAMES[area]}</span>
                <span className="spot-bar" aria-hidden="true">
                  <span style={{ width: `${pct * 100}%` }} />
                </span>
                <span className="mono spot-muted">
                  {t ? `${t.correct}/${t.n}` : "·"}
                </span>
              </li>
            );
          })}
        </ul>
        <div className="spot-actions">
          <button className="btn btn-solid" onClick={onAgain}>
            Another quiz
          </button>
          <button className="btn btn-ghost" onClick={onSetup}>
            Change mode
          </button>
        </div>
      </section>
    </>
  );
}
