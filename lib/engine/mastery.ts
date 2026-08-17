import type { TopicMastery } from "@/lib/types";

// Elo-style topic mastery. Rating lives on 0–100; problem difficulty
// d ∈ [1,10] maps onto the same scale as d×10.

export const DEFAULT_RATING = 30;

export function freshMastery(): TopicMastery {
  return { rating: DEFAULT_RATING, n: 0, correct: 0, recent: [], avgSeconds: 0, lastSeen: 0 };
}

/** Probability a student at `rating` solves a problem of `difficulty`. */
export function expectedSolve(rating: number, difficulty: number): number {
  return 1 / (1 + Math.pow(10, (difficulty * 10 - rating) / 25));
}

/** Learning rate: aggressive while calibrating, stable once established. */
export function kFactor(n: number): number {
  return Math.max(6, 18 - n * 0.8);
}

/**
 * Attenuated result: hints and heavy overtime reduce the credit a
 * correct answer earns (never below 0.4 — solved is solved).
 */
export function attemptScore(correct: boolean, hintsUsed: number, seconds: number, estMinutes: number): number {
  if (!correct) return 0;
  let s = 1 - 0.2 * Math.min(hintsUsed, 3);
  if (seconds > estMinutes * 60 * 1.5) s -= 0.1;
  return Math.max(0.4, s);
}

export function updateMastery(
  m: TopicMastery,
  difficulty: number,
  score: number, // attenuated result ∈ [0,1]
  seconds: number,
  now = Date.now(),
): TopicMastery {
  const e = expectedSolve(m.rating, difficulty);
  const rating = Math.min(99, Math.max(1, m.rating + kFactor(m.n) * (score - e) * 4));
  const recent = [...m.recent, score >= 0.5 ? 1 : 0].slice(-10);
  return {
    rating,
    n: m.n + 1,
    correct: m.correct + (score >= 0.5 ? 1 : 0),
    recent,
    avgSeconds: m.n === 0 ? seconds : m.avgSeconds * 0.8 + seconds * 0.2,
    lastSeen: now,
  };
}

/** Confidence ∈ [0,1]: grows with evidence, shrinks with inconsistency. */
export function confidence(m: TopicMastery): number {
  if (m.n === 0) return 0;
  const evidence = Math.min(1, m.n / 12);
  const mean = m.recent.reduce((a, b) => a + b, 0) / Math.max(1, m.recent.length);
  const consistency = 1 - 2 * Math.abs(0.5 - mean) * 0 - variance(m.recent);
  return Math.max(0.05, evidence * Math.max(0.3, consistency));
}

function variance(xs: number[]): number {
  if (xs.length === 0) return 0;
  const mean = xs.reduce((a, b) => a + b, 0) / xs.length;
  return xs.reduce((a, b) => a + (b - mean) ** 2, 0) / xs.length;
}
