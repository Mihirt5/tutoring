import type { LessonMeta, Progress, TopicId, Track } from "@/lib/types";
import { allLessons } from "@/content/curriculum";
import { DEFAULT_RATING } from "./mastery";

// Recommendation: the next lesson is the highest-leverage unfinished
// lesson whose prerequisites are met — leverage measured by the
// student's track weights and current weakness.

export function prereqsMet(meta: LessonMeta, p: Progress): boolean {
  return meta.prereqs.every(slug => p.lessons[slug]?.completed);
}

export function recommendLessons(p: Progress, track: Track, count = 4): LessonMeta[] {
  const candidates = allLessons.filter(
    l => !p.lessons[l.slug]?.completed && prereqsMet(l, p),
  );
  const scored = candidates.map(l => {
    const w = track.topicWeights[l.topicId] ?? 0.01;
    const rating = p.mastery[l.topicId]?.rating ?? DEFAULT_RATING * 0.75;
    const weakness = 1 - rating / 100;
    const authored = l.status === "full" ? 1.35 : 1;
    return { l, score: w * weakness * authored * (1 / (1 + Math.abs(l.difficulty * 10 - rating) / 30)) };
  });
  return scored.sort((a, b) => b.score - a.score).slice(0, count).map(s => s.l);
}

export function weakTopics(p: Progress, track: Track, count = 5): { topicId: TopicId; rating: number }[] {
  const entries = Object.keys(track.topicWeights).map(topicId => ({
    topicId,
    rating: p.mastery[topicId]?.rating ?? DEFAULT_RATING * 0.75,
  }));
  return entries.sort((a, b) => a.rating - b.rating).slice(0, count);
}

export function lessonsForTopic(topicId: TopicId): LessonMeta[] {
  return allLessons.filter(l => l.topicId === topicId);
}
