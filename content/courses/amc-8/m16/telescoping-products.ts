import type { CourseLesson } from "@/lib/courses/types";

export default {
  slug: "telescoping-products",
  intro:
    "Products can telescope just as sums do, but through cancelling matching factors from the numerator and denominator instead of matching pieces of a difference. Recognizing a telescoping product, and sometimes factoring a single term to reveal two separate telescoping chains inside it, turns a long multiplication into a short one.",
  sections: [
    {
      id: "a8-m16-l03-s1",
      title: "Recognizing a telescoping product",
      body: [
        "A product telescopes when each factor's numerator cancels with the denominator of a neighboring factor. In $\\frac{1}{2}\\cdot\\frac{2}{3}\\cdot\\frac{3}{4}\\cdot\\frac{4}{5}\\cdot\\frac{5}{6}$, the 2 in the first factor's denominator cancels with the 2 in the second factor's numerator, the 3 in the second factor's denominator cancels with the 3 in the third factor's numerator, and so on — leaving only the very first numerator and the very last denominator: $\\frac{1}{6}$.",
        "The same cancellation works in reverse for a product like $\\frac{2}{1}\\cdot\\frac{3}{2}\\cdot\\frac{4}{3}\\cdot\\frac{5}{4}\\cdot\\frac{6}{5}$, where every middle value cancels between a denominator and the next numerator, leaving the last numerator over the first denominator: $\\frac{6}{1}=6$.",
      ],
      keyIdea:
        "A product telescopes when each factor's numerator matches the denominator of a neighboring factor, leaving only the outermost numerator and denominator.",
    },
    {
      id: "a8-m16-l03-s2",
      title: "Rewriting a factor to expose cancellation",
      body: [
        "Some factors do not look like a telescoping fraction until they are factored. The factor $1-\\frac{1}{k^2}$ rewrites as $\\frac{k^2-1}{k^2}$, and since $k^2-1$ is a difference of squares, this factors further as $\\frac{(k-1)(k+1)}{k^2}=\\frac{k-1}{k}\\cdot\\frac{k+1}{k}$ — splitting one factor into the product of two separate simple fractions.",
        "Multiplying many such factors together separates into two independent telescoping chains: one chain built from all the $\\frac{k-1}{k}$ pieces, which telescopes on its own, and another built from all the $\\frac{k+1}{k}$ pieces, which telescopes separately. Evaluating each chain individually and then multiplying the two results together gives the value of the whole product.",
      ],
      keyIdea:
        "A factor like $1-\\frac{1}{k^2}$ splits via a difference of squares into $\\frac{k-1}{k}\\cdot\\frac{k+1}{k}$, producing two separate telescoping chains.",
    },
    {
      id: "a8-m16-l03-s3",
      title: "Evaluating the full product carefully",
      body: [
        "As with telescoping sums, it helps to write out the first two and last two factors explicitly before trusting the general pattern, since the exact starting and ending index determines exactly which numerator and denominator survive. For $\\prod_{k=a}^{b}\\frac{k}{k+1}$, the surviving value is $\\frac{a}{b+1}$ — the very first numerator over one more than the last denominator's base value.",
        "When a product splits into two separate chains, as with the $1-\\frac{1}{k^2}$ factors, each chain should be evaluated using this same first-over-last rule on its own index range, and the two results multiplied together only at the very end.",
      ],
      keyIdea:
        "Track the surviving numerator and denominator for each chain separately, especially when a factor splits into two chains, and multiply the results together last.",
    },
  ],
  examples: [
    {
      id: "a8-m16-l03-ex1",
      title: "A basic telescoping product",
      problem:
        "Evaluate $\\dfrac{1}{2}\\cdot\\dfrac{2}{3}\\cdot\\dfrac{3}{4}\\cdot\\dfrac{4}{5}\\cdot\\dfrac{5}{6}$.",
      steps: [
        "Each factor's numerator cancels with the previous factor's denominator.",
        "Only the first numerator, 1, and the last denominator, 6, survive.",
        "The product is $\\frac{1}{6}$.",
      ],
      answer: "1/6",
      takeaway:
        "In a telescoping product $\\frac{a}{b}\\cdot\\frac{b}{c}\\cdot\\frac{c}{d}\\cdots$, every internal value cancels, leaving only the outermost numerator and denominator.",
    },
    {
      id: "a8-m16-l03-ex2",
      title: "A telescoping product running the other way",
      problem:
        "Evaluate $\\dfrac{2}{1}\\cdot\\dfrac{3}{2}\\cdot\\dfrac{4}{3}\\cdot\\dfrac{5}{4}\\cdot\\dfrac{6}{5}$.",
      steps: [
        "Each factor's denominator cancels with the previous factor's numerator.",
        "Only the first denominator, 1, and the last numerator, 6, survive.",
        "The product is $\\frac{6}{1}=6$.",
      ],
      answer: "6",
      takeaway:
        "The same cancellation pattern works whether the fractions increase or decrease through the product.",
    },
    {
      id: "a8-m16-l03-ex3",
      title: "Splitting a factor with a difference of squares",
      problem:
        "Evaluate $\\left(1-\\dfrac{1}{2^2}\\right)\\left(1-\\dfrac{1}{3^2}\\right)\\left(1-\\dfrac{1}{4^2}\\right)\\left(1-\\dfrac{1}{5^2}\\right)$.",
      steps: [
        "Rewrite each factor as $1-\\frac{1}{k^2}=\\frac{k-1}{k}\\cdot\\frac{k+1}{k}$ for $k=2,3,4,5$.",
        "The $\\frac{k-1}{k}$ chain telescopes to $\\frac{1}{5}$ (first numerator 1, last denominator 5), and the $\\frac{k+1}{k}$ chain telescopes to $\\frac{6}{2}=3$ (last numerator 6, first denominator 2).",
        "Multiplying the two chain results together: $\\frac{1}{5}\\times3=\\frac{3}{5}$.",
      ],
      answer: "3/5",
      takeaway:
        "Splitting one factor into two chains, and evaluating each chain's own telescoping separately, handles products that are not already in ready-to-cancel form.",
    },
  ],
  commonMistakes: [
    "Multiplying every factor directly instead of noticing the numerators and denominators cancel across the product.",
    "Forgetting to split a factor like $1-\\frac{1}{k^2}$ into two separate chains before attempting to telescope it.",
    "Mixing up which chain's first value and which chain's last value survive when a product splits into two telescoping pieces.",
  ],
  exercises: [
    {
      id: "a8-m16-l03-q1",
      role: "guided",
      kind: "numeric",
      difficulty: 3,
      question:
        "Evaluate $\\dfrac{2}{3}\\cdot\\dfrac{3}{4}\\cdot\\dfrac{4}{5}\\cdot\\dfrac{5}{6}$.",
      answer: "1/3",
      hints: [
        "Check that each factor's numerator matches the previous factor's denominator.",
        "Cancel every value that appears as both a numerator and a denominator.",
        "Only the very first numerator and the very last denominator remain.",
      ],
      solutionSteps: [
        "Each factor's numerator cancels with the previous factor's denominator.",
        "Only the first numerator, 2, and the last denominator, 6, survive.",
        "The product is $\\frac{2}{6}=\\frac{1}{3}$.",
      ],
    },
    {
      id: "a8-m16-l03-q2",
      role: "guided",
      kind: "numeric",
      difficulty: 3,
      question:
        "Evaluate $\\dfrac{3}{2}\\cdot\\dfrac{4}{3}\\cdot\\dfrac{5}{4}\\cdot\\dfrac{6}{5}\\cdot\\dfrac{7}{6}$.",
      answer: "7/2",
      hints: [
        "Check that each factor's denominator matches the previous factor's numerator.",
        "Cancel every value that appears as both a numerator and a denominator.",
        "Only the very first denominator and the very last numerator remain.",
      ],
      solutionSteps: [
        "Each factor's denominator cancels with the previous factor's numerator.",
        "Only the first denominator, 2, and the last numerator, 7, survive.",
        "The product is $\\frac{7}{2}$.",
      ],
    },
    {
      id: "a8-m16-l03-q3",
      role: "independent",
      kind: "numeric",
      difficulty: 4,
      question:
        "Evaluate $\\dfrac{1}{2}\\cdot\\dfrac{2}{3}\\cdot\\dfrac{3}{4}\\cdots\\dfrac{9}{10}$.",
      answer: "1/10",
      hints: [
        "Identify the first numerator and the last denominator in the chain.",
        "Every value in between cancels against a matching neighbor.",
        "The product equals the first numerator divided by the last denominator.",
      ],
      solutionSteps: [
        "Every internal value cancels between consecutive factors.",
        "Only the first numerator, 1, and the last denominator, 10, survive.",
        "The product is $\\frac{1}{10}$.",
      ],
    },
    {
      id: "a8-m16-l03-q4",
      role: "independent",
      kind: "numeric",
      difficulty: 6,
      question:
        "Evaluate $\\left(1-\\dfrac{1}{3^2}\\right)\\left(1-\\dfrac{1}{4^2}\\right)\\left(1-\\dfrac{1}{5^2}\\right)\\left(1-\\dfrac{1}{6^2}\\right)$.",
      answer: "7/9",
      hints: [
        "Rewrite each factor $1-\\frac{1}{k^2}$ as $\\frac{k-1}{k}\\cdot\\frac{k+1}{k}$ for $k=3,4,5,6$.",
        "Evaluate the $\\frac{k-1}{k}$ chain and the $\\frac{k+1}{k}$ chain separately.",
        "Multiply the two chain results together at the end.",
      ],
      solutionSteps: [
        "Splitting each factor: $1-\\frac{1}{k^2}=\\frac{k-1}{k}\\cdot\\frac{k+1}{k}$ for $k=3,4,5,6$.",
        "The $\\frac{k-1}{k}$ chain telescopes to $\\frac{2}{6}=\\frac{1}{3}$, and the $\\frac{k+1}{k}$ chain telescopes to $\\frac{7}{3}$.",
        "Multiplying the two results: $\\frac{1}{3}\\times\\frac{7}{3}=\\frac{7}{9}$.",
      ],
    },
    {
      id: "a8-m16-l03-q5",
      role: "independent",
      kind: "mcq",
      difficulty: 4,
      question:
        "Which rewriting best exposes the telescoping structure hidden inside the factor $1-\\dfrac{1}{k^2}$?",
      choices: [
        "$k\\cdot k$",
        "$\\dfrac{k-1}{k}\\cdot\\dfrac{k+1}{k}$",
        "$k^2-1$, left unfactored",
        "$(k-1)+(k+1)$",
      ],
      answer: 1,
      hints: [
        "Rewrite $1-\\frac{1}{k^2}$ as a single fraction first.",
        "Recognize the numerator as a difference of squares.",
        "Factor the difference of squares into two linear pieces, each divided by $k$.",
      ],
      solutionSteps: [
        "Rewriting as a single fraction: $1-\\frac{1}{k^2}=\\frac{k^2-1}{k^2}$.",
        "Since $k^2-1$ is a difference of squares, it factors as $(k-1)(k+1)$.",
        "This gives $\\frac{(k-1)(k+1)}{k^2}=\\frac{k-1}{k}\\cdot\\frac{k+1}{k}$, two separate telescoping chains.",
      ],
    },
    {
      id: "a8-m16-l03-q6",
      role: "independent",
      kind: "numeric",
      difficulty: 5,
      question:
        "For which value of $n$ does $\\dfrac{1}{2}\\cdot\\dfrac{2}{3}\\cdot\\dfrac{3}{4}\\cdots\\dfrac{n}{n+1}=\\dfrac{1}{12}$?",
      answer: "11",
      hints: [
        "Identify the first numerator and the last denominator of this telescoping product in terms of $n$.",
        "Write the telescoped value as a single fraction involving $n$.",
        "Set that fraction equal to $\\frac{1}{12}$ and solve for $n$.",
      ],
      solutionSteps: [
        "This product telescopes to $\\frac{1}{n+1}$, with first numerator 1 and last denominator $n+1$.",
        "Setting $\\frac{1}{n+1}=\\frac{1}{12}$ gives $n+1=12$.",
        "Solving gives $n=11$.",
      ],
    },
  ],
  summary: [
    "A product telescopes when each factor's numerator cancels with a neighboring factor's denominator, leaving only the outermost values.",
    "A factor like $1-\\frac{1}{k^2}$ factors via a difference of squares into $\\frac{k-1}{k}\\cdot\\frac{k+1}{k}$, splitting into two separate telescoping chains.",
    "Track the surviving first and last values for each chain carefully, and multiply separate chains' results together only at the end.",
  ],
  nextConnection:
    "The final lesson in this module puts telescoping to work inside an equation that must first be simplified before it can be solved.",
} satisfies CourseLesson;
