"use client";

// The problem workspace: attempt → escalating hints → solution →
// coach. First submission records the attempt into the engine.

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Problem } from "@/lib/types";
import { MathText } from "./MathText";
import { CoachPanel } from "./CoachPanel";
import { recordAttempt, useProgress } from "@/lib/store";
import { problemById } from "@/content/problems";
import { topicName } from "@/content/topics";
import { lessonsForTopic } from "@/lib/engine/recommend";

export function ProblemWorkspace({ problem }: { problem: Problem }) {
  const progress = useProgress();
  const [choice, setChoice] = useState<number | null>(null);
  const [numeric, setNumeric] = useState("");
  const [hintsShown, setHintsShown] = useState(0);
  const [state, setState] = useState<"open" | "correct" | "wrong" | "revealed">("open");
  const [recorded, setRecorded] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const startRef = useRef(Date.now());

  useEffect(() => {
    startRef.current = Date.now();
    setSeconds(0);
    setChoice(null);
    setNumeric("");
    setHintsShown(0);
    setState("open");
    setRecorded(false);
    const t = setInterval(() => setSeconds(Math.floor((Date.now() - startRef.current) / 1000)), 1000);
    return () => clearInterval(t);
  }, [problem.id]);

  const solvedBefore = progress.attempts.some(a => a.problemId === problem.id && a.correct);
  const finished = state === "correct" || state === "revealed";

  const record = (correct: boolean) => {
    if (recorded) return;
    setRecorded(true);
    recordAttempt(problem, {
      correct,
      seconds: Math.floor((Date.now() - startRef.current) / 1000),
      hintsUsed: hintsShown,
      context: "practice",
    });
  };

  const submit = () => {
    const given = problem.answerType === "mcq" ? choice : Number(numeric);
    if (given === null || (problem.answerType === "integer" && numeric.trim() === "")) return;
    const correct = given === problem.answer;
    record(correct);
    setState(correct ? "correct" : "wrong");
  };

  const giveUp = () => {
    record(false);
    setState("revealed");
  };

  const related = (problem.related ?? [])
    .map(id => problemById.get(id))
    .filter(Boolean) as Problem[];
  const reviewLessons = lessonsForTopic(problem.topicId).filter(l => l.status === "full");

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="pw">
      <div className="pw-main">
        <header className="pw-head">
          <div className="pw-meta mono">
            <span>{topicName(problem.topicId)} · {problem.subtopic}</span>
            <span>{problem.source}</span>
            <span title={`Difficulty ${problem.difficulty}/10`}>
              {"●".repeat(Math.ceil(problem.difficulty / 2))}{"○".repeat(5 - Math.ceil(problem.difficulty / 2))} {problem.difficulty}/10
            </span>
            <span>~{problem.estMinutes} min</span>
            <span className={seconds > problem.estMinutes * 90 ? "pw-time over" : "pw-time"}>⏱ {fmt(seconds)}</span>
          </div>
          <div className="pw-statement">
            <MathText text={problem.statement} />
          </div>
          <div className="pw-tags">
            {solvedBefore && <span className="chip solved mono">solved before</span>}
            {problem.tags.map(t => <span key={t} className="chip mono">{t}</span>)}
          </div>
        </header>

        {/* answer area */}
        {problem.answerType === "mcq" ? (
          <div className="lp-choices pw-choices">
            {problem.choices!.map((c, i) => (
              <button
                key={i}
                className={`lp-choice${choice === i ? " picked" : ""}${finished && i === problem.answer ? " right" : ""}`}
                onClick={() => !finished && setChoice(i)}
                disabled={finished}
              >
                <span className="mono lp-choice-letter">{String.fromCharCode(65 + i)}</span>
                <MathText text={c} />
              </button>
            ))}
          </div>
        ) : (
          <input
            className="lp-numeric pw-numeric"
            inputMode="numeric"
            placeholder="Integer answer"
            value={numeric}
            disabled={finished}
            onChange={e => setNumeric(e.target.value.replace(/[^0-9-]/g, ""))}
            onKeyDown={e => e.key === "Enter" && !finished && submit()}
          />
        )}

        <div className="pw-actions">
          {!finished && (
            <>
              <button className="btn btn-solid" onClick={submit}>Submit</button>
              <button
                className="btn btn-ghost"
                onClick={() => setHintsShown(h => Math.min(3, h + 1))}
                disabled={hintsShown >= 3}
              >
                Hint {Math.min(hintsShown + 1, 3)} of 3
              </button>
              <button className="btn btn-ghost pw-giveup" onClick={giveUp}>Show solution</button>
            </>
          )}
          {state === "wrong" && <p className="lp-feedback wrong">Not it — the hint ladder is there for a reason.</p>}
          {state === "correct" && <p className="lp-feedback right">Correct ∎ &nbsp;Mastery updated.</p>}
        </div>

        {/* hints */}
        {hintsShown > 0 && (
          <div className="pw-hints">
            {problem.hints.slice(0, hintsShown).map((h, i) => (
              <div key={i} className="pw-hint">
                <span className="mono">Hint {i + 1}</span>
                <MathText text={h} />
              </div>
            ))}
          </div>
        )}

        {/* solution */}
        {finished && (
          <div className="pw-solution">
            <p className="mono lp-tag">Solution</p>
            <p><MathText text={problem.solution} /></p>
            {problem.altSolutions?.map((s, i) => (
              <div key={i} className="pw-alt">
                <p className="mono lp-tag">Alternate approach {i + 1}</p>
                <p><MathText text={s} /></p>
              </div>
            ))}
            {problem.commonMistakes && problem.commonMistakes.length > 0 && (
              <div className="pw-mistakes">
                <p className="mono lp-tag">Common mistakes</p>
                <ul>
                  {problem.commonMistakes.map((m, i) => <li key={i}><MathText text={m} /></li>)}
                </ul>
              </div>
            )}
            <div className="pw-after">
              {related.length > 0 && (
                <div>
                  <p className="mono lp-tag">Related problems</p>
                  {related.map(r => (
                    <Link key={r.id} className="pw-related" href={`/problems/${r.id}`}>
                      <MathText text={r.statement.length > 90 ? r.statement.slice(0, 90) + "…" : r.statement} />
                    </Link>
                  ))}
                </div>
              )}
              {state === "revealed" && reviewLessons.length > 0 && (
                <div>
                  <p className="mono lp-tag">Shore up the foundation</p>
                  {reviewLessons.map(l => (
                    <Link key={l.slug} className="pw-related" href={`/lesson/${l.slug}`}>
                      {l.title} · ~{l.estMinutes} min
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <aside className="pw-side">
        <CoachPanel problem={problem} hintsShown={hintsShown} finished={finished} />
      </aside>
    </div>
  );
}
