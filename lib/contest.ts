import type { ContestRun, Problem, Track } from "@/lib/types";
import { PROBLEMS } from "@/content/problems";

// Contest generation: fill the track's difficulty curve from the
// problem bank, spreading topics according to the track's weights.

function mulberry32(seed: number) {
  return function () {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function generateContest(track: Track, seed = Date.now() % 100000): Problem[] {
  const rand = mulberry32(seed);
  const weightedTopics = Object.entries(track.topicWeights) as [string, number][];
  const used = new Set<string>();
  const picked: Problem[] = [];

  for (const targetDiff of track.difficultyCurve) {
    // topic roulette biased by track weights
    const order = [...weightedTopics].sort(
      (a, b) => b[1] * rand() - a[1] * rand(),
    );
    let best: Problem | null = null;
    let bestCost = Infinity;
    for (const [topicId] of order) {
      for (const p of PROBLEMS) {
        if (used.has(p.id) || p.topicId !== topicId) continue;
        const cost = Math.abs(p.difficulty - targetDiff);
        if (cost < bestCost) { best = p; bestCost = cost; }
      }
      if (best && bestCost <= 1) break; // close enough on-topic
    }
    if (!best) {
      // widen: any unused problem nearest the target difficulty
      for (const p of PROBLEMS) {
        if (used.has(p.id)) continue;
        const cost = Math.abs(p.difficulty - targetDiff);
        if (cost < bestCost) { best = p; bestCost = cost; }
      }
    }
    if (best) { used.add(best.id); picked.push(best); }
  }
  return picked;
}

export function scoreContest(
  track: Track,
  problems: Problem[],
  answers: (number | null)[],
): Pick<ContestRun, "score" | "maxScore" | "correct" | "blank" | "wrong"> {
  let correct = 0, blank = 0, wrong = 0;
  problems.forEach((p, i) => {
    const a = answers[i];
    if (a === null || a === undefined) blank++;
    else if (a === p.answer) correct++;
    else wrong++;
  });
  const { scoring } = track;
  const score = correct * scoring.correct + blank * scoring.blank + wrong * scoring.wrong;
  return {
    score: Math.round(score * 10) / 10,
    maxScore: problems.length * scoring.correct,
    correct, blank, wrong,
  };
}
