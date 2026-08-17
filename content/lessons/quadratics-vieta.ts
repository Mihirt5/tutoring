import type { Lesson } from "@/lib/types";

export const lesson: Lesson = {
  slug: "quadratics-vieta",
  blocks: [
    {
      type: "intro",
      body:
        "The quadratic is the most-tested object on the AMC — but the contest never asks you to merely solve one. It asks about roots you never compute: their sum, their squares, their reciprocals. Vieta's formulas are how you answer without solving.",
    },
    {
      type: "intuition",
      title: "A parabola is symmetric",
      body:
        "Everything about $y = ax^2 + bx + c$ hangs on its axis of symmetry $x = -\\tfrac{b}{2a}$. The two roots sit symmetrically around it; the vertex is the extreme point on it. Completing the square is just re-centering coordinates on that axis.",
    },
    {
      type: "diagram",
      kind: "parabola-vieta",
      caption:
        "Drag the roots: the polynomial's coefficients update live. Watch $-b$ track the root *sum* and $c$ track the root *product* — Vieta's formulas, animated.",
    },
    {
      type: "example",
      title: "Extremes by completing the square",
      problem: "Find the minimum value of $f(x) = x^2 - 4x + 7$.",
      steps: [
        "Group the $x$-terms and complete: $x^2 - 4x = (x - 2)^2 - 4$.",
        "So $f(x) = (x-2)^2 + 3$.",
        "A square is never negative: $(x-2)^2 \\ge 0$, with equality at $x = 2$.",
        "Minimum value: $3$, achieved at $x = 2$.",
      ],
      takeaway: "Completing the square rewrites a quadratic as (perfect square) + (constant): the constant is the extreme value.",
    },
    {
      type: "quiz",
      kind: "numeric",
      question: "At what $x$-value does $y = x^2 - 6x + 5$ reach its minimum?",
      answer: 3,
      explanation: "The axis of symmetry is $x = -\\tfrac{b}{2a} = \\tfrac{6}{2} = 3$.",
    },
    {
      type: "proof",
      title: "Vieta's formulas, from first principles",
      body: [
        "Suppose $x^2 + px + q$ has roots $r$ and $s$. Then it factors as $(x - r)(x - s)$.",
        "Expand: $(x-r)(x-s) = x^2 - (r+s)x + rs$.",
        "Matching coefficients with $x^2 + px + q$: $r + s = -p$ and $rs = q$.",
        "For the general $ax^2 + bx + c$, divide by $a$ first: $r + s = -\\tfrac{b}{a}$, $rs = \\tfrac{c}{a}$. Nothing was solved — the relations fall out of the factorization itself.",
      ],
    },
    {
      type: "example",
      title: "Answering about roots you never find",
      problem: "If $r, s$ are the roots of $x^2 - 6x + 4 = 0$, find $r^2 + s^2$ and $\\tfrac1r + \\tfrac1s$.",
      steps: [
        "Vieta: $r + s = 6$ and $rs = 4$. (The roots themselves are irrational — ignore them.)",
        "$r^2 + s^2 = (r+s)^2 - 2rs = 36 - 8 = 28$.",
        "$\\tfrac1r + \\tfrac1s = \\tfrac{r+s}{rs} = \\tfrac{6}{4} = \\tfrac32$.",
        "Every symmetric expression in $r, s$ is reachable from the sum and product alone.",
      ],
      takeaway: "Symmetric in the roots ⇒ expressible via Vieta. Learn the standard conversions: $r^2+s^2$, $\\tfrac1r+\\tfrac1s$, $(r-s)^2 = (r+s)^2 - 4rs$.",
    },
    {
      type: "pitfall",
      body:
        "Sign errors. For $x^2 + px + q$, the root *sum* is $-p$, not $p$ — the minus sign is the most-forgotten symbol in competition algebra. Sanity-check with a factorable example: $x^2 - 7x + 12$ has roots $3, 4$: sum $7 = -(-7)$ ✓, product $12$ ✓.",
    },
    {
      type: "quiz",
      kind: "numeric",
      question: "What is the product of the roots of $x^2 - 5x + 6 = 0$?",
      answer: 6,
      explanation: "Vieta: the product is the constant term, $6$ (roots $2$ and $3$).",
    },
    {
      type: "insight",
      body:
        "The discriminant $b^2 - 4ac$ is the bridge between algebra and geometry: positive means two crossings, zero means tangency, negative means the parabola never meets the axis. Contest problems that say “exactly one solution” are discriminant problems in disguise.",
    },
    {
      type: "practice",
      problemIds: ["quad-1", "quad-2", "quad-3", "quad-4", "sys-2"],
    },
    {
      type: "summary",
      points: [
        "The axis $x = -b/2a$ organizes the whole parabola.",
        "Vieta: sum $= -b/a$, product $= c/a$ — no solving required.",
        "Any symmetric function of the roots reduces to sum and product.",
        "“Exactly one root” ⇒ discriminant $= 0$.",
      ],
      formulas: [
        "$r+s = -\\tfrac{b}{a}, \\quad rs = \\tfrac{c}{a}$",
        "$r^2 + s^2 = (r+s)^2 - 2rs$",
        "$(r-s)^2 = (r+s)^2 - 4rs = \\tfrac{b^2 - 4ac}{a^2}$",
      ],
    },
    {
      type: "flashcards",
      cards: [
        { front: "Vieta for $ax^2+bx+c$", back: "$r+s = -b/a$, $\\; rs = c/a$." },
        { front: "$r^2 + s^2$ from Vieta?", back: "$(r+s)^2 - 2rs$." },
        { front: "\"Exactly one solution\" signals…", back: "Discriminant $b^2 - 4ac = 0$." },
        { front: "Vertex of $y = ax^2+bx+c$", back: "At $x = -\\tfrac{b}{2a}$; value $c - \\tfrac{b^2}{4a}$." },
      ],
    },
  ],
};
