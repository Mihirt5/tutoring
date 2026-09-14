import type { CourseLesson } from "@/lib/courses/types";

export default {
  slug: "digit-permutations",
  intro:
    "Forming numbers out of digits looks like ordinary permutation counting, but it hides an extra rule: a multi-digit number cannot start with 0. This lesson shows how to handle that leading-digit restriction, and how to combine it with other conditions such as requiring the number to be even or odd.",
  sections: [
    {
      id: "a8-m01-l04-s1",
      title: "The leading-digit restriction",
      body: [
        'A 3-digit number cannot begin with 0 — "037" is really just the 2-digit number 37. So whenever 0 is among the digits available for a number-forming problem, the leftmost position has one fewer available choice than the multiplication principle would otherwise suggest, because 0 must be excluded from that position specifically.',
        "This restriction only affects the leftmost position. Once the leading digit is chosen from the allowed nonzero digits, every other position is filled normally from whatever digits remain, including 0 if it has not yet been used. It is a common error to exclude 0 from every position instead of just the leading one, which undercounts the true total.",
      ],
      keyIdea:
        "Exclude 0 only from the leading position; every other position may still use 0 once it becomes available.",
    },
    {
      id: "a8-m01-l04-s2",
      title: "Fill the most restricted position first",
      body: [
        'When a problem adds an extra condition on top of "no repeated digits" — a nonzero leading digit, or a units digit that must be even, for instance — figure out how many choices satisfy that specific condition before worrying about the other positions. Then fill the remaining positions with the ordinary multiplication principle, using whatever digits are left after the restricted position is filled.',
        "This order does not change the final count, because the multiplication principle only cares about how many choices exist at each position given everything decided so far — it does not require filling positions from left to right. Filling the most restricted position first just makes it easier to correctly count the choices at every other position, since the restriction has already been accounted for.",
      ],
      keyIdea:
        "Decide the restricted position's choices first, then fill the rest of the positions normally with what remains.",
    },
    {
      id: "a8-m01-l04-s3",
      title: "When one digit plays two restricted roles",
      body: [
        "Occasionally a single digit is entangled in two different restrictions at once — for example, 0 is excluded from the leading position, but 0 is also one of the digits that would make a number even. In that situation, whether 0 is used as the units digit changes how many digits remain available for the leading position, so the two restrictions cannot be handled completely independently.",
        "The reliable fix is to split into cases based on whether the doubly-restricted digit is used in its special role: one case where it is (so it cannot also be excluded from the leading position, since it is already placed elsewhere), and one case where it is not (so the leading-digit exclusion applies as usual). Add the counts from each case together. This kind of case split gets a full treatment in a later module, but recognizing when it is needed avoids a subtly wrong count here.",
      ],
      keyIdea:
        "If a digit is restricted in two different ways at once, split into cases based on where that digit ends up.",
    },
  ],
  examples: [
    {
      id: "a8-m01-l04-ex1",
      title: "No zero in the digit set",
      problem:
        "How many 3-digit numbers can be formed using the digits 1, 2, 3, 4, and 5, with no digit repeated?",
      steps: [
        "Since 0 is not among the available digits, there is no leading-digit restriction to worry about.",
        "This is ordinary digit permutation: $P(5,3)=5\\times4\\times3$.",
        "The product equals 60.",
      ],
      answer: "60",
      takeaway:
        "The leading-digit restriction only matters when 0 is actually among the available digits.",
    },
    {
      id: "a8-m01-l04-ex2",
      title: "Zero is available",
      problem:
        "How many 3-digit numbers can be formed using the digits 0, 1, 2, 3, and 4, with no digit repeated?",
      steps: [
        "The leading digit cannot be 0, so it has 4 choices: 1, 2, 3, or 4.",
        "The second digit can be any of the remaining 4 digits, including 0 now that it is eligible.",
        "The third digit can be any of the remaining 3 digits: $4\\times4\\times3=48$.",
      ],
      answer: "48",
      takeaway:
        "Only the leading position loses a choice; the later positions still have their full remaining count.",
    },
    {
      id: "a8-m01-l04-ex3",
      title: "An extra condition on the last digit",
      problem:
        "How many 3-digit even numbers can be formed using the digits 1, 2, 3, 4, and 5, with no digit repeated?",
      steps: [
        "The units digit must be even, so it must be 2 or 4: 2 choices.",
        "The hundreds digit can be any of the remaining 4 digits (0 is not in this set, so there is no leading-digit issue).",
        "The tens digit can be any of the remaining 3 digits: $2\\times4\\times3=24$.",
      ],
      answer: "24",
      takeaway:
        "Deciding the restricted units digit first makes counting the remaining positions straightforward.",
    },
  ],
  commonMistakes: [
    "Excluding 0 from every position instead of only the leading position.",
    "Filling positions left to right by habit even when a different position carries the real restriction.",
    "Missing that a digit restricted from the leading position can still be entangled with a separate condition, such as being required for a parity condition, which calls for a case split.",
  ],
  exercises: [
    {
      id: "a8-m01-l04-q1",
      role: "guided",
      kind: "numeric",
      difficulty: 3,
      question:
        "How many 4-digit numbers can be formed using the digits 1, 2, 3, 4, 5, and 6, with no digit repeated?",
      answer: "360",
      hints: [
        "Zero is not among the available digits, so there is no leading-digit restriction.",
        "This is ordinary digit permutation with 4 positions filled from a pool of 6 digits.",
        "Compute $P(6,4)=6\\times5\\times4\\times3$.",
      ],
      solutionSteps: [
        "Since 0 is not in the digit set, every position has its full count of remaining choices.",
        "This is $P(6,4)=6\\times5\\times4\\times3$.",
        "The product equals 360.",
      ],
    },
    {
      id: "a8-m01-l04-q2",
      role: "guided",
      kind: "numeric",
      difficulty: 4,
      question:
        "How many 3-digit numbers can be formed using the digits 0, 1, 2, 3, 4, 5, and 6, with no digit repeated?",
      answer: "180",
      hints: [
        "The leading digit cannot be 0, so count its choices from the nonzero digits only.",
        "The second and third digits are filled from whatever remains, including 0 once it becomes available.",
        "Multiply the three positions' choice counts together.",
      ],
      solutionSteps: [
        "The leading digit has 6 choices: 1 through 6.",
        "The second digit has 6 remaining choices (including 0), and the third digit has 5 remaining choices.",
        "The total is $6\\times6\\times5=180$.",
      ],
    },
    {
      id: "a8-m01-l04-q3",
      role: "independent",
      kind: "numeric",
      difficulty: 3,
      question:
        "How many 2-digit numbers can be formed using the digits 0, 1, 2, 3, and 4, with no digit repeated?",
      answer: "16",
      hints: [
        "The leading digit cannot be 0.",
        "Count the leading digit's choices first, then the remaining digit's choices.",
        "Multiply the two positions' choice counts.",
      ],
      solutionSteps: [
        "The leading digit has 4 choices: 1, 2, 3, or 4.",
        "The second digit can be any of the remaining 4 digits, including 0.",
        "The total is $4\\times4=16$.",
      ],
    },
    {
      id: "a8-m01-l04-q4",
      role: "independent",
      kind: "numeric",
      difficulty: 4,
      question:
        "How many 3-digit odd numbers can be formed using the digits 1, 2, 3, 4, and 5, with no digit repeated?",
      answer: "36",
      hints: [
        "The units digit must be odd; count how many of the available digits are odd.",
        "Decide the units digit's choices first, then fill the remaining two positions.",
        "Multiply the three positions' choice counts.",
      ],
      solutionSteps: [
        "The odd digits available are 1, 3, and 5, giving 3 choices for the units digit.",
        "The hundreds digit then has 4 remaining choices, and the tens digit has 3 remaining choices.",
        "The total is $3\\times4\\times3=36$.",
      ],
    },
    {
      id: "a8-m01-l04-q5",
      role: "independent",
      kind: "mcq",
      difficulty: 4,
      question:
        "A 3-digit number is formed from the digits 0, 1, 2, and 3, with no digit repeated. Which expression correctly counts the number of such 3-digit numbers?",
      choices: [
        "$3\\times3\\times2$",
        "$4\\times3\\times2$",
        "$3\\times2\\times1$",
        "$4\\times4\\times4$",
      ],
      answer: 0,
      hints: [
        "The leading digit cannot be 0, so it has one fewer choice than the full digit count.",
        "The remaining two positions are filled from whatever digits (including 0) are left.",
        "Count the choices at each of the three positions in order.",
      ],
      solutionSteps: [
        "The leading digit has 3 choices: 1, 2, or 3.",
        "The second digit has 3 remaining choices (including 0), and the third digit has 2 remaining choices.",
        "The correct expression is $3\\times3\\times2$, which equals 18.",
      ],
    },
    {
      id: "a8-m01-l04-q6",
      role: "independent",
      kind: "numeric",
      difficulty: 5,
      question:
        "How many 3-digit even numbers can be formed using the digits 0, 1, 2, 3, and 4, with no digit repeated?",
      answer: "30",
      hints: [
        "The digit 0 is both excluded from the leading position and eligible to make the number even, so split into cases based on whether 0 is the units digit.",
        "In the case where the units digit is 0, count the choices for the remaining two positions.",
        "In the case where the units digit is 2 or 4, count the leading digit's choices carefully, since 0 is still excluded there.",
      ],
      solutionSteps: [
        "Case 1: the units digit is 0. The hundreds digit then has 4 remaining choices (1, 2, 3, or 4), and the tens digit has 3 remaining choices, giving $4\\times3=12$.",
        "Case 2: the units digit is 2 or 4 (2 choices). The hundreds digit cannot be 0 or the chosen units digit, leaving 3 choices, and the tens digit has 3 remaining choices, giving $2\\times3\\times3=18$.",
        "Adding the two cases gives $12+18=30$.",
      ],
    },
  ],
  summary: [
    "A multi-digit number's leading position excludes 0, but every other position may still use 0 once available.",
    "Decide the most restricted position's choices first, then fill the remaining positions with the multiplication principle.",
    "If a single digit is entangled in two restrictions at once, split into cases based on where that digit ends up.",
  ],
  nextConnection:
    "Next, arranging objects around a circle introduces a different kind of adjustment: rotating an entire circular arrangement produces the same physical arrangement, which changes how the multiplication principle is applied.",
} satisfies CourseLesson;
