import type { CourseLesson } from "@/lib/courses/types";

export default {
  slug: "permutations-fundamentals",
  intro:
    "The multiplication principle from the previous lessons has a compact formula when you are arranging $r$ objects chosen from a larger group of $n$ distinct objects: the number of such arrangements is written $P(n,r)$. This lesson formalizes that formula and practices recognizing when a problem calls for it, including problems that combine several independent groups.",
  sections: [
    {
      id: "a8-m01-l03-s1",
      title: "The P(n,r) formula",
      body: [
        "When arranging $r$ positions chosen from $n$ distinct objects, with no repeats, the first position has $n$ choices, the second has $n-1$, the third has $n-2$, and so on, stopping after $r$ factors. This count is written $P(n,r)$, and it equals $n\\times(n-1)\\times(n-2)\\times\\cdots\\times(n-r+1)$, a product of exactly $r$ consecutive decreasing whole numbers starting at $n$.",
        "Using factorials, $P(n,r)=\\dfrac{n!}{(n-r)!}$, because expanding $n!$ only down to $(n-r)!$ and cancelling the shared $(n-r)!$ leaves exactly the $r$ factors from $n$ down to $n-r+1$. Both the direct product form and the factorial form give the same value; use whichever is faster for the numbers in front of you.",
      ],
      keyIdea:
        "$P(n,r)=n\\times(n-1)\\times\\cdots\\times(n-r+1)$, a product of $r$ terms, which equals $\\dfrac{n!}{(n-r)!}$.",
    },
    {
      id: "a8-m01-l03-s2",
      title: "Recognizing when to apply P(n,r)",
      body: [
        "Look for two signals together: a larger pool of $n$ distinct objects, and a smaller number $r$ of positions or roles being filled from that pool, where each object can be used at most once and the assignment to positions matters. Electing a president, vice president, and secretary from a club of candidates is a textbook $P(n,r)$ situation: there are more candidates than roles, each candidate can hold at most one role, and swapping which candidate holds which role produces a different outcome.",
        "It is easy to misidentify $r$: count the number of distinct roles or positions being filled, not the number of candidates available. A common error is using $n$ where $r$ belongs, which produces a full arrangement of everyone instead of the requested partial arrangement.",
      ],
      keyIdea:
        "Identify $n$ as the size of the pool and $r$ as the number of positions actually being filled, not the pool size again.",
    },
    {
      id: "a8-m01-l03-s3",
      title: "Combining several independent groups",
      body: [
        "Many contest problems arrange more than one group in the same scenario — for example, choosing 2 letters from one set and 2 digits from another to build a code. When the groups are independent (the choice in one group does not affect what is available in the other), compute the number of arrangements within each group separately, then multiply the group totals together, exactly as the multiplication principle allows for any sequence of independent choices.",
        'Before multiplying, double check that each group\'s count already accounts for its own "no repeats" or ordering condition; a common mistake is multiplying two correct-looking numbers where one of them secretly used the wrong pool size or forgot the ordering condition entirely.',
      ],
      keyIdea:
        "For independent groups, compute each group's arrangement count separately, then multiply the totals.",
    },
  ],
  examples: [
    {
      id: "a8-m01-l03-ex1",
      title: "Elect three officers from seven candidates",
      problem:
        "A club has 7 candidates for its officer positions. In how many ways can a president, a vice president, and a secretary be chosen, with each candidate holding at most one role?",
      steps: [
        "This is $P(7,3)$: 7 candidates, 3 distinct roles, each candidate used at most once.",
        "$P(7,3)=7\\times6\\times5$.",
        "Multiplying gives $7\\times6=42$, then $42\\times5=210$.",
      ],
      answer: "210",
      takeaway:
        "The pool size 7 and the number of roles 3 identify $n$ and $r$ directly.",
    },
    {
      id: "a8-m01-l03-ex2",
      title: "Award two medals",
      problem:
        "A race has 6 runners. In how many ways can gold and silver medals be awarded, one to each of two different runners?",
      steps: [
        "This is $P(6,2)$, since 2 medal positions are filled from a pool of 6 runners.",
        "Using the factorial form, $P(6,2)=\\dfrac{6!}{4!}$.",
        "Expanding, $\\dfrac{6!}{4!}=6\\times5=30$.",
      ],
      answer: "30",
      takeaway:
        "Either the direct product or the factorial ratio gives the same value for $P(n,r)$.",
    },
    {
      id: "a8-m01-l03-ex3",
      title: "Combine two independent groups",
      problem:
        "A password consists of 2 different letters chosen from {A, B, C, D}, followed by 2 different digits chosen from {1, 2, 3}. How many passwords are possible?",
      steps: [
        "The letter part is $P(4,2)=4\\times3=12$.",
        "The digit part is $P(3,2)=3\\times2=6$.",
        "Since the two parts are independent, multiply: $12\\times6=72$.",
      ],
      answer: "72",
      takeaway:
        "Compute each independent part's count separately before multiplying the parts together.",
    },
  ],
  commonMistakes: [
    "Using the pool size $n$ as the number of factors instead of the number of positions $r$ actually being filled.",
    "Forgetting to multiply the counts of two or more independent groups in a combined problem.",
    "Applying $P(n,r)$ to a situation where order does not actually matter, overcounting the true number of outcomes.",
  ],
  exercises: [
    {
      id: "a8-m01-l03-q1",
      role: "guided",
      kind: "numeric",
      difficulty: 3,
      question:
        "Among 5 contestants, in how many ways can 1st and 2nd place be awarded?",
      answer: "20",
      hints: [
        "This is $P(5,2)$: a pool of 5, filling 2 distinct positions.",
        "Write the product as two decreasing factors starting at 5.",
        "Multiply $5\\times4$.",
      ],
      solutionSteps: [
        "There are 5 choices for 1st place and, once that is decided, 4 remaining choices for 2nd place.",
        "This is $P(5,2)=5\\times4$.",
        "The product equals 20.",
      ],
    },
    {
      id: "a8-m01-l03-q2",
      role: "guided",
      kind: "numeric",
      difficulty: 4,
      question:
        "A club of 8 members elects a president, a vice president, and a treasurer, with each member holding at most one role. In how many ways can the three roles be filled?",
      answer: "336",
      hints: [
        "This is $P(8,3)$: a pool of 8, filling 3 distinct roles.",
        "Write the product as three decreasing factors starting at 8.",
        "Multiply $8\\times7\\times6$.",
      ],
      solutionSteps: [
        "There are 8 choices for president, 7 remaining choices for vice president, and 6 remaining choices for treasurer.",
        "This is $P(8,3)=8\\times7\\times6$.",
        "The product equals 336.",
      ],
    },
    {
      id: "a8-m01-l03-q3",
      role: "independent",
      kind: "numeric",
      difficulty: 3,
      question:
        "How many 2-letter arrangements with no repeated letters can be formed from 9 distinct letters?",
      answer: "72",
      hints: [
        "This is $P(9,2)$: a pool of 9, filling 2 positions.",
        "Write the product as two decreasing factors starting at 9.",
        "Multiply $9\\times8$.",
      ],
      solutionSteps: [
        "The first letter can be any of the 9 available letters, and the second can be any of the remaining 8.",
        "This is $P(9,2)=9\\times8$.",
        "The product equals 72.",
      ],
    },
    {
      id: "a8-m01-l03-q4",
      role: "independent",
      kind: "numeric",
      difficulty: 4,
      question:
        "In how many ways can 4 different awards be given to 4 different people chosen from a group of 10 people, with each person receiving at most one award?",
      answer: "5040",
      hints: [
        "This is $P(10,4)$: a pool of 10, filling 4 distinct award positions.",
        "Write the product as four decreasing factors starting at 10.",
        "Multiply $10\\times9\\times8\\times7$.",
      ],
      solutionSteps: [
        "There are 10 choices for the first award, 9 for the second, 8 for the third, and 7 for the fourth.",
        "This is $P(10,4)=10\\times9\\times8\\times7$.",
        "The product equals 5040.",
      ],
    },
    {
      id: "a8-m01-l03-q5",
      role: "independent",
      kind: "mcq",
      difficulty: 3,
      question:
        "Which expression equals the number of ways to arrange 2 letters, with no repeats, chosen from 6 distinct letters?",
      choices: ["$6\\times5$", "$6\\times5\\times4$", "$6^2$", "$6+5$"],
      answer: 0,
      hints: [
        "This is $P(6,2)$: a pool of 6, filling 2 positions.",
        "The product should have exactly 2 decreasing factors starting at 6.",
        "Compare each choice to that pattern.",
      ],
      solutionSteps: [
        "$P(6,2)$ fills 2 positions from a pool of 6, giving exactly 2 factors: $6\\times5$.",
        "The other choices either use the wrong number of factors or add instead of multiply.",
        "The correct expression is $6\\times5$, which equals 30.",
      ],
    },
    {
      id: "a8-m01-l03-q6",
      role: "independent",
      kind: "numeric",
      difficulty: 4,
      question:
        "A code consists of 3 different digits chosen from {1, 2, 3, 4, 5, 6}, followed by 1 letter chosen from {A, B}. How many codes are possible?",
      answer: "240",
      hints: [
        "The digit part and the letter part are independent groups.",
        "Compute the digit part as $P(6,3)$ and the letter part as a single choice from 2 letters.",
        "Multiply the two group totals together.",
      ],
      solutionSteps: [
        "The digit part is $P(6,3)=6\\times5\\times4=120$.",
        "The letter part has 2 choices.",
        "Since the parts are independent, multiply: $120\\times2=240$.",
      ],
    },
  ],
  summary: [
    "$P(n,r)=n\\times(n-1)\\times\\cdots\\times(n-r+1)=\\dfrac{n!}{(n-r)!}$ counts arrangements of $r$ positions filled from a pool of $n$.",
    "Identify $n$ as the pool size and $r$ as the number of positions actually being filled.",
    "For independent groups, compute each group's count separately and multiply the totals.",
  ],
  nextConnection:
    "Next, the same multiplication principle is applied to a common contest setting: arranging digits into numbers, where restrictions like a nonzero leading digit change the count at the first position.",
} satisfies CourseLesson;
