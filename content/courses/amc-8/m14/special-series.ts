import type { CourseLesson } from "@/lib/courses/types";

export default {
  slug: "special-series",
  intro:
    "Sums of consecutive integers, consecutive squares, and consecutive cubes appear so often in contest problems that each has earned its own compact formula, saving the work of adding many terms by hand. These formulas also combine with subtraction to handle sums that do not start at 1, and one of them hides a striking identity connecting sums of cubes back to sums of integers.",
  sections: [
    {
      id: "a8-m14-l02-s1",
      title: "The sum of consecutive integers, revisited",
      body: [
        "The pairing technique from the previous lesson gives the sum of the first $n$ positive integers as $1+2+3+\\cdots+n=\\frac{n(n+1)}{2}$. This is simply the arithmetic sum formula applied to the sequence $1,2,3,\\ldots,n$, where the first term is 1, the last term is $n$, and there are $n$ terms.",
        "This formula is worth memorizing on its own, since it is the building block that the sum-of-squares and sum-of-cubes formulas are built from and compared against.",
      ],
      keyIdea:
        "$1+2+\\cdots+n=\\frac{n(n+1)}{2}$, the arithmetic sum formula applied to the first $n$ positive integers.",
    },
    {
      id: "a8-m14-l02-s2",
      title: "The sum of consecutive squares",
      body: [
        "The sum of the first $n$ perfect squares has its own closed formula: $1^2+2^2+3^2+\\cdots+n^2=\\frac{n(n+1)(2n+1)}{6}$. Unlike the sum of integers, this formula is not derived by simple pairing, but it is used the same way — substitute the value of $n$ and simplify.",
        "For example, the sum of the squares from 1 to 10 is $\\frac{10\\times11\\times21}{6}=\\frac{2310}{6}=385$. This formula grows much faster than the integer-sum formula, since it involves $n^3$ once the product is expanded, reflecting that squares themselves grow faster than the integers they come from.",
      ],
      keyIdea: "$1^2+2^2+\\cdots+n^2=\\frac{n(n+1)(2n+1)}{6}$.",
    },
    {
      id: "a8-m14-l02-s3",
      title: "The sum of consecutive cubes, and sums that don't start at 1",
      body: [
        "The sum of the first $n$ perfect cubes has a surprisingly elegant formula: $1^3+2^3+\\cdots+n^3=\\left(\\frac{n(n+1)}{2}\\right)^2$ — exactly the square of the sum-of-integers formula. This means the sum of the first $n$ cubes always equals $(1+2+\\cdots+n)^2$, a striking identity that is worth remembering on its own.",
        "Any of these three formulas can be adapted to a sum that does not start at 1 by subtracting: the sum from $a$ to $b$ equals the sum from 1 to $b$ minus the sum from 1 to $a-1$. For instance, $6^2+7^2+\\cdots+12^2$ equals $(1^2+\\cdots+12^2)-(1^2+\\cdots+5^2)$, using the sum-of-squares formula for each piece and subtracting.",
      ],
      keyIdea:
        "$1^3+2^3+\\cdots+n^3=\\left(\\frac{n(n+1)}{2}\\right)^2$; for a sum from $a$ to $b$, subtract the sum up to $a-1$ from the sum up to $b$.",
    },
  ],
  examples: [
    {
      id: "a8-m14-l02-ex1",
      title: "Sum of consecutive squares",
      problem: "Find $1^2+2^2+3^2+\\cdots+10^2$.",
      steps: [
        "Apply the sum-of-squares formula with $n=10$: $\\frac{n(n+1)(2n+1)}{6}$.",
        "Substituting gives $\\frac{10\\times11\\times21}{6}$.",
        "This equals $\\frac{2310}{6}=385$.",
      ],
      answer: "385",
      takeaway:
        "Substitute directly into the sum-of-squares formula rather than adding ten separate squares by hand.",
    },
    {
      id: "a8-m14-l02-ex2",
      title: "Sum of consecutive cubes",
      problem: "Find $1^3+2^3+3^3+\\cdots+6^3$.",
      steps: [
        "Apply the sum-of-cubes formula with $n=6$: $\\left(\\frac{n(n+1)}{2}\\right)^2$.",
        "Substituting gives $\\left(\\frac{6\\times7}{2}\\right)^2=(21)^2$.",
        "This equals $441$.",
      ],
      answer: "441",
      takeaway:
        "The sum of the first $n$ cubes is the square of the sum of the first $n$ integers.",
    },
    {
      id: "a8-m14-l02-ex3",
      title: "A sum that does not start at 1",
      problem: "Find $6^2+7^2+8^2+\\cdots+12^2$.",
      steps: [
        "Write this as the sum up to 12 minus the sum up to 5: $(1^2+\\cdots+12^2)-(1^2+\\cdots+5^2)$.",
        "Using the formula: $\\frac{12\\times13\\times25}{6}-\\frac{5\\times6\\times11}{6}=650-55$.",
        "This equals $595$.",
      ],
      answer: "595",
      takeaway:
        "A sum of squares that starts above 1 is the difference of two full sums, each computed with the standard formula.",
    },
  ],
  commonMistakes: [
    "Using the sum-of-integers formula when a problem actually asks for a sum of squares or cubes.",
    "Forgetting to subtract the sum up to $a-1$, rather than up to $a$, when a sum starts at a number $a$ greater than 1.",
    "Confusing $\\left(\\frac{n(n+1)}{2}\\right)^2$, the sum of cubes, with $\\frac{n(n+1)(2n+1)}{6}$, the sum of squares.",
  ],
  exercises: [
    {
      id: "a8-m14-l02-q1",
      role: "guided",
      kind: "numeric",
      difficulty: 3,
      question: "Find $1^2+2^2+3^2+4^2+5^2+6^2$.",
      answer: "91",
      hints: [
        "Use the sum-of-squares formula $\\frac{n(n+1)(2n+1)}{6}$ with $n=6$.",
        "Substitute $n=6$ into the numerator before dividing.",
        "Simplify the resulting fraction.",
      ],
      solutionSteps: [
        "Using $\\frac{n(n+1)(2n+1)}{6}$ with $n=6$: $\\frac{6\\times7\\times13}{6}$.",
        "The 6 in the numerator and denominator cancel, leaving $7\\times13$.",
        "This equals $91$.",
      ],
    },
    {
      id: "a8-m14-l02-q2",
      role: "guided",
      kind: "numeric",
      difficulty: 3,
      question: "Find $1^3+2^3+3^3+4^3$.",
      answer: "100",
      hints: [
        "Use the sum-of-cubes formula $\\left(\\frac{n(n+1)}{2}\\right)^2$ with $n=4$.",
        "First compute $\\frac{n(n+1)}{2}$, the sum of the first 4 integers.",
        "Square that result.",
      ],
      solutionSteps: [
        "The sum of the first 4 integers is $\\frac{4\\times5}{2}=10$.",
        "The sum of cubes is the square of this value: $10^2$.",
        "This equals $100$.",
      ],
    },
    {
      id: "a8-m14-l02-q3",
      role: "independent",
      kind: "numeric",
      difficulty: 3,
      question: "Find $8+9+10+\\cdots+20$.",
      answer: "182",
      hints: [
        "Write this as the sum up to 20 minus the sum up to 7.",
        "Apply the sum-of-integers formula to each piece.",
        "Subtract the two results.",
      ],
      solutionSteps: [
        "Using $\\frac{n(n+1)}{2}$: the sum up to 20 is $\\frac{20\\times21}{2}=210$, and the sum up to 7 is $\\frac{7\\times8}{2}=28$.",
        "The requested sum is $210-28$.",
        "This equals $182$.",
      ],
    },
    {
      id: "a8-m14-l02-q4",
      role: "independent",
      kind: "numeric",
      difficulty: 4,
      question: "Find $4^2+5^2+6^2+7^2$.",
      answer: "126",
      hints: [
        "Write this as the sum of squares up to 7 minus the sum of squares up to 3.",
        "Apply the sum-of-squares formula to each piece.",
        "Subtract the two results.",
      ],
      solutionSteps: [
        "Using $\\frac{n(n+1)(2n+1)}{6}$: the sum up to 7 is $\\frac{7\\times8\\times15}{6}=140$, and the sum up to 3 is $\\frac{3\\times4\\times7}{6}=14$.",
        "The requested sum is $140-14$.",
        "This equals $126$, matching a direct check: $16+25+36+49=126$.",
      ],
    },
    {
      id: "a8-m14-l02-q5",
      role: "independent",
      kind: "mcq",
      difficulty: 4,
      question: "Which expression equals $1^3+2^3+\\cdots+n^3$?",
      choices: [
        "$\\frac{n(n+1)}{2}$",
        "$\\left(\\frac{n(n+1)}{2}\\right)^2$",
        "$\\frac{n(n+1)(2n+1)}{6}$",
        "$n^2(n+1)^2$",
      ],
      answer: 1,
      hints: [
        "Recall that the sum of cubes has a special relationship to the sum of integers.",
        "The sum of cubes equals the square of the sum-of-integers formula, not the sum-of-squares formula.",
        "Check that the fourth choice, $n^2(n+1)^2$, is not the same expression as squaring $\\frac{n(n+1)}{2}$.",
      ],
      solutionSteps: [
        "The sum-of-cubes identity states $1^3+2^3+\\cdots+n^3=\\left(\\frac{n(n+1)}{2}\\right)^2$.",
        "The third choice is the sum-of-squares formula, a different formula entirely.",
        "The fourth choice, $n^2(n+1)^2$, equals $4$ times $\\left(\\frac{n(n+1)}{2}\\right)^2$, so it is not equivalent.",
      ],
    },
    {
      id: "a8-m14-l02-q6",
      role: "independent",
      kind: "numeric",
      difficulty: 5,
      question:
        "Find the value of $\\left(1^3+2^3+3^3+4^3+5^3\\right)-(1+2+3+4+5)^2$.",
      answer: "0",
      hints: [
        "Recall the identity relating the sum of the first $n$ cubes to the sum of the first $n$ integers.",
        "Both parts of this expression compute the same quantity, just written in different forms.",
        "Subtracting an expression from an equal expression always gives the same result.",
      ],
      solutionSteps: [
        "By the sum-of-cubes identity, $1^3+2^3+3^3+4^3+5^3=\\left(\\frac{5\\times6}{2}\\right)^2=15^2$.",
        "Also, $1+2+3+4+5=\\frac{5\\times6}{2}=15$, so $(1+2+3+4+5)^2=15^2$.",
        "Both terms equal $15^2=225$, so the difference is $225-225=0$.",
      ],
    },
  ],
  summary: [
    "The sum of the first $n$ integers is $\\frac{n(n+1)}{2}$, and the sum of the first $n$ squares is $\\frac{n(n+1)(2n+1)}{6}$.",
    "The sum of the first $n$ cubes is $\\left(\\frac{n(n+1)}{2}\\right)^2$, exactly the square of the sum of the first $n$ integers.",
    "A sum that starts above 1 is the difference of two full sums, computed with the same formula and subtracted.",
  ],
  nextConnection:
    "Sequences that grow by multiplying a fixed factor, rather than adding one, behave very differently — the next lesson develops the matching formulas for geometric sequences.",
} satisfies CourseLesson;
