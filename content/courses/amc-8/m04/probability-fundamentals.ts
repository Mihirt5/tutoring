import type { CourseLesson } from "@/lib/courses/types";

export default {
  slug: "probability-fundamentals",
  intro:
    "Probability measures how likely an outcome is by comparing the number of favorable outcomes to the total number of equally likely outcomes. This lesson builds that ratio from an explicit, carefully listed sample space, which is the safest way to avoid missing or double-counting outcomes.",
  sections: [
    {
      id: "a8-m04-l01-s1",
      title: "Defining probability",
      body: [
        "The probability of an event is defined as the number of favorable outcomes divided by the total number of outcomes, provided every outcome is equally likely to occur. Written as a formula, $P(\\text{event})=\\dfrac{\\text{favorable outcomes}}{\\text{total outcomes}}$. A probability is always a number between 0 and 1, where 0 means the event is impossible and 1 means the event is certain.",
        'This formula only works when the phrase "equally likely" genuinely applies. A fair six-sided die has 6 equally likely faces, and a fair coin has 2 equally likely sides, but not every counting setup is automatically equally likely — later lessons return to this caution in more detail.',
      ],
      keyIdea:
        "Probability compares favorable outcomes to total outcomes, but only when every outcome is equally likely.",
    },
    {
      id: "a8-m04-l01-s2",
      title: "Building an explicit sample space",
      body: [
        "The sample space is the complete list of every possible outcome of an experiment. For a single die roll, the sample space is $\\{1,2,3,4,5,6\\}$. For two dice rolled together, each outcome is an ordered pair such as $(3,5)$, meaning the first die shows 3 and the second shows 5; since each die has 6 faces and the two rolls are independent, the sample space has $6\\times6=36$ ordered pairs.",
        "Writing out the sample space explicitly, rather than trying to reason about it in one's head, prevents two common errors: forgetting an outcome entirely, or counting the same outcome more than once. For dice sums, this matters especially, since $(2,5)$ and $(5,2)$ both give a sum of 7 but are two separate outcomes in the 36-outcome sample space.",
      ],
      keyIdea:
        "List the sample space outcome by outcome so none are missed or double-counted.",
    },
    {
      id: "a8-m04-l01-s3",
      title: "Computing probabilities from the sample space",
      body: [
        "Once the sample space is written out, computing a probability is a matter of counting: count how many outcomes in the sample space satisfy the event being asked about, and divide by the total number of outcomes in the sample space. This favorable count should always be checked against the explicit list, not estimated.",
        "The final fraction should always be reduced to lowest terms, matching the convention used throughout this course for exact answers. For example, if 4 outcomes out of a sample space of 8 are favorable, the probability is $\\dfrac{4}{8}=\\dfrac{1}{2}$, not left as $\\dfrac{4}{8}$.",
      ],
      keyIdea:
        "Count favorable outcomes directly from the explicit sample space, then reduce the resulting fraction.",
    },
  ],
  examples: [
    {
      id: "a8-m04-l01-ex1",
      title: "Rolling greater than 4",
      problem:
        "A fair six-sided die is rolled once. What is the probability that the result is greater than 4?",
      steps: [
        "The sample space lists every equally likely outcome: $\\{1,2,3,4,5,6\\}$, a total of 6 outcomes.",
        "The favorable outcomes, those greater than 4, are $\\{5,6\\}$, a total of 2 outcomes.",
        "The probability is favorable over total: $\\dfrac{2}{6}=\\dfrac{1}{3}$.",
      ],
      answer: "1/3",
      takeaway:
        "Probability always compares the count of favorable outcomes to the count of all equally likely outcomes in the sample space.",
    },
    {
      id: "a8-m04-l01-ex2",
      title: "Sum of two dice equals 7",
      problem:
        "Two fair six-sided dice are rolled. What is the probability that the sum of the two results is 7?",
      steps: [
        "Since each die has 6 equally likely faces and the dice are rolled independently, the sample space has $6\\times6=36$ equally likely ordered outcomes.",
        "List the ordered pairs summing to 7: $(1,6),(2,5),(3,4),(4,3),(5,2),(6,1)$, a total of 6 outcomes.",
        "The probability is $\\dfrac{6}{36}=\\dfrac{1}{6}$.",
      ],
      answer: "1/6",
      takeaway:
        "Building the full sample space explicitly, rather than guessing, avoids missing or double-counting favorable outcomes such as $(3,4)$ and $(4,3)$.",
    },
    {
      id: "a8-m04-l01-ex3",
      title: "Spinner multiple of 3",
      problem:
        "A spinner is divided into 8 equal sections numbered 1 through 8. What is the probability that a single spin lands on a multiple of 3?",
      steps: [
        "The sample space is $\\{1,2,3,4,5,6,7,8\\}$, a total of 8 equally likely outcomes.",
        "The multiples of 3 in this range are $\\{3,6\\}$, a total of 2 outcomes.",
        "The probability is $\\dfrac{2}{8}=\\dfrac{1}{4}$.",
      ],
      answer: "1/4",
      takeaway:
        "Once the sample space and favorable outcomes are both listed explicitly, the probability is just their ratio in lowest terms.",
    },
  ],
  commonMistakes: [
    "Forgetting to reduce the resulting fraction to lowest terms.",
    "Building an incomplete sample space, such as listing dice sums without accounting for every ordered pair that produces them.",
    "Assuming outcomes are equally likely without checking, which breaks the favorable-over-total formula.",
  ],
  exercises: [
    {
      id: "a8-m04-l01-q1",
      role: "guided",
      kind: "numeric",
      difficulty: 2,
      question:
        "A fair six-sided die is rolled once. What is the probability that the result is an even number?",
      answer: "1/2",
      hints: [
        "List the full sample space of a single die roll.",
        "Identify which outcomes in that sample space are even.",
        "Divide the count of even outcomes by the total count of outcomes.",
      ],
      solutionSteps: [
        "The sample space is $\\{1,2,3,4,5,6\\}$, 6 outcomes.",
        "The even outcomes are $\\{2,4,6\\}$, 3 outcomes.",
        "The probability is $\\dfrac{3}{6}=\\dfrac{1}{2}$.",
      ],
    },
    {
      id: "a8-m04-l01-q2",
      role: "guided",
      kind: "numeric",
      difficulty: 2,
      question:
        "A bag contains 5 tiles labeled 1 through 5. One tile is drawn at random. What is the probability that the tile shows a number less than 3?",
      answer: "2/5",
      hints: [
        "List every tile in the sample space.",
        "Identify which tiles show a number less than 3.",
        "Divide the favorable count by the total count.",
      ],
      solutionSteps: [
        "The sample space is $\\{1,2,3,4,5\\}$, 5 outcomes.",
        "The tiles less than 3 are $\\{1,2\\}$, 2 outcomes.",
        "The probability is $\\dfrac{2}{5}$.",
      ],
    },
    {
      id: "a8-m04-l01-q3",
      role: "independent",
      kind: "numeric",
      difficulty: 3,
      question:
        "A fair six-sided die is rolled once. What is the probability that the result is a divisor of 6?",
      answer: "2/3",
      hints: [
        "List the divisors of 6 that appear on a standard die face.",
        "Divisors of 6 are 1, 2, 3, and 6.",
        "Divide that count by the total of 6 outcomes.",
      ],
      solutionSteps: [
        "The sample space is $\\{1,2,3,4,5,6\\}$.",
        "The divisors of 6 within this range are $\\{1,2,3,6\\}$, 4 outcomes.",
        "The probability is $\\dfrac{4}{6}=\\dfrac{2}{3}$.",
      ],
    },
    {
      id: "a8-m04-l01-q4",
      role: "independent",
      kind: "numeric",
      difficulty: 3,
      question:
        "A spinner has 10 equal sections numbered 1 through 10. What is the probability that a single spin lands on a multiple of 4?",
      answer: "1/5",
      hints: [
        "List the sample space of the spinner.",
        "Identify every multiple of 4 within that range.",
        "Divide the favorable count by 10.",
      ],
      solutionSteps: [
        "The sample space is $\\{1,2,\\dots,10\\}$, 10 outcomes.",
        "The multiples of 4 in this range are $\\{4,8\\}$, 2 outcomes.",
        "The probability is $\\dfrac{2}{10}=\\dfrac{1}{5}$.",
      ],
    },
    {
      id: "a8-m04-l01-q5",
      role: "independent",
      kind: "mcq",
      difficulty: 3,
      question:
        "Two fair six-sided dice are rolled. Which fraction gives the probability that the sum of the two results is 4?",
      choices: [
        "$\\dfrac{1}{6}$",
        "$\\dfrac{1}{12}$",
        "$\\dfrac{1}{9}$",
        "$\\dfrac{3}{6}$",
      ],
      answer: 1,
      hints: [
        "Build the full 36-outcome sample space for two dice.",
        "List every ordered pair whose sum is 4.",
        "Divide the count of those pairs by 36 and reduce.",
      ],
      solutionSteps: [
        "The sample space has $6\\times6=36$ equally likely ordered outcomes.",
        "The pairs summing to 4 are $(1,3),(2,2),(3,1)$, 3 outcomes.",
        "The probability is $\\dfrac{3}{36}=\\dfrac{1}{12}$.",
      ],
    },
    {
      id: "a8-m04-l01-q6",
      role: "independent",
      kind: "numeric",
      difficulty: 3,
      question:
        "A deck of 9 cards numbered 1 through 9 is shuffled and one card is drawn at random. What is the probability that the card shows a perfect square?",
      answer: "1/3",
      hints: [
        "Recall which numbers between 1 and 9 are perfect squares.",
        "List those perfect squares explicitly: 1, 4, and 9.",
        "Divide that count by the total of 9 cards.",
      ],
      solutionSteps: [
        "The sample space is $\\{1,2,\\dots,9\\}$, 9 outcomes.",
        "The perfect squares in this range are $\\{1,4,9\\}$, 3 outcomes.",
        "The probability is $\\dfrac{3}{9}=\\dfrac{1}{3}$.",
      ],
    },
  ],
  summary: [
    "Probability is the ratio of favorable outcomes to total outcomes, valid when every outcome is equally likely.",
    "Building the sample space explicitly, one outcome at a time, prevents missing or double-counting outcomes.",
    "Always reduce the resulting probability fraction to lowest terms.",
  ],
  nextConnection:
    "The next lesson examines when objects in a sample space should be treated as distinguishable or identical, since that choice changes how outcomes must be counted.",
} satisfies CourseLesson;
