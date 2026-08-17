import type { Lesson } from "@/lib/types";

export const lesson: Lesson = {
  slug: "ratios-proportional-reasoning",
  blocks: [
    {
      type: "intro",
      body:
        "Ratios are the first place school arithmetic becomes contest mathematics. The numbers stop being amounts and start being *relationships* — and relationships can be scaled, chained, and combined in ways raw numbers cannot.",
    },
    {
      type: "intuition",
      title: "Think in parts",
      body:
        "A ratio of $3:5$ says: cut the quantity into $8$ equal parts; one side takes $3$, the other takes $5$. The moment you ask “what is one part worth?”, almost every ratio problem becomes one division followed by one multiplication.",
    },
    {
      type: "diagram",
      kind: "ratio-bars",
      caption:
        "Adjust the ratio and the total: the bars re-partition. Notice the invariant — the *value of one part* is always total ÷ (sum of parts).",
    },
    {
      type: "example",
      title: "Parts in action",
      problem: "Two numbers are in ratio $3:5$ and sum to $96$. Find both.",
      steps: [
        "Total parts: $3 + 5 = 8$.",
        "One part: $96 \\div 8 = 12$.",
        "The numbers: $3 \\times 12 = 36$ and $5 \\times 12 = 60$.",
        "Check: $36 + 60 = 96$ ✓ and $36:60 = 3:5$ ✓.",
      ],
      takeaway: "Sum of parts → value of one part → everything else.",
    },
    {
      type: "quiz",
      kind: "numeric",
      question: "Two numbers are in ratio $2:3$ and sum to $40$. What is the larger number?",
      answer: 24,
      explanation: "Five parts make $40$, so one part is $8$; the larger number is $3 \\cdot 8 = 24$.",
    },
    {
      type: "example",
      title: "Chaining ratios",
      problem: "If $a:b = 2:3$ and $b:c = 4:5$, find $a:b:c$.",
      steps: [
        "The two ratios disagree about $b$ — one says $3$ parts, the other $4$.",
        "Rescale both so $b$ matches: $\\text{lcm}(3,4) = 12$.",
        "$a:b = 2:3 = 8:12$ and $b:c = 4:5 = 12:15$.",
        "Chain through the shared $b$: $a:b:c = 8:12:15$.",
      ],
      takeaway: "To chain ratios, rescale each so the shared quantity has the same number of parts — the lcm is your friend.",
    },
    {
      type: "insight",
      body:
        "A ratio is a fraction wearing different clothes: $a:b = 3:5$ means $\\tfrac{a}{b} = \\tfrac35$, and also $a = \\tfrac{3}{8}$ of the total. Fluently switching among the three views — parts, fraction of each other, fraction of the whole — is the actual skill being tested.",
    },
    {
      type: "pitfall",
      body:
        "Averaging ratios or percentages directly. Mixing $40\\%$ acid with $10\\%$ acid does *not* give $25\\%$ unless the volumes are equal — concentrations combine weighted by amount. Always drop down to actual quantities before averaging.",
    },
    {
      type: "quiz",
      kind: "mcq",
      question:
        "A recipe uses flour and sugar in ratio $5:2$. To use $350$ g of flour, how much sugar is needed?",
      choices: ["$100$ g", "$120$ g", "$140$ g", "$175$ g", "$200$ g"],
      answer: 2,
      explanation: "One part is $350 / 5 = 70$ g, so sugar is $2 \\cdot 70 = 140$ g.",
    },
    {
      type: "practice",
      problemIds: ["ratio-1", "ratio-2", "ratio-3", "pct-1"],
    },
    {
      type: "summary",
      points: [
        "Convert ratios to parts; find the value of one part first.",
        "Chain ratios by rescaling the shared quantity to a common value.",
        "Ratios, fractions of each other, and fractions of the whole are three views of one fact.",
        "Never average rates or percents without weighting by amount.",
      ],
      formulas: [
        "$a:b$ with total $T$: one part $= \\tfrac{T}{a+b}$",
        "$a:b = ka:kb$ for any $k > 0$",
        "Mixture: final concentration $= \\tfrac{\\text{total solute}}{\\text{total volume}}$",
      ],
    },
    {
      type: "flashcards",
      cards: [
        { front: "Ratio $3:5$, total $96$ — first move?", back: "One part $= 96/(3+5) = 12$." },
        { front: "Chain $a:b = 2:3$ with $b:c = 4:5$", back: "Rescale $b$ to $\\text{lcm}(3,4)=12$: $a:b:c = 8:12:15$." },
        { front: "Why can't you average two concentrations?", back: "They weight by volume — compute total solute over total volume." },
      ],
    },
  ],
};
