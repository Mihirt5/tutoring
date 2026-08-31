"use client";

// The AI math coach. Live Socratic chat via /api/coach when an
// AI Gateway key is configured; otherwise it presents the authored
// hint ladder with a connect notice — the panel never breaks.

import { useEffect, useMemo, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import type { Problem } from "@/lib/types";
import { MathText } from "./MathText";
import { getProgress } from "@/lib/store";

const OPENERS = [
  "What have you tried so far?",
  "What's the first structure you notice?",
  "Where exactly does it stop making sense?",
];

export function CoachPanel({
  problem, hintsShown = 0, finished = false, standalone = false,
}: {
  problem?: Problem;
  hintsShown?: number;
  finished?: boolean;
  standalone?: boolean;
}) {
  const [enabled, setEnabled] = useState<boolean | null>(null);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/coach")
      .then(r => r.json())
      .then(d => setEnabled(Boolean(d.enabled)))
      .catch(() => setEnabled(false));
  }, []);

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/coach",
        body: {
          problemId: problem?.id,
          topicRating: problem
            ? Math.round(getProgress().mastery[problem.topicId]?.rating ?? 30)
            : undefined,
          hintsUsed: hintsShown,
        },
      }),
    [problem?.id, problem, hintsShown],
  );

  const { messages, sendMessage, status } = useChat({ transport });

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  const busy = status === "submitted" || status === "streaming";

  const send = (text: string) => {
    if (!text.trim() || busy) return;
    sendMessage({ text });
    setInput("");
  };

  return (
    <div className={`coach${standalone ? " standalone" : ""}`}>
      <div className="coach-head">
        <span className="coach-mark mono" aria-hidden="true">λ</span>
        <div>
          <p className="coach-title">Lucid Coach</p>
          <p className="coach-sub mono">
            {enabled === null ? "connecting…" : enabled ? "Socratic mode — answers are earned" : "offline · authored hints active"}
          </p>
        </div>
        <span className={`coach-dot${enabled ? " live" : ""}`} aria-hidden="true" />
      </div>

      {enabled === false && (
        <div className="coach-fallback">
          <p>
            The live coach activates when an <code className="mono">AI_GATEWAY_API_KEY</code> is
            configured. Until then, every problem carries a three-step authored hint
            ladder{problem ? " — use the Hint button in the workspace" : ""}.
          </p>
          {problem && hintsShown === 0 && !finished && (
            <p className="mono coach-nudge">Start with Hint 1. Struggle first; hints second.</p>
          )}
        </div>
      )}

      {enabled && (
        <>
          <div className="coach-scroll" ref={scrollRef}>
            {messages.length === 0 && (
              <div className="coach-empty">
                <p className="mono">The coach asks before it answers.</p>
                <div className="coach-openers">
                  {OPENERS.map(o => (
                    <button key={o} className="coach-opener" onClick={() => send(o)}>
                      {o}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map(m => (
              <div key={m.id} className={`coach-msg ${m.role}`}>
                {m.parts.map((part, i) =>
                  part.type === "text" ? <MathText key={i} text={part.text} /> : null,
                )}
              </div>
            ))}
            {busy && <div className="coach-msg assistant thinking mono">⋯</div>}
          </div>
          <div className="coach-inputrow">
            <input
              className="coach-input"
              placeholder={problem ? "Tell the coach where you're stuck…" : "Ask about any concept or strategy…"}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send(input)}
              disabled={busy}
            />
            <button className="btn btn-solid btn-small" onClick={() => send(input)} disabled={busy}>
              Send
            </button>
          </div>
        </>
      )}
    </div>
  );
}
