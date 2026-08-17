"use client";

// The lesson player: sequential block renderer with progressive
// reveal. Quizzes gate progression; examples reveal step by step;
// completion feeds mastery, XP, and the review queue.

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Block, Lesson, LessonMeta } from "@/lib/types";
import { MathText } from "./MathText";
import { Diagram } from "./diagrams";
import { problemById } from "@/content/problems";
import { completeLesson, markBlockDone, recordQuiz, useProgress } from "@/lib/store";
import { lessonBySlug } from "@/content/curriculum";
import { topicName } from "@/content/topics";

function QuizBlock({
  block, meta, onPassed,
}: {
  block: Extract<Block, { type: "quiz" }>;
  meta: LessonMeta;
  onPassed: () => void;
}) {
  const [choice, setChoice] = useState<number | null>(null);
  const [numeric, setNumeric] = useState("");
  const [state, setState] = useState<"open" | "correct" | "wrong" | "shown">("open");
  const [tries, setTries] = useState(0);
  const [recorded, setRecorded] = useState(false);

  const submit = () => {
    const given = block.kind === "mcq" ? choice : Number(numeric);
    if (given === null || (block.kind === "numeric" && numeric.trim() === "")) return;
    const correct = given === block.answer;
    if (!recorded) {
      recordQuiz(meta.topicId, meta.difficulty, correct);
      setRecorded(true);
    }
    if (correct) {
      setState("correct");
      onPassed();
    } else {
      const t = tries + 1;
      setTries(t);
      if (t >= 2) {
        setState("shown");
        onPassed();
      } else {
        setState("wrong");
      }
    }
  };

  const done = state === "correct" || state === "shown";
  return (
    <div className={`lp-quiz ${state}`}>
      <p className="mono lp-tag">Check yourself</p>
      <p className="lp-quiz-q"><MathText text={block.question} /></p>

      {block.kind === "mcq" ? (
        <div className="lp-choices">
          {block.choices!.map((c, i) => (
            <button
              key={i}
              className={`lp-choice${choice === i ? " picked" : ""}${done && i === block.answer ? " right" : ""}`}
              onClick={() => !done && setChoice(i)}
              disabled={done}
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
          placeholder="Your answer"
          value={numeric}
          disabled={done}
          onChange={e => setNumeric(e.target.value.replace(/[^0-9-]/g, ""))}
          onKeyDown={e => e.key === "Enter" && !done && submit()}
        />
      )}

      {!done && (
        <button className="btn btn-solid btn-small" onClick={submit}>Submit</button>
      )}
      {state === "wrong" && <p className="lp-feedback wrong">Not yet — reconsider and try once more.</p>}
      {state === "correct" && <p className="lp-feedback right">Correct. +10 XP</p>}
      {done && (
        <div className="lp-explain">
          <p className="mono lp-tag">Why</p>
          <MathText text={block.explanation} />
        </div>
      )}
    </div>
  );
}

function ExampleBlock({ block }: { block: Extract<Block, { type: "example" }> }) {
  const [shown, setShown] = useState(1);
  return (
    <div className="lp-example">
      <p className="mono lp-tag">Worked example — {block.title}</p>
      <p className="lp-example-problem"><MathText text={block.problem} /></p>
      <ol className="lp-steps">
        {block.steps.slice(0, shown).map((s, i) => (
          <li key={i} className="lp-step"><MathText text={s} /></li>
        ))}
      </ol>
      {shown < block.steps.length ? (
        <button className="btn btn-ghost btn-small" onClick={() => setShown(s => s + 1)}>
          Reveal step {shown + 1} of {block.steps.length}
        </button>
      ) : (
        block.takeaway && (
          <p className="lp-takeaway"><span className="mono">Takeaway · </span><MathText text={block.takeaway} /></p>
        )
      )}
    </div>
  );
}

function Flashcards({ cards }: { cards: { front: string; back: string }[] }) {
  const [flipped, setFlipped] = useState<Set<number>>(new Set());
  return (
    <div className="lp-cards">
      {cards.map((c, i) => {
        const isFlipped = flipped.has(i);
        return (
          <button
            key={i}
            className={`lp-card${isFlipped ? " flipped" : ""}`}
            onClick={() => {
              const next = new Set(flipped);
              if (isFlipped) next.delete(i); else next.add(i);
              setFlipped(next);
            }}
          >
            <span className="mono lp-card-side">{isFlipped ? "A" : "Q"}</span>
            <MathText text={isFlipped ? c.back : c.front} />
          </button>
        );
      })}
    </div>
  );
}

function renderStatic(block: Block, i: number) {
  switch (block.type) {
    case "intro":
      return <p className="lp-intro"><MathText text={block.body} /></p>;
    case "intuition":
      return (
        <div className="lp-panel">
          <p className="mono lp-tag">Intuition — {block.title}</p>
          <MathText text={block.body} />
        </div>
      );
    case "diagram":
      return (
        <div className="lp-diagram">
          <Diagram kind={block.kind} />
          <p className="lp-caption"><MathText text={block.caption} /></p>
        </div>
      );
    case "insight":
      return (
        <div className="lp-panel insight">
          <p className="mono lp-tag">Key observation</p>
          <MathText text={block.body} />
        </div>
      );
    case "pitfall":
      return (
        <div className="lp-panel pitfall">
          <p className="mono lp-tag">Common mistake</p>
          <MathText text={block.body} />
        </div>
      );
    case "proof":
      return (
        <div className="lp-panel proof">
          <p className="mono lp-tag">Proof — {block.title}</p>
          {block.body.map((par, j) => (
            <p key={j} className="lp-proof-par"><MathText text={par} /></p>
          ))}
          <p className="lp-qed mono">∎</p>
        </div>
      );
    case "practice":
      return (
        <div className="lp-panel practice">
          <p className="mono lp-tag">Practice set</p>
          {block.intro && <p className="lp-practice-intro">{block.intro}</p>}
          <div className="lp-practice-list">
            {block.problemIds.map(id => {
              const p = problemById.get(id);
              if (!p) return null;
              return (
                <Link key={id} href={`/problems/${id}`} className="lp-practice-item">
                  <span className="lp-diff mono" title={`Difficulty ${p.difficulty}/10`}>
                    {"●".repeat(Math.ceil(p.difficulty / 2))}{"○".repeat(5 - Math.ceil(p.difficulty / 2))}
                  </span>
                  <span className="lp-practice-stmt"><MathText text={p.statement} /></span>
                  <span className="mono lp-practice-src">{p.source}</span>
                </Link>
              );
            })}
          </div>
        </div>
      );
    case "summary":
      return (
        <div className="lp-panel summary">
          <p className="mono lp-tag">Summary</p>
          <ul>
            {block.points.map((pt, j) => <li key={j}><MathText text={pt} /></li>)}
          </ul>
          {block.formulas && (
            <div className="lp-formulas">
              {block.formulas.map((f, j) => (
                <span key={j} className="lp-formula"><MathText text={f} /></span>
              ))}
            </div>
          )}
        </div>
      );
    case "flashcards":
      return (
        <div className="lp-panel">
          <p className="mono lp-tag">Flashcards — completing this lesson seeds them into your review queue</p>
          <Flashcards cards={block.cards} />
        </div>
      );
    default:
      return null;
  }
}

export function LessonPlayer({ lesson }: { lesson: Lesson }) {
  const meta = lessonBySlug.get(lesson.slug)!;
  const progress = useProgress();
  const saved = progress.lessons[lesson.slug];
  const [revealed, setRevealed] = useState(() => Math.max(1, Math.min(saved?.blocksDone ?? 1, lesson.blocks.length)));
  const [gatePassed, setGatePassed] = useState<Set<number>>(new Set());
  const completed = saved?.completed ?? false;

  const visible = lesson.blocks.slice(0, revealed);
  const atEnd = revealed >= lesson.blocks.length;
  const currentBlock = lesson.blocks[revealed - 1];
  const gated = currentBlock?.type === "quiz" && !gatePassed.has(revealed - 1);

  const advance = () => {
    const next = Math.min(revealed + 1, lesson.blocks.length);
    setRevealed(next);
    markBlockDone(lesson.slug, next);
  };

  const cards = useMemo(() => {
    const fc = lesson.blocks.find(b => b.type === "flashcards");
    return fc?.type === "flashcards" ? fc.cards : [];
  }, [lesson]);

  return (
    <article className="lesson-player">
      <header className="lp-head">
        <p className="eyebrow">{topicName(meta.topicId)} · Difficulty {meta.difficulty}/10 · ~{meta.estMinutes} min</p>
        <h1>{meta.title}</h1>
        <ul className="lp-objectives">
          {meta.objectives.map(o => <li key={o}>{o}</li>)}
        </ul>
        <div className="lp-progressbar" aria-hidden="true">
          <span style={{ width: `${(revealed / lesson.blocks.length) * 100}%` }} />
        </div>
      </header>

      {visible.map((block, i) => (
        <section className="lp-block" key={i} data-type={block.type}>
          {block.type === "quiz" ? (
            <QuizBlock
              block={block}
              meta={meta}
              onPassed={() => setGatePassed(prev => new Set(prev).add(i))}
            />
          ) : (
            renderStatic(block, i)
          )}
        </section>
      ))}

      <footer className="lp-foot">
        {!atEnd && (
          <button className="btn btn-solid" onClick={advance} disabled={gated}>
            {gated ? "Answer to continue" : "Continue"}
          </button>
        )}
        {atEnd && !completed && (
          <button
            className="btn btn-solid btn-large"
            onClick={() => completeLesson(lesson.slug, cards)}
            disabled={gated}
          >
            Complete lesson · +50 XP
          </button>
        )}
        {atEnd && completed && (
          <div className="lp-done">
            <p className="lp-done-mark mono">Lesson complete ∎</p>
            <Link className="btn btn-ghost" href="/learn">Back to curriculum</Link>
            <Link className="btn btn-solid" href="/review">Review queue</Link>
          </div>
        )}
        <p className="mono lp-count">{revealed} / {lesson.blocks.length} blocks</p>
      </footer>
    </article>
  );
}
