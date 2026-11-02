import { describe, expect, it } from "vitest";
import {
  LEITNER_DAYS,
  aopsLink,
  buildQuiz,
  checkSolve,
  choicesFor,
  confusionPool,
  confusions,
  grade,
  isDue,
  schedule,
  type SpotAttempt,
  type SpotState,
} from "./engine.ts";
import type { Concept, SpotProblem } from "./schema.ts";

const DAY = 24 * 60 * 60 * 1000;
const NOW = 1_800_000_000_000;

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
}

const prob = (
  id: string,
  primary: string,
  over: Partial<SpotProblem> = {},
): SpotProblem => ({
  id,
  problem: "A problem statement.",
  level: "10",
  difficulty: 2,
  primary_concept: primary,
  also_valid: [],
  also_valid_notes: {},
  distractors: ["d1", "d2", "d3"],
  trigger_explanation: "Trigger explanation.",
  why_not: {},
  first_move: "First move here.",
  answer: "1",
  solution_sketch: "Sketch of solution.",
  ...over,
});

const attempt = (over: Partial<SpotAttempt>): SpotAttempt => ({
  id: Math.random().toString(36),
  problemId: "p",
  conceptId: "a",
  picked: "a",
  verdict: "correct",
  ms: 5000,
  mode: "mixed",
  ts: NOW,
  ...over,
});

describe("scoring", () => {
  const p = prob("geo-0001", "power", { also_valid: ["similar"] });
  it("grades correct, also-valid, wrong, and timeout", () => {
    expect(grade(p, "power")).toBe("correct");
    expect(grade(p, "similar")).toBe("also-valid");
    expect(grade(p, "d1")).toBe("wrong");
    expect(grade(p, null)).toBe("timeout");
  });

  it("offers 4 choices at AMC level and 5 at AIME, answer included once", () => {
    for (let s = 1; s < 30; s++) {
      const amc = choicesFor(p, seeded(s));
      expect(amc).toHaveLength(4);
      expect(amc.filter((c) => c === "power")).toHaveLength(1);
      const aime = choicesFor(
        prob("x", "power", {
          level: "AIME",
          distractors: ["d1", "d2", "d3", "d4"],
        }),
        seeded(s),
      );
      expect(aime).toHaveLength(5);
      expect(new Set(aime).size).toBe(5);
    }
  });

  it("sometimes swaps in an also-valid route, never more than one", () => {
    const seen = new Set<boolean>();
    for (let s = 1; s < 40; s++) {
      const c = choicesFor(p, seeded(s * 104729));
      expect(c.filter((x) => x === "similar").length).toBeLessThanOrEqual(1);
      seen.add(c.includes("similar"));
    }
    expect(seen).toEqual(new Set([true, false]));
  });
});

describe("Leitner scheduler", () => {
  it("promotes on correct and schedules by box", () => {
    const c1 = schedule(undefined, "correct", NOW);
    expect(c1).toEqual({ box: 1, due: NOW + LEITNER_DAYS[1] * DAY });
    const c2 = schedule(c1, "correct", NOW);
    expect(c2.box).toBe(2);
    expect(c2.due).toBe(NOW + LEITNER_DAYS[2] * DAY);
  });

  it("caps at the top box", () => {
    let c = schedule(undefined, "correct", NOW);
    for (let i = 0; i < 10; i++) c = schedule(c, "correct", NOW);
    expect(c.box).toBe(LEITNER_DAYS.length - 1);
  });

  it("sends misses and timeouts back to box 0, due now", () => {
    const high = { box: 3, due: NOW + 7 * DAY };
    expect(schedule(high, "wrong", NOW)).toEqual({ box: 0, due: NOW });
    expect(schedule(high, "timeout", NOW)).toEqual({ box: 0, due: NOW });
  });

  it("keeps the box on an also-valid pick", () => {
    expect(schedule({ box: 2, due: 0 }, "also-valid", NOW).box).toBe(2);
  });

  it("reports due cards", () => {
    expect(isDue(undefined, NOW)).toBe(true);
    expect(isDue({ box: 1, due: NOW + 1 }, NOW)).toBe(false);
    expect(isDue({ box: 1, due: NOW }, NOW)).toBe(true);
  });
});

