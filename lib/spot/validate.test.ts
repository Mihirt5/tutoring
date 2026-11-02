import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { validateConcepts, validateProblems } from "./validate.ts";
import type { Concept, SpotProblem } from "./schema.ts";

const root = path.resolve(__dirname, "../..");
const read = (f: string) =>
  JSON.parse(readFileSync(path.join(root, f), "utf8"));

const concept = (id: string, over: Partial<Concept> = {}): Concept => ({
  id,
  name: id.replace(/-/g, " "),
  area: "geometry",
  subarea: "circles",
  level: ["10", "12", "AIME"],
  statement: "statement",
  frequency: "core",
  triggers: ["first trigger", "second trigger"],
  confusable_with: [id === "alpha" ? "beta" : "alpha"],
  example_refs: [],
  ...over,
});

const CONCEPTS = ["alpha", "beta", "gamma", "delta", "epsilon"].map((id) =>
  concept(id),
);
CONCEPTS[0] = concept("alpha", {
  name: "Power of a Point",
  statement: "$PA\\cdot PB=PC\\cdot PD$",
});

const problem = (over: Partial<SpotProblem> = {}): SpotProblem => ({
  id: "geo-0001",
  problem: "Chords $AB$ and $CD$ meet at $E$. Find $CD$.",
  level: "10",
  difficulty: 2,
  primary_concept: "alpha",
  also_valid: [],
  also_valid_notes: {},
  distractors: ["beta", "gamma", "delta"],
  trigger_explanation: "Two chords cross at one point.",
  why_not: {
    beta: "Because beta fails.",
    gamma: "Because gamma fails.",
    delta: "Because delta fails.",
  },
  first_move: "Multiply the segments.",
  answer: "11",
  solution_sketch: "Short sketch of it.",
  ...over,
});

const errorsFor = (p: Partial<SpotProblem>) =>
  validateProblems([problem(p)], CONCEPTS, { checkMix: false }).report.errors;

describe("spot validator", () => {
  it("accepts a well-formed problem", () => {
    expect(errorsFor({})).toEqual([]);
  });

  it("rejects unknown concept ids", () => {
    expect(errorsFor({ primary_concept: "nope" }).join()).toMatch(
      /unknown primary_concept/,
    );
    expect(
      errorsFor({ distractors: ["beta", "gamma", "nope"] }).join(),
    ).toMatch(/unknown concept "nope"/);
  });

  it("never lets an also-valid route be a distractor", () => {
    const errs = errorsFor({
      also_valid: ["beta"],
      also_valid_notes: { beta: "Valid but slower route." },
    });
    expect(errs.join()).toMatch(/both a distractor and also_valid/);
  });

  it("requires 3 distractors at AMC level and 4 at AIME", () => {
    expect(
      errorsFor({
        distractors: ["beta", "gamma"],
        why_not: { beta: "x".repeat(10), gamma: "x".repeat(10) },
      }).join(),
    ).toMatch(/exactly 3 distractors/);
    expect(errorsFor({ level: "AIME" }).join()).toMatch(
      /exactly 4 distractors/,
    );
  });

  it("requires why_not for every distractor and notes for every also-valid route", () => {
    expect(
      errorsFor({
        why_not: { beta: "x".repeat(10), gamma: "x".repeat(10) },
      }).join(),
    ).toMatch(/why_not missing for distractor "delta"/);
    expect(errorsFor({ also_valid: ["epsilon"] }).join()).toMatch(
      /also_valid_notes missing/,
    );
  });

  it("rejects text that names a concept or quotes its formula", () => {
    expect(
      errorsFor({ problem: "Use power of a point to find $CD$ here." }).join(),
    ).toMatch(/names the concept/);
    expect(
      errorsFor({
        problem: "Given $PA \\cdot PB = PC \\cdot PD$, find $CD$.",
      }).join(),
    ).toMatch(/contains the formula/);
  });

  it("catches unbalanced math delimiters", () => {
    expect(
      errorsFor({ first_move: "Set $x = 3 and continue." }).join(),
    ).toMatch(/unbalanced \$ in first_move/);
  });

  it("rejects malformed records and ids", () => {
    expect(errorsFor({ id: "geometry-1" }).join()).toMatch(/id like geo-0042/);
    expect(errorsFor({ id: "alg-0001" }).join()).toMatch(
      /prefix doesn't match/,
    );
    expect(errorsFor({ difficulty: 9 }).join()).toMatch(/difficulty/);
  });

  it("checks confusable_with ids in the taxonomy", () => {
    const { report } = validateConcepts([
      concept("alpha", { confusable_with: ["ghost"] }),
    ]);
    expect(report.errors.join()).toMatch(/unknown confusable "ghost"/);
  });

  it("enforces the frequency mix only once the bank is large", () => {
    const many = Array.from({ length: 40 }, (_, i) =>
      problem({ id: `geo-${String(i).padStart(4, "0")}` }),
    );
    const rareConcepts = CONCEPTS.map((c) => ({
      ...c,
      frequency: "rare" as const,
    }));
    expect(validateProblems(many, rareConcepts).report.errors.join()).toMatch(
      /frequency mix/,
    );
    expect(
      validateProblems(many.slice(0, 5), rareConcepts).report.warnings.join(),
    ).toMatch(/frequency mix/);
  });
});

describe("the shipped bank", () => {
  it("passes validation", () => {
    const { concepts, report: cr } = validateConcepts(
      read("content/spot/concepts.json"),
    );
    const raw = readdirSync(path.join(root, "content/spot/problems")).flatMap(
      (f) => read(`content/spot/problems/${f}`),
    );
    const { report } = validateProblems(raw, concepts);
    expect([...cr.errors, ...report.errors]).toEqual([]);
  });
});
