"use client";

import { useSyncExternalStore } from "react";
import type {
  Attempt, AttemptContext, ContestRun, Problem, Progress, SrsItem,
} from "@/lib/types";
import { attemptScore, freshMastery, updateMastery } from "./engine/mastery";
import { enqueueCards, enqueueMiss, reviewOutcome } from "./engine/srs";
import {
  XP_CONTEST, XP_LESSON, XP_QUIZ, XP_REVIEW,
  _bindDifficultyLookup, bumpStreak, dayKey, newBadges, xpForProblem,
} from "./engine/xp";
import { problemById } from "@/content/problems";

_bindDifficultyLookup(id => problemById.get(id)?.difficulty ?? 0);

const KEY = "lucid-progress-v1";

export function defaultProgress(): Progress {
  return {
    version: 1,
    createdAt: Date.now(),
    xp: 0,
    streak: { count: 0, lastDay: "" },
    badges: [],
    attempts: [],
    mastery: {},
    lessons: {},
    reviews: [],
    contests: [],
    minutesByDay: {},
    track: "amc10",
  };
}

let cache: Progress | null = null;
const listeners = new Set<() => void>();
const SERVER_SNAPSHOT = defaultProgress();

function load(): Progress {
  if (cache) return cache;
  try {
    const raw = localStorage.getItem(KEY);
    cache = raw ? { ...defaultProgress(), ...(JSON.parse(raw) as Progress) } : defaultProgress();
  } catch {
    cache = defaultProgress();
  }
  return cache;
}

function save(next: Progress) {
  cache = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch { /* storage full or unavailable — keep in-memory */ }
  listeners.forEach(fn => fn());
}

function mutate(fn: (p: Progress) => Progress) {
  const next = fn(load());
  next.badges = [...next.badges, ...newBadges(next)];
  save(next);
}

