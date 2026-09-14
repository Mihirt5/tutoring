import type { CourseLesson } from "@/lib/courses/types";

export default {
  slug: "word-rearrangements-fundamentals",
  intro:
    "Rearranging the letters of a word is a permutation problem in disguise. When every letter is different, the count is a plain factorial, but repeated letters change the count because swapping two identical letters never produces a new word. This lesson builds the multinomial formula that handles any mix of repeated letters.",
  sections: [
    {
      id: "a8-m03-l01-s1",
      title: "Arranging a word with all distinct letters",
      body: [
        "A word rearrangement asks how many different strings of letters can be formed by reordering the letters of a given word. When every letter in the word is different from every other letter, this is exactly the same problem as arranging $n$ distinct objects in a row, and the count is $n!$.",
        "For example, the word CRISP has 5 letters, all different, so there are $5!=120$ ways to rearrange them. Each of the 120 outputs is a distinct string, even though most of them are not real English words, because the counting question only cares about the order of the letters, not whether the result is meaningful.",
      ],
      keyIdea:
        "A word with $n$ distinct letters can be rearranged in exactly $n!$ ways.",
    },
    {
      id: "a8-m03-l01-s2",
      title: "Why repeated letters change the count",
      body: [
        "When a letter repeats, treating the repeated copies as if they were distinguishable overcounts the arrangements. Imagine labeling the two L's in LEVEL as $L_1$ and $L_2$ and the two E's as $E_1$ and $E_2$: this labeled version has $5!=120$ arrangements. But swapping $L_1$ and $L_2$ with each other produces the exact same real word, and the same is true for swapping $E_1$ and $E_2$, so every real arrangement of LEVEL was counted multiple times in that labeled total.",
        "Each group of identical letters contributes a factor equal to the number of ways to permute that group among itself. Dividing the labeled total by those factorials removes the overcounting and gives the true number of distinct words.",
      ],
      keyIdea:
        "Treating identical letters as temporarily distinguishable overcounts by the number of ways each repeated group can be permuted among itself.",
    },
    {
      id: "a8-m03-l01-s3",
      title: "The multinomial arrangement formula",
      body: [
        "Combining these ideas gives the multinomial formula: if a word has $n$ letters total, and its distinct letters repeat $r_1, r_2, \\ldots$ times, then the number of distinct arrangements is $\\dfrac{n!}{r_1!\\,r_2!\\cdots}$. A word with no repeated letters is the special case where every $r_i=1$, and every factor in the denominator equals $1!=1$, recovering the plain $n!$ count from the first section.",
        "Applying the formula only takes two steps: count how many letters the word has in total, then count how many times each distinct letter repeats. Once every repeated group's factorial is multiplied into the denominator, the division gives the exact count with no further adjustment needed.",
      ],
      keyIdea:
        "The multinomial formula $\\dfrac{n!}{r_1!\\,r_2!\\cdots}$ divides the total-letter factorial by one factorial for every repeated letter group.",
    },
  ],
  examples: [
    {
      id: "a8-m03-l01-ex1",
      title: "Arranging a word with distinct letters",
      problem:
        "How many different ways can the letters of the word CRISP be arranged in a row?",
      steps: [
        "The word CRISP has 5 letters, and all 5 are different from each other.",
        "Arranging all 5 distinct letters is a straightforward permutation: $5!=5\\times4\\times3\\times2\\times1$.",
        "This product equals 120.",
      ],
      answer: "120",
      takeaway:
        "A word with no repeated letters is arranged in exactly $n!$ ways, the same as arranging $n$ distinct objects in a row.",
    },
    {
      id: "a8-m03-l01-ex2",
      title: "A word with one repeated letter",
      problem:
        "How many different arrangements are there of the letters in the word LEVEL?",
      steps: [
        "LEVEL has 5 letters total: L appears twice, E appears twice, and V appears once.",
        "If the two L's and two E's were temporarily treated as distinct, there would be $5!=120$ arrangements.",
        "Swapping the two L's with each other does not create a new word, and neither does swapping the two E's, so divide by $2!$ for the L's and $2!$ for the E's: $\\dfrac{120}{2!\\,2!}=\\dfrac{120}{4}=30$.",
      ],
      answer: "30",
      takeaway:
        "Every group of identical letters divides the count by that group's factorial, because swapping identical letters produces the same word.",
    },
    {
      id: "a8-m03-l01-ex3",
      title: "A word with two different repeated letters",
      problem:
        "How many different arrangements are there of the letters in the word PEPPER?",
      steps: [
        "PEPPER has 6 letters: P appears 3 times, E appears 2 times, and R appears once.",
        "Apply the multinomial formula: $\\dfrac{6!}{3!\\,2!\\,1!}$.",
        "Compute $6!=720$ and $3!\\times2!\\times1!=6\\times2\\times1=12$, so the count is $720\\div12=60$.",
      ],
      answer: "60",
      takeaway:
        "The multinomial formula $\\dfrac{n!}{r_1!\\,r_2!\\cdots}$ divides by one factorial for every group of repeated letters at once.",
    },
  ],
  commonMistakes: [
    "Using $n!$ for a word with repeated letters without dividing by the repeated letters' factorials, which overcounts identical-looking rearrangements as if they were distinguishable.",
    "Miscounting how many times a letter repeats, especially in longer words, which changes the denominator of the multinomial formula.",
    "Forgetting to include every repeated letter group in the denominator when a word has more than one letter that repeats.",
  ],
  exercises: [
    {
      id: "a8-m03-l01-q1",
      role: "guided",
      kind: "numeric",
      difficulty: 2,
      question:
        "How many different ways can the letters of the word DRUM be arranged in a row?",
      answer: "24",
      hints: [
        "Check whether any letter in DRUM repeats.",
        "Since every letter is different, this is a straightforward permutation of 4 objects.",
        "Compute $4!=4\\times3\\times2\\times1$.",
      ],
      solutionSteps: [
        "DRUM has 4 letters, and all 4 are distinct.",
        "The number of arrangements is $4!=4\\times3\\times2\\times1$.",
        "The result is 24.",
      ],
    },
    {
      id: "a8-m03-l01-q2",
      role: "guided",
      kind: "numeric",
      difficulty: 3,
      question:
        "How many different arrangements are there of the letters in the word KAYAK?",
      answer: "30",
      hints: [
        "Count how many times each letter appears in KAYAK before applying any formula.",
        "K appears twice and A appears twice, out of 5 total letters.",
        "Apply $\\dfrac{5!}{2!\\,2!}$.",
      ],
      solutionSteps: [
        "KAYAK has 5 letters: K appears twice, A appears twice, and Y appears once.",
        "Apply the multinomial formula: $\\dfrac{5!}{2!\\,2!}=\\dfrac{120}{4}$.",
        "The result is 30.",
      ],
    },
    {
      id: "a8-m03-l01-q3",
      role: "independent",
      kind: "numeric",
      difficulty: 3,
      question:
        "How many different ways can the letters of the word PLANET be arranged in a row?",
      answer: "720",
      hints: [
        "Check whether PLANET has any repeated letters.",
        "Since all 6 letters are different, this is a permutation of 6 distinct objects.",
        "Compute $6!=6\\times5\\times4\\times3\\times2\\times1$.",
      ],
      solutionSteps: [
        "PLANET has 6 letters, and all 6 are distinct.",
        "The number of arrangements is $6!$.",
        "The result is 720.",
      ],
    },
    {
      id: "a8-m03-l01-q4",
      role: "independent",
      kind: "numeric",
      difficulty: 4,
      question:
        "How many different arrangements are there of the letters in the word BUBBLE?",
      answer: "120",
      hints: [
        "Count how many times each letter appears in BUBBLE.",
        "The letter B appears 3 times, and every other letter appears once.",
        "Apply $\\dfrac{6!}{3!}$.",
      ],
      solutionSteps: [
        "BUBBLE has 6 letters, and the letter B repeats 3 times while the rest are distinct.",
        "Apply the multinomial formula: $\\dfrac{6!}{3!}=\\dfrac{720}{6}$.",
        "The result is 120.",
      ],
    },
    {
      id: "a8-m03-l01-q5",
      role: "independent",
      kind: "mcq",
      difficulty: 3,
      question:
        "Which expression correctly counts the number of distinct arrangements of the letters in the word MOON?",
      choices: ["$4!$", "$\\dfrac{4!}{2!}$", "$4!-2!$", "$2!\\times2!$"],
      answer: 1,
      hints: [
        "First find how many letters repeat in MOON and how many times.",
        "The letter O appears twice, so the total arrangements need to be divided by $2!$ to remove the double-counting from swapping the two O's.",
        "The correct count divides the total permutations of 4 letters by $2!$; it is not subtracted or multiplied.",
      ],
      solutionSteps: [
        "MOON has 4 letters: O appears twice, and M and N each appear once.",
        "Treating all 4 letters as distinct would give $4!=24$ arrangements, but swapping the two O's does not create a new word, so divide by $2!$.",
        "The correct expression is $\\dfrac{4!}{2!}$, which equals 12.",
      ],
    },
    {
      id: "a8-m03-l01-q6",
      role: "independent",
      kind: "numeric",
      difficulty: 4,
      question:
        "How many different arrangements are there of the letters in the word BANANAS?",
      answer: "420",
      hints: [
        "Count how many times each letter appears in BANANAS before choosing a formula.",
        "The letter A appears 3 times, N appears 2 times, and B and S each appear once, out of 7 letters total.",
        "Apply $\\dfrac{7!}{3!\\,2!}$.",
      ],
      solutionSteps: [
        "BANANAS has 7 letters: A appears 3 times, N appears 2 times, and B and S each appear once.",
        "Apply the multinomial formula: $\\dfrac{7!}{3!\\,2!}=\\dfrac{5040}{12}$.",
        "The result is 420.",
      ],
    },
  ],
  summary: [
    "A word with all distinct letters is arranged in $n!$ ways, just like any $n$ distinct objects.",
    "Each group of identical letters divides the count by that group's factorial, since swapping identical letters produces the same word.",
    "The multinomial formula $\\dfrac{n!}{r_1!\\,r_2!\\cdots}$ divides by one factorial per repeated-letter group at once.",
  ],
  nextConnection:
    "The next lesson adds constraints to word arrangements, such as requiring certain letters to stay together or forbidding certain letters from being adjacent.",
} satisfies CourseLesson;
