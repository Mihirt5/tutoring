import type { Problem } from "@/lib/types";
import { FOUNDATIONS_PROBLEMS } from "./foundations";
import { ALGEBRA_PROBLEMS } from "./algebra";
import { GEOMETRY_PROBLEMS } from "./geometry";
import { COUNTING_PROBLEMS } from "./counting";
import { NUMBER_THEORY_PROBLEMS } from "./number-theory";
import { OLYMPIAD_PROBLEMS } from "./olympiad";

export const PROBLEMS: Problem[] = [
  ...FOUNDATIONS_PROBLEMS,
  ...ALGEBRA_PROBLEMS,
  ...GEOMETRY_PROBLEMS,
  ...COUNTING_PROBLEMS,
  ...NUMBER_THEORY_PROBLEMS,
  ...OLYMPIAD_PROBLEMS,
];

export const problemById = new Map(PROBLEMS.map(p => [p.id, p]));

export const ALL_TAGS = [...new Set(PROBLEMS.flatMap(p => p.tags))].sort();
export const ALL_SOURCES = [...new Set(PROBLEMS.map(p => p.source))].sort();
