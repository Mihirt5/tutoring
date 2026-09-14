import type { CourseLesson } from "@/lib/courses/types";

export default {
  slug: "prime-powers-and-divisor-structure",
  intro:
    "Prime factorization turns a large integer into a small collection of exponent choices. Those choices reveal its divisors, perfect powers, and hidden factors inside products.",
  sections: [
    {
      id: "a1012-m03-l01-s1",
      title: "A divisor is a choice of exponents",
      body: [
        "Every positive integer greater than one has a unique factorization into primes, apart from the order of the factors. If an integer contains $p^a$, a divisor may contain $p$ to any exponent from zero through $a$. Choosing exponent zero means leaving that prime out. Choices for different primes are independent, so multiplication counts the complete set of positive divisors.",
        "For $N=p^a q^b$ with different primes, the divisor count is $(a+1)(b+1)$. The added ones include zero exponents, not an extra prime factor. To impose a condition such as divisibility by a given number, restrict the allowed exponents first and only then multiply the counts.",
      ],
      keyIdea: "Represent a divisor by its prime exponents before counting it.",
    },
    {
      id: "a1012-m03-l01-s2",
      title: "Perfect powers and shared factors",
      body: [
        "A positive integer is a square exactly when every prime exponent is even. A cube requires every exponent to be divisible by three. Thus counting square divisors means counting even exponent options at each prime. To make an integer a square by multiplying, supply precisely the primes whose exponents are odd; adding unnecessary factors makes the multiplier larger.",
        "The greatest common divisor of two integers takes the smaller exponent at each prime, because a shared divisor cannot exceed either supply. The least common multiple takes the larger exponent, because it must contain both supplies. These descriptions explain the formulas and prevent confusing a shared factor with a common multiple.",
      ],
      keyIdea:
        "Squares require even exponents; GCD uses minima and LCM uses maxima.",
    },
    {
      id: "a1012-m03-l01-s3",
      title: "Count prime contributions in a factorial",
      body: [
        "A factorial multiplies all positive integers up to its input. To count factors of a prime $p$, first count the multiples of $p$. Each contributes at least one copy. Multiples of $p^2$ contribute an additional copy, multiples of $p^3$ another, and so on. Add these nested counts rather than counting each multiple only once.",
        "Trailing decimal zeros come from factors of ten, each requiring a pair consisting of a two and a five. In a factorial there are at least as many twos as fives, so fives are the limiting supply. In a general product you must compare both counts instead of automatically counting fives.",
      ],
      keyIdea:
        "Repeated prime factors inside one term must be counted repeatedly.",
    },
  ],
  examples: [
    {
      id: "a1012-m03-l01-ex1",
      title: "Count without listing",
      problem: "How many positive divisors does $2^3\\cdot3^2\\cdot5$ have?",
      steps: [
        "The exponent of 2 has 4 choices, from 0 through 3.",
        "The exponents of 3 and 5 have 3 and 2 choices.",
        "Multiply: $4\\cdot3\\cdot2=24$.",
      ],
      answer: "24",
      takeaway:
        "The divisor formula is a multiplication principle for exponent choices.",
    },
    {
      id: "a1012-m03-l01-ex2",
      title: "Select only square divisors",
      problem:
        "How many positive square divisors does $2^5\\cdot3^4\\cdot7$ have?",
      steps: [
        "An even exponent of 2 can be 0, 2, or 4.",
        "An even exponent of 3 has the same 3 options; the exponent of 7 must be 0.",
        "There are $3\\cdot3\\cdot1=9$ square divisors.",
      ],
      answer: "9",
      takeaway: "Impose the square condition separately at each prime.",
    },
    {
      id: "a1012-m03-l01-ex3",
      title: "Find a prime inside a factorial",
      problem: "What is the exponent of 3 in the prime factorization of $40!$?",
      steps: [
        "There are $\\lfloor40/3\\rfloor=13$ multiples of 3.",
        "The multiples of 9 and 27 add 4 and 1 further factors.",
        "The exponent is $13+4+1=18$.",
      ],
      answer: "18",
      takeaway: "A multiple of 27 contributes in all three layers.",
    },
  ],
  commonMistakes: [
    "Omitting zero from the list of allowed prime exponents.",
    "Counting each multiple of a prime only once inside a factorial.",
    "Using maximum rather than minimum exponents for a GCD.",
  ],
  exercises: [
    {
      id: "a1012-m03-l01-q1",
      role: "guided",
      question: "How many positive divisors does $2^4\\cdot5^2$ have?",
      hints: [
        "Include exponent zero.",
        "There are five choices for the exponent of 2.",
        "Multiply by the three choices for the exponent of 5.",
      ],
      solutionSteps: [
        "A divisor has the form $2^a5^b$.",
        "The ranges are $0\\le a\\le4$ and $0\\le b\\le2$.",
        "The count is $5\\cdot3=15$.",
      ],
      difficulty: 4,
      kind: "numeric",
      answer: "15",
    },
    {
      id: "a1012-m03-l01-q2",
      role: "guided",
      question: "Find $\\gcd(2^3\\cdot3\\cdot5^2,2^2\\cdot3^3\\cdot5)$.",
      hints: [
        "Take the smaller exponent at each prime.",
        "The shared prime powers are $2^2$, 3, and 5.",
        "Multiply these powers.",
      ],
      solutionSteps: [
        "The exponents in the GCD are 2 for prime 2, 1 for prime 3, and 1 for prime 5.",
        "Thus the GCD is $2^2\\cdot3\\cdot5$.",
        "The value is 60.",
      ],
      difficulty: 4,
      kind: "numeric",
      answer: "60",
    },
    {
      id: "a1012-m03-l01-q3",
      role: "independent",
      question:
        "How many positive divisors of $2^5\\cdot3^2\\cdot5$ are multiples of 12?",
      hints: [
        "A multiple of 12 needs at least two factors of 2 and one of 3.",
        "Restrict the exponent ranges before counting.",
        "There are 4, 2, and 2 choices.",
      ],
      solutionSteps: [
        "The exponent of 2 is 2, 3, 4, or 5: four choices.",
        "The exponent of 3 is 1 or 2, and the exponent of 5 is 0 or 1.",
        "The count is $4\\cdot2\\cdot2=16$.",
      ],
      difficulty: 5,
      kind: "numeric",
      answer: "16",
    },
    {
      id: "a1012-m03-l01-q4",
      role: "independent",
      question:
        "Find the least positive integer $k$ for which $756k$ is a perfect square.",
      hints: [
        "Factor 756 into primes.",
        "It equals $2^2\\cdot3^3\\cdot7$.",
        "Supply the primes with odd exponents.",
      ],
      solutionSteps: [
        "The odd exponents occur at primes 3 and 7.",
        "Multiplying by $3\\cdot7$ makes every exponent even.",
        "The least multiplier is 21; indeed $756\\cdot21=126^2$.",
      ],
      difficulty: 5,
      kind: "numeric",
      answer: "21",
    },
    {
      id: "a1012-m03-l01-q5",
      role: "independent",
      question: "How many trailing decimal zeros does $28!$ have?",
      hints: [
        "Pair twos with fives.",
        "Count multiples of 5, then add an extra factor for 25.",
        "There are five multiples of 5 and one multiple of 25.",
      ],
      solutionSteps: [
        "Fives limit the number of factors of ten in this factorial.",
        "Their exponent is $\\lfloor28/5\\rfloor+\\lfloor28/25\\rfloor=5+1$.",
        "Thus there are 6 trailing zeros.",
      ],
      difficulty: 5,
      kind: "numeric",
      answer: "6",
    },
    {
      id: "a1012-m03-l01-q6",
      role: "independent",
      question:
        "Find the smallest positive multiple of 10 with exactly six positive divisors.",
      hints: [
        "Check multiples in increasing order.",
        "The number 10 has only four divisors.",
        "Factor the next multiple, 20.",
      ],
      solutionSteps: [
        "Every positive multiple is at least 10, and 10 has $(1+1)(1+1)=4$ divisors.",
        "The next multiple is $20=2^2\\cdot5$.",
        "Its divisor count is $3\\cdot2=6$, so 20 is the smallest.",
      ],
      difficulty: 5,
      kind: "numeric",
      answer: "20",
    },
  ],
  summary: [
    "Prime exponents encode divisibility.",
    "Restrict exponent choices to count special divisors.",
    "Add all prime-power layers when analyzing a factorial.",
  ],
  nextConnection:
    "The next lesson keeps only the information about an integer that a remainder calculation needs.",
} satisfies CourseLesson;
