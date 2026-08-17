import type { Problem } from "@/lib/types";

export const GEOMETRY_PROBLEMS: Problem[] = [
  {
    id: "ang-1",
    statement:
      "Two angles of a triangle measure $50°$ and $60°$. What is the third angle in degrees?",
    answerType: "integer",
    answer: 70,
    difficulty: 2,
    estMinutes: 1,
    topicId: "angles",
    subtopic: "Triangle angle sum",
    source: "AMC 8 style",
    tags: ["angle-sum"],
    hints: [
      "What do the angles of any triangle add to?",
      "$180°$.",
      "$180 - 50 - 60$.",
    ],
    solution: "$180° - 50° - 60° = 70°$.",
  },
  {
    id: "ang-2",
    statement:
      "Lines $\\ell$ and $m$ are parallel. A transversal makes a $40°$ angle with $\\ell$. What is the measure of the co-interior (same-side interior) angle at $m$, in degrees?",
    answerType: "mcq",
    choices: ["$40°$", "$50°$", "$130°$", "$140°$", "$150°$"],
    answer: 3,
    difficulty: 3,
    estMinutes: 2,
    topicId: "angles",
    subtopic: "Parallel lines",
    source: "AMC 8 style",
    tags: ["parallel-lines", "transversal"],
    hints: [
      "Sketch it — mark the $40°$ angle.",
      "Co-interior angles are supplementary.",
      "$180° - 40°$.",
    ],
    solution:
      "Same-side interior angles between parallel lines sum to $180°$, so the angle is $140°$.",
    commonMistakes: ["Confusing co-interior (supplementary) with alternate interior (equal)."],
  },
  {
    id: "ang-3",
    statement:
      "Each interior angle of a regular polygon measures $156°$. How many sides does it have?",
    answerType: "integer",
    answer: 15,
    difficulty: 4,
    estMinutes: 3,
    topicId: "angles",
    subtopic: "Polygon angles",
    source: "AMC 8 style",
    tags: ["polygon", "regular"],
    hints: [
      "Work with the exterior angle instead.",
      "Exterior $= 180° - 156° = 24°$.",
      "Exterior angles of any polygon sum to $360°$.",
    ],
    solution:
      "The exterior angle is $24°$, and $n = 360°/24° = 15$ sides.",
    altSolutions: ["Solve $\\tfrac{180(n-2)}{n} = 156$ directly."],
  },
  {
    id: "ang-4",
    statement:
      "In a triangle, two interior angles measure $35°$ and $65°$. What is the measure of the exterior angle at the third vertex, in degrees?",
    answerType: "integer",
    answer: 100,
    difficulty: 4,
    estMinutes: 2,
    topicId: "angles",
    subtopic: "Exterior angle theorem",
    source: "AMC 8 style",
    tags: ["exterior-angle"],
    hints: [
      "There's a one-step theorem for this.",
      "An exterior angle equals the sum of the two remote interior angles.",
      "$35° + 65°$.",
    ],
    solution:
      "By the exterior angle theorem, the exterior angle equals $35° + 65° = 100°$.",
  },
  {
    id: "tri-1",
    statement:
      "A right triangle has legs $9$ and $12$. What is the length of the hypotenuse?",
    answerType: "integer",
    answer: 15,
    difficulty: 3,
    estMinutes: 2,
    topicId: "triangles",
    subtopic: "Pythagorean theorem",
    source: "AMC 8 style",
    tags: ["pythagorean", "triples"],
    hints: [
      "Pythagoras — but look for a shortcut first.",
      "$9$ and $12$ are both multiples of $3$.",
      "This is a scaled $3$–$4$–$5$ triangle.",
    ],
    solution:
      "$9$–$12$–$15$ is three times $3$–$4$–$5$: hypotenuse $15$. (Or $\\sqrt{81+144} = \\sqrt{225}$.)",
  },
  {
    id: "tri-2",
    statement:
      "The sides of a triangle are $4$ and $9$. How many integer values can the third side take?",
    answerType: "integer",
    answer: 7,
    difficulty: 4,
    estMinutes: 3,
    topicId: "triangles",
    subtopic: "Triangle inequality",
    source: "AMC 8 style",
    tags: ["triangle-inequality"],
    hints: [
      "The triangle inequality bounds the third side both ways.",
      "$9 - 4 < c < 9 + 4$.",
      "Count the integers strictly between $5$ and $13$.",
    ],
    solution:
      "$5 < c < 13$, so $c \\in \\{6, 7, \\ldots, 12\\}$: $7$ values.",
    commonMistakes: ["Including $5$ or $13$ — degenerate triangles don't count."],
  },
  {
    id: "tri-3",
    statement: "What is the area of a triangle with sides $13$, $14$, $15$?",
    answerType: "integer",
    answer: 84,
    difficulty: 5,
    estMinutes: 4,
    topicId: "triangles",
    subtopic: "Heron's formula",
    source: "AMC 10 style",
    tags: ["heron", "area"],
    hints: [
      "Heron's formula, or split the triangle cleverly.",
      "Semi-perimeter $s = 21$.",
      "$\\sqrt{21 \\cdot 8 \\cdot 7 \\cdot 6}$.",
    ],
    solution:
      "With $s = 21$: area $= \\sqrt{21 \\cdot 8 \\cdot 7 \\cdot 6} = \\sqrt{7056} = 84$.",
    altSolutions: [
      "Drop the altitude to the side of length $14$: it splits into $5$–$12$–$13$ and $9$–$12$–$15$ right triangles, so the height is $12$ and area $= \\tfrac{14 \\cdot 12}{2} = 84$.",
    ],
    related: ["tri-1"],
  },
  {
    id: "tri-4",
    statement:
      "An equilateral triangle has side length $12$. Its area is $a\\sqrt{b}$ with $b$ squarefree. What is $a + b$?",
    answerType: "integer",
    answer: 39,
    difficulty: 6,
    estMinutes: 3,
    topicId: "triangles",
    subtopic: "Equilateral area",
    source: "AIME style",
    tags: ["equilateral", "area"],
    hints: [
      "The altitude of an equilateral triangle splits it into two $30$–$60$–$90$ triangles.",
      "Altitude $= \\tfrac{\\sqrt3}{2} \\cdot 12 = 6\\sqrt3$.",
      "Area $= \\tfrac12 \\cdot 12 \\cdot 6\\sqrt3$.",
    ],
    solution:
      "Area $= \\tfrac{s^2\\sqrt3}{4} = \\tfrac{144\\sqrt3}{4} = 36\\sqrt3$, so $a + b = 36 + 3 = 39$.",
  },
  {
    id: "sim-1",
    statement:
      "Two similar triangles have corresponding sides in ratio $2:5$. If the smaller has area $8$, what is the area of the larger?",
    answerType: "integer",
    answer: 50,
    difficulty: 5,
    estMinutes: 3,
    topicId: "similarity",
    subtopic: "Area ratios",
    source: "AMC 10 style",
    tags: ["similarity", "area-ratio"],
    hints: [
      "How do areas scale when lengths scale?",
      "Areas scale by the square of the length ratio.",
      "$8 \\cdot (5/2)^2$.",
    ],
    solution:
      "Area ratio $= (5/2)^2 = 25/4$, so the larger area is $8 \\cdot \\tfrac{25}{4} = 50$.",
    commonMistakes: ["Scaling area by the length ratio $5/2$ instead of its square."],
  },
  {
    id: "sim-2",
    statement:
      "A $6$-foot person casts a $4$-foot shadow. At the same moment, a tree casts an $18$-foot shadow. How tall is the tree in feet?",
    answerType: "integer",
    answer: 27,
    difficulty: 4,
    estMinutes: 2,
    topicId: "similarity",
    subtopic: "Indirect measurement",
    source: "AMC 8 style",
    tags: ["similar-triangles", "proportion"],
    hints: [
      "Sun rays are parallel — the two triangles are similar.",
      "Height : shadow is the same for both.",
      "$\\tfrac{6}{4} = \\tfrac{h}{18}$.",
    ],
    solution:
      "$\\tfrac{h}{18} = \\tfrac{6}{4} = \\tfrac32$, so $h = 27$ feet.",
  },
  {
    id: "sim-3",
    statement:
      "In a right triangle with legs $6$ and $8$, the altitude to the hypotenuse has length $h$. What is $10h$?",
    answerType: "integer",
    answer: 48,
    difficulty: 6,
    estMinutes: 4,
    topicId: "similarity",
    subtopic: "Altitude to hypotenuse",
    source: "AMC 10 style",
    tags: ["right-triangle", "altitude", "area-two-ways"],
    hints: [
      "Compute the area two different ways.",
      "Area $= \\tfrac12 \\cdot 6 \\cdot 8$ and also $\\tfrac12 \\cdot 10 \\cdot h$.",
      "The hypotenuse is $10$.",
    ],
    solution:
      "Area $= 24 = \\tfrac12 \\cdot 10 \\cdot h$, so $h = 4.8$ and $10h = 48$. Computing one quantity two ways is a master key.",
    related: ["tri-1"],
  },
  {
    id: "circ-1",
    statement:
      "A central angle of a circle measures $100°$. What is the inscribed angle subtending the same arc, in degrees?",
    answerType: "mcq",
    choices: ["$25°$", "$40°$", "$50°$", "$80°$", "$100°$"],
    answer: 2,
    difficulty: 5,
    estMinutes: 2,
    topicId: "circles",
    subtopic: "Inscribed angle theorem",
    source: "AMC 10 style",
    tags: ["inscribed-angle"],
    hints: [
      "There's a fixed ratio between central and inscribed angles on the same arc.",
      "The inscribed angle is half the central angle.",
      "$100° / 2$.",
    ],
    solution:
      "An inscribed angle is half its central angle: $50°$.",
  },
  {
    id: "circ-2",
    statement:
      "A chord of a circle of radius $10$ is at distance $6$ from the center. How long is the chord?",
    answerType: "integer",
    answer: 16,
    difficulty: 5,
    estMinutes: 3,
    topicId: "circles",
    subtopic: "Chords and distance",
    source: "AMC 10 style",
    tags: ["chord", "pythagorean"],
    hints: [
      "Drop the perpendicular from the center to the chord — it bisects the chord.",
      "You get a right triangle with hypotenuse $10$ and one leg $6$.",
      "Half-chord $= \\sqrt{100 - 36} = 8$.",
    ],
    solution:
      "Half the chord is $\\sqrt{10^2 - 6^2} = 8$, so the chord is $16$.",
  },
  {
    id: "circ-3",
    statement:
      "Chords $AB$ and $CD$ of a circle meet at $P$ inside the circle. If $AP = 3$, $PB = 8$, and $CP = 4$, what is $PD$?",
    answerType: "integer",
    answer: 6,
    difficulty: 6,
    estMinutes: 3,
    topicId: "circles",
    subtopic: "Power of a point",
    source: "AMC 10 style",
    tags: ["power-of-a-point"],
    hints: [
      "Intersecting chords obey a product rule.",
      "$AP \\cdot PB = CP \\cdot PD$.",
      "$3 \\cdot 8 = 4 \\cdot PD$.",
    ],
    solution:
      "Power of the point $P$: $AP \\cdot PB = CP \\cdot PD$, so $PD = 24/4 = 6$.",
  },
  {
    id: "cg-1",
    statement:
      "What is the area of the triangle with vertices $(0,0)$, $(8,0)$, and $(3,7)$?",
    answerType: "integer",
    answer: 28,
    difficulty: 5,
    estMinutes: 3,
    topicId: "coordinate-geometry",
    subtopic: "Shoelace formula",
    source: "AMC 10 style",
    tags: ["shoelace", "area"],
    hints: [
      "One side lies on the $x$-axis — that makes base and height easy.",
      "Base $= 8$ along the axis; the height is the $y$-coordinate of the apex.",
      "Area $= \\tfrac12 \\cdot 8 \\cdot 7$.",
    ],
    solution:
      "Base $8$, height $7$: area $= 28$. The Shoelace formula gives the same: $\\tfrac12 |8 \\cdot 7 - 0| = 28$.",
  },
  {
    id: "cg-2",
    statement:
      "Point $Q$ is the reflection of $P = (3,4)$ over the line $y = x$. What is the square of the distance $PQ$?",
    answerType: "integer",
    answer: 2,
    difficulty: 6,
    estMinutes: 3,
    topicId: "coordinate-geometry",
    subtopic: "Reflections",
    source: "AMC 10 style",
    tags: ["reflection", "distance"],
    hints: [
      "Reflecting over $y = x$ swaps coordinates.",
      "$Q = (4,3)$.",
      "$PQ^2 = (4-3)^2 + (3-4)^2$.",
    ],
    solution:
      "$Q = (4,3)$, so $PQ^2 = 1^2 + (-1)^2 = 2$.",
  },
  {
    id: "sol-1",
    statement:
      "A cube has surface area $96$. What is its volume?",
    answerType: "integer",
    answer: 64,
    difficulty: 4,
    estMinutes: 2,
    topicId: "solid-geometry",
    subtopic: "Cubes",
    source: "AMC 8 style",
    tags: ["cube", "surface-area", "volume"],
    hints: [
      "A cube has six identical square faces.",
      "Each face has area $96/6 = 16$.",
      "So the edge is $4$.",
    ],
    solution:
      "Face area $= 16$, edge $= 4$, volume $= 4^3 = 64$.",
  },
  {
    id: "sol-2",
    statement:
      "A cone has radius $6$ and height $4$. Its volume is $k\\pi$. What is $k$?",
    answerType: "integer",
    answer: 48,
    difficulty: 5,
    estMinutes: 2,
    topicId: "solid-geometry",
    subtopic: "Cone volume",
    source: "AMC 10 style",
    tags: ["cone", "volume"],
    hints: [
      "Recall the cone volume formula.",
      "$V = \\tfrac13 \\pi r^2 h$.",
      "$\\tfrac13 \\cdot 36 \\cdot 4$.",
    ],
    solution: "$V = \\tfrac13 \\pi \\cdot 36 \\cdot 4 = 48\\pi$, so $k = 48$.",
    commonMistakes: ["Forgetting the $\\tfrac13$ — that's a cylinder."],
  },
];
