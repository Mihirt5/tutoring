import type { SrsItem } from "@/lib/types";

// SM-2-lite spaced repetition. Interval ladder in days; a lapse
// resets to the bottom rung.

export const INTERVALS_DAYS = [1, 3, 7, 16, 35];
const DAY = 24 * 60 * 60 * 1000;

export function dueItems(reviews: SrsItem[], now = Date.now()): SrsItem[] {
  return reviews.filter(r => r.due <= now).sort((a, b) => a.due - b.due);
}

/** A missed problem enters (or resets in) the review queue. */
export function enqueueMiss(reviews: SrsItem[], problemId: string, now = Date.now()): SrsItem[] {
  const id = `problem:${problemId}`;
  const rest = reviews.filter(r => r.id !== id);
  const prior = reviews.find(r => r.id === id);
  return [
    ...rest,
    {
      id,
      kind: "problem",
      refId: problemId,
      due: now + DAY,
      intervalIdx: 0,
      lapses: (prior?.lapses ?? 0) + 1,
    },
  ];
}

/** A successful review climbs the ladder; topping out retires the item. */
export function reviewOutcome(reviews: SrsItem[], itemId: string, success: boolean, now = Date.now()): SrsItem[] {
  const item = reviews.find(r => r.id === itemId);
  if (!item) return reviews;
  const rest = reviews.filter(r => r.id !== itemId);
  if (!success) {
    return [...rest, { ...item, intervalIdx: 0, lapses: item.lapses + 1, due: now + DAY }];
  }
  const nextIdx = item.intervalIdx + 1;
  if (nextIdx >= INTERVALS_DAYS.length) return rest; // graduated
  return [...rest, { ...item, intervalIdx: nextIdx, due: now + INTERVALS_DAYS[nextIdx] * DAY }];
}

/** Lesson flashcards seed the queue on completion. */
export function enqueueCards(
  reviews: SrsItem[],
  lessonSlug: string,
  cards: { front: string; back: string }[],
  now = Date.now(),
): SrsItem[] {
  const additions = cards
    .map((c, i) => ({
      id: `card:${lessonSlug}#${i}`,
      kind: "card" as const,
      refId: `${lessonSlug}#${i}`,
      front: c.front,
      back: c.back,
      due: now + DAY,
      intervalIdx: 0,
      lapses: 0,
    }))
    .filter(c => !reviews.some(r => r.id === c.id));
  return [...reviews, ...additions];
}
