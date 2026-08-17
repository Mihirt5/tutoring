import type { Lesson } from "@/lib/types";

export const lesson: Lesson = {
  slug: "angle-chasing",
  blocks: [
    {
      type: "intro",
      body:
        "Angle chasing is geometry's deduction game: from a handful of known angles, you propagate information across the figure using a small set of rules until the unknown angle has nowhere to hide. It is the foundation of every olympiad geometry solution.",
    },
    {
      type: "intuition",
      title: "Angles carry information along lines",
      body:
        "Three rules move angle information around: straight lines ($180°$ along a line), parallel lines (equal alternate angles), and triangles ($180°$ inside). Chasing is choosing the order in which to fire these rules — each new angle you label unlocks the next.",
    },
    {
      type: "diagram",
      kind: "angle-chase",
      caption:
        "Adjust the transversal: alternate interior angles stay equal, co-interior angles keep summing to $180°$. Parallel lines are angle-copying machines.",
    },
    {
      type: "quiz",
      kind: "numeric",
      question: "Two angles of a triangle are $40°$ and $75°$. What is the third, in degrees?",
      answer: 65,
      explanation: "$180 - 40 - 75 = 65$.",
    },
    {
      type: "example",
      title: "A three-rule chase",
      problem:
        "Lines $\\ell \\parallel m$. A transversal meets $\\ell$ at $A$ making a $62°$ angle. From a point $B$ on $m$, a segment makes a triangle with the transversal, with the angle at $B$ equal to $47°$. Find the third angle of the triangle at the transversal.",
      steps: [
        "The transversal crosses parallel lines: the angle it makes at $m$ equals $62°$ (alternate interior angles).",
        "That $62°$ is one interior angle of the triangle; the angle at $B$ is $47°$.",
        "Triangle sum: third angle $= 180° - 62° - 47° = 71°$.",
        "Each rule handed its output to the next — that chain *is* angle chasing.",
      ],
      takeaway: "Label every angle you learn, immediately. Chases stall when information stays in your head instead of on the figure.",
    },
    {
      type: "example",
      title: "Isosceles: symmetry for free",
      problem:
        "In triangle $ABC$, $AB = AC$ and $\\angle A = 40°$. The bisector of $\\angle B$ meets $AC$ at $D$. Find $\\angle BDC$.",
      steps: [
        "Isosceles: base angles are equal, so $\\angle B = \\angle C = \\tfrac{180 - 40}{2} = 70°$.",
        "The bisector splits $\\angle B$: $\\angle DBC = 35°$.",
        "In triangle $BDC$: $\\angle BDC = 180° - 35° - 70° = 75°$.",
        "Every step was a known rule; the art was the order.",
      ],
      takeaway: "The words “isosceles” and “bisector” are angle-equality generators. Extract their equalities before anything else.",
    },
    {
      type: "insight",
      body:
        "Exterior angle theorem — an exterior angle equals the sum of the two remote interior angles — is a two-rule shortcut worth internalizing. It saves a step in nearly every chase, and on timed contests, steps are seconds.",
    },
    {
      type: "pitfall",
      body:
        "Trusting the picture. Diagrams in contest problems are frequently drawn misleadingly — an angle that *looks* right is not right until a rule proves it. Chase with theorems, never with eyeballs.",
    },
    {
      type: "quiz",
      kind: "numeric",
      question: "What is the measure, in degrees, of each interior angle of a regular pentagon?",
      answer: 108,
      explanation: "Exterior angles sum to $360°$, so each is $72°$; interior $= 180 - 72 = 108°$.",
    },
    {
      type: "practice",
      problemIds: ["ang-1", "ang-2", "ang-4", "ang-3"],
    },
    {
      type: "summary",
      points: [
        "Three engines: straight-line $180°$, parallel-line equalities, triangle sum.",
        "Label angles the moment you deduce them.",
        "Isosceles and bisector are equality generators — harvest them first.",
        "Never conclude from the diagram; conclude from the rules.",
      ],
      formulas: [
        "Triangle: $\\alpha + \\beta + \\gamma = 180°$",
        "Exterior angle $=$ sum of remote interior angles",
        "Regular $n$-gon: exterior $= \\tfrac{360°}{n}$, interior $= 180° - \\tfrac{360°}{n}$",
      ],
    },
    {
      type: "flashcards",
      cards: [
        { front: "Exterior angle theorem", back: "Exterior angle $=$ sum of the two remote interior angles." },
        { front: "Interior angle of regular $n$-gon", back: "$180° - \\tfrac{360°}{n}$ (e.g. pentagon: $108°$)." },
        { front: "First move on an isosceles triangle?", back: "Mark the equal base angles — symmetry is free information." },
      ],
    },
  ],
};
