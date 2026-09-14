import "server-only";
import type { CourseLesson } from "@/lib/courses/types";
import { getCourseLessonMeta } from "./manifest";

const loaders: Record<string, () => Promise<{ default: CourseLesson }>> = {
  "course:amc-8:permutations-definition": () =>
    import("./amc-8/m01/permutations-definition"),
  "course:amc-8:factorials": () => import("./amc-8/m01/factorials"),
  "course:amc-8:permutations-fundamentals": () =>
    import("./amc-8/m01/permutations-fundamentals"),
  "course:amc-8:digit-permutations": () =>
    import("./amc-8/m01/digit-permutations"),
  "course:amc-8:circular-arrangements": () =>
    import("./amc-8/m01/circular-arrangements"),
  "course:amc-8:combinations-fundamentals": () =>
    import("./amc-8/m02/combinations-fundamentals"),
  "course:amc-8:binomial-identity": () =>
    import("./amc-8/m02/binomial-identity"),
  "course:amc-8:tricky-combinations": () =>
    import("./amc-8/m02/tricky-combinations"),
  "course:amc-8:word-rearrangements-fundamentals": () =>
    import("./amc-8/m03/word-rearrangements-fundamentals"),
  "course:amc-8:word-rearrangements-with-constraints": () =>
    import("./amc-8/m03/word-rearrangements-with-constraints"),
  "course:amc-8:probability-fundamentals": () =>
    import("./amc-8/m04/probability-fundamentals"),
  "course:amc-8:distinguishability": () =>
    import("./amc-8/m04/distinguishability"),
  "course:amc-8:casework-in-probability": () =>
    import("./amc-8/m04/casework-in-probability"),
  "course:amc-8:independent-events-probability": () =>
    import("./amc-8/m04/independent-events-probability"),
  "course:amc-8:dependent-events-probability": () =>
    import("./amc-8/m04/dependent-events-probability"),
  "course:amc-8:dependent-or-independent": () =>
    import("./amc-8/m04/dependent-or-independent"),
  "course:amc-10-12:bounds-and-extrema": () =>
    import("./amc-10-12/m01/bounds-and-extrema"),
  "course:amc-10-12:factor-expressions-and-simplify-radicals": () =>
    import("./amc-10-12/m01/factor-expressions-and-simplify-radicals"),
  "course:amc-10-12:systems-and-equation-restrictions": () =>
    import("./amc-10-12/m01/systems-and-equation-restrictions"),
  "course:amc-10-12:domains-composition-inverses-and-graphs": () =>
    import("./amc-10-12/m02/domains-composition-inverses-and-graphs"),
  "course:amc-10-12:polynomial-roots-and-symmetric-relationships": () =>
    import("./amc-10-12/m02/polynomial-roots-and-symmetric-relationships"),
  "course:amc-10-12:quadratics-discriminants-and-intersections": () =>
    import("./amc-10-12/m02/quadratics-discriminants-and-intersections"),
  "course:amc-10-12:prime-powers-and-divisor-structure": () =>
    import("./amc-10-12/m03/prime-powers-and-divisor-structure"),
  "course:amc-10-12:congruences-cycles-and-remainders": () =>
    import("./amc-10-12/m03/congruences-cycles-and-remainders"),
  "course:amc-10-12:integer-equations-and-place-value": () =>
    import("./amc-10-12/m03/integer-equations-and-place-value"),
};

export async function loadCourseLesson(
  courseSlug: string,
  lessonSlug: string,
): Promise<CourseLesson | null> {
  const meta = getCourseLessonMeta(courseSlug, lessonSlug);
  if (!meta || meta.status !== "published") return null;
  const load = loaders[meta.id];
  return load ? (await load()).default : null;
}
