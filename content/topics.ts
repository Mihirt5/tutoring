import type { Topic } from "@/lib/types";

// The topic taxonomy — the unit of mastery tracking, recommendation,
// and score prediction. Every lesson and problem carries one topicId.

export const TOPICS: Topic[] = [
  // Foundations
  { id: "arithmetic", name: "Arithmetic & Number Sense", pathId: "foundations", blurb: "Fluency, mental math, clever computation." },
  { id: "fractions-ratios", name: "Fractions & Ratios", pathId: "foundations", blurb: "Part-whole reasoning, proportional thinking." },
  { id: "percents", name: "Percents & Rates", pathId: "foundations", blurb: "Percent change, rates, weighted averages." },
  { id: "estimation", name: "Estimation", pathId: "foundations", blurb: "Bounding, approximation, sanity checks." },
  // Pre-Algebra
  { id: "expressions", name: "Variables & Expressions", pathId: "pre-algebra", blurb: "Symbolic fluency, simplification." },
  { id: "linear-equations", name: "Linear Equations", pathId: "pre-algebra", blurb: "Solving, modeling, word problems." },
  { id: "inequalities-basic", name: "Inequalities", pathId: "pre-algebra", blurb: "Ordering, bounding, case analysis." },
  { id: "coordinate-plane", name: "Coordinate Plane", pathId: "pre-algebra", blurb: "Points, lines, slopes, distance." },
  // Algebra
  { id: "functions", name: "Functions", pathId: "algebra", blurb: "Notation, composition, transformations." },
  { id: "polynomials", name: "Polynomials", pathId: "algebra", blurb: "Factoring, roots, identities." },
  { id: "quadratics", name: "Quadratics & Vieta", pathId: "algebra", blurb: "Roots, discriminants, symmetric sums." },
  { id: "systems", name: "Systems", pathId: "algebra", blurb: "Elimination, substitution, symmetry tricks." },
  { id: "sequences", name: "Sequences & Series", pathId: "algebra", blurb: "Arithmetic, geometric, telescoping." },
  // Geometry
  { id: "angles", name: "Angles", pathId: "geometry", blurb: "Angle chasing, parallel lines, polygons." },
  { id: "triangles", name: "Triangles", pathId: "geometry", blurb: "Congruence, special triangles, area." },
  { id: "similarity", name: "Similarity", pathId: "geometry", blurb: "Ratios, scaling, similar figures." },
  { id: "circles", name: "Circles", pathId: "geometry", blurb: "Arcs, inscribed angles, power of a point." },
  { id: "coordinate-geometry", name: "Coordinate Geometry", pathId: "geometry", blurb: "Analytic methods, distance, area." },
  { id: "solid-geometry", name: "3D Geometry", pathId: "geometry", blurb: "Volumes, cross-sections, space reasoning." },
  // Counting & Probability
  { id: "counting-basics", name: "Counting Fundamentals", pathId: "counting", blurb: "Product rule, complementary counting." },
  { id: "perms-combs", name: "Permutations & Combinations", pathId: "counting", blurb: "Arrangements, selections, identities." },
  { id: "casework", name: "Casework & Complementary", pathId: "counting", blurb: "Splitting cleanly, counting the opposite." },
  { id: "probability", name: "Probability", pathId: "counting", blurb: "Sample spaces, independence, conditioning." },
  { id: "expected-value", name: "Expected Value", pathId: "counting", blurb: "Linearity, indicators, fair games." },
  { id: "pigeonhole", name: "Pigeonhole Principle", pathId: "counting", blurb: "Existence by counting." },
  // Number Theory
  { id: "divisibility", name: "Divisibility & Primes", pathId: "number-theory", blurb: "Factorizations, divisor counting, gcd/lcm." },
  { id: "modular", name: "Modular Arithmetic", pathId: "number-theory", blurb: "Congruences, remainders, cycles." },
  { id: "diophantine", name: "Diophantine Equations", pathId: "number-theory", blurb: "Integer solutions, factoring tricks." },
  { id: "totient-crt", name: "Euler Totient & CRT", pathId: "number-theory", blurb: "Advanced congruence machinery." },
  // Olympiad
  { id: "invariants", name: "Invariants & Monovariants", pathId: "olympiad", blurb: "What never changes." },
  { id: "extremal", name: "Extremal Principle", pathId: "olympiad", blurb: "Look at the largest, the smallest, the first." },
  { id: "functional-equations", name: "Functional Equations", pathId: "olympiad", blurb: "Substitution, injectivity, Cauchy." },
  { id: "recursion", name: "Recursive Sequences", pathId: "olympiad", blurb: "Recurrences, characteristic roots." },
  { id: "graph-theory", name: "Graph Theory", pathId: "olympiad", blurb: "Degrees, connectivity, coloring." },
  { id: "olympiad-geometry", name: "Advanced Geometry", pathId: "olympiad", blurb: "Cyclic quads, radical axes, projective ideas." },
  { id: "inequalities-olympiad", name: "Inequalities", pathId: "olympiad", blurb: "AM-GM, Cauchy-Schwarz, smoothing." },
  { id: "generating-functions", name: "Generating Functions", pathId: "olympiad", blurb: "Counting with power series." },
];

export const topicById = new Map(TOPICS.map(t => [t.id, t]));

export function topicName(id: string): string {
  return topicById.get(id)?.name ?? id;
}
