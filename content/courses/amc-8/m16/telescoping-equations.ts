import type { CourseLesson } from "@/lib/courses/types";

export default {
  slug: "telescoping-equations",
  intro:
    "Some equations hide a telescoping sum or product on one side, with the number of terms itself left as the unknown to solve for. Attempting to solve such an equation before simplifying the telescoping side leads nowhere — the winning order is always to collapse the telescoping side down to a simple closed-form expression first, and only then apply ordinary equation-solving.",
  sections: [
    {
      id: "a8-m16-l04-s1",
      title: "Recognizing an equation with a telescoping side",
      body: [
        "A telescoping equation looks like an ordinary equation, except that one side is written out as a long sum or product — such as $1+3+5+\\cdots+(2n-1)=225$ or $\\frac{1}{1\\cdot2}+\\frac{1}{2\\cdot3}+\\cdots+\\frac{1}{n(n+1)}=\\frac{15}{16}$ — with the number of terms, $n$, appearing as both the unknown being solved for and the point where the pattern stops.",
        "The signal to watch for is a side of the equation that is clearly built from a repeating pattern rather than a single algebraic expression. Treating that side as if it were already a simple expression, and trying to isolate $n$ immediately, is the most common way these problems go wrong.",
      ],
      keyIdea:
        "A telescoping equation has a repeating-pattern side (a sum or product) and an ordinary target value, with the number of terms as the unknown.",
    },
    {
      id: "a8-m16-l04-s2",
      title: "Simplify the telescoping side completely first",
      body: [
        "Before doing anything else, apply the appropriate telescoping technique — splitting terms for a sum, or cancelling factors for a product — to reduce the complicated side entirely down to a single closed-form expression in $n$. The sum of the first $n$ odd numbers collapses to $n^2$; a sum like $\\frac{1}{1\\cdot2}+\\frac{1}{2\\cdot3}+\\cdots+\\frac{1}{n(n+1)}$ collapses to $\\frac{n}{n+1}$; a product like $\\frac{2}{1}\\cdot\\frac{3}{2}\\cdots\\frac{n+1}{n}$ collapses to $n+1$.",
        "Only once the telescoping side has been fully reduced does the equation become an ordinary one, with a single expression in $n$ set equal to a target value. Attempting to cross-multiply or isolate $n$ before this simplification step usually produces an unmanageable expression full of leftover terms that were never meant to survive.",
      ],
      keyIdea:
        "Fully collapse the telescoping side to a closed-form expression in $n$ before applying any other algebraic step.",
    },
    {
      id: "a8-m16-l04-s3",
      title: "Solving the simplified equation",
      body: [
        "Once simplified, the equation is solved with ordinary techniques: cross-multiplying to clear a fraction, taking a square root, or isolating $n$ through the usual steps. For $\\frac{n}{n+1}=\\frac{15}{16}$, cross-multiplying gives $16n=15(n+1)=15n+15$, so $n=15$. For $n^2=225$, taking the square root (and keeping only the positive root, since $n$ counts a number of terms) gives $n=15$.",
        "The final answer should be checked for sense in context: since $n$ counts a number of terms, it must come out as a positive whole number, and substituting it back into the original telescoping expression should reproduce the stated target value exactly.",
      ],
      keyIdea:
        "Solve the simplified equation with ordinary algebra, then confirm the result is a sensible positive whole number of terms.",
    },
  ],
  examples: [
    {
      id: "a8-m16-l04-ex1",
      title: "A telescoping identity inside an equation",
      problem:
        "Find the positive integer $n$ such that $1+3+5+\\cdots+(2n-1)=225$.",
      steps: [
        "The left side is the sum of the first $n$ odd numbers, which telescopes to $n^2$.",
        "The equation simplifies to $n^2=225$.",
        "Taking the positive square root gives $n=15$.",
      ],
      answer: "15",
      takeaway:
        "Recognizing the telescoping identity for the sum of odd numbers reduces the equation to a single square root.",
    },
    {
      id: "a8-m16-l04-ex2",
      title: "A telescoping fraction sum inside an equation",
      problem:
        "Find the positive integer $n$ such that $\\dfrac{1}{1\\cdot2}+\\dfrac{1}{2\\cdot3}+\\cdots+\\dfrac{1}{n(n+1)}=\\dfrac{15}{16}$.",
      steps: [
        "The left side telescopes to $\\frac{n}{n+1}$.",
        "The equation becomes $\\frac{n}{n+1}=\\frac{15}{16}$.",
        "Cross-multiplying gives $16n=15(n+1)=15n+15$, so $n=15$.",
      ],
      answer: "15",
      takeaway:
        "Simplifying the telescoping sum first turns the equation into a simple cross-multiplication.",
    },
    {
      id: "a8-m16-l04-ex3",
      title: "A telescoping product inside an equation",
      problem:
        "Find the positive integer $n$ such that $\\dfrac{2}{1}\\cdot\\dfrac{3}{2}\\cdot\\dfrac{4}{3}\\cdots\\dfrac{n+1}{n}=8$.",
      steps: [
        "The left side telescopes to $n+1$.",
        "The equation becomes $n+1=8$.",
        "Solving gives $n=7$.",
      ],
      answer: "7",
      takeaway:
        "A telescoping product often collapses to a simple linear expression in $n$, making the equation easy to solve once simplified.",
    },
  ],
  commonMistakes: [
    "Attempting to cross-multiply or isolate $n$ before the telescoping side has been fully simplified.",
    "Forgetting to check that the solved value of $n$ is a positive whole number, since $n$ counts a number of terms.",
    "Using the wrong telescoping formula (sum versus product, or the wrong closed form) for the pattern actually shown in the equation.",
  ],
  exercises: [
    {
      id: "a8-m16-l04-q1",
      role: "guided",
      kind: "numeric",
      difficulty: 5,
      question:
        "Find the positive integer $n$ such that $1+3+5+\\cdots+(2n-1)=121$.",
      answer: "11",
      hints: [
        "Recognize the left side as the sum of the first $n$ odd numbers.",
        "Recall the telescoping identity for this sum.",
        "Solve the resulting equation for $n$ by taking a square root.",
      ],
      solutionSteps: [
        "The left side telescopes to $n^2$.",
        "The equation becomes $n^2=121$.",
        "Taking the positive square root gives $n=11$.",
      ],
    },
    {
      id: "a8-m16-l04-q2",
      role: "guided",
      kind: "numeric",
      difficulty: 5,
      question:
        "Find the positive integer $n$ such that $\\dfrac{1}{1\\cdot2}+\\dfrac{1}{2\\cdot3}+\\cdots+\\dfrac{1}{n(n+1)}=\\dfrac{9}{10}$.",
      answer: "9",
      hints: [
        "Simplify the left side using the telescoping sum formula from the earlier lesson.",
        "Set the simplified expression equal to $\\frac{9}{10}$.",
        "Cross-multiply to clear the fractions and solve for $n$.",
      ],
      solutionSteps: [
        "The left side telescopes to $\\frac{n}{n+1}$.",
        "The equation becomes $\\frac{n}{n+1}=\\frac{9}{10}$.",
        "Cross-multiplying gives $10n=9(n+1)=9n+9$, so $n=9$.",
      ],
    },
    {
      id: "a8-m16-l04-q3",
      role: "independent",
      kind: "numeric",
      difficulty: 5,
      question:
        "Find the positive integer $n$ such that $\\dfrac{2}{1}\\cdot\\dfrac{3}{2}\\cdot\\dfrac{4}{3}\\cdots\\dfrac{n+1}{n}=15$.",
      answer: "14",
      hints: [
        "Simplify the left side using the telescoping product pattern.",
        "Set the simplified expression equal to 15.",
        "Solve the resulting simple equation for $n$.",
      ],
      solutionSteps: [
        "The left side telescopes to $n+1$.",
        "The equation becomes $n+1=15$.",
        "Solving gives $n=14$.",
      ],
    },
    {
      id: "a8-m16-l04-q4",
      role: "independent",
      kind: "numeric",
      difficulty: 6,
      question:
        "Find the positive integer $n$ such that $3\\left(\\dfrac{1}{1\\cdot2}+\\dfrac{1}{2\\cdot3}+\\cdots+\\dfrac{1}{n(n+1)}\\right)+1=\\dfrac{5}{2}$.",
      answer: "1",
      hints: [
        "Simplify the telescoping sum inside the parentheses first, before touching the rest of the equation.",
        "Substitute the simplified expression back in and isolate the term containing $n$.",
        "Solve the resulting fraction equation for $n$.",
      ],
      solutionSteps: [
        "The sum inside the parentheses telescopes to $\\frac{n}{n+1}$, so the equation becomes $3\\cdot\\frac{n}{n+1}+1=\\frac{5}{2}$.",
        "Subtracting 1 from both sides: $\\frac{3n}{n+1}=\\frac{3}{2}$.",
        "Cross-multiplying gives $6n=3(n+1)=3n+3$, so $3n=3$ and $n=1$.",
      ],
    },
    {
      id: "a8-m16-l04-q5",
      role: "independent",
      kind: "mcq",
      difficulty: 4,
      question:
        "A problem gives the equation $\\dfrac{1}{2}\\cdot\\dfrac{2}{3}\\cdots\\dfrac{n}{n+1}+5=n$. What should be done first?",
      choices: [
        "Multiply both sides by $n+1$ immediately",
        "Simplify the telescoping product on the left to a single fraction before doing anything else",
        "Guess and check values of $n$ starting from 1",
        "Take the square root of both sides",
      ],
      answer: 1,
      hints: [
        "Look at the structure of the left side of the equation before choosing an algebraic move.",
        "The left side is written as a long repeating product, not a single simplified expression.",
        "Any algebraic manipulation applied before simplifying that side risks working with far more terms than necessary.",
      ],
      solutionSteps: [
        "The left side of the equation is a telescoping product, not a single algebraic term.",
        "Simplifying it first, using the telescoping pattern, reduces it to $\\frac{1}{n+1}$.",
        "Only after this simplification does the equation become manageable with ordinary algebra.",
      ],
    },
    {
      id: "a8-m16-l04-q6",
      role: "independent",
      kind: "numeric",
      difficulty: 6,
      question:
        "Find the positive integer $n$ such that $2\\big(1+3+5+\\cdots+(2n-1)\\big)-14=274$.",
      answer: "12",
      hints: [
        "Simplify the sum of odd numbers inside the parentheses using its telescoping identity first.",
        "Substitute the simplified expression back into the full equation.",
        "Isolate $n^2$, then solve for the positive value of $n$.",
      ],
      solutionSteps: [
        "The sum of the first $n$ odd numbers telescopes to $n^2$, so the equation becomes $2n^2-14=274$.",
        "Adding 14 to both sides gives $2n^2=288$, so $n^2=144$.",
        "Taking the positive square root gives $n=12$.",
      ],
    },
  ],
  summary: [
    "A telescoping equation has one side built from a repeating sum or product pattern, with the number of terms as the unknown.",
    "Always fully collapse the telescoping side to a closed-form expression in $n$ before applying any other algebraic step.",
    "Solve the simplified equation with ordinary algebra, then confirm the result is a sensible positive whole number of terms.",
  ],
  nextConnection:
    "The next module turns to number theory, starting with prime numbers and the structural patterns they create in contest problems.",
} satisfies CourseLesson;
