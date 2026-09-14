import type { CourseLesson } from "@/lib/courses/types";

export default {
  slug: "permutations-definition",
  intro:
    'A permutation is an arrangement of objects where the order matters. Two arrangements that use the same objects but in a different order count as different permutations. This lesson builds the counting principle that turns "how many orders are possible" into a short multiplication.',
  sections: [
    {
      id: "a8-m01-l01-s1",
      title: "What is a permutation?",
      body: [
        'A permutation is an ordered arrangement of some or all of a set of objects. If three friends line up for a photo, "Ana, Ben, Cy" and "Cy, Ana, Ben" use the same three people but count as two different permutations, because the positions they occupy are different. This is the key test for whether a problem is asking about permutations: swapping two objects while keeping the rest fixed produces a new, distinct outcome.',
        'Contrast this with a situation where order does not matter — choosing 3 people out of 5 to form a committee, where the committee itself is the same regardless of the order the members were chosen in. That kind of counting is a combination, covered in a later lesson. For now, the signal to look for is language like "arrange," "line up," "order," "assign to positions," or "form a code," all of which mean that swapping two objects changes the outcome.',
      ],
      keyIdea:
        "An arrangement is a permutation exactly when swapping two objects produces a genuinely different outcome.",
    },
    {
      id: "a8-m01-l01-s2",
      title: "Counting without listing: the multiplication principle",
      body: [
        "Listing every arrangement works for very small cases, but it becomes impractical quickly — there are already 24 ways to arrange 4 distinct letters. The multiplication principle avoids listing: fill the positions one at a time, and at each position count how many objects remain available, then multiply those counts together.",
        "For example, to arrange 4 distinct books on a shelf, the first position can hold any of the 4 books, the second position any of the remaining 3, the third any of the remaining 2, and the last position is forced to hold whichever single book is left. The total number of arrangements is $4\\times3\\times2\\times1=24$. The same reasoning applies whether the objects are people in a line, digits in a code, or letters in a word: identify how many choices remain at each step, in order, and multiply.",
      ],
      keyIdea:
        "Fill positions one at a time and multiply the number of remaining choices at each step.",
    },
    {
      id: "a8-m01-l01-s3",
      title: "Full arrangements versus partial arrangements",
      body: [
        "Sometimes every object gets placed (arranging all 4 books), and sometimes only some of the objects are placed into positions while the rest are left unused (choosing 2 digits out of 5 to form a 2-digit code). Both are permutation problems, and both use the same multiplication principle — the only difference is how many positions you are filling before you stop multiplying.",
        "A useful habit is to draw one blank for each position you need to fill, then write above each blank how many choices remain at that point. This makes it easy to see whether the count of blanks matches the number of positions the problem actually describes, which is a common place for errors: filling too many or too few blanks changes the answer completely.",
      ],
      keyIdea:
        "Draw one blank per position and label each with the number of remaining choices before multiplying.",
    },
  ],
  examples: [
    {
      id: "a8-m01-l01-ex1",
      title: "Line up three friends",
      problem:
        "In how many ways can Ana, Ben, and Cy line up in a row for a photo?",
      steps: [
        "There are 3 choices for who stands in the first position.",
        "Once the first position is filled, 2 people remain for the second position.",
        "The last position is forced to hold whichever person remains: $3\\times2\\times1=6$.",
      ],
      answer: "6",
      takeaway:
        "Filling one position at a time and multiplying the remaining choices gives the same result as listing every order.",
    },
    {
      id: "a8-m01-l01-ex2",
      title: "A padlock code with no repeats",
      problem:
        "A padlock uses a 3-digit code chosen from the digits 1 through 5, with no digit repeated. How many codes are possible?",
      steps: [
        "The first digit can be any of the 5 available digits.",
        "The second digit can be any of the 4 digits not yet used.",
        "The third digit can be any of the 3 digits not yet used: $5\\times4\\times3=60$.",
      ],
      answer: "60",
      takeaway:
        "Only 3 positions are filled even though 5 digits are available, so the multiplication stops after 3 factors.",
    },
    {
      id: "a8-m01-l01-ex3",
      title: "Arrange four letters",
      problem:
        "How many ways can the letters A, B, C, and D be arranged in a row using all four letters exactly once?",
      steps: [
        "All 4 positions must be filled, using all 4 letters.",
        "The number of choices at each position counts down from 4: $4\\times3\\times2\\times1$.",
        "This product equals 24.",
      ],
      answer: "24",
      takeaway:
        "Arranging every object in a set of size $n$ gives $n\\times(n-1)\\times\\cdots\\times1$ arrangements.",
    },
  ],
  commonMistakes: [
    "Treating an arrangement problem as a combination problem by forgetting that different orders count separately.",
    "Filling more or fewer blanks than the number of positions the problem actually asks for.",
    "Forgetting that once an object is used in one position, it is no longer available for the next position.",
  ],
  exercises: [
    {
      id: "a8-m01-l01-q1",
      role: "guided",
      kind: "numeric",
      difficulty: 2,
      question:
        "In how many ways can 4 runners finish a race, assuming no ties?",
      answer: "24",
      hints: [
        "There are 4 positions to fill: first place, second place, third place, and fourth place.",
        "The number of runners who could finish first is 4; the number who could finish second, given first is decided, is 3.",
        "Multiply the choices at every position: $4\\times3\\times2\\times1$.",
      ],
      solutionSteps: [
        "All 4 runners must be placed into 4 distinct finishing positions.",
        "The number of choices at each position counts down from 4 to 1.",
        "The total is $4\\times3\\times2\\times1=24$.",
      ],
    },
    {
      id: "a8-m01-l01-q2",
      role: "guided",
      kind: "numeric",
      difficulty: 2,
      question:
        "A 2-digit code is formed from the digits 1, 2, 3, and 4, with no digit repeated. How many codes are possible?",
      answer: "12",
      hints: [
        "Only 2 positions are being filled, even though 4 digits are available.",
        "The first digit has 4 choices; the second digit has one fewer choice than that.",
        "Multiply the two choice counts together.",
      ],
      solutionSteps: [
        "The first digit can be any of the 4 available digits.",
        "The second digit can be any of the 3 digits not used in the first position.",
        "The total number of codes is $4\\times3=12$.",
      ],
    },
    {
      id: "a8-m01-l01-q3",
      role: "independent",
      kind: "numeric",
      difficulty: 3,
      question:
        "In how many ways can 5 different books be arranged on a shelf?",
      answer: "120",
      hints: [
        "All 5 books are placed, filling all 5 positions on the shelf.",
        "The number of choices counts down from 5 to 1.",
        "Multiply $5\\times4\\times3\\times2\\times1$.",
      ],
      solutionSteps: [
        "Every one of the 5 positions on the shelf must be filled by one of the 5 books.",
        "The number of remaining choices at each position is 5, 4, 3, 2, then 1.",
        "The product $5\\times4\\times3\\times2\\times1$ equals 120.",
      ],
    },
    {
      id: "a8-m01-l01-q4",
      role: "independent",
      kind: "numeric",
      difficulty: 3,
      question:
        "A 3-letter code is formed from the 6 letters A through F, with no letter repeated. How many codes are possible?",
      answer: "120",
      hints: [
        "Only 3 positions are being filled, even though 6 letters are available.",
        "The choices at each position count down from 6, stopping after 3 factors.",
        "Multiply $6\\times5\\times4$.",
      ],
      solutionSteps: [
        "The first letter of the code can be any of the 6 available letters.",
        "The second letter can be any of the 5 letters not yet used, and the third any of the remaining 4.",
        "The total is $6\\times5\\times4=120$.",
      ],
    },
    {
      id: "a8-m01-l01-q5",
      role: "independent",
      kind: "mcq",
      difficulty: 3,
      question:
        "Which expression correctly counts the number of ways to arrange 3 distinct trophies in a row on a shelf?",
      choices: ["$3+2+1$", "$3\\times2\\times1$", "$3^3$", "$3\\div2\\times1$"],
      answer: 1,
      hints: [
        "Arranging every trophy fills 3 positions, one trophy per position.",
        "The count of remaining choices decreases by exactly 1 at each position.",
        "The positions' choice counts should be multiplied together, not added.",
      ],
      solutionSteps: [
        "The first position has 3 choices, the second has 2, and the third has 1.",
        "These choice counts must be multiplied, not added, because each choice combines with every choice at the other positions.",
        "The correct expression is $3\\times2\\times1$.",
      ],
    },
    {
      id: "a8-m01-l01-q6",
      role: "independent",
      kind: "numeric",
      difficulty: 3,
      question:
        "In how many ways can 6 people be seated in 6 numbered chairs in a row?",
      answer: "720",
      hints: [
        "All 6 people are placed into all 6 chairs, one person per chair.",
        "The number of choices counts down from 6 to 1 across the 6 chairs.",
        "Multiply $6\\times5\\times4\\times3\\times2\\times1$.",
      ],
      solutionSteps: [
        "Every chair must be filled, and every person must be seated, so all 6 positions are used.",
        "The number of remaining choices at each chair is 6, 5, 4, 3, 2, then 1.",
        "The product equals 720.",
      ],
    },
  ],
  summary: [
    "A permutation is an ordered arrangement: swapping two objects produces a different outcome.",
    "Count arrangements by filling positions one at a time and multiplying the number of remaining choices at each step.",
    "Only fill as many positions as the problem actually asks for, even if more objects are available.",
  ],
  nextConnection:
    "Next, the running product $n\\times(n-1)\\times\\cdots\\times1$ that appears throughout permutation counting gets its own name and notation: the factorial.",
} satisfies CourseLesson;
