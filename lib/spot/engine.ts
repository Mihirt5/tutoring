import {
  choiceCount,
  type Area,
  type Concept,
  type ProblemLevel,
  type SpotProblem,
} from "./schema.ts";

// Spot the Concept engine: choices, grading, Leitner scheduling, quiz
// selection, and the stats the results screen shows. Pure — callers pass
// the bank, the student's state, the clock, and the RNG.

export type Verdict = "correct" | "also-valid" | "wrong" | "timeout";
export type SpotMode = "area" | "level" | "mixed" | "confusion" | "timed";

export const QUIZ_LENGTH = 10;
export const TIMED_SECONDS = 30;
export const LEITNER_DAYS = [0, 1, 3, 7, 14];
const DAY = 24 * 60 * 60 * 1000;

export interface SpotAttempt {
  id: string;
  problemId: string;
  conceptId: string; // the problem's primary concept
  picked: string | null; // null = ran out of time
  verdict: Verdict;
  ms: number;
  mode: SpotMode;
  highlight?: string; // the phrase the student marked as their tip-off
  solved?: boolean; // result of "Now solve it", if they tried
  ts: number;
}

export interface LeitnerCard {
  box: number; // 0 … LEITNER_DAYS.length - 1
  due: number;
}

export interface SpotState {
  attempts: SpotAttempt[];
  boxes: Record<string, LeitnerCard>; // keyed by concept id
}

export const emptySpotState = (): SpotState => ({ attempts: [], boxes: {} });

// ── grading ─────────────────────────────────────────────────────

export function grade(problem: SpotProblem, picked: string | null): Verdict {
  if (picked === null) return "timeout";
  if (picked === problem.primary_concept) return "correct";
  if (problem.also_valid.includes(picked)) return "also-valid";
  return "wrong";
}

