import type { Lesson } from "@/lib/types";

export const lesson: Lesson = {
  slug: "estimation-number-sense",
  blocks: [
    {
      type: "intro",
      body:
        "Before a competitor computes anything exactly, they know roughly what the answer should be. Estimation is not laziness — it is a guidance system. On the AMC it eliminates answer choices; on the AIME it catches arithmetic slips before they cost you the problem.",
    },
    {
      type: "intuition",
      title: "Anchors, not calculations",
      body:
        "Every hard number lives near an easy one. $4.9\\%$ lives next to $5\\%$; $\\sqrt{90}$ lives between $\\sqrt{81}$ and $\\sqrt{100}$; $2^{10} = 1024$ lives next to $10^3$. The skill is choosing the *anchor*, computing with it, then reasoning about which direction the true answer drifted.",
    },
    {
      type: "diagram",
      kind: "number-line",
      caption:
        "Drag the slider: where does $\\sqrt{n}$ sit between consecutive integers? The bracketing squares tell you before any decimal expansion does.",
    },
    {
      type: "quiz",
      kind: "numeric",
      question: "Without a calculator: what is $\\lfloor \\sqrt{90} \\rfloor$?",
      answer: 9,
      explanation:
        "$9^2 = 81 \\le 90 < 100 = 10^2$, so $\\sqrt{90}$ is between $9$ and $10$: the floor is $9$.",
    },
    {
      type: "example",
      title: "Percent anchoring",
      problem: "Estimate $4.9\\%$ of $8120$.",
      steps: [
        "Anchor: $5\\%$ is an easy target — it's half of $10\\%$.",
        "$10\\%$ of $8120$ is $812$, so $5\\%$ is $406$.",
        "We used $5\\%$ instead of $4.9\\%$, overshooting by $0.1\\%$ of $8120 \\approx 8$.",
        "Estimate: $406 - 8 \\approx 398$. (Exact: $397.88$.)",
      ],
      takeaway: "Anchor at a friendly number, then correct for the drift — and always know the *direction* of your error.",
    },
    {
      type: "example",
      title: "Comparing towers",
      problem: "Which is larger: $3^{40}$ or $2^{60}$?",
      steps: [
        "Direct computation is hopeless — find a common exponent instead.",
        "$3^{40} = (3^2)^{20} = 9^{20}$ and $2^{60} = (2^3)^{20} = 8^{20}$.",
        "Same exponent, bigger base: $9^{20} > 8^{20}$.",
        "So $3^{40} > 2^{60}$ — no logarithms required.",
      ],
      takeaway: "To compare powers, force a common exponent (or a common base). $\\gcd$ of the exponents tells you the chunk size.",
    },
    {
      type: "insight",
      body:
        "The single most useful estimation fact in competition math: $2^{10} = 1024 \\approx 10^3$. It converts any power of $2$ into scientific notation almost instantly: $2^{100} = (2^{10})^{10} \\approx 10^{30}$ (and slightly more).",
    },
    {
      type: "pitfall",
      body:
        "Compounding errors in the same direction. If you round $48 \\to 50$ and $21 \\to 25$ in the product $48 \\cdot 21$, both roundings inflate: your estimate $1250$ is far above the true $1008$. Alternate your rounding directions, or track the total drift explicitly.",
    },
    {
      type: "quiz",
      kind: "mcq",
      question: "Which is closest to $0.000048 \\times 2{,}100{,}000$?",
      choices: ["$1$", "$10$", "$100$", "$1000$", "$10{,}000$"],
      answer: 2,
      explanation:
        "$0.000048 \\approx 5 \\times 10^{-5}$ and $2.1 \\times 10^6$: product $\\approx 10.5 \\times 10^{1} = 105$. Closest: $100$. Powers of ten first, digits second.",
    },
    {
      type: "practice",
      intro: "Now under contest conditions — the hint ladder is there if you stall.",
      problemIds: ["est-2", "est-1", "arith-3", "arith-1"],
    },
    {
      type: "summary",
      points: [
        "Estimate before you compute; the estimate audits the computation.",
        "Anchor at friendly numbers and track the direction of drift.",
        "Compare powers via common exponents or common bases.",
        "Scientific notation separates the size question from the digits question.",
      ],
      formulas: [
        "$2^{10} = 1024 \\approx 10^3$",
        "$n^2 \\le x < (n+1)^2 \\;\\Rightarrow\\; \\lfloor\\sqrt{x}\\rfloor = n$",
        "$a^{mk}\\text{ vs }b^{nk}$: compare $a^m$ vs $b^n$",
      ],
    },
    {
      type: "flashcards",
      cards: [
        { front: "$2^{10} \\approx {}$?", back: "$1024 \\approx 10^3$ — the master conversion between binary and decimal scales." },
        { front: "How do you compare $3^{40}$ and $2^{60}$?", back: "Common exponent: $9^{20}$ vs $8^{20}$. Bigger base wins." },
        { front: "Estimating $4.9\\%$ of a number", back: "Take $5\\%$ (half of $10\\%$), then subtract the $0.1\\%$ overshoot." },
      ],
    },
  ],
};
