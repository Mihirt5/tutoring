import type { CourseLesson } from "@/lib/courses/types";

export default {
  slug: "factor-expressions-and-simplify-radicals",
  intro:
    "Long calculations often become short when you change their form. Your first task is to recognize what stays equal while an expression is rearranged, factored, or written with simpler radicals.",
  sections: [
    {
      id: "a1012-m01-l01-s1",
      title: "Choose a useful representation",
      body: [
        "An identity is an equality that holds for every input for which both sides are defined. The distributive law explains factoring: multiplying a sum distributes a common factor, and factoring reverses that multiplication. For example, grouping an expression by a repeated bracket can reveal a product that is difficult to notice term by term. Before expanding, ask whether the question needs a value, a factor, or a comparison.",
        "The difference of two squares is useful because the middle terms cancel: $(u-v)(u+v)=u^2-v^2$. A product of numbers equally far from a convenient center can therefore be calculated from the center squared minus the offset squared. This is an exact calculation, not an approximation.",
      ],
      keyIdea:
        "Look for repeated factors and a convenient center before multiplying everything out.",
    },
    {
      id: "a1012-m01-l01-s2",
      title: "Cancellation changes the appearance, not the original domain",
      body: [
        "You may cancel a common nonzero factor from a numerator and denominator. You cannot cancel a term from a sum. Factoring first makes this distinction visible: the entire numerator and denominator must each contain the factor being removed. A simplified expression can be easier to evaluate even though it retains every restriction inherited from its original denominator.",
        "Keep a short list of forbidden values beside the calculation. If a factor disappears during simplification, its forbidden zero still matters. A formula that gives a number at that input does not repair the undefined original expression. This detail becomes especially important when a later problem asks you to solve an equation.",
      ],
      keyIdea: "Cancel factors only, and retain the original restrictions.",
    },
    {
      id: "a1012-m01-l01-s3",
      title: "Radicals have multiplicative structure",
      body: [
        "For nonnegative $a,b$, the nonnegative number $\\sqrt a\\sqrt b$ squares to $ab$, so it equals $\\sqrt{ab}$. Extracting a perfect-square factor is therefore justified. Once simplified, radicals with the same remaining square root combine by adding their coefficients. Radicals with different remaining roots generally do not.",
        "The square of a sum still contains a cross term, even when the terms are radicals. Conjugates avoid that cross term: $(u+v)(u-v)=u^2-v^2$. Use this relationship to rationalize a denominator or evaluate a product. Always remember that $\\sqrt{x^2}=|x|$ for real $x$, because the square-root symbol denotes the nonnegative root.",
      ],
      keyIdea:
        "Simplify factors under a radical, then apply ordinary algebra carefully.",
    },
  ],
  examples: [
    {
      id: "a1012-m01-l01-ex1",
      title: "A difference without two large squares",
      problem: "Evaluate $102^2-98^2$.",
      steps: [
        "Factor the difference as $(102-98)(102+98)$.",
        "The two factors are $4$ and $200$.",
        "The value is $4\\cdot200=800$.",
      ],
      answer: "800",
      takeaway:
        "A difference of squares becomes a product of a small difference and an easy sum.",
    },
    {
      id: "a1012-m01-l01-ex2",
      title: "A canceled factor retains a warning",
      problem:
        "Evaluate $(x^2-9)/(x-3)$ at $x=5$ and identify the forbidden input.",
      steps: [
        "Factor $x^2-9=(x-3)(x+3)$.",
        "For $x\\ne3$, the expression simplifies to $x+3$.",
        "At $x=5$ the value is $8$; the original expression remains undefined at $x=3$.",
      ],
      answer: "8; forbidden input 3",
      takeaway: "A simplified rule must travel with its original domain.",
    },
    {
      id: "a1012-m01-l01-ex3",
      title: "Combine only matching radicals",
      problem: "Simplify $\\sqrt{75}-\\sqrt{12}$.",
      steps: [
        "Extract squares: $\\sqrt{75}=5\\sqrt3$ and $\\sqrt{12}=2\\sqrt3$.",
        "Both terms now contain the same radical $\\sqrt3$.",
        "Subtract their coefficients to obtain $3\\sqrt3$.",
      ],
      answer: "$3\\sqrt3$",
      takeaway: "Radical simplification exposes like terms.",
    },
  ],
  commonMistakes: [
    "Canceling a term from a sum instead of a common factor.",
    "Forgetting a forbidden input after its denominator factor disappears.",
    "Treating $\\sqrt{a+b}$ as $\\sqrt a+\\sqrt b$.",
  ],
  exercises: [
    {
      id: "a1012-m01-l01-q1",
      role: "guided",
      question: "Evaluate $48\\cdot52$ using a convenient center.",
      hints: [
        "Both factors are near 50.",
        "Write the product as $(50-2)(50+2)$.",
        "Subtract $2^2$ from $50^2$.",
      ],
      solutionSteps: [
        "The center is 50 and the offset is 2.",
        "The difference-of-squares identity gives $50^2-2^2$.",
        "The result is $2500-4=2496$.",
      ],
      difficulty: 4,
      kind: "numeric",
      answer: "2496",
    },
    {
      id: "a1012-m01-l01-q2",
      role: "guided",
      question:
        "The expression $(x^2-4)/(x^2+x-2)$ is undefined at two real values. Find their sum.",
      hints: [
        "Look only at the original denominator.",
        "Factor it as $(x+2)(x-1)$.",
        "The forbidden inputs are $-2$ and $1$.",
      ],
      solutionSteps: [
        "A denominator cannot be zero.",
        "The factorization gives forbidden values $x=-2$ and $x=1$, even if a factor later cancels.",
        "Their sum is $-2+1=-1$.",
      ],
      difficulty: 4,
      kind: "numeric",
      answer: "-1",
    },
    {
      id: "a1012-m01-l01-q3",
      role: "independent",
      question: "Find $(\\sqrt{18}+\\sqrt8)^2$.",
      hints: [
        "Extract square factors first.",
        "The sum becomes $3\\sqrt2+2\\sqrt2$.",
        "Square $5\\sqrt2$.",
      ],
      solutionSteps: [
        "The radicals simplify to $3\\sqrt2$ and $2\\sqrt2$.",
        "Their sum is $5\\sqrt2$.",
        "Its square is $25\\cdot2=50$.",
      ],
      difficulty: 5,
      kind: "numeric",
      answer: "50",
    },
    {
      id: "a1012-m01-l01-q4",
      role: "independent",
      question:
        "Real numbers $a,b$ satisfy $a+b=7$ and $ab=10$. Find $a^3+b^3$.",
      hints: [
        "Expand the cube of $a+b$.",
        "The mixed terms combine to $3ab(a+b)$.",
        "Compute $7^3-3\\cdot10\\cdot7$.",
      ],
      solutionSteps: [
        "Expansion gives $(a+b)^3=a^3+b^3+3ab(a+b)$.",
        "Rearrange to get $a^3+b^3=7^3-3(10)(7)$.",
        "The answer is $343-210=133$.",
      ],
      difficulty: 5,
      kind: "numeric",
      answer: "133",
    },
    {
      id: "a1012-m01-l01-q5",
      role: "independent",
      question: "Find $(\\sqrt7+\\sqrt3)(\\sqrt7-\\sqrt3)$.",
      hints: [
        "The factors are conjugates.",
        "The two cross terms cancel.",
        "Subtract the squares of the two radicals.",
      ],
      solutionSteps: [
        "Use $(u+v)(u-v)=u^2-v^2$.",
        "The squares are 7 and 3.",
        "The result is $7-3=4$.",
      ],
      difficulty: 5,
      kind: "numeric",
      answer: "4",
    },
    {
      id: "a1012-m01-l01-q6",
      role: "independent",
      question: "If $a+d=10$ and $b+c=8$, find $ab+ac+db+dc$.",
      hints: [
        "Group the first two and last two terms.",
        "Factor each group by its shared factor.",
        "Look for $(a+d)(b+c)$.",
      ],
      solutionSteps: [
        "Grouping yields $a(b+c)+d(b+c)$.",
        "Factor the repeated bracket to get $(a+d)(b+c)$.",
        "The value is $10\\cdot8=80$.",
      ],
      difficulty: 5,
      kind: "numeric",
      answer: "80",
    },
  ],
  summary: [
    "Choose a representation that matches the requested quantity.",
    "Use identities as justified transformations.",
    "Factor before canceling and preserve domain restrictions.",
  ],
  nextConnection:
    "The next lesson uses these transformations inside equations, where preserving the set of valid solutions becomes the central concern.",
} satisfies CourseLesson;
