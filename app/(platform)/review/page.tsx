"use client";

import { useState } from "react";
import Link from "next/link";
import { dueItems, INTERVALS_DAYS } from "@/lib/engine/srs";
import { resolveReview, useProgress } from "@/lib/store";
import { problemById } from "@/content/problems";
import { MathText } from "@/components/MathText";
import { topicName } from "@/content/topics";

export default function ReviewPage() {
  const p = useProgress();
  const due = dueItems(p.reviews);
  const [flipped, setFlipped] = useState<Set<string>>(new Set());

  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">Spaced Review</p>
        <h1>{due.length === 0 ? "Queue clear." : `${due.length} item${due.length === 1 ? "" : "s"} due.`}</h1>
        <p className="page-sub">
          Misses and flashcards return on the {INTERVALS_DAYS.join(" · ")}-day ladder.
          A lapse resets the rung; topping out retires the item.
        </p>
      </header>

      {due.length === 0 && (
        <div className="glass review-empty">
          <p>Nothing is due. The queue fills as you miss problems and complete lessons —
            forgetting is scheduled, so remembering can be too.</p>
          <div className="review-empty-actions">
            <Link className="btn btn-solid" href="/problems">Practice problems</Link>
            <Link className="btn btn-ghost" href="/learn">Continue a lesson</Link>
          </div>
          {p.reviews.length > 0 && (
            <p className="mono review-upcoming">
              Next due: {new Date(Math.min(...p.reviews.map(r => r.due))).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
            </p>
          )}
        </div>
      )}

      <div className="review-list">
        {due.map(item => {
          if (item.kind === "card") {
            const isFlipped = flipped.has(item.id);
            return (
              <div key={item.id} className="glass review-item">
                <p className="mono lp-tag">Flashcard · rung {item.intervalIdx + 1}/{INTERVALS_DAYS.length}</p>
                <button
                  className={`lp-card review-card${isFlipped ? " flipped" : ""}`}
                  onClick={() => setFlipped(f => {
                    const n = new Set(f);
                    if (n.has(item.id)) n.delete(item.id); else n.add(item.id);
                    return n;
                  })}
                >
                  <span className="mono lp-card-side">{isFlipped ? "A" : "Q"}</span>
                  <MathText text={isFlipped ? (item.back ?? "") : (item.front ?? "")} />
                </button>
                {isFlipped && (
                  <div className="review-actions">
                    <button className="btn btn-ghost btn-small" onClick={() => resolveReview(item.id, false)}>Again</button>
                    <button className="btn btn-solid btn-small" onClick={() => resolveReview(item.id, true)}>Got it</button>
                  </div>
                )}
              </div>
            );
          }
          const prob = problemById.get(item.refId);
          if (!prob) return null;
          return (
            <div key={item.id} className="glass review-item">
              <p className="mono lp-tag">
                Missed problem · {topicName(prob.topicId)} · lapses {item.lapses}
              </p>
              <p className="review-stmt"><MathText text={prob.statement} /></p>
              <div className="review-actions">
                <Link className="btn btn-solid btn-small" href={`/problems/${prob.id}`}>Re-attempt</Link>
                <button className="btn btn-ghost btn-small" onClick={() => resolveReview(item.id, true)}>
                  Solved it elsewhere
                </button>
                <button className="btn btn-ghost btn-small" onClick={() => resolveReview(item.id, false)}>
                  Still shaky
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
