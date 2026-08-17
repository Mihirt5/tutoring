import { describe, expect, it } from "vitest";
import { attemptScore, confidence, expectedSolve, freshMastery, updateMastery } from "./mastery";
import { INTERVALS_DAYS, dueItems, enqueueMiss, reviewOutcome } from "./srs";
import { predictScore, qualificationProbability, readiness } from "./predictor";
import { bumpStreak, level, levelProgress } from "./xp";
import { TRACKS, trackById } from "@/content/tracks";
import { scoreContest, generateContest } from "@/lib/contest";
import type { TopicMastery } from "@/lib/types";

const DAY = 24 * 60 * 60 * 1000;

describe("mastery", () => {
  it("expected solve is 50% at matched difficulty", () => {
    expect(expectedSolve(30, 3)).toBeCloseTo(0.5);
    expect(expectedSolve(80, 8)).toBeCloseTo(0.5);
  });

  it("rating rises on success and falls on failure", () => {
    const m = freshMastery();
    const up = updateMastery(m, 5, 1, 120);
    expect(up.rating).toBeGreaterThan(m.rating);
    const down = updateMastery(m, 5, 0, 120);
    expect(down.rating).toBeLessThan(m.rating);
  });

  it("hard solves move rating more than easy solves", () => {
    const m = freshMastery();
    const easy = updateMastery(m, 1, 1, 60).rating - m.rating;
    const hard = updateMastery(m, 8, 1, 60).rating - m.rating;
    expect(hard).toBeGreaterThan(easy);
  });

  it("hints attenuate credit but a solve never drops below 0.4", () => {
    expect(attemptScore(true, 0, 60, 5)).toBe(1);
    expect(attemptScore(true, 3, 60, 5)).toBeCloseTo(0.4);
    expect(attemptScore(false, 0, 60, 5)).toBe(0);
  });

  it("rating stays within [1, 99]", () => {
    let m = freshMastery();
    for (let i = 0; i < 60; i++) m = updateMastery(m, 10, 1, 60);
    expect(m.rating).toBeLessThanOrEqual(99);
    for (let i = 0; i < 120; i++) m = updateMastery(m, 1, 0, 60);
    expect(m.rating).toBeGreaterThanOrEqual(1);
  });

  it("confidence grows with consistent evidence", () => {
    let m = freshMastery();
    const c0 = confidence(m);
    for (let i = 0; i < 12; i++) m = updateMastery(m, 3, 1, 60);
    expect(confidence(m)).toBeGreaterThan(c0);
  });
});

describe("srs", () => {
  it("a miss schedules review tomorrow", () => {
    const now = Date.now();
    const q = enqueueMiss([], "p1", now);
    expect(q).toHaveLength(1);
    expect(q[0].due).toBe(now + DAY);
    expect(dueItems(q, now)).toHaveLength(0);
    expect(dueItems(q, now + DAY + 1)).toHaveLength(1);
  });

  it("successful reviews climb the ladder and graduate", () => {
    const now = Date.now();
    let q = enqueueMiss([], "p1", now);
    for (let i = 1; i < INTERVALS_DAYS.length; i++) {
      q = reviewOutcome(q, "problem:p1", true, now);
      expect(q[0].intervalIdx).toBe(i);
    }
    q = reviewOutcome(q, "problem:p1", true, now);
    expect(q).toHaveLength(0); // graduated
  });

  it("a lapse resets to the bottom rung", () => {
    const now = Date.now();
    let q = enqueueMiss([], "p1", now);
    q = reviewOutcome(q, "problem:p1", true, now);
    q = reviewOutcome(q, "problem:p1", false, now);
    expect(q[0].intervalIdx).toBe(0);
    expect(q[0].lapses).toBe(2);
  });
});

describe("predictor", () => {
  const strong: Record<string, TopicMastery> = {};
  const weak: Record<string, TopicMastery> = {};
  const amc10 = trackById.get("amc10")!;
  for (const t of Object.keys(amc10.topicWeights)) {
    strong[t] = { ...freshMastery(), rating: 85, n: 20 };
    weak[t] = { ...freshMastery(), rating: 20, n: 20 };
  }

  it("stronger mastery predicts higher scores", () => {
    expect(predictScore(amc10, strong)).toBeGreaterThan(predictScore(amc10, weak));
  });

  it("AMC prediction stays within official bounds", () => {
    const s = predictScore(amc10, strong);
    expect(s).toBeGreaterThan(0);
    expect(s).toBeLessThanOrEqual(150);
    // blank strategy floors the score at 37.5 equivalent
    expect(predictScore(amc10, weak)).toBeGreaterThanOrEqual(37.5);
  });

  it("qualification probability is monotone in mastery", () => {
    const ps = qualificationProbability(amc10, strong)!;
    const pw = qualificationProbability(amc10, weak)!;
    expect(ps).toBeGreaterThan(pw);
  });

  it("readiness lands in [0,1] for every track", () => {
    for (const track of TRACKS) {
      const r = readiness(track, strong);
      expect(r).toBeGreaterThanOrEqual(0);
      expect(r).toBeLessThanOrEqual(1);
    }
  });
});

describe("contest", () => {
  const amc10 = trackById.get("amc10")!;

  it("generates a full-length, deduplicated exam near the difficulty curve", () => {
    const exam = generateContest(amc10, 7);
    expect(exam).toHaveLength(amc10.problemCount);
    expect(new Set(exam.map(p => p.id)).size).toBe(exam.length);
  });

  it("scores with official AMC rules (6 / 1.5 / 0)", () => {
    const exam = generateContest(amc10, 7);
    const answers = exam.map((p, i) => (i === 0 ? p.answer : i === 1 ? p.answer + 1 : null));
    const s = scoreContest(amc10, exam, answers);
    expect(s.correct).toBe(1);
    expect(s.wrong).toBe(1);
    expect(s.blank).toBe(exam.length - 2);
    expect(s.score).toBeCloseTo(6 + 1.5 * (exam.length - 2));
  });
});

describe("xp", () => {
  it("levels follow the square curve", () => {
    expect(level(0)).toBe(1);
    expect(level(100)).toBe(2);
    expect(level(400)).toBe(3);
    const lp = levelProgress(150);
    expect(lp.level).toBe(2);
    expect(lp.into).toBe(50);
  });

  it("streak increments on consecutive days and resets on gaps", () => {
    const now = Date.now();
    const s1 = bumpStreak({ count: 0, lastDay: "" }, now);
    expect(s1.count).toBe(1);
    const s2 = bumpStreak(s1, now + DAY);
    expect(s2.count).toBe(2);
    const s3 = bumpStreak(s2, now + 5 * DAY);
    expect(s3.count).toBe(1);
  });
});