export function subscribe(fn: () => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function getProgress(): Progress {
  if (typeof window === "undefined") return SERVER_SNAPSHOT;
  return load();
}

export function useProgress(): Progress {
  return useSyncExternalStore(subscribe, getProgress, () => SERVER_SNAPSHOT);
}

// ── mutators ────────────────────────────────────────────────────

function addMinutes(p: Progress, seconds: number): Progress {
  const key = dayKey();
  return {
    ...p,
    minutesByDay: { ...p.minutesByDay, [key]: (p.minutesByDay[key] ?? 0) + seconds / 60 },
  };
}

export function recordAttempt(
  problem: Problem,
  result: { correct: boolean; seconds: number; hintsUsed: number; context: AttemptContext },
) {
  mutate(p => {
    const attempt: Attempt = {
      problemId: problem.id,
      topicId: problem.topicId,
      correct: result.correct,
      seconds: result.seconds,
      hintsUsed: result.hintsUsed,
      context: result.context,
      ts: Date.now(),
    };
    const score = attemptScore(result.correct, result.hintsUsed, result.seconds, problem.estMinutes);
    const mastery = {
      ...p.mastery,
      [problem.topicId]: updateMastery(
        p.mastery[problem.topicId] ?? freshMastery(),
        problem.difficulty,
        score,
        result.seconds,
      ),
    };
    let reviews = p.reviews;
    if (!result.correct) reviews = enqueueMiss(reviews, problem.id);
    const xp = p.xp + (result.correct ? xpForProblem(problem.difficulty, result.hintsUsed) : 1);
    return addMinutes(
      { ...p, attempts: [...p.attempts, attempt], mastery, reviews, xp, streak: bumpStreak(p.streak) },
      result.seconds,
    );
  });
}

export function recordQuiz(topicId: string, difficulty: number, correct: boolean) {
  mutate(p => {
    const mastery = {
      ...p.mastery,
      [topicId]: updateMastery(
        p.mastery[topicId] ?? freshMastery(),
        difficulty,
        correct ? 1 : 0,
        45,
      ),
    };
    return addMinutes(
      { ...p, mastery, xp: p.xp + (correct ? XP_QUIZ : 2), streak: bumpStreak(p.streak) },
      60,
    );
  });
}

export function markBlockDone(slug: string, blocksDone: number) {
  mutate(p => ({
    ...p,
    lessons: {
      ...p.lessons,
      [slug]: {
        blocksDone: Math.max(blocksDone, p.lessons[slug]?.blocksDone ?? 0),
        completed: p.lessons[slug]?.completed ?? false,
        ts: Date.now(),
      },
    },
  }));
}

export function completeLesson(slug: string, flashcards: { front: string; back: string }[]) {
  mutate(p => {
    if (p.lessons[slug]?.completed) return p;
    return addMinutes({
      ...p,
      xp: p.xp + XP_LESSON,
      streak: bumpStreak(p.streak),
      lessons: {
        ...p.lessons,
        [slug]: { blocksDone: p.lessons[slug]?.blocksDone ?? 0, completed: true, ts: Date.now() },
      },
      reviews: enqueueCards(p.reviews, slug, flashcards),
    }, 5 * 60);
  });
}

export function resolveReview(itemId: string, success: boolean) {
  mutate(p => ({
    ...p,
    reviews: reviewOutcome(p.reviews, itemId, success),
    xp: p.xp + (success ? XP_REVIEW : 1),
    streak: bumpStreak(p.streak),
  }));
}

export function recordContestRun(run: ContestRun) {
  mutate(p => addMinutes(
    {
      ...p,
      contests: [...p.contests, run],
      xp: p.xp + XP_CONTEST + Math.round(run.score),
      streak: bumpStreak(p.streak),
    },
    run.perProblemSeconds.reduce((a, b) => a + b, 0),
  ));
}

export function setTrack(trackId: string) {
  mutate(p => ({ ...p, track: trackId }));
}

export function resetProgress() {
  save(defaultProgress());
}

// ── demo data (mentor/parent views, empty-state escape hatch) ───

export function seedDemoData() {
  const now = Date.now();
  const DAY = 24 * 60 * 60 * 1000;
  let p = defaultProgress();
  p.createdAt = now - 45 * DAY;
  const topics = [
    "counting-basics", "perms-combs", "casework", "probability",
    "quadratics", "sequences", "similarity", "angles",
    "divisibility", "modular", "expected-value", "linear-equations",
  ];
  const problems = [...problemById.values()];
  const rand = (() => { let s = 99; return () => { s = (s * 16807) % 2147483647; return s / 2147483647; }; })();

  for (let day = 42; day >= 1; day--) {
    if (rand() < 0.28) continue; // rest days
    const ts = now - day * DAY;
    const key = dayKey(ts);
    const sessions = 2 + Math.floor(rand() * 4);
    p.minutesByDay[key] = 20 + Math.floor(rand() * 50);
    for (let i = 0; i < sessions; i++) {
      const topic = topics[Math.floor(rand() * topics.length)];
      const pool = problems.filter(pr => pr.topicId === topic);
      const prob = pool[Math.floor(rand() * pool.length)] ?? problems[Math.floor(rand() * problems.length)];
      const skill = 30 + (42 - day) * 0.5; // improves over time
      const correct = rand() < 1 / (1 + Math.pow(10, (prob.difficulty * 10 - skill) / 25));
      const seconds = 60 + Math.floor(rand() * 240);
      const score = attemptScore(correct, correct && rand() < 0.3 ? 1 : 0, seconds, prob.estMinutes);
      p.mastery[prob.topicId] = updateMastery(
        p.mastery[prob.topicId] ?? freshMastery(), prob.difficulty, score, seconds, ts,
      );
      p.attempts.push({
        problemId: prob.id, topicId: prob.topicId, correct, seconds,
        hintsUsed: correct && rand() < 0.3 ? 1 : 0, context: "practice", ts,
      });
      p.xp += correct ? xpForProblem(prob.difficulty, 0) : 1;
    }
  }
  for (const slug of ["counting-fundamentals", "estimation-number-sense", "ratios-proportional-reasoning", "linear-equations-mastery", "angle-chasing"]) {
    p.lessons[slug] = { blocksDone: 99, completed: true, ts: now - Math.floor(rand() * 30) * DAY };
    p.xp += XP_LESSON;
  }
  p.streak = { count: 5, lastDay: dayKey(now - DAY) };
  p.track = "amc10";
  p.badges = [];
  p.badges = newBadges(p);
  save(p);
}
