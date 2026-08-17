import type { Progress } from "@/lib/types";

// XP, levels, streaks, badges.

export function xpForProblem(difficulty: number, hintsUsed: number): number {
  return Math.max(4, 10 + difficulty * 2 - hintsUsed * 3);
}

export const XP_QUIZ = 10;
export const XP_LESSON = 50;
export const XP_CONTEST = 40;
export const XP_REVIEW = 6;

export function level(xp: number): number {
  return Math.floor(Math.sqrt(xp / 100)) + 1;
}

export function levelProgress(xp: number): { level: number; into: number; needed: number } {
  const lv = level(xp);
  const floor = (lv - 1) ** 2 * 100;
  const ceil = lv ** 2 * 100;
  return { level: lv, into: xp - floor, needed: ceil - floor };
}

export function dayKey(ts = Date.now()): string {
  const d = new Date(ts);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function bumpStreak(streak: Progress["streak"], now = Date.now()): Progress["streak"] {
  const today = dayKey(now);
  if (streak.lastDay === today) return streak;
  const yesterday = dayKey(now - 24 * 60 * 60 * 1000);
  return { count: streak.lastDay === yesterday ? streak.count + 1 : 1, lastDay: today };
}

export interface BadgeDef {
  id: string;
  name: string;
  desc: string;
  earned: (p: Progress) => boolean;
}

export const BADGES: BadgeDef[] = [
  { id: "first-blood", name: "First Blood", desc: "Solve your first problem.", earned: p => p.attempts.some(a => a.correct) },
  { id: "decathlon", name: "Decathlon", desc: "Solve 10 problems.", earned: p => p.attempts.filter(a => a.correct).length >= 10 },
  { id: "half-century", name: "Half Century", desc: "Solve 50 problems.", earned: p => p.attempts.filter(a => a.correct).length >= 50 },
  { id: "scholar", name: "Scholar", desc: "Complete 3 lessons.", earned: p => Object.values(p.lessons).filter(l => l.completed).length >= 3 },
  { id: "streak-7", name: "Momentum", desc: "Reach a 7-day streak.", earned: p => p.streak.count >= 7 },
  { id: "contest-debut", name: "Contest Debut", desc: "Finish a mock contest.", earned: p => p.contests.length >= 1 },
  { id: "no-hints", name: "Unassisted", desc: "Solve a difficulty 7+ problem without hints.", earned: p => p.attempts.some(a => a.correct && a.hintsUsed === 0 && a.problemId.length > 0 && difficultyOf(a.problemId) >= 7) },
  { id: "polymath", name: "Polymath", desc: "Reach rating 60 in 5 topics.", earned: p => Object.values(p.mastery).filter(m => m.rating >= 60).length >= 5 },
];

// wired in store.ts to avoid a circular import at module load
let difficultyOf: (id: string) => number = () => 0;
export function _bindDifficultyLookup(fn: (id: string) => number) {
  difficultyOf = fn;
}

export function newBadges(p: Progress): string[] {
  return BADGES.filter(b => !p.badges.includes(b.id) && b.earned(p)).map(b => b.id);
}
