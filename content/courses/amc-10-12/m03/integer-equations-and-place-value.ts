import type { CourseLesson } from "@/lib/courses/types";

export default {
  slug: "integer-equations-and-place-value",
  intro:
    "An equation with integer unknowns has more structure than the same equation over the reals. Divisibility and digit restrictions can reduce an apparently endless search to a short complete list.",
  sections: [
    {
      id: "a1012-m03-l03-s1",
      title: "Integer solutions require arithmetic structure",
      body: [
        "An integer equation asks for whole-number values, often with positivity or digit conditions as well. A linear equation may have infinitely many real solutions but only a few positive integer solutions. Reduce modulo one coefficient to constrain the other variable, then use positivity to limit its size. This combination gives a systematic search rather than guesswork.",
        "Always distinguish positive integers from nonnegative integers. Zero can create extra boundary solutions, and negative values can greatly expand the set. Write the permitted range beside each variable before counting. After finding all candidates, substitute them into the original equation and explain why your bounds excluded every other possibility.",
      ],
      keyIdea:
        "A remainder condition plus a bound often gives a complete integer solution list.",
    },
    {
      id: "a1012-m03-l03-s2",
      title: "Factorization turns equations into divisor problems",
      body: [
        "When variables multiply, rearrange the equation to expose a product of integer factors. A fixed positive product has finitely many positive factor pairs, so divisor structure becomes a solution method. Sometimes adding a small constant to both sides completes a product. Expand your proposed factors to verify that the rearrangement preserves the equation.",
        "Difference-of-squares equations are another example: $(x-y)(x+y)$ equals a fixed integer. The two factors must have the same parity for their half-sum and half-difference to be integers. Counting every factor pair without this parity check overcounts. Positivity conditions on $x,y$ can also eliminate equal factors or reverse their allowed order.",
      ],
      keyIdea:
        "Translate each factor pair back to the original variables and check its restrictions.",
    },
    {
      id: "a1012-m03-l03-s3",
      title: "Digits are coefficients in a positional expansion",
      body: [
        "In base $b$, a numeral with digits $a,c,d$ represents $ab^2+cb+d$. Each digit lies between zero and $b-1$, and a leading digit is nonzero. A digit symbol is a value, while its position determines its weight. Reversing a numeral exchanges the weights, not just the names of the digits.",
        "When a problem gives a relation between a numeral and its reversal, write both positional expressions before simplifying. The common terms often cancel, leaving a divisibility condition on digit differences. If the base is unknown, the largest digit supplies a lower bound on it. These restrictions are part of the mathematics, not merely notation.",
      ],
      keyIdea:
        "Expand a numeral by powers of its base before manipulating digit conditions.",
    },
  ],
  examples: [
    {
      id: "a1012-m03-l03-ex1",
      title: "Combine a congruence with positivity",
      problem: "Find all positive integer pairs $(x,y)$ satisfying $4x+7y=53$.",
      steps: [
        "Modulo 4, $3y\\equiv1$, so $y\\equiv3\\pmod4$.",
        "Positivity gives $7y\\le49$, hence $y\\le7$; candidates are 3 and 7.",
        "For $y=3$, $x=8$; for $y=7$, $x=1$. Both pairs check.",
      ],
      answer: "$(8,3)$ and $(1,7)$",
      takeaway:
        "The congruence identifies candidates and the bound proves the list is complete.",
    },
    {
      id: "a1012-m03-l03-ex2",
      title: "Complete an integer product",
      problem: "How many ordered positive integer pairs satisfy $xy+x+y=23$?",
      steps: [
        "Add 1 to write $(x+1)(y+1)=24$.",
        "Both factors must be at least 2. The ordered pairs are $(2,12),(3,8),(4,6)$ and their reversals.",
        "Subtracting 1 from each factor gives six valid ordered pairs.",
      ],
      answer: "6",
      takeaway:
        "Completing a product turns two variables into a divisor count.",
    },
    {
      id: "a1012-m03-l03-ex3",
      title: "Decode an unknown base",
      problem: "The base-$b$ numeral $132_b$ equals 56 in decimal. Find $b$.",
      steps: [
        "Expand by place value: $b^2+3b+2=56$.",
        "Rearrange to $b^2+3b-54=(b+9)(b-6)=0$.",
        "A base must exceed digit 3, so $b=6$; indeed $36+18+2=56$.",
      ],
      answer: "6",
      takeaway:
        "The digit restriction removes the negative algebraic candidate.",
    },
  ],
  commonMistakes: [
    "Forgetting whether zero is allowed.",
    "Counting a factor pair whose parity cannot produce integer variables.",
    "Ignoring the largest digit when checking a possible base.",
  ],
  exercises: [
    {
      id: "a1012-m03-l03-q1",
      role: "guided",
      question:
        "How many nonnegative integer pairs $(x,y)$ satisfy $5x+3y=24$?",
      hints: [
        "Zero is permitted.",
        "Reduce modulo 5 to obtain $y\\equiv3\\pmod5$.",
        "Use $0\\le y\\le8$.",
      ],
      solutionSteps: [
        "The only allowed values congruent to 3 modulo 5 are 3 and 8.",
        "They yield $(x,y)=(3,3)$ and $(0,8)$.",
        "Both check, so there are 2 pairs.",
      ],
      difficulty: 4,
      kind: "numeric",
      answer: "2",
    },
    {
      id: "a1012-m03-l03-q2",
      role: "guided",
      question: "Positive integers $x,y$ satisfy $xy+2x+3y=19$. Find $x+y$.",
      hints: [
        "Complete a product by adding 6.",
        "Use $(x+3)(y+2)=25$.",
        "Each factor must be greater than one.",
      ],
      solutionSteps: [
        "The completed product is 25, with $x+3\\ge4$ and $y+2\\ge3$.",
        "Only the factor pair $(5,5)$ satisfies both bounds.",
        "Thus $x=2,y=3$, and their sum is 5.",
      ],
      difficulty: 4,
      kind: "numeric",
      answer: "5",
    },
    {
      id: "a1012-m03-l03-q3",
      role: "independent",
      question:
        "How many ordered pairs of positive integers $(x,y)$ satisfy $x^2-y^2=45$?",
      hints: [
        "Factor the difference of squares.",
        "The factors $x-y$ and $x+y$ are positive odd numbers, with the second larger.",
        "List the factor pairs $(1,45),(3,15),(5,9)$.",
      ],
      solutionSteps: [
        "The three listed pairs exhaust the positive factor pairs with smaller factor first.",
        "Their half-sums and half-differences give $(23,22),(9,6),(7,2)$.",
        "All have positive integer entries, so the answer is 3.",
      ],
      difficulty: 5,
      kind: "numeric",
      answer: "3",
    },
    {
      id: "a1012-m03-l03-q4",
      role: "independent",
      question: "Find the decimal value of $204_5$.",
      hints: [
        "The place weights are 25, 5, and 1.",
        "The middle digit contributes zero.",
        "Calculate $2\\cdot25+4$.",
      ],
      solutionSteps: [
        "The expansion is $2\\cdot5^2+0\\cdot5+4$.",
        "This equals $50+0+4$.",
        "The decimal value is 54.",
      ],
      difficulty: 5,
      kind: "numeric",
      answer: "54",
    },
    {
      id: "a1012-m03-l03-q5",
      role: "independent",
      question:
        "A two-digit decimal integer exceeds its reversal by 36, and its digits sum to 10. Find the integer.",
      hints: [
        "Let the tens digit be $a$ and the units digit be $b$.",
        "Subtract $10b+a$ from $10a+b$.",
        "Solve $a-b=4$ together with $a+b=10$.",
      ],
      solutionSteps: [
        "The reversal condition is $9(a-b)=36$, so $a-b=4$.",
        "Adding this to the digit sum gives $2a=14$, hence $a=7,b=3$.",
        "The number is 73; $73-37=36$ verifies it.",
      ],
      difficulty: 5,
      kind: "numeric",
      answer: "73",
    },
    {
      id: "a1012-m03-l03-q6",
      role: "independent",
      question:
        "How many ordered positive integer pairs satisfy $1/x+1/y=1/6$?",
      hints: [
        "Clear the nonzero denominators.",
        "Complete the product $(x-6)(y-6)=36$.",
        "The equation forces both $x$ and $y$ to exceed 6.",
      ],
      solutionSteps: [
        "The original equation implies $1/x<1/6$ and $1/y<1/6$, so both variables exceed 6.",
        "Rearranging $6x+6y=xy$ gives $(x-6)(y-6)=36$.",
        "Each positive divisor of $36=2^2\\cdot3^2$ chooses the first factor and uniquely determines the second; there are $3\\cdot3=9$ ordered pairs.",
      ],
      difficulty: 5,
      kind: "numeric",
      answer: "9",
    },
  ],
  summary: [
    "Combine congruences with bounds to prove completeness.",
    "Use factorization to replace an equation by a finite divisor problem.",
    "Expand positional numerals and retain every digit restriction.",
  ],
  nextConnection:
    "The next module turns your organized integer searches into general counting methods for ordered choices and unordered selections.",
} satisfies CourseLesson;
