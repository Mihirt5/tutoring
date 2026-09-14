import type { CourseLesson } from "@/lib/courses/types";

export default {
  slug: "distinguishability",
  intro:
    "Objects that look identical, such as two marbles of the same color, still need to be treated as individually distinct when building a probability sample space. This lesson explains why, and gives a reliable method — label everything, then group — for avoiding probability errors caused by unequal group sizes.",
  sections: [
    {
      id: "a8-m04-l02-s1",
      title: "Distinguishable versus identical objects",
      body: [
        "Objects are distinguishable when each one can be told apart from the others, such as numbered tiles, named people, or differently colored balls. Objects are identical when nothing distinguishes them from each other, such as two marbles of the exact same color and size. Whether objects are described as identical usually refers to how they look, not to whether they are physically separate objects — two same-colored marbles are still two different marbles, even though they cannot be told apart by sight.",
        "This distinction matters because a sample space must be built from outcomes that are genuinely equally likely. If two physically separate objects are merged into a single outcome just because they look alike, the resulting outcomes may no longer all be equally likely, which breaks the probability formula from the previous lesson.",
      ],
      keyIdea:
        "Objects that look the same are still separate objects, and a trustworthy sample space must account for each one.",
    },
    {
      id: "a8-m04-l02-s2",
      title: "Why the choice changes the count",
      body: [
        "Consider a bag with 2 red balls and 2 blue balls. If the two red balls are (incorrectly) treated as a single option and the two blue balls as another single option, it looks like there might be only a few color patterns to consider, and it becomes tempting to treat those patterns as equally likely without checking. In reality, there are 4 separate physical balls, and the number of ways to choose a pair of them depends on exactly which balls are available, not just their colors.",
        'The danger is that patterns described only by color — such as "two red," "two blue," or "one of each" — usually do not occur equally often, even though there are only 3 such patterns to name. Counting from the individually labeled balls reveals the true, unequal sizes of these groups.',
      ],
      keyIdea:
        "Merging identical-looking objects into one outcome can hide the fact that resulting groups are not equally likely.",
    },
    {
      id: "a8-m04-l02-s3",
      title: "A reliable method: label everything, then group",
      body: [
        "The safest method is to always label every object individually first, even objects that look identical, such as calling two red balls $R_1$ and $R_2$. Counting outcomes from this fully labeled sample space is always trustworthy, because every labeled object is genuinely distinct and every outcome built from them is equally likely.",
        "Once the labeled sample space is built and counted, the objects can be regrouped by whatever pattern the problem actually asks about, such as color. Because the count came from the labeled sample space rather than an assumption, the resulting probability is guaranteed to be correct.",
      ],
      keyIdea:
        "Label every object individually before counting, then group the labeled outcomes by the pattern the question asks about.",
    },
  ],
  examples: [
    {
      id: "a8-m04-l02-ex1",
      title: "Two red balls from a mixed bag",
      problem:
        "A bag contains 2 red balls and 2 blue balls, all the same size and otherwise identical except for color. Two balls are drawn at random without replacement. What is the probability that both balls drawn are red?",
      steps: [
        "Even though the two red balls look identical, treat them as individually labeled $R_1, R_2, B_1, B_2$ to build a trustworthy, equally likely sample space.",
        "The number of ways to draw an unordered pair from the 4 labeled balls is $\\binom{4}{2}=6$, and the number of ways to draw 2 red balls is $\\binom{2}{2}=1$.",
        "The probability is $\\dfrac{1}{6}$.",
      ],
      answer: "1/6",
      takeaway:
        "Labeling visually identical objects individually keeps every outcome in the sample space equally likely, which the favorable-over-total formula requires.",
    },
    {
      id: "a8-m04-l02-ex2",
      title: "Why unlabeled color patterns aren't equally likely",
      problem:
        "Using the same bag of 2 red and 2 blue balls, explain why treating the three possible color patterns for a 2-ball draw — two red, two blue, and one of each — as three equally likely outcomes is incorrect, and find the correct probability of drawing one ball of each color.",
      steps: [
        "With balls labeled $R_1, R_2, B_1, B_2$, the $\\binom{4}{2}=6$ equally likely pairs are $R_1R_2, R_1B_1, R_1B_2, R_2B_1, R_2B_2, B_1B_2$.",
        "Exactly 1 of these 6 pairs is two red, 1 is two blue, and the remaining 4 are one of each, so the three color patterns are not equally likely; treating them as 3 equally likely outcomes would wrongly give $\\dfrac{1}{3}$ for two red instead of the correct $\\dfrac{1}{6}$ found in the previous example.",
        "The correct probability of drawing one ball of each color is $\\dfrac{4}{6}=\\dfrac{2}{3}$.",
      ],
      answer: "2/3",
      takeaway:
        "Grouping outcomes into a named pattern only gives a valid probability once the labeled outcomes within each group have actually been counted.",
    },
    {
      id: "a8-m04-l02-ex3",
      title: "Placing identical tokens into seats",
      problem:
        "Two identical tokens are placed into 2 of 3 numbered seats, chosen at random so that every pair of seats is equally likely to receive a token. What is the probability that seat 1 receives a token?",
      steps: [
        "Since the tokens are identical, an outcome here is simply the unordered pair of seats that receive a token; there are $\\binom{3}{2}=3$ equally likely pairs: $\\{1,2\\}, \\{1,3\\}, \\{2,3\\}$.",
        "Seat 1 receives a token in 2 of these 3 pairs: $\\{1,2\\}$ and $\\{1,3\\}$.",
        "The probability is $\\dfrac{2}{3}$.",
      ],
      answer: "2/3",
      takeaway:
        "When the objects placed are truly identical, the sample space is the set of unordered groups, but this is only equally likely here because the problem states every pair of seats is equally likely to be chosen.",
    },
  ],
  commonMistakes: [
    "Assuming that grouping outcomes by a visible pattern, like a color count, automatically gives equally likely groups, without checking how many labeled outcomes fall into each group.",
    "Failing to label physically identical objects individually when building a sample space, which can hide unequal group sizes.",
    "Using a combination count where the underlying labeled outcomes are not actually all equally likely to occur.",
  ],
  exercises: [
    {
      id: "a8-m04-l02-q1",
      role: "guided",
      kind: "numeric",
      difficulty: 2,
      question:
        "A bag has 3 identical green marbles and 1 yellow marble. One marble is drawn at random. What is the probability that the marble drawn is yellow?",
      answer: "1/4",
      hints: [
        "Even though the green marbles look alike, treat all 4 marbles as individually labeled for the sample space.",
        "Only 1 of the 4 labeled marbles is yellow.",
        "Divide the favorable count by the total of 4.",
      ],
      solutionSteps: [
        "Label the marbles $G_1,G_2,G_3,Y$; all 4 are equally likely to be drawn.",
        "Exactly 1 of the 4 is yellow.",
        "The probability is $\\dfrac{1}{4}$.",
      ],
    },
    {
      id: "a8-m04-l02-q2",
      role: "guided",
      kind: "numeric",
      difficulty: 3,
      question:
        "A drawer has 2 identical black socks and 2 identical white socks. Two socks are drawn at random without replacement. What is the probability that both socks drawn are the same color?",
      answer: "1/3",
      hints: [
        "Label all 4 socks individually, even the same-colored pair, to get equally likely outcomes.",
        "Count the pairs that are both black, and separately the pairs that are both white.",
        "Add those favorable counts and divide by the total number of pairs, $\\binom{4}{2}$.",
      ],
      solutionSteps: [
        "Label the socks $B_1,B_2,W_1,W_2$; there are $\\binom{4}{2}=6$ equally likely pairs.",
        "There is 1 all-black pair and 1 all-white pair, for 2 favorable pairs.",
        "The probability is $\\dfrac{2}{6}=\\dfrac{1}{3}$.",
      ],
    },
    {
      id: "a8-m04-l02-q3",
      role: "independent",
      kind: "numeric",
      difficulty: 3,
      question:
        "A box contains 3 identical red pens and 2 identical blue pens. Two pens are drawn at random without replacement. What is the probability that one pen of each color is drawn?",
      answer: "3/5",
      hints: [
        "Label all 5 pens individually before counting, even the same-colored ones.",
        "Count the pairs consisting of exactly one red pen and one blue pen.",
        "Divide that favorable count by $\\binom{5}{2}$.",
      ],
      solutionSteps: [
        "Label the pens $R_1,R_2,R_3,B_1,B_2$; there are $\\binom{5}{2}=10$ equally likely pairs.",
        "A one-of-each pair pairs any of the 3 reds with any of the 2 blues, giving $3\\times2=6$ favorable pairs.",
        "The probability is $\\dfrac{6}{10}=\\dfrac{3}{5}$.",
      ],
    },
    {
      id: "a8-m04-l02-q4",
      role: "independent",
      kind: "numeric",
      difficulty: 4,
      question:
        "Three identical coins are tossed. Assuming each individual coin lands heads or tails independently and each coin is fair, what is the probability that exactly 2 of the 3 coins land heads?",
      answer: "3/8",
      hints: [
        "Even though the coins are physically identical, label them individually to build an equally likely sample space of outcomes.",
        "There are $2^3=8$ equally likely labeled outcomes; count how many have exactly 2 heads.",
        "The number with exactly 2 heads is $\\binom{3}{2}$; divide by 8.",
      ],
      solutionSteps: [
        "Label the coins $C_1,C_2,C_3$; there are $2^3=8$ equally likely outcomes.",
        "The outcomes with exactly 2 heads correspond to choosing which 2 of the 3 coins show heads: $\\binom{3}{2}=3$.",
        "The probability is $\\dfrac{3}{8}$.",
      ],
    },
    {
      id: "a8-m04-l02-q5",
      role: "independent",
      kind: "mcq",
      difficulty: 3,
      question:
        "A bag contains 4 identical blue chips and 1 red chip. Two chips are drawn at random without replacement. Which fraction gives the probability that both chips drawn are blue?",
      choices: [
        "$\\dfrac{3}{5}$",
        "$\\dfrac{2}{5}$",
        "$\\dfrac{4}{5}$",
        "$\\dfrac{1}{5}$",
      ],
      answer: 0,
      hints: [
        "Label all 5 chips individually, including the 4 blue ones, to get equally likely outcomes.",
        "Count the pairs made of two blue chips using a combination.",
        "Divide that favorable count by $\\binom{5}{2}$.",
      ],
      solutionSteps: [
        "Label the chips $B_1,B_2,B_3,B_4,R$; there are $\\binom{5}{2}=10$ equally likely pairs.",
        "The all-blue pairs number $\\binom{4}{2}=6$.",
        "The probability is $\\dfrac{6}{10}=\\dfrac{3}{5}$.",
      ],
    },
    {
      id: "a8-m04-l02-q6",
      role: "independent",
      kind: "numeric",
      difficulty: 4,
      question:
        "A shelf has 2 identical copies of one novel and 3 identical copies of a different novel. Two books are chosen at random from the shelf without replacement. What is the probability that the two books chosen are different novels?",
      answer: "3/5",
      hints: [
        "Label every copy individually, even copies of the same novel, before counting.",
        "Count the pairs made of one copy from each novel.",
        "Divide that favorable count by $\\binom{5}{2}$.",
      ],
      solutionSteps: [
        "Label the copies $A_1,A_2$ and $B_1,B_2,B_3$; there are $\\binom{5}{2}=10$ equally likely pairs.",
        "A pair with one copy of each novel pairs any of the 2 $A$ copies with any of the 3 $B$ copies: $2\\times3=6$.",
        "The probability is $\\dfrac{6}{10}=\\dfrac{3}{5}$.",
      ],
    },
  ],
  summary: [
    "Objects that look identical must still be labeled individually when building a sample space, so every outcome is equally likely.",
    "Grouping outcomes by a visible pattern is only valid once the labeled outcomes within each group have been counted.",
    "The same underlying labeled sample space can be reused to find the probability of many different color- or category-based events.",
  ],
  nextConnection:
    "The next lesson splits a probability problem into separate, non-overlapping cases and adds their probabilities, extending the case-based reasoning first introduced for counting.",
} satisfies CourseLesson;
