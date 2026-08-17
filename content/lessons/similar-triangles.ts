import type { Lesson } from "@/lib/types";

export const lesson: Lesson = {
  slug: "similar-triangles",
  blocks: [
    {
      type: "intro",
      body:
        "Similar triangles are the single most-used tool in contest geometry. Two triangles with equal angles are the same shape at different scales — and “same shape” means every length ratio transfers from one to the other. Most length-finding problems are secretly a hunt for the right similar pair.",
    },
    {
      type: "intuition",
      title: "Same shape, different size",
      body:
        "If two triangles agree in two angles, they agree in all three (angles sum to $180°$) — so one is a scaled copy of the other. The scale factor $k$ multiplies *every* length: sides, altitudes, medians, perimeters. Areas, being two-dimensional, scale by $k^2$.",
    },
    {
      type: "diagram",
      kind: "similar-triangles",
      caption:
        "Drag the scale slider: all sides scale together (ratio $k$), while the area scales by $k^2$ — one dimension versus two.",
    },
    {
      type: "example",
      title: "AA in the wild",
      problem: "A $6$-ft person casts a $4$-ft shadow while a tree casts an $18$-ft shadow. How tall is the tree?",
      steps: [
        "Sun rays are parallel, and both objects meet the ground at right angles — the two triangles share two angles: AA similarity.",
        "Corresponding sides are proportional: $\\tfrac{\\text{height}}{\\text{shadow}}$ is the same for both.",
        "$\\tfrac{h}{18} = \\tfrac{6}{4} = \\tfrac{3}{2}$.",
        "$h = 27$ ft.",
      ],
      takeaway: "To use similarity: (1) prove it (usually AA), (2) write the ratio of corresponding sides, (3) solve. Never skip step 2's correspondence check.",
    },
    {
      type: "quiz",
      kind: "numeric",
      question:
        "Two similar triangles have sides in ratio $1:3$. The smaller has area $5$. What is the area of the larger?",
      answer: 45,
      explanation: "Areas scale by the square of the length ratio: $5 \\cdot 3^2 = 45$.",
    },
    {
      type: "example",
      title: "The altitude configuration",
      problem:
        "In right triangle $ABC$ with the right angle at $C$, the altitude from $C$ meets hypotenuse $AB$ at $H$. Show the two small triangles are similar to the big one, and use it.",
      steps: [
        "Triangle $ACH$ shares angle $A$ with triangle $ABC$, and both have a right angle — AA gives $\\triangle ACH \\sim \\triangle ABC$.",
        "Likewise $\\triangle CBH \\sim \\triangle ABC$. All three triangles are similar.",
        "From the similarities: $CH^2 = AH \\cdot HB$ (the altitude is the geometric mean of the two hypotenuse pieces).",
        "Also $AC^2 = AH \\cdot AB$ and $BC^2 = BH \\cdot AB$ — three formulas from one configuration.",
      ],
      takeaway: "The right-triangle altitude configuration appears constantly on the AMC/AIME. Recognize it instantly; the three geometric-mean relations come free.",
    },
    {
      type: "insight",
      body:
        "Ratio bookkeeping is half the battle. Name the scale factor $k$ explicitly and write correspondences vertex-by-vertex ($\\triangle ABC \\sim \\triangle DEF$ means $AB:DE = BC:EF = CA:FD$). Mislabeled correspondence is the #1 similarity error.",
    },
    {
      type: "pitfall",
      body:
        "Scaling area by $k$ instead of $k^2$. Lengths are one-dimensional, areas two-dimensional, volumes three: ratios $k$, $k^2$, $k^3$. If a problem mixes lengths and areas, write the dimension of each quantity before scaling anything.",
    },
    {
      type: "quiz",
      kind: "numeric",
      question:
        "Two similar triangles have sides in ratio $2:3$. The smaller has perimeter $12$. What is the perimeter of the larger?",
      answer: 18,
      explanation: "Perimeter is a length — it scales by $k = \\tfrac32$: $12 \\cdot \\tfrac32 = 18$.",
    },
    {
      type: "practice",
      problemIds: ["sim-1", "sim-2", "sim-3", "tri-3"],
    },
    {
      type: "summary",
      points: [
        "AA is the workhorse: two equal angles ⇒ similar.",
        "Lengths scale by $k$; areas by $k^2$; volumes by $k^3$.",
        "Write correspondences vertex-by-vertex before writing ratios.",
        "Memorize the right-triangle altitude configuration and its geometric means.",
      ],
      formulas: [
        "$\\triangle ABC \\sim \\triangle DEF \\Rightarrow \\tfrac{AB}{DE} = \\tfrac{BC}{EF} = \\tfrac{CA}{FD}$",
        "Area ratio $= k^2$",
        "Altitude to hypotenuse: $CH^2 = AH \\cdot HB$",
      ],
    },
    {
      type: "flashcards",
      cards: [
        { front: "Similarity criterion used 90% of the time", back: "AA — two equal angles force the third." },
        { front: "Length ratio $k$ ⇒ area ratio?", back: "$k^2$. (Volume: $k^3$.)" },
        { front: "Altitude to the hypotenuse satisfies…", back: "$h^2 = pq$, the geometric mean of the hypotenuse segments." },
      ],
    },
  ],
};
