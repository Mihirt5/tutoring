import { z } from "zod";

// Spot the Concept: data shapes for the concept taxonomy and problem bank.
// Content lives in content/spot/*.json; this file is shared by the app and
// by the node validator, so it imports nothing but zod.

export const AREAS = [
  "algebra",
  "geometry",
  "combinatorics",
  "number-theory",
] as const;
export const CONCEPT_LEVELS = ["10", "12", "AIME", "Beyond"] as const;
export const PROBLEM_LEVELS = ["10", "12", "AIME"] as const;
export const FREQUENCIES = ["core", "common", "rare"] as const;

const id = z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "kebab-case id");

export const ConceptSchema = z.strictObject({
  id,
  name: z.string().min(2),
  area: z.enum(AREAS),
  subarea: z.string().min(2),
  level: z.array(z.enum(CONCEPT_LEVELS)).min(1),
  statement: z.string().min(2),
  frequency: z.enum(FREQUENCIES),
  triggers: z.array(z.string().min(4)).min(2).max(5),
  confusable_with: z.array(id).min(1),
  example_refs: z.array(z.string()),
});

export const ProblemSchema = z.strictObject({
  id: z.string().regex(/^(alg|geo|comb|nt)-\d{4}$/, "id like geo-0042"),
  problem: z.string().min(10),
  level: z.enum(PROBLEM_LEVELS),
  difficulty: z.number().int().min(1).max(5),
  primary_concept: id,
  also_valid: z.array(id),
  // Feedback for picking an also-valid route: why the primary is the key idea.
  also_valid_notes: z.record(z.string(), z.string().min(10)),
  distractors: z.array(id),
  trigger_explanation: z.string().min(10),
  why_not: z.record(z.string(), z.string().min(10)),
  first_move: z.string().min(10),
  answer: z.string().min(1),
  solution_sketch: z.string().min(10),
  inspired_by: z.string().optional(),
});

export type Area = (typeof AREAS)[number];
export type ProblemLevel = (typeof PROBLEM_LEVELS)[number];
export type Concept = z.infer<typeof ConceptSchema>;
export type SpotProblem = z.infer<typeof ProblemSchema>;

export const AREA_PREFIX: Record<Area, string> = {
  algebra: "alg",
  geometry: "geo",
  combinatorics: "comb",
  "number-theory": "nt",
};

export const AREA_NAMES: Record<Area, string> = {
  algebra: "Algebra",
  geometry: "Geometry",
  combinatorics: "Combinatorics",
  "number-theory": "Number Theory",
};

export const LEVEL_NAMES: Record<ProblemLevel, string> = {
  "10": "AMC 10",
  "12": "AMC 12",
  AIME: "AIME",
};

// 4 choices at AMC level, 5 at AIME.
export function choiceCount(level: ProblemLevel): number {
  return level === "AIME" ? 5 : 4;
}
