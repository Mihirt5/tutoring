import type { CourseLesson } from "@/lib/courses/types";

export default {
  slug: "geometric-sequences",
  intro: "A geometric sequence changes by a fixed multiplying factor from one term to the next, instead of a fixed added amount. This produces its own version of the position formula and sum formula, both built from powers of the common ratio rather than simple multiples of it.",
  sections: [
    {
      id: "a8-m14-l03-s1",
      title: "Recognizing a geometric sequence",
      body: [
        "A sequence is geometric when every term is the previous term multiplied by the same fixed number, called the common ratio. In $2,6,18,54,\\ldots$, each term is 3 times the one before it, so the common ratio is $r=3$. Checking a sequence for this property means dividing each term by the one before it and confirming every result is identical.",
        "A common ratio between 0 and 1, such as $r=\\frac{1}{2}$, produces a decreasing sequence of shrinking positive terms, like $16,8,4,2,\\ldots$. A negative common ratio makes the terms alternate in sign. In every case, the defining test is the same: the ratio between consecutive terms must stay constant.",
      ],
      keyIdea: "A sequence is geometric exactly when the same fixed common ratio $r$ multiplies each term to get the next.",
    },
    {
      id: "a8-m14-l03-s2",
      title: "Finding a term directly from its position",
      body: [
        "Just as an arithmetic sequence has a position formula built from repeated addition, a geometric sequence has one built from repeated multiplication: the $n$th term is $a_n=a_1\\times r^{n-1}$. Reaching the $n$th term from the first term requires multiplying by $r$ exactly $n-1$ times, matching the same off-by-one pattern as the arithmetic case.",
        "This formula also runs in reverse: if two terms of a geometric sequence are known, dividing one by the other and taking the appropriate root recovers the common ratio. For instance, if the first term is 5 and the 4th term is 135, then $r^3=\\frac{135}{5}=27$, so $r=3$.",
      ],
      keyIdea: "The $n$th term is $a_n=a_1\\times r^{n-1}$, using $n-1$ multiplications by $r$ from the first term.",
    },
    {
      id: "a8-m14-l03-s3",
      title: "Summing a finite geometric sequence",
      body: [
        "The sum of a finite geometric sequence does not pair off as neatly as an arithmetic sum, but it has its own formula: $S_n=\\dfrac{a_1(r^n-1)}{r-1}$, valid whenever $r\\neq1$. This formula comes from multiplying the whole sum by $r$ and subtracting the original sum, which cancels every middle term and leaves only a first and a last piece — the same shift-and-subtract idea that the next lesson develops further.",
        "For example, the sum $1+2+4+8+16+32$ has $a_1=1$, $r=2$, and $n=6$ terms, giving $S_6=\\dfrac{1(2^6-1)}{2-1}=2^6-1=63$. As with arithmetic sequences, it is essential to count the number of terms $n$ correctly before substituting into the formula.",
      ],
      keyIdea: "The sum of $n$ geometric terms is $S_n=\\dfrac{a_1(r^n-1)}{r-1}$ for $r\\neq1$, derived by multiplying the sum by $r$ and subtracting to cancel the middle terms.",
    },
  ],
  examples: [
    {
      id: "a8-m14-l03-ex1",
      title: "Finding a term from its position",
      problem: "The first term of a geometric sequence is 3, and the common ratio is 2. What is the 6th term?",
      steps: [
        "Use the position formula $a_n=a_1\\times r^{n-1}$ with $a_1=3$, $r=2$, and $n=6$.",
        "Substituting gives $a_6=3\\times2^{6-1}=3\\times2^5$.",
        "This equals $3\\times32=96$.",
      ],
      answer: "96",
      takeaway: "The exponent on the common ratio is always one less than the term's position.",
    },
    {
      id: "a8-m14-l03-ex2",
      title: "Summing a geometric sequence",
      problem: "Find the sum of the geometric sequence $2,6,18,54,162$.",
      steps: [
        "This sequence has $a_1=2$, $r=3$, and $n=5$ terms.",
        "Applying the sum formula: $S_5=\\dfrac{2(3^5-1)}{3-1}=\\dfrac{2(243-1)}{2}$.",
        "This equals $\\dfrac{2\\times242}{2}=242$.",
      ],
      answer: "242",
      takeaway: "The sum formula avoids adding every term by hand once the first term, ratio, and number of terms are known.",
    },
    {
      id: "a8-m14-l03-ex3",
      title: "Finding the common ratio from two terms",
      problem: "In a geometric sequence, the first term is 5 and the 4th term is 135. What is the common ratio?",
      steps: [
        "Use the position formula: $a_4=a_1\\times r^{4-1}=5\\times r^3=135$.",
        "Dividing both sides by 5 gives $r^3=27$.",
        "Taking the cube root gives $r=3$.",
      ],
      answer: "3",
      takeaway: "Two known terms of a geometric sequence determine the common ratio by dividing and taking the appropriate root.",
    },
  ],
  commonMistakes: [
    "Using $n$ powers of $r$ instead of $n-1$ powers when finding a term from its position.",
    "Confusing the geometric sum formula with the arithmetic sum formula and pairing terms that do not actually pair evenly.",
    "Forgetting to take a root when solving for the common ratio from two non-adjacent terms.",
  ],
  exercises: [
    {
      id: "a8-m14-l03-q1", role: "guided", kind: "numeric", difficulty: 3,
      question: "The first term of a geometric sequence is 4, and the common ratio is 3. What is the 5th term?",
      answer: "324",
      hints: [
        "Use the position formula $a_n=a_1\\times r^{n-1}$ with $a_1=4$, $r=3$, and $n=5$.",
        "Compute the exponent $n-1$ first.",
        "Multiply the first term by that power of the common ratio.",
      ],
      solutionSteps: [
        "Using $a_n=a_1\\times r^{n-1}$: $a_5=4\\times3^{5-1}=4\\times3^4$.",
        "Since $3^4=81$, this becomes $4\\times81$.",
        "The 5th term is $324$.",
      ],
    },
    {
      id: "a8-m14-l03-q2", role: "guided", kind: "numeric", difficulty: 3,
      question: "Find the sum of the geometric sequence $1,2,4,8,16,32$.",
      answer: "63",
      hints: [
        "Identify the first term, common ratio, and number of terms.",
        "Substitute these values into the sum formula $S_n=\\dfrac{a_1(r^n-1)}{r-1}$.",
        "Simplify the resulting expression.",
      ],
      solutionSteps: [
        "This sequence has $a_1=1$, $r=2$, and $n=6$ terms.",
        "Using the sum formula: $S_6=\\dfrac{1(2^6-1)}{2-1}=2^6-1$.",
        "This equals $64-1=63$.",
      ],
    },
    {
      id: "a8-m14-l03-q3", role: "independent", kind: "numeric", difficulty: 4,
      question: "In a geometric sequence with all positive terms, the first term is 2 and the 5th term is 162. What is the common ratio?",
      answer: "3",
      hints: [
        "Use the position formula with $n=5$ to relate the first and 5th terms.",
        "Solve for the fourth power of the common ratio.",
        "Take the fourth root, keeping in mind the sequence has all positive terms.",
      ],
      solutionSteps: [
        "Using $a_5=a_1\\times r^{5-1}$: $2\\times r^4=162$.",
        "Dividing both sides by 2 gives $r^4=81$.",
        "Since all terms are positive, $r=3$ (as $3^4=81$).",
      ],
    },
    {
      id: "a8-m14-l03-q4", role: "independent", kind: "numeric", difficulty: 4,
      question: "Find the sum of the first 4 terms of a geometric sequence with first term 16 and common ratio $\\frac{1}{2}$.",
      answer: "30",
      hints: [
        "Substitute $a_1=16$, $r=\\frac{1}{2}$, and $n=4$ into the sum formula.",
        "Compute $r^n$ first, then subtract it from 1.",
        "Divide by $1-r$ and multiply by the first term.",
      ],
      solutionSteps: [
        "Using $S_n=\\dfrac{a_1(1-r^n)}{1-r}$: $S_4=\\dfrac{16\\left(1-\\left(\\frac{1}{2}\\right)^4\\right)}{1-\\frac{1}{2}}=\\dfrac{16\\left(1-\\frac{1}{16}\\right)}{\\frac{1}{2}}$.",
        "Simplifying inside the parentheses: $16\\times\\frac{15}{16}=15$, then dividing by $\\frac{1}{2}$ means multiplying by 2.",
        "This gives $15\\times2=30$, matching the direct sum $16+8+4+2=30$.",
      ],
    },
    {
      id: "a8-m14-l03-q5", role: "independent", kind: "mcq", difficulty: 3,
      question: "Which of the following sequences is geometric?",
      choices: ["$2, 5, 8, 11$", "$3, 6, 12, 24$", "$1, 4, 9, 16$", "$10, 7, 4, 1$"],
      answer: 1,
      hints: [
        "Check the ratio between each pair of consecutive terms in every sequence.",
        "A geometric sequence has the exact same ratio at every step.",
        "The other three sequences change by a fixed added amount or by an increasing difference, not a fixed ratio.",
      ],
      solutionSteps: [
        "In $3,6,12,24$, each term is twice the one before it: $\\frac{6}{3}=2$, $\\frac{12}{6}=2$, $\\frac{24}{12}=2$.",
        "This constant ratio of 2 confirms the sequence is geometric.",
        "The other sequences change by a fixed added amount (arithmetic) or by a growing difference, not a fixed ratio.",
      ],
    },
    {
      id: "a8-m14-l03-q6", role: "independent", kind: "numeric", difficulty: 5,
      question: "The sum of the first $n$ terms of a geometric sequence with first term 3 and common ratio 2 is 381. Find $n$.",
      answer: "7",
      hints: [
        "Substitute the first term and common ratio into the sum formula, leaving $n$ unknown.",
        "Set the resulting expression equal to 381 and isolate the power of 2.",
        "Recognize the resulting power of 2 as a familiar value.",
      ],
      solutionSteps: [
        "Using $S_n=\\dfrac{a_1(r^n-1)}{r-1}$ with $a_1=3$ and $r=2$: $S_n=3(2^n-1)=381$.",
        "Dividing both sides by 3 gives $2^n-1=127$, so $2^n=128$.",
        "Since $2^7=128$, the value of $n$ is $7$.",
      ],
    },
  ],
  summary: [
    "A geometric sequence multiplies by the same common ratio $r$ to get from each term to the next.",
    "The $n$th term is $a_n=a_1\\times r^{n-1}$, using $n-1$ multiplications from the first term.",
    "The sum of $n$ terms is $S_n=\\dfrac{a_1(r^n-1)}{r-1}$ for $r\\neq1$, derived by multiplying the sum by $r$ and subtracting to cancel the middle terms.",
  ],
  nextConnection: "The subtraction trick behind the geometric sum formula extends to sequences formed by multiplying an arithmetic sequence and a geometric sequence together — the next lesson develops that shift-and-subtract technique in full.",
} satisfies CourseLesson;
