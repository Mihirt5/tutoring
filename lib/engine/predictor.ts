import type { Track, TopicMastery, TopicId } from "@/lib/types";
import { DEFAULT_RATING, expectedSolve } from "./mastery";

// Score prediction: a track's topic-weight vector collapses the
// mastery map to an effective rating, which runs down the official
// difficulty curve to an expected score.

export function effectiveRating(
  track: Track,
  mastery: Record<TopicId, TopicMastery>,
): number {
  let sum = 0;
  let wsum = 0;
  for (const [topic, w] of Object.entries(track.topicWeights)) {
    const m = mastery[topic];
    // Unstudied topics count below default — absence of evidence is evidence of gaps.
    sum += (m ? m.rating : DEFAULT_RATING * 0.75) * w!;
    wsum += w!;
  }
  return wsum > 0 ? sum / wsum : DEFAULT_RATING;
}

/** Expected official-scale score for a track given current mastery. */
export function predictScore(track: Track, mastery: Record<TopicId, TopicMastery>): number {
  const r = effectiveRating(track, mastery);
  let score = 0;
  for (const d of track.officialCurve) {
    const p = expectedSolve(r, d);
    if (track.id === "amc10" || track.id === "amc12") {
      // Optimal strategy: attempt when EV beats the 1.5-point blank.
      score += Math.max(6 * p, 1.5);
    } else if (track.id === "usajmo" || track.id === "imo") {
      score += 7 * p * 0.85; // partial-credit haircut
    } else {
      score += p; // 1 point per problem (AMC 8, AIME, MathCounts)
    }
  }
  return Math.round(score * 10) / 10;
}

/** P(qualify) via logistic distance from the cutoff. */
export function qualificationProbability(track: Track, mastery: Record<TopicId, TopicMastery>): number | null {
  if (!track.cutoff) return null;
  const pred = predictScore(track, mastery);
  const spread = track.officialMax * 0.06; // score volatility
  const p = 1 / (1 + Math.exp(-(pred - track.cutoff.score) / spread));
  return Math.round(p * 100) / 100;
}

/** Readiness ∈ [0,1]: weighted topic coverage against a target rating. */
export function readiness(track: Track, mastery: Record<TopicId, TopicMastery>): number {
  const target = 55 + (track.difficultyCurve.at(-1) ?? 5) * 3;
  let sum = 0;
  let wsum = 0;
  for (const [topic, w] of Object.entries(track.topicWeights)) {
    const r = mastery[topic]?.rating ?? DEFAULT_RATING * 0.75;
    sum += Math.min(1, r / target) * w!;
    wsum += w!;
  }
  return wsum > 0 ? Math.round((sum / wsum) * 100) / 100 : 0;
}
