import type { CourseLesson } from "@/lib/courses/types";

export default {
  slug: "factorials",
  intro:
    'The product $n\\times(n-1)\\times\\cdots\\times1$ that counts the arrangements of $n$ distinct objects comes up so often that it gets its own name and symbol: $n!$, read "$n$ factorial." This lesson defines the factorial, shows how to simplify factorial expressions without multiplying everything out, and covers the special convention $0!=1$.',
  sections: [
    {
      id: "a8-m01-l02-s1",
      title: "Defining the factorial",
      body: [
        "For a positive whole number $n$, the factorial $n!$ is the product of every whole number from $n$ down to $1$: $n!=n\\times(n-1)\\times(n-2)\\times\\cdots\\times2\\times1$. So $5!=5\\times4\\times3\\times2\\times1=120$. Factorials grow extremely quickly — $10!$ is already over three million — so contest problems almost never expect you to compute a large factorial fully; instead they expect you to simplify a ratio or expression before multiplying.",
        "By convention, $0!=1$. This might look strange at first, since there is no product of zero terms to multiply, but the convention exists so that formulas involving factorials — including the arrangement-counting formulas used throughout this course — continue to work correctly at the boundary case of arranging zero objects. Treat $0!=1$ as a fact to memorize rather than something to re-derive each time.",
      ],
      keyIdea:
        "$n!$ means multiply every whole number from $n$ down to 1, and by convention $0!=1$.",
    },
    {
      id: "a8-m01-l02-s2",
      title: "Simplifying factorial ratios",
      body: [
        "A ratio like $\\dfrac{8!}{6!}$ should almost never be computed by finding $8!$ and $6!$ separately and dividing. Instead, write out the larger factorial only as far as the smaller one, and cancel: $\\dfrac{8!}{6!}=\\dfrac{8\\times7\\times6\\times5\\times4\\times3\\times2\\times1}{6\\times5\\times4\\times3\\times2\\times1}=8\\times7=56$. Every factor from $6$ down to $1$ appears in both the numerator and the denominator and cancels completely, leaving only the factors above $6$ in the numerator.",
        "This shortcut works whenever one factorial is a ratio against a smaller factorial: $\\dfrac{n!}{k!}$ simplifies to the product of the whole numbers from $n$ down to $k+1$, with $n-k$ factors in total. Recognizing this pattern turns a seemingly large computation into a short multiplication, and it is the single most useful factorial skill for contest problems.",
      ],
      keyIdea:
        "$\\dfrac{n!}{k!}$ simplifies to the product of the whole numbers strictly between $k$ and $n$, inclusive of $n$.",
    },
    {
      id: "a8-m01-l02-s3",
      title: "Factorials built from smaller factorials",
      body: [
        "Every factorial can be broken into a single factor times a smaller factorial: $n!=n\\times(n-1)!$. This identity is useful for simplifying expressions that mix factorials of different sizes, such as $\\dfrac{n!}{(n-1)!}=n$ directly from the definition, without cancelling term by term.",
        "When an expression contains a factorial in both the numerator and the denominator with more complicated numbers attached, look for the largest factorial that divides evenly into the others first, and expand only as much as needed. This keeps the arithmetic small and makes it far less likely that a term gets miscancelled or dropped.",
      ],
      keyIdea:
        "Break a factorial into $n\\times(n-1)!$ to relate it to a smaller factorial without full expansion.",
    },
  ],
  examples: [
    {
      id: "a8-m01-l02-ex1",
      title: "Compute a small factorial directly",
      problem: "Find the value of $6!$.",
      steps: [
        "By definition, $6!=6\\times5\\times4\\times3\\times2\\times1$.",
        "Multiplying step by step: $6\\times5=30$, then $30\\times4=120$, then $120\\times3=360$, then $360\\times2=720$.",
        "The final factor of 1 leaves the product unchanged, so $6!=720$.",
      ],
      answer: "720",
      takeaway:
        "For small values of $n$, computing $n!$ directly by repeated multiplication is fast and reliable.",
    },
    {
      id: "a8-m01-l02-ex2",
      title: "Simplify a factorial ratio",
      problem: "Simplify $\\dfrac{8!}{6!}$.",
      steps: [
        "Write $8!$ as $8\\times7\\times6!$.",
        "The $6!$ in the numerator and denominator cancel, leaving $8\\times7$.",
        "This product equals 56.",
      ],
      answer: "56",
      takeaway:
        "Never expand both factorials fully — write the larger one just far enough to expose the smaller one and cancel.",
    },
    {
      id: "a8-m01-l02-ex3",
      title: "Simplify an expression with two factorials in the denominator",
      problem: "Find the value of $\\dfrac{7!}{4!\\times3!}$.",
      steps: [
        "Write $7!=7\\times6\\times5\\times4!$, so the $4!$ cancels with the $4!$ in the denominator, leaving $\\dfrac{7\\times6\\times5}{3!}$.",
        "Since $3!=3\\times2\\times1=6$, the expression becomes $\\dfrac{7\\times6\\times5}{6}$.",
        "The 6 in the numerator cancels with the 6 in the denominator, leaving $7\\times5=35$.",
      ],
      answer: "35",
      takeaway:
        "Cancel the larger shared factorial first, then simplify what remains.",
    },
  ],
  commonMistakes: [
    "Computing both factorials in a ratio completely instead of cancelling shared factors first.",
    "Forgetting the convention $0!=1$ and treating $0!$ as $0$.",
    "Dropping or miscounting a factor when expanding a factorial only partway.",
  ],
  exercises: [
    {
      id: "a8-m01-l02-q1",
      role: "guided",
      kind: "numeric",
      difficulty: 2,
      question: "Find the value of $4!$.",
      answer: "24",
      hints: [
        "Write out the full product from 4 down to 1.",
        "Multiply the factors in order: $4\\times3\\times2\\times1$.",
        "Compute the product step by step.",
      ],
      solutionSteps: [
        "By definition, $4!=4\\times3\\times2\\times1$.",
        "Multiplying gives $4\\times3=12$, then $12\\times2=24$, then $24\\times1=24$.",
        "So $4!=24$.",
      ],
    },
    {
      id: "a8-m01-l02-q2",
      role: "guided",
      kind: "numeric",
      difficulty: 3,
      question: "Simplify $\\dfrac{9!}{7!}$.",
      answer: "72",
      hints: [
        "Write $9!$ as $9\\times8\\times7!$.",
        "The $7!$ cancels between numerator and denominator.",
        "Multiply the two remaining factors.",
      ],
      solutionSteps: [
        "Write $9!=9\\times8\\times7!$, so the ratio becomes $\\dfrac{9\\times8\\times7!}{7!}$.",
        "The $7!$ cancels, leaving $9\\times8$.",
        "This product equals 72.",
      ],
    },
    {
      id: "a8-m01-l02-q3",
      role: "independent",
      kind: "numeric",
      difficulty: 3,
      question: "Simplify $\\dfrac{10!}{8!}$.",
      answer: "90",
      hints: [
        "Expand $10!$ only as far as $8!$.",
        "The shared $8!$ cancels between numerator and denominator.",
        "Multiply the two remaining factors, 10 and 9.",
      ],
      solutionSteps: [
        "Write $10!=10\\times9\\times8!$.",
        "Cancelling the shared $8!$ leaves $10\\times9$.",
        "This equals 90.",
      ],
    },
    {
      id: "a8-m01-l02-q4",
      role: "independent",
      kind: "numeric",
      difficulty: 3,
      question: "Find the value of $0!+1!+2!+3!$.",
      answer: "10",
      hints: [
        "Use the convention $0!=1$.",
        "Compute each factorial separately: $0!, 1!, 2!, 3!$.",
        "Add the four values together.",
      ],
      solutionSteps: [
        "By definition and convention, $0!=1$, $1!=1$, $2!=2$, and $3!=6$.",
        "Adding these gives $1+1+2+6$.",
        "The total is 10.",
      ],
    },
    {
      id: "a8-m01-l02-q5",
      role: "independent",
      kind: "mcq",
      difficulty: 3,
      question: "Which expression is equal to $\\dfrac{6!}{3!}$?",
      choices: [
        "$6\\times5\\times4$",
        "$6\\times5\\times4\\times3$",
        "$3!$",
        "$6\\div3$",
      ],
      answer: 0,
      hints: [
        "Write $6!$ as $6\\times5\\times4\\times3!$ to expose the shared factor.",
        "Cancel the $3!$ between numerator and denominator.",
        "Compare what remains to each answer choice.",
      ],
      solutionSteps: [
        "Write $6!=6\\times5\\times4\\times3!$, so $\\dfrac{6!}{3!}=\\dfrac{6\\times5\\times4\\times3!}{3!}$.",
        "The $3!$ cancels, leaving $6\\times5\\times4$.",
        "This matches the first choice; its value is 120, which also equals $6!/3!=720/6$.",
      ],
    },
    {
      id: "a8-m01-l02-q6",
      role: "independent",
      kind: "numeric",
      difficulty: 4,
      question: "Find the value of $\\dfrac{7!}{2!\\times5!}$.",
      answer: "21",
      hints: [
        "Write $7!$ as $7\\times6\\times5!$ to expose the shared $5!$.",
        "Cancel the $5!$ between numerator and denominator.",
        "Simplify the remaining expression $\\dfrac{7\\times6}{2!}$.",
      ],
      solutionSteps: [
        "Write $7!=7\\times6\\times5!$, so the expression becomes $\\dfrac{7\\times6\\times5!}{2!\\times5!}$.",
        "The $5!$ cancels, leaving $\\dfrac{7\\times6}{2!}$.",
        "Since $2!=2$, this is $\\dfrac{42}{2}=21$.",
      ],
    },
  ],
  summary: [
    "$n!$ is the product of every whole number from $n$ down to 1, and $0!=1$ by convention.",
    "Simplify a factorial ratio by expanding the larger factorial only far enough to cancel the smaller one.",
    "Break a factorial into $n\\times(n-1)!$ to relate factorials of different sizes without full expansion.",
  ],
  nextConnection:
    "Next, the multiplication principle and factorials combine into a general formula for arranging a chosen number of objects out of a larger group.",
} satisfies CourseLesson;
