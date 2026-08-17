import type { Track } from "@/lib/types";

// Competition tracks — overlays on the curriculum. Each defines a
// compact simulation blueprint (sampled live from the problem bank),
// a full-length official difficulty curve for score prediction, and
// the prerequisite lessons the platform recommends automatically.

const range = (n: number, f: (i: number) => number) => Array.from({ length: n }, (_, i) => f(i));

// Official-length difficulty curves (problem 1 → last), calibrated
// to the folk difficulty of each contest on our 1–10 scale.
const AMC8_CURVE = range(25, i => 1 + Math.round((i / 24) * 4)); // 1 → 5
const AMC10_CURVE = range(25, i => 2 + Math.round((i / 24) * 6)); // 2 → 8
const AMC12_CURVE = range(25, i => 3 + Math.round((i / 24) * 6)); // 3 → 9
const AIME_CURVE = range(15, i => 5 + Math.round((i / 14) * 5)); // 5 → 10

export const TRACKS: Track[] = [
  {
    id: "mathcounts",
    name: "MathCounts",
    short: "MC",
    description:
      "Middle-school sprint mathematics: speed, accuracy, and number sense under a ticking clock.",
    problemCount: 12,
    minutes: 24,
    scoring: { correct: 1, blank: 0, wrong: 0 },
    maxScore: 12,
    answerType: "integer",
    difficultyCurve: [2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 6, 6],
    officialCurve: range(30, i => 1 + Math.round((i / 29) * 5)),
    officialMax: 30,
    topicWeights: {
      arithmetic: 0.2, "fractions-ratios": 0.15, percents: 0.1, estimation: 0.05,
      "linear-equations": 0.1, "counting-basics": 0.15, probability: 0.1,
      divisibility: 0.1, angles: 0.05,
    },
    prereqLessons: ["arithmetic-fluency", "mental-math", "estimation-number-sense", "ratios-proportional-reasoning", "counting-fundamentals"],
  },
  {
    id: "amc8",
    name: "AMC 8",
    short: "AMC 8",
    description:
      "The gateway contest. 25 problems of increasing subtlety — cleverness over machinery.",
    problemCount: 12,
    minutes: 24,
    scoring: { correct: 6, blank: 1.5, wrong: 0 },
    maxScore: 72,
    answerType: "mcq",
    difficultyCurve: [1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 5, 5],
    officialCurve: AMC8_CURVE,
    officialMax: 25, // scored 1 pt/problem officially; we report /25
    topicWeights: {
      arithmetic: 0.12, "fractions-ratios": 0.12, percents: 0.08, estimation: 0.05,
      "linear-equations": 0.1, "coordinate-plane": 0.05,
      angles: 0.08, triangles: 0.08,
      "counting-basics": 0.12, probability: 0.08,
      divisibility: 0.08, modular: 0.04,
    },
    prereqLessons: ["estimation-number-sense", "ratios-proportional-reasoning", "linear-equations-mastery", "angle-chasing", "counting-fundamentals", "divisibility-primes"],
    cutoff: { score: 20, label: "Distinguished Honor Roll territory" },
  },
  {
    id: "amc10",
    name: "AMC 10",
    short: "AMC 10",
    description:
      "Technique under pressure: 25 problems, 75 minutes, and the AIME on the other side.",
    problemCount: 15,
    minutes: 45,
    scoring: { correct: 6, blank: 1.5, wrong: 0 },
    maxScore: 90,
    answerType: "mcq",
    difficultyCurve: [2, 2, 3, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8],
    officialCurve: AMC10_CURVE,
    officialMax: 150,
    topicWeights: {
      "linear-equations": 0.06, quadratics: 0.1, systems: 0.06, sequences: 0.08,
      angles: 0.06, triangles: 0.08, similarity: 0.08, circles: 0.06, "coordinate-geometry": 0.05,
      "counting-basics": 0.08, "perms-combs": 0.07, casework: 0.06, probability: 0.07,
      divisibility: 0.07, modular: 0.06, diophantine: 0.03, "expected-value": 0.03,
    },
    prereqLessons: ["quadratics-vieta", "sequences-telescoping", "similar-triangles", "casework-complementary", "modular-arithmetic", "probability-foundations"],
    cutoff: { score: 103.5, label: "Typical AIME qualification floor" },
  },
  {
    id: "amc12",
    name: "AMC 12",
    short: "AMC 12",
    description:
      "The full pre-calculus arsenal — logarithms, trigonometry, complex numbers — at contest speed.",
    problemCount: 15,
    minutes: 45,
    scoring: { correct: 6, blank: 1.5, wrong: 0 },
    maxScore: 90,
    answerType: "mcq",
    difficultyCurve: [3, 3, 4, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9],
    officialCurve: AMC12_CURVE,
    officialMax: 150,
    topicWeights: {
      functions: 0.08, polynomials: 0.08, quadratics: 0.08, sequences: 0.08,
      triangles: 0.07, similarity: 0.06, circles: 0.07, "coordinate-geometry": 0.06,
      "perms-combs": 0.07, casework: 0.06, probability: 0.07, "expected-value": 0.04,
      modular: 0.07, diophantine: 0.04, "totient-crt": 0.03, recursion: 0.04,
    },
    prereqLessons: ["quadratics-vieta", "logarithms-intro", "trigonometry-toolkit", "sequences-telescoping", "casework-complementary", "modular-arithmetic"],
    cutoff: { score: 85.5, label: "Typical AIME qualification floor" },
  },
  {
    id: "aime",
    name: "AIME",
    short: "AIME",
    description:
      "Fifteen integer answers, three hours, zero multiple-choice mercy. Synthesis across every domain.",
    problemCount: 6,
    minutes: 45,
    scoring: { correct: 1, blank: 0, wrong: 0 },
    maxScore: 6,
    answerType: "integer",
    difficultyCurve: [5, 6, 7, 8, 9, 10],
    officialCurve: AIME_CURVE,
    officialMax: 15,
    topicWeights: {
      quadratics: 0.08, polynomials: 0.08, sequences: 0.08, systems: 0.04,
      similarity: 0.08, circles: 0.08, "coordinate-geometry": 0.06, "solid-geometry": 0.04,
      "perms-combs": 0.08, casework: 0.08, probability: 0.07, "expected-value": 0.05,
      modular: 0.08, diophantine: 0.06, "totient-crt": 0.04,
    },
    prereqLessons: ["quadratics-vieta", "sequences-telescoping", "similar-triangles", "power-of-a-point", "casework-complementary", "expected-value", "modular-arithmetic", "diophantine-methods"],
    cutoff: { score: 8, label: "USA(J)MO index territory" },
  },
  {
    id: "usajmo",
    name: "USA(J)MO",
    short: "JMO",
    description:
      "Proof-based olympiad. The readiness gauntlet checks your ideas; mentors grade your written proofs.",
    problemCount: 4,
    minutes: 60,
    scoring: { correct: 1, blank: 0, wrong: 0 },
    maxScore: 4,
    answerType: "integer",
    difficultyCurve: [8, 8, 9, 10],
    officialCurve: [8, 8, 9, 9, 10, 10],
    officialMax: 42,
    proofBased: true,
    topicWeights: {
      invariants: 0.15, extremal: 0.1, "graph-theory": 0.1, pigeonhole: 0.1,
      "functional-equations": 0.1, recursion: 0.08, "inequalities-olympiad": 0.12,
      "olympiad-geometry": 0.15, modular: 0.05, diophantine: 0.05,
    },
    prereqLessons: ["invariants-monovariants", "extremal-principle", "pigeonhole-principle", "olympiad-inequalities", "cyclic-quadrilaterals", "olympiad-proof-writing"],
  },
  {
    id: "imo",
    name: "IMO Preparation",
    short: "IMO",
    description:
      "The summit. Six problems, two days, the world watching. Train the ideas here; write the proofs with your mentor.",
    problemCount: 4,
    minutes: 90,
    scoring: { correct: 1, blank: 0, wrong: 0 },
    maxScore: 4,
    answerType: "integer",
    difficultyCurve: [9, 9, 10, 10],
    officialCurve: [8, 9, 10, 8, 9, 10],
    officialMax: 42,
    proofBased: true,
    topicWeights: {
      invariants: 0.12, extremal: 0.1, "graph-theory": 0.12, "generating-functions": 0.06,
      "functional-equations": 0.12, "inequalities-olympiad": 0.12,
      "olympiad-geometry": 0.18, "totient-crt": 0.08, diophantine: 0.1,
    },
    prereqLessons: ["invariants-monovariants", "extremal-principle", "graph-theory-first-steps", "functional-equations-intro", "olympiad-inequalities", "advanced-configurations", "olympiad-proof-writing"],
  },
];

export const trackById = new Map(TRACKS.map(t => [t.id, t]));
