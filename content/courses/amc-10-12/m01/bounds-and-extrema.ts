import type { CourseLesson } from "@/lib/courses/types";

export default {
  slug: "bounds-and-extrema",
  intro:
    "A competition problem may ask for the largest possible area or the smallest possible expression. You can often answer by proving a bound and showing exactly when it is reached.",
  sections: [
    {
      id: "a1012-m01-l03-s1",
      title: "Start with something that cannot be negative",
      body: [
        "For every real $t$, its square is nonnegative. This elementary fact supplies many useful bounds. If you rewrite an expression as a constant plus a square, the constant is a lower bound. If you rewrite it as a constant minus a square, the constant is an upper bound. Equality occurs only when the square is zero.",
        "Completing the square organizes a quadratic into this form. Take half the linear coefficient inside the square, then compensate for the constant you introduced. With a leading coefficient other than one, factor it from the quadratic and linear terms first. Expand your final expression as a quick check that the rewriting is exact.",
      ],
      keyIdea: "A bound is strongest when you can identify its equality case.",
    },
    {
      id: "a1012-m01-l03-s2",
      title: "Balanced quantities control products",
      body: [
        "For real $a,b$, the identity $(a-b)^2=(a+b)^2-4ab$ shows that $4ab\\le(a+b)^2$. When the sum is fixed, this limits the product, and equality requires $a=b$. Geometrically, among rectangles with a fixed perimeter, the square has the greatest area. The conclusion follows from algebra rather than from how a sketch looks.",
        "For positive quantities, the same reasoning gives the arithmetic-geometric mean inequality. Be attentive to the permitted domain: if lengths must be integers or one variable must lie in a certain interval, the balanced equality case may be unavailable. Then compare the nearest allowed candidates or analyze how far the expression lies from the ideal value.",
      ],
      keyIdea:
        "For a fixed sum, the product is largest when the two quantities are as equal as allowed.",
    },
    {
      id: "a1012-m01-l03-s3",
      title: "Prove attainability, not just an estimate",
      body: [
        "A minimum is an allowed value that is no larger than any other allowed value. Merely proving an expression is at least some number does not show that number is the minimum; you must exhibit an input that attains it. This is particularly important for strict inequalities and domains that omit an endpoint.",
        "Reciprocal expressions reward a similar structural approach. For $x>0$ and $k>0$, compare $x+k/x$ by observing that $(\\sqrt{x}-\\sqrt{k/x})^2\\ge0$. This gives a lower bound and an equality condition simultaneously. In a contest solution, state the sign assumption, derive the bound, and check whether the equality input is permitted before announcing the result.",
      ],
      keyIdea:
        "A complete optimization argument contains both a universal bound and a permitted equality example.",
    },
  ],
  examples: [
    {
      id: "a1012-m01-l03-ex1",
      title: "Find a minimum by completing the square",
      problem: "Find the minimum value of $x^2-10x+31$ over real $x$.",
      steps: [
        "Complete the square: $x^2-10x+31=(x-5)^2+6$.",
        "The square is nonnegative, so the expression is at least 6.",
        "At $x=5$ the square vanishes, so the minimum is 6.",
      ],
      answer: "6",
      takeaway:
        "Completing the square proves the bound and supplies the equality input.",
    },
    {
      id: "a1012-m01-l03-ex2",
      title: "A rectangle with fixed boundary length",
      problem:
        "A rectangle has perimeter 28. What is its maximum possible area?",
      steps: [
        "If side lengths are $a,b>0$, then $a+b=14$.",
        "From $(a-b)^2\\ge0$, $4ab\\le14^2=196$.",
        "Thus $ab\\le49$, achieved by $a=b=7$.",
      ],
      answer: "49",
      takeaway: "The balanced rectangle attains the product bound.",
    },
    {
      id: "a1012-m01-l03-ex3",
      title: "A reciprocal pair",
      problem: "For $t>0$, find the minimum of $t+16/t$.",
      steps: [
        "The nonnegative square $(\\sqrt t-4/\\sqrt t)^2$ expands to $t+16/t-8$.",
        "Therefore $t+16/t\\ge8$.",
        "Equality requires $t=4$, which is allowed, so the minimum is 8.",
      ],
      answer: "8",
      takeaway:
        "Deriving an inequality from a square keeps its domain and equality case visible.",
    },
  ],
  commonMistakes: [
    "Announcing a bound without showing it can be attained.",
    "Applying a positive-variable inequality to a negative variable.",
    "Ignoring integer or interval restrictions on the equality case.",
  ],
  exercises: [
    {
      id: "a1012-m01-l03-q1",
      role: "guided",
      question: "Find the minimum of $2x^2+12x+25$ over real $x$.",
      hints: [
        "Factor 2 from the quadratic and linear terms.",
        "Complete the square using $x+3$.",
        "Rewrite as $2(x+3)^2+7$.",
      ],
      solutionSteps: [
        "The expression equals $2(x^2+6x)+25$.",
        "Completing the square yields $2(x+3)^2+7$.",
        "Its minimum is 7, attained at $x=-3$.",
      ],
      difficulty: 4,
      kind: "numeric",
      answer: "7",
    },
    {
      id: "a1012-m01-l03-q2",
      role: "guided",
      question: "Positive numbers $a,b$ have sum 18. Find the maximum of $ab$.",
      hints: [
        "Use the square of $a-b$.",
        "The product is at most one quarter of the sum squared.",
        "Try $a=b=9$.",
      ],
      solutionSteps: [
        "Nonnegativity gives $4ab\\le(a+b)^2=324$.",
        "Hence $ab\\le81$.",
        "The allowed choice $a=b=9$ attains 81.",
      ],
      difficulty: 4,
      kind: "numeric",
      answer: "81",
    },
    {
      id: "a1012-m01-l03-q3",
      role: "independent",
      question: "Find the maximum of $11-3(x-2)^2$ over real $x$.",
      hints: [
        "The square cannot be negative.",
        "Subtracting three times it cannot increase 11.",
        "Set $x=2$ to test equality.",
      ],
      solutionSteps: [
        "For all real $x$, $3(x-2)^2\\ge0$.",
        "Therefore the expression is at most 11.",
        "At $x=2$ it equals 11, proving the maximum.",
      ],
      difficulty: 5,
      kind: "numeric",
      answer: "11",
    },
    {
      id: "a1012-m01-l03-q4",
      role: "independent",
      question:
        "Positive integers $a,b$ satisfy $a+b=15$. Find the maximum product $ab$.",
      hints: [
        "The ideal balanced values are $7.5$ and $7.5$.",
        "Integers must lie on either side of that midpoint.",
        "Compare 7 and 8 with pairs farther apart.",
      ],
      solutionSteps: [
        "Write $ab=a(15-a)=225/4-(a-15/2)^2$.",
        "For integer $a$, the smallest possible squared distance from $15/2$ is $1/4$.",
        "Thus the maximum is $225/4-1/4=56$, attained at 7 and 8.",
      ],
      difficulty: 5,
      kind: "numeric",
      answer: "56",
    },
    {
      id: "a1012-m01-l03-q5",
      role: "independent",
      question: "For $x>0$, find the minimum of $3x+12/x$.",
      hints: [
        "Factor out 3.",
        "Apply the reciprocal bound to $x+4/x$.",
        "Equality occurs when $x=2$.",
      ],
      solutionSteps: [
        "The expression is $3(x+4/x)$.",
        "The square $(\\sqrt x-2/\\sqrt x)^2\\ge0$ gives $x+4/x\\ge4$.",
        "The minimum is $3\\cdot4=12$, attained at $x=2$.",
      ],
      difficulty: 5,
      kind: "numeric",
      answer: "12",
    },
    {
      id: "a1012-m01-l03-q6",
      role: "independent",
      question: "For $0\\le x\\le2$, find the minimum of $(x-5)^2+1$.",
      hints: [
        "The unconstrained equality point 5 is unavailable.",
        "On this interval, 2 is closest to 5.",
        "Evaluate at $x=2$.",
      ],
      solutionSteps: [
        "The restriction gives $3\\le5-x\\le5$.",
        "Thus $(x-5)^2\\ge9$.",
        "The expression is at least 10 and equals 10 at the allowed endpoint $x=2$.",
      ],
      difficulty: 5,
      kind: "numeric",
      answer: "10",
    },
  ],
  summary: [
    "Rewrite a target using a nonnegative square.",
    "Identify the equality condition in the same calculation.",
    "Check that the equality input belongs to the allowed domain.",
  ],
  nextConnection:
    "The next module studies functions: the domain restrictions you used here become part of the definition of each input-output rule.",
} satisfies CourseLesson;
