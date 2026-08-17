import type { Lesson } from "@/lib/types";

export const lesson: Lesson = {
  slug: "sequences-telescoping",
  blocks: [
    {
      type: "intro",
      body:
        "Sequences are where contests test whether you see *structure over time*. Arithmetic and geometric sequences are the vocabulary; telescoping — the art of engineered cancellation — is the first genuinely beautiful technique most students meet.",
    },
    {
      type: "intuition",
      title: "Steps and ratios",
      body:
        "An arithmetic sequence takes equal *steps*: to reach term $n$ from term $1$, you take $n-1$ steps. A geometric sequence applies equal *ratios*. Every formula about them is just counting steps carefully — the classic error is counting one step too many.",
    },
    {
      type: "quiz",
      kind: "numeric",
      question: "An arithmetic sequence has $a_1 = 2$ and common difference $5$. What is $a_{10}$?",
      answer: 47,
      explanation: "Nine steps from the first term: $a_{10} = 2 + 9 \\cdot 5 = 47$. ($10$ steps is the fencepost trap.)",
    },
    {
      type: "example",
      title: "Summing by pairing",
      problem: "Compute $1 + 2 + 3 + \\cdots + 100$.",
      steps: [
        "Pair the outside in: $(1 + 100), (2 + 99), \\ldots$ — each pair sums to $101$.",
        "There are $50$ pairs.",
        "Sum $= 50 \\cdot 101 = 5050$.",
        "In general: $1 + \\cdots + n = \\tfrac{n(n+1)}{2}$ — the average term $\\tfrac{n+1}{2}$ times the count $n$.",
      ],
      takeaway: "Arithmetic series $=$ (number of terms) $\\times$ (average of first and last).",
    },
    {
      type: "example",
      title: "Telescoping: engineered collapse",
      problem: "Compute $\\displaystyle\\sum_{k=1}^{99} \\frac{1}{k(k+1)}$.",
      steps: [
        "Split each term by partial fractions: $\\tfrac{1}{k(k+1)} = \\tfrac{1}{k} - \\tfrac{1}{k+1}$.",
        "Write out the sum: $\\left(1 - \\tfrac12\\right) + \\left(\\tfrac12 - \\tfrac13\\right) + \\cdots + \\left(\\tfrac{1}{99} - \\tfrac{1}{100}\\right)$.",
        "Every negative piece cancels the next positive piece — the interior vanishes.",
        "Only the ends survive: $1 - \\tfrac{1}{100} = \\tfrac{99}{100}$.",
      ],
      takeaway: "Rewrite each term as a difference $f(k) - f(k+1)$; the sum collapses to $f(\\text{first}) - f(\\text{last}+1)$.",
    },
    {
      type: "insight",
      body:
        "Telescoping is a *design pattern*, not a formula. Products telescope too: $\\prod \\tfrac{k}{k+1} = \\tfrac{1}{n+1}$. When a sum or product looks impossible, ask: can each term be written as a difference (or ratio) of consecutive values of some function?",
    },
    {
      type: "pitfall",
      body:
        "Fencepost errors — everywhere. From $a_1$ to $a_n$ there are $n - 1$ steps; the sum $\\sum_{k=5}^{20}$ has $16$ terms, not $15$. Before finalizing any sequence answer, test your formula on a tiny case you can count by hand.",
    },
    {
      type: "quiz",
      kind: "numeric",
      question: "What is $1 + 2 + \\cdots + 100$?",
      answer: 5050,
      explanation: "$\\tfrac{100 \\cdot 101}{2} = 5050$ — fifty pairs of $101$.",
    },
    {
      type: "practice",
      problemIds: ["seq-1", "seq-2", "seq-4", "seq-3"],
    },
    {
      type: "summary",
      points: [
        "Arithmetic: count steps, not terms. Geometric: count ratio applications.",
        "Arithmetic series $=$ count $\\times$ average of the ends.",
        "Telescoping: rewrite terms as consecutive differences; keep only the boundary.",
        "Verify every sequence formula on a case small enough to count.",
      ],
      formulas: [
        "$a_n = a_1 + (n-1)d$",
        "$\\sum_{k=1}^n k = \\tfrac{n(n+1)}{2}$",
        "$\\tfrac{1}{k(k+1)} = \\tfrac1k - \\tfrac{1}{k+1}$",
        "Infinite geometric ($|r|<1$): $S = \\tfrac{a}{1-r}$",
      ],
    },
    {
      type: "flashcards",
      cards: [
        { front: "$n$th term of arithmetic sequence", back: "$a_1 + (n-1)d$ — $n-1$ steps, not $n$." },
        { front: "Telescoping decomposition of $\\tfrac{1}{k(k+1)}$", back: "$\\tfrac1k - \\tfrac1{k+1}$; the sum collapses to the endpoints." },
        { front: "Sum of infinite geometric series", back: "$\\tfrac{a}{1-r}$, valid when $|r| < 1$." },
      ],
    },
  ],
};
