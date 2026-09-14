import type { CourseLesson } from "@/lib/courses/types";

export default {
  slug: "arithmetic-sequences",
  intro:
    "An arithmetic sequence is a list of numbers that changes by the same fixed amount from one term to the next. Two short formulas handle almost every question about such a sequence: one finds any single term directly from its position, and the other finds the sum of many consecutive terms without adding them one at a time.",
  sections: [
    {
      id: "a8-m14-l01-s1",
      title: "Recognizing an arithmetic sequence",
      body: [
        "A sequence is arithmetic when the difference between every pair of consecutive terms is the same fixed number, called the common difference. In $3,7,11,15,\\ldots$, each term is 4 more than the one before it, so the common difference is $d=4$. Checking a sequence for this property means subtracting each term from the next and confirming every result is identical.",
        "The common difference can be negative, which produces a decreasing sequence, such as $20,17,14,11,\\ldots$ with $d=-3$. A sequence that changes by a different amount at each step, or by multiplying rather than adding, is not arithmetic.",
      ],
      keyIdea:
        "A sequence is arithmetic exactly when the same fixed amount, the common difference, is added to get from each term to the next.",
    },
    {
      id: "a8-m14-l01-s2",
      title: "Finding a term directly from its position",
      body: [
        "Rather than adding the common difference repeatedly to reach a far-off term, the position formula finds it directly: the $n$th term is $a_n=a_1+(n-1)d$, where $a_1$ is the first term. This works because reaching the $n$th term from the first term requires exactly $n-1$ steps of size $d$, not $n$ steps — a common off-by-one error to watch for.",
        'The same formula runs in reverse to find a term\'s position when its value is known: setting $a_n$ equal to the given value and solving for $n$ answers questions like "which term of the sequence equals 50?"',
      ],
      keyIdea:
        "The $n$th term is $a_n=a_1+(n-1)d$; the exponent-like $(n-1)$ reflects that reaching term $n$ takes $n-1$ steps from the first term.",
    },
    {
      id: "a8-m14-l01-s3",
      title: "Summing by pairing terms",
      body: [
        "The sum of a finite arithmetic sequence can be found without adding every term individually, using the same pairing trick famously attributed to a young Gauss: pairing the first term with the last, the second term with the second-to-last, and so on, always produces the same pair sum, $a_1+a_n$. Since there are $n$ terms total, there are $\\frac{n}{2}$ such pairs, giving the sum formula $S_n=\\frac{n(a_1+a_n)}{2}$.",
        "Applying this formula requires knowing the number of terms $n$, which is not always given directly — it can be found from the position formula as $n=\\frac{a_n-a_1}{d}+1$ whenever the first term, last term, and common difference are all known.",
      ],
      keyIdea:
        "The sum of $n$ arithmetic terms is $S_n=\\frac{n(a_1+a_n)}{2}$, since pairing the first and last terms (and so on) always gives the same pair sum.",
    },
  ],
  examples: [
    {
      id: "a8-m14-l01-ex1",
      title: "Finding a term from its position",
      problem:
        "The first term of an arithmetic sequence is 7, and the common difference is 4. What is the 15th term?",
      steps: [
        "Use the position formula $a_n=a_1+(n-1)d$ with $a_1=7$, $d=4$, and $n=15$.",
        "Substituting gives $a_{15}=7+(15-1)\\times4=7+14\\times4$.",
        "This equals $7+56=63$.",
      ],
      answer: "63",
      takeaway:
        "The position formula uses $n-1$ steps of size $d$ from the first term, not $n$ steps.",
    },
    {
      id: "a8-m14-l01-ex2",
      title: "Summing by pairing",
      problem:
        "Find the sum of the first 20 positive integers: $1+2+3+\\cdots+20$.",
      steps: [
        "This is an arithmetic sequence with $a_1=1$, $a_n=20$, and $n=20$ terms.",
        "Pairing the first and last terms, the second and second-to-last, and so on, each pair sums to $1+20=21$, and there are $\\frac{20}{2}=10$ such pairs.",
        "The total sum is $10\\times21=210$.",
      ],
      answer: "210",
      takeaway:
        "Pairing terms from the outside in turns a long addition into a single multiplication.",
    },
    {
      id: "a8-m14-l01-ex3",
      title: "Finding a position from a term's value",
      problem:
        "In an arithmetic sequence, the first term is 5 and the common difference is 3. Which term number equals 50?",
      steps: [
        "Set up the position formula with the unknown value equal to 50: $5+(n-1)\\times3=50$.",
        "Subtracting 5 from both sides gives $(n-1)\\times3=45$, so $n-1=15$.",
        "Adding 1 gives $n=16$, so 50 is the 16th term.",
      ],
      answer: "16",
      takeaway:
        'Solving the position formula for $n$ instead of $a_n$ answers "which term" questions.',
    },
  ],
  commonMistakes: [
    "Using $n$ steps of the common difference instead of $n-1$ steps when finding a term from its position.",
    "Averaging the first and last terms but forgetting to multiply by the number of terms when finding a sum.",
    "Miscounting the number of terms in a sequence that does not start at 1, such as multiples of 5 starting at 5 rather than 0.",
  ],
  exercises: [
    {
      id: "a8-m14-l01-q1",
      role: "guided",
      kind: "numeric",
      difficulty: 2,
      question:
        "The first term of an arithmetic sequence is 12, and the common difference is $-3$. What is the 10th term?",
      answer: "-15",
      hints: [
        "Use the position formula $a_n=a_1+(n-1)d$ with $a_1=12$, $d=-3$, and $n=10$.",
        "Count $n-1=9$ steps of size $-3$ from the first term.",
        "Add the result of $9\\times(-3)$ to the first term.",
      ],
      solutionSteps: [
        "Using $a_n=a_1+(n-1)d$: $a_{10}=12+(10-1)\\times(-3)=12+9\\times(-3)$.",
        "This gives $12-27$.",
        "The 10th term is $-15$.",
      ],
    },
    {
      id: "a8-m14-l01-q2",
      role: "guided",
      kind: "numeric",
      difficulty: 3,
      question: "Find the sum of the arithmetic sequence $3,7,11,\\ldots,39$.",
      answer: "210",
      hints: [
        "Find the common difference and use it to count the number of terms.",
        "Use $n=\\frac{a_n-a_1}{d}+1$ to find how many terms are in the sequence.",
        "Apply the sum formula $S_n=\\frac{n(a_1+a_n)}{2}$.",
      ],
      solutionSteps: [
        "The common difference is $d=4$, and the number of terms is $n=\\frac{39-3}{4}+1=9+1=10$.",
        "Using the sum formula: $S_{10}=\\frac{10(3+39)}{2}=\\frac{10\\times42}{2}$.",
        "This equals $\\frac{420}{2}=210$.",
      ],
    },
    {
      id: "a8-m14-l01-q3",
      role: "independent",
      kind: "numeric",
      difficulty: 3,
      question:
        "An arithmetic sequence has first term 6 and 12th term 61. What is the common difference?",
      answer: "5",
      hints: [
        "Use the position formula $a_n=a_1+(n-1)d$ with the given first and 12th terms.",
        "Substitute $n=12$ and solve for $d$.",
        "Divide the total change by the number of steps between the two given terms.",
      ],
      solutionSteps: [
        "Using $a_{12}=a_1+(12-1)d$: $61=6+11d$.",
        "Subtracting 6 from both sides gives $55=11d$.",
        "Dividing by 11 gives $d=5$.",
      ],
    },
    {
      id: "a8-m14-l01-q4",
      role: "independent",
      kind: "numeric",
      difficulty: 3,
      question: "Find the sum of all multiples of 5 from 5 to 100, inclusive.",
      answer: "1050",
      hints: [
        "This is an arithmetic sequence with first term 5, last term 100, and common difference 5.",
        "Find the number of terms using $n=\\frac{a_n-a_1}{d}+1$.",
        "Apply the sum formula $S_n=\\frac{n(a_1+a_n)}{2}$.",
      ],
      solutionSteps: [
        "The number of terms is $n=\\frac{100-5}{5}+1=19+1=20$.",
        "Using the sum formula: $S_{20}=\\frac{20(5+100)}{2}=\\frac{20\\times105}{2}$.",
        "This equals $\\frac{2100}{2}=1050$.",
      ],
    },
    {
      id: "a8-m14-l01-q5",
      role: "independent",
      kind: "mcq",
      difficulty: 2,
      question: "Which of the following sequences is arithmetic?",
      choices: [
        "$2, 4, 8, 16$",
        "$5, 8, 11, 14$",
        "$1, 4, 9, 16$",
        "$3, 6, 12, 24$",
      ],
      answer: 1,
      hints: [
        "Check the difference between each pair of consecutive terms in every sequence.",
        "An arithmetic sequence has the exact same difference at every step.",
        "The other three sequences change by multiplying or by a growing difference, not by a fixed added amount.",
      ],
      solutionSteps: [
        "In $5,8,11,14$, each term is 3 more than the one before it: $8-5=3$, $11-8=3$, $14-11=3$.",
        "This constant difference of 3 confirms the sequence is arithmetic.",
        "The other sequences either double each term or grow by an increasing difference, so they are not arithmetic.",
      ],
    },
    {
      id: "a8-m14-l01-q6",
      role: "independent",
      kind: "numeric",
      difficulty: 5,
      question:
        "The sum of the first $n$ terms of an arithmetic sequence with first term 5 and common difference 3 is 185. Find $n$.",
      answer: "10",
      hints: [
        "Write the sum formula $S_n=\\frac{n\\big(2a_1+(n-1)d\\big)}{2}$ using the given first term and common difference.",
        "Set this expression equal to 185 and clear the fraction.",
        "Solve the resulting equation in $n$; only a positive whole-number solution makes sense.",
      ],
      solutionSteps: [
        "Using $S_n=\\frac{n\\big(2(5)+(n-1)(3)\\big)}{2}=185$, so $n\\big(10+3n-3\\big)=370$, giving $3n^2+7n-370=0$.",
        "Factoring or solving this quadratic gives $n=10$ as the positive solution.",
        "Checking: with $n=10$, the sequence runs from 5 to $5+9(3)=32$, and $S_{10}=\\frac{10(5+32)}{2}=185$.",
      ],
    },
  ],
  summary: [
    "An arithmetic sequence adds the same common difference $d$ to get from each term to the next.",
    "The $n$th term is $a_n=a_1+(n-1)d$, using $n-1$ steps from the first term.",
    "The sum of $n$ terms is $S_n=\\frac{n(a_1+a_n)}{2}$, found by pairing the first and last terms.",
  ],
  nextConnection:
    "Certain arithmetic sums, like consecutive integers, squares, and cubes, come up so often in contest problems that they earn their own standard formulas — the next lesson collects them.",
} satisfies CourseLesson;