describe("confusions", () => {
  const attempts = [
    attempt({ conceptId: "power", picked: "similar", verdict: "wrong" }),
    attempt({ conceptId: "power", picked: "similar", verdict: "wrong" }),
    attempt({ conceptId: "vieta", picked: "quadratics", verdict: "wrong" }),
    attempt({ conceptId: "vieta", picked: null, verdict: "timeout" }),
    attempt({ conceptId: "power", picked: "similar", verdict: "also-valid" }),
  ];

  it("counts only real misses, most frequent first", () => {
    expect(confusions(attempts)).toEqual([
      { picked: "similar", answer: "power", count: 2 },
      { picked: "quadratics", answer: "vieta", count: 1 },
    ]);
  });

  it("drills problems that pit a confused pair against each other", () => {
    const bank = [
      prob("geo-0001", "power", { distractors: ["similar", "x", "y"] }),
      prob("geo-0002", "similar", { distractors: ["power", "x", "y"] }),
      prob("geo-0003", "power", { distractors: ["x", "y", "z"] }),
    ];
    expect(confusionPool(bank, attempts).map((p) => p.id)).toEqual([
      "geo-0001",
      "geo-0002",
    ]);
  });
});

describe("quiz building", () => {
  const concepts = new Map<string, Concept>(
    ["a", "b", "c"].map((id) => [
      id,
      { id, area: id === "c" ? "algebra" : "geometry" } as Concept,
    ]),
  );
  const bank = [
    ...Array.from({ length: 6 }, (_, i) =>
      prob(`geo-000${i}`, i % 2 ? "a" : "b"),
    ),
    prob("alg-0001", "c"),
  ];

  it("filters by area and never repeats a problem", () => {
    const quiz = buildQuiz(
      { mode: "area", area: "geometry" },
      bank,
      concepts,
      { attempts: [], boxes: {} },
      NOW,
      seeded(2),
    );
    expect(quiz).toHaveLength(6);
    expect(new Set(quiz.map((q) => q.problemId)).size).toBe(6);
    expect(quiz.some((q) => q.problemId === "alg-0001")).toBe(false);
  });

  it("puts due concepts ahead of ones resting in a high box", () => {
    const state: SpotState = {
      attempts: [],
      boxes: {
        a: { box: 0, due: NOW - 1 },
        b: { box: 4, due: NOW + 14 * DAY },
      },
    };
    let dueFirst = 0;
    const rng = seeded(5);
    for (let i = 0; i < 300; i++) {
      const [q] = buildQuiz(
        { mode: "area", area: "geometry" },
        bank,
        concepts,
        state,
        NOW,
        rng,
        1,
      );
      if (bank.find((p) => p.id === q.problemId)!.primary_concept === "a")
        dueFirst++;
    }
    expect(dueFirst).toBeGreaterThan(240);
  });
});

describe("now solve it", () => {
  it("compares integers, fractions, and decimals exactly", () => {
    expect(checkSolve("49/54", "49/54")).toBe(true);
    expect(checkSolve("49/54", " 98 / 108 ")).toBe(true);
    expect(checkSolve("1/2", "0.5")).toBe(true);
    expect(checkSolve("39", "39.0")).toBe(true);
    expect(checkSolve("39", "38")).toBe(false);
    expect(checkSolve("49/54", "0.907")).toBe(false);
    expect(checkSolve("39", "")).toBe(false);
  });
});

describe("AoPS links", () => {
  it("builds wiki URLs and refuses what it can't parse", () => {
    expect(aopsLink("2020 AMC 12B #12")).toBe(
      "https://artofproblemsolving.com/wiki/index.php/2020_AMC_12B_Problems/Problem_12",
    );
    expect(aopsLink("2024 AIME I #10")).toBe(
      "https://artofproblemsolving.com/wiki/index.php/2024_AIME_I_Problems/Problem_10",
    );
    expect(aopsLink("ISL 2019 C3")).toBeNull();
  });
});
