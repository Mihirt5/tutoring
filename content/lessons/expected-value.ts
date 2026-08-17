import type { Lesson } from "@/lib/types";

export const lesson: Lesson = {
  slug: "expected-value",
  blocks: [
    {
      type: "intro",
      body:
        "Expected value is probability's center of mass — the long-run average of a random quantity. And it obeys one law so powerful it feels illegal: expectations add, *even when the random quantities depend on each other*. Linearity of expectation solves AIME problems that direct computation cannot touch.",
    },
    {
      type: "intuition",
      title: "The long-run average",
      body:
        "Roll a die a million times and average the results: you'll get about $3.5$ — a value the die never shows. $E[X]$ is the probability-weighted average $\\sum x \\cdot P(X = x)$: each outcome contributes its value times how often it happens.",
    },
    {
      type: "diagram",
      kind: "ev-spinner",
      caption:
        "A spinner with adjustable payoffs: the needle's long-run average sits at the weighted mean — drag a payoff and watch the expectation slide.",
    },
    {
      type: "quiz",
      kind: "numeric",
      question:
        "A coin scores $1$ for heads, $0$ for tails. What is the expected total score over $10$ flips?",
      answer: 5,
      explanation:
        "Each flip contributes $E = \\tfrac12$; ten flips contribute $10 \\cdot \\tfrac12 = 5$ by linearity.",
    },
    {
      type: "proof",
      title: "Linearity of expectation",
      body: [
        "Claim: $E[X + Y] = E[X] + E[Y]$ for *any* random variables — no independence required.",
        "Proof sketch: $E[X+Y] = \\sum_{\\omega} (X(\\omega) + Y(\\omega))\\,P(\\omega)$, summing over outcomes $\\omega$.",
        "Split the sum: $\\sum_\\omega X(\\omega)P(\\omega) + \\sum_\\omega Y(\\omega)P(\\omega) = E[X] + E[Y]$.",
        "The split used only the distributive law — nowhere did we ask whether $X$ and $Y$ interact. That is why dependence is irrelevant, and why the technique is so strong.",
      ],
    },
    {
      type: "example",
      title: "Indicators: the hat check",
      problem: "Ten people grab hats uniformly at random. What is the expected number who get their own hat?",
      steps: [
        "The distribution of matches is genuinely complicated — don't compute it.",
        "Define indicator $X_i = 1$ if person $i$ gets their own hat, else $0$.",
        "$E[X_i] = P(\\text{person } i \\text{ matches}) = \\tfrac{1}{10}$.",
        "Linearity: $E[X_1 + \\cdots + X_{10}] = 10 \\cdot \\tfrac{1}{10} = 1$ — despite heavy dependence between people.",
      ],
      takeaway: "To find an expected *count*, write it as a sum of indicators and add their individual probabilities. Ignore dependence entirely.",
    },
    {
      type: "example",
      title: "Waiting for success",
      problem: "A die is rolled repeatedly. How many rolls, on average, until the first $6$?",
      steps: [
        "Let $E$ be the answer. Condition on the first roll.",
        "With probability $\\tfrac16$: done after 1 roll.",
        "With probability $\\tfrac56$: one roll is spent, and the process restarts identically: expected total $1 + E$.",
        "$E = \\tfrac16(1) + \\tfrac56(1 + E) \\Rightarrow E = 6$. In general, success probability $p$ ⇒ expected wait $\\tfrac1p$.",
      ],
      takeaway: "Self-similar processes yield one-line equations: expectation now $=$ cost of one step $+$ expectation after the step.",
    },
    {
      type: "pitfall",
      body:
        "Expecting $E[X]$ to be a possible value of $X$ — a die never rolls $3.5$. And the reverse error: assuming linearity extends to products. $E[XY] = E[X]E[Y]$ *does* require independence; only sums are unconditional.",
    },
    {
      type: "quiz",
      kind: "numeric",
      question: "A fair die is rolled $12$ times. What is the expected number of $6$s?",
      answer: 2,
      explanation: "Twelve indicators, each with $E = \\tfrac16$: $12 \\cdot \\tfrac16 = 2$.",
    },
    {
      type: "practice",
      problemIds: ["ev-1", "ev-2", "ev-3", "prob-2"],
    },
    {
      type: "summary",
      points: [
        "$E[X] = \\sum x\\,P(X{=}x)$: the probability-weighted average.",
        "Linearity: $E[X+Y] = E[X]+E[Y]$, dependence be damned.",
        "Expected counts = sums of indicator probabilities.",
        "Waiting time for probability $p$: $\\tfrac1p$.",
      ],
      formulas: [
        "$E[X] = \\sum_x x \\cdot P(X = x)$",
        "$E[\\sum X_i] = \\sum E[X_i]$",
        "$E[\\text{indicator}] = P(\\text{event})$",
        "Geometric waiting time: $E = \\tfrac{1}{p}$",
      ],
    },
    {
      type: "flashcards",
      cards: [
        { front: "Does linearity of expectation need independence?", back: "No — that's the whole point. Sums always split." },
        { front: "Expected number of events among $A_1..A_n$", back: "$\\sum P(A_i)$ — indicators plus linearity." },
        { front: "Expected rolls until a 6", back: "$6$ — waiting time is $1/p$." },
        { front: "Does $E[XY] = E[X]E[Y]$?", back: "Only under independence — unlike sums." },
      ],
    },
  ],
};