function shuffle<T>(xs: T[], rng: () => number): T[] {
  const a = [...xs];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// The primary concept plus distractors; half the time one also-valid route
// takes a distractor's place, so picking a legitimate alternative gets its
// own feedback.
export function choicesFor(
  problem: SpotProblem,
  rng: () => number = Math.random,
): string[] {
  const n = choiceCount(problem.level);
  const alt =
    problem.also_valid.length > 0 && rng() < 0.5
      ? [problem.also_valid[Math.floor(rng() * problem.also_valid.length)]]
      : [];
  const distractors = shuffle(problem.distractors, rng).slice(
    0,
    n - 1 - alt.length,
  );
  return shuffle([problem.primary_concept, ...alt, ...distractors], rng);
}

// ── Leitner scheduling ──────────────────────────────────────────

// Correct moves a concept up a box; a miss (wrong or timeout) sends it back
// to box 0, due now; an also-valid pick keeps its box.
export function schedule(
  card: LeitnerCard | undefined,
  verdict: Verdict,
  now: number,
): LeitnerCard {
  const box = card?.box ?? 0;
  const next =
    verdict === "correct"
      ? Math.min(box + 1, LEITNER_DAYS.length - 1)
      : verdict === "also-valid"
        ? box
        : 0;
  return { box: next, due: now + LEITNER_DAYS[next] * DAY };
}

export function isDue(card: LeitnerCard | undefined, now: number): boolean {
  return !card || card.due <= now;
}

// ── stats ───────────────────────────────────────────────────────

export interface Confusion {
  picked: string;
  answer: string;
  count: number;
}

// "You chose X when the answer was Y." Only real misses count.
export function confusions(attempts: SpotAttempt[]): Confusion[] {
  const counts = new Map<string, Confusion>();
  for (const a of attempts) {
    if (a.verdict !== "wrong" || a.picked === null) continue;
    const key = `${a.picked}>${a.conceptId}`;
    const c = counts.get(key) ?? {
      picked: a.picked,
      answer: a.conceptId,
      count: 0,
    };
    c.count++;
    counts.set(key, c);
  }
  return [...counts.values()].sort(
    (a, b) => b.count - a.count || a.answer.localeCompare(b.answer),
  );
}

export interface Tally {
  n: number;
  correct: number;
  alsoValid: number;
}

export function tallyBy(
  attempts: SpotAttempt[],
  key: (a: SpotAttempt) => string | undefined,
): Record<string, Tally> {
  const out: Record<string, Tally> = {};
  for (const a of attempts) {
    const k = key(a);
    if (!k) continue;
    const t = (out[k] ??= { n: 0, correct: 0, alsoValid: 0 });
    t.n++;
    if (a.verdict === "correct") t.correct++;
    if (a.verdict === "also-valid") t.alsoValid++;
  }
  return out;
}

// ── quiz selection ──────────────────────────────────────────────

export interface QuizConfig {
  mode: SpotMode;
  area?: Area;
  level?: ProblemLevel;
}

export interface QuizItem {
  problemId: string;
  choices: string[];
}

// Problems that put a pair the student confuses side by side: one of the
// pair is the answer and the other is among its choices.
export function confusionPool(
  problems: SpotProblem[],
  attempts: SpotAttempt[],
  pairs = 5,
): SpotProblem[] {
  const top = confusions(attempts).slice(0, pairs);
  return problems.filter((p) =>
    top.some(
      (c) =>
        (c.answer === p.primary_concept && p.distractors.includes(c.picked)) ||
        (c.picked === p.primary_concept && p.distractors.includes(c.answer)),
    ),
  );
}

export function quizPool(
  cfg: QuizConfig,
  problems: SpotProblem[],
  conceptById: Map<string, Concept>,
  state: SpotState,
): SpotProblem[] {
  if (cfg.mode === "confusion") return confusionPool(problems, state.attempts);
  return problems.filter(
    (p) =>
      (cfg.mode !== "area" ||
        !cfg.area ||
        conceptById.get(p.primary_concept)?.area === cfg.area) &&
      (cfg.mode !== "level" || !cfg.level || p.level === cfg.level),
  );
}

// Due concepts first (lowest box first), then unseen, then the rest; a
// concept already picked this round is damped so a quiz covers variety.
export function buildQuiz(
  cfg: QuizConfig,
  problems: SpotProblem[],
  conceptById: Map<string, Concept>,
  state: SpotState,
  now: number,
  rng: () => number = Math.random,
  length = QUIZ_LENGTH,
): QuizItem[] {
  const pool = quizPool(cfg, problems, conceptById, state);
  const picked: QuizItem[] = [];
  const used = new Map<string, number>();
  const weight = (p: SpotProblem) => {
    const card = state.boxes[p.primary_concept];
    const base = !card
      ? 2
      : isDue(card, now)
        ? 3 + (LEITNER_DAYS.length - 1 - card.box)
        : 0.5;
    return base * 0.4 ** (used.get(p.primary_concept) ?? 0);
  };
  while (picked.length < length && pool.length > 0) {
    const ws = pool.map(weight);
    let r = rng() * ws.reduce((a, b) => a + b, 0);
    let i = 0;
    while (i < pool.length - 1 && r >= ws[i]) r -= ws[i++];
    const [p] = pool.splice(i, 1);
    used.set(p.primary_concept, (used.get(p.primary_concept) ?? 0) + 1);
    picked.push({ problemId: p.id, choices: choicesFor(p, rng) });
  }
  return picked;
}

// ── "Now solve it" ──────────────────────────────────────────────

// Parses integers, decimals, and fractions exactly as [numerator, denominator].
function rational(s: string): [bigint, bigint] | null {
  const t = s.replace(/\s+/g, "").replace(/^\$|\$$/g, "");
  const frac = t.match(/^(-?\d+)\/(\d+)$/);
  if (frac) return frac[2] === "0" ? null : [BigInt(frac[1]), BigInt(frac[2])];
  const dec = t.match(/^(-?)(\d*)(?:\.(\d+))?$/);
  if (!dec || (dec[2] === "" && !dec[3])) return null;
  const digits = (dec[2] || "0") + (dec[3] ?? "");
  const n = BigInt(digits) * (dec[1] ? -1n : 1n);
  return [n, 10n ** BigInt(dec[3]?.length ?? 0)];
}

export function checkSolve(answer: string, input: string): boolean {
  const a = rational(answer);
  const b = rational(input);
  if (a && b) return a[0] * b[1] === b[0] * a[1];
  return (
    answer.replace(/\s+/g, "").toLowerCase() ===
    input.replace(/\s+/g, "").toLowerCase()
  );
}

// ── references ──────────────────────────────────────────────────

// "2020 AMC 12B #12" → the AoPS wiki page for that problem.
export function aopsLink(ref: string): string | null {
  const m = ref.match(
    /^(\d{4})\s+(AMC\s*(?:8|10|12)[AB]?|AIME\s*(?:I{1,2})?)\s*#\s*(\d+)$/i,
  );
  if (!m) return null;
  const c = m[2].toUpperCase().replace(/\s+/g, "");
  const contest = c.startsWith("AMC")
    ? `AMC_${c.slice(3)}`
    : c === "AIME"
      ? "AIME"
      : `AIME_${c.slice(4)}`;
  return `https://artofproblemsolving.com/wiki/index.php/${m[1]}_${contest}_Problems/Problem_${m[3]}`;
}
