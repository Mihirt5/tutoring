import conceptsJson from "@/content/spot/concepts.json";
import algebraJson from "@/content/spot/problems/algebra.json";
import geometryJson from "@/content/spot/problems/geometry.json";
import combinatoricsJson from "@/content/spot/problems/combinatorics.json";
import numberTheoryJson from "@/content/spot/problems/number-theory.json";
import { validateConcepts, validateProblems } from "./validate.ts";
import type { Concept, SpotProblem } from "./schema.ts";

// The Spot the Concept bank, validated on load. `npm run spot:validate`
// catches the same errors before they ship; this guards against skipping it.

const { concepts, report: conceptReport } = validateConcepts(conceptsJson);
const { problems, report } = validateProblems(
  [...algebraJson, ...geometryJson, ...combinatoricsJson, ...numberTheoryJson],
  concepts,
  { checkMix: false },
);
const errors = [...conceptReport.errors, ...report.errors];
if (errors.length)
  throw new Error(`Spot the Concept bank is invalid:\n${errors.join("\n")}`);

// Olympiad-only concepts stay in the data but are off by default.
export const CONCEPTS: Concept[] = concepts.filter((c) =>
  c.level.some((l) => l !== "Beyond"),
);
export const conceptById = new Map(concepts.map((c) => [c.id, c]));
export const SPOT_PROBLEMS: SpotProblem[] = problems.filter((p) =>
  conceptById.get(p.primary_concept)?.level.some((l) => l !== "Beyond"),
);
export const spotProblemById = new Map(SPOT_PROBLEMS.map((p) => [p.id, p]));

export function problemsForConcept(id: string): SpotProblem[] {
  return SPOT_PROBLEMS.filter((p) => p.primary_concept === id);
}

export function areaOf(p: SpotProblem) {
  return conceptById.get(p.primary_concept)!.area;
}
