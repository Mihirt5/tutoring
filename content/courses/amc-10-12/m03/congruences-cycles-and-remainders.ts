import type { CourseLesson } from "@/lib/courses/types";

export default {
  slug: "congruences-cycles-and-remainders",
  intro:
    "A remainder is a compact description of an integer. Instead of computing a huge number, keep track of how it behaves when divided by a carefully chosen modulus.",
  sections: [
    {
      id: "a1012-m03-l02-s1",
      title: "Congruence preserves the relevant difference",
      body: [
        "Two integers are congruent modulo $m$ when their difference is divisible by the positive integer $m$. They therefore have the same remainder upon division by $m$. Replacing a number by a congruent smaller number preserves the remainder of any sum, difference, or product. This is why you can reduce intermediate calculations without waiting until the end.",
        "For a final remainder, use the representative from zero through $m-1$. Negative representatives are often useful during calculation, but the answer should obey the question's convention. For example, a residue described as one less than a multiple of $m$ has ordinary remainder $m-1$, not a negative remainder.",
      ],
      keyIdea: "Congruent numbers differ by a multiple of the modulus.",
    },
    {
      id: "a1012-m03-l02-s2",
      title: "Powers can repeat in a short cycle",
      body: [
        "Begin a power problem by computing a few successive residues. If the same residue returns and multiplication by the base repeats the same process, the sequence cycles. Reduce the exponent by the cycle length, taking care with an exponent that is a multiple of that length. It corresponds to the last position in the cycle when you listed powers starting at one.",
        "Division is more delicate than addition or multiplication. You may cancel a factor modulo $m$ when that factor is relatively prime to $m$. Otherwise cancellation can lose information. To solve a small congruence, testing the residue classes or finding a multiplicative inverse is safer than dividing as though the congruence were an ordinary equation.",
      ],
      keyIdea: "Verify the actual power cycle and justify any cancellation.",
    },
    {
      id: "a1012-m03-l02-s3",
      title: "Combine remainders with a structured search",
      body: [
        "A condition such as remainder two modulo five describes the integers $5k+2$. Substitute this form into a second remainder condition to narrow the possible values of $k$. This replaces a search through all integers with a search through one residue class. If the moduli share factors, the two conditions may be incompatible.",
        "Square residues are especially effective for ruling out integer solutions. List the possible residues of an input, square them, and observe which output residues never occur. A contradiction modulo a small number proves impossibility for all integers at once; it is much stronger than checking a few ordinary values and seeing no solution.",
      ],
      keyIdea:
        "Use congruences to organize candidates or prove that no candidate can exist.",
    },
  ],
  examples: [
    {
      id: "a1012-m03-l02-ex1",
      title: "Find a last digit",
      problem: "Find the remainder of $7^{103}$ when divided by 10.",
      steps: [
        "The powers of 7 have last digits $7,9,3,1$, repeating every four powers.",
        "The exponent 103 has remainder 3 upon division by 4.",
        "The third entry is 3, so the remainder is 3.",
      ],
      answer: "3",
      takeaway: "A short cycle can represent an enormous exponent.",
    },
    {
      id: "a1012-m03-l02-ex2",
      title: "Solve a small congruence",
      problem: "Find the least positive $x$ satisfying $5x\\equiv3\\pmod7$.",
      steps: [
        "The inverse of 5 modulo 7 is 3 because $5\\cdot3\\equiv1$.",
        "Multiply by 3 to get $x\\equiv9\\equiv2\\pmod7$.",
        "The least positive representative is 2; $5\\cdot2=10$ leaves remainder 3.",
      ],
      answer: "2",
      takeaway: "A modular inverse is justified division.",
    },
    {
      id: "a1012-m03-l02-ex3",
      title: "Two conditions on one integer",
      problem:
        "Find the least positive integer with remainder 1 modulo 4 and remainder 3 modulo 6.",
      steps: [
        "Integers satisfying the first condition begin $1,5,9,13,\\ldots$.",
        "The first two leave remainders 1 and 5 modulo 6; the third leaves 3.",
        "Thus the least positive solution is 9.",
      ],
      answer: "9",
      takeaway: "An ordered residue-class search also proves minimality.",
    },
  ],
  commonMistakes: [
    "Dividing a congruence by a factor that is not invertible.",
    "Using the wrong entry when an exponent is a multiple of a cycle length.",
    "Reporting a negative representative as an ordinary nonnegative remainder.",
  ],
  exercises: [
    {
      id: "a1012-m03-l02-q1",
      role: "guided",
      question: "Find the remainder of $17\\cdot23+19$ upon division by 5.",
      hints: [
        "Reduce each number modulo 5.",
        "Use residues 2, 3, and 4.",
        "Reduce $2\\cdot3+4$.",
      ],
      solutionSteps: [
        "The expression is congruent to $2\\cdot3+4=10$ modulo 5.",
        "Ten is divisible by 5.",
        "The remainder is 0.",
      ],
      difficulty: 4,
      kind: "numeric",
      answer: "0",
    },
    {
      id: "a1012-m03-l02-q2",
      role: "guided",
      question: "Find the remainder of $3^{2026}$ upon division by 8.",
      hints: [
        "Compute $3^2$ modulo 8.",
        "The exponent is even.",
        "Group the power into 1013 squares.",
      ],
      solutionSteps: [
        "$3^2=9\\equiv1\\pmod8$.",
        "Thus $3^{2026}=(3^2)^{1013}\\equiv1^{1013}$.",
        "The remainder is 1.",
      ],
      difficulty: 4,
      kind: "numeric",
      answer: "1",
    },
    {
      id: "a1012-m03-l02-q3",
      role: "independent",
      question:
        "How many different remainders can the square of an integer have upon division by 4?",
      hints: [
        "An integer is even or odd.",
        "Square each parity form.",
        "The only residues are 0 and 1.",
      ],
      solutionSteps: [
        "An even integer $2k$ has square $4k^2\\equiv0$.",
        "An odd integer $2k+1$ has square $4k(k+1)+1\\equiv1$.",
        "Both residues occur, so there are 2 possibilities.",
      ],
      difficulty: 5,
      kind: "numeric",
      answer: "2",
    },
    {
      id: "a1012-m03-l02-q4",
      role: "independent",
      question: "Find the remainder of $1+2+\\cdots+100$ upon division by 7.",
      hints: [
        "Pair the first and last terms.",
        "The sum is $50\\cdot101=5050$.",
        "Compare 5050 with the nearby multiple $7\\cdot721$.",
      ],
      solutionSteps: [
        "There are 50 pairs, each with sum 101.",
        "Thus the total is 5050.",
        "Since $5050=7\\cdot721+3$, the remainder is 3.",
      ],
      difficulty: 5,
      kind: "numeric",
      answer: "3",
    },
    {
      id: "a1012-m03-l02-q5",
      role: "independent",
      question:
        "Find the least positive integer $n$ with $n\\equiv2\\pmod5$ and $n\\equiv1\\pmod3$.",
      hints: [
        "List the positive integers in the first class.",
        "They begin 2, 7, 12.",
        "Test the second condition in order.",
      ],
      solutionSteps: [
        "The least first-class candidate is 2, which leaves remainder 2 modulo 3.",
        "The next candidate is 7, which leaves remainder 1.",
        "Therefore the least solution is 7.",
      ],
      difficulty: 5,
      kind: "numeric",
      answer: "7",
    },
    {
      id: "a1012-m03-l02-q6",
      role: "independent",
      question:
        "Find the least positive integer $n$ for which $2^n\\equiv1\\pmod7$.",
      hints: [
        "Compute the first few powers modulo 7.",
        "The first two residues are 2 and 4.",
        "The third power is 8.",
      ],
      solutionSteps: [
        "For $n=1$ and $n=2$, the residues are 2 and 4, so neither works.",
        "For $n=3$, $2^3=8\\equiv1\\pmod7$.",
        "Hence the least positive exponent is 3.",
      ],
      difficulty: 5,
      kind: "numeric",
      answer: "3",
    },
  ],
  summary: [
    "Reduce sums and products at each step.",
    "Power cycles require an observed and justified repeating rule.",
    "Combine residue classes to narrow an integer search.",
  ],
  nextConnection:
    "The next lesson combines these remainder restrictions with bounds and factorization to solve equations whose answers must be integers.",
} satisfies CourseLesson;
