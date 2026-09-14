import type { CourseLesson } from "@/lib/courses/types";

export default {
  slug: "ratios-fundamentals",
  intro:
    'A ratio compares two or more quantities by division rather than by subtraction. Once a ratio is written in lowest terms, it can be scaled up or down to match any actual total, part, or even the difference between two parts — and it converts directly into a fraction or a percentage. This lesson builds the habit of thinking in "parts" that makes ratio problems fast and reliable.',
  sections: [
    {
      id: "a8-m11-l01-s1",
      title: "What a ratio compares",
      body: [
        'A ratio compares two quantities by division. Writing "the ratio of red to blue marbles is 3 to 5," or $3:5$, means that for every 3 red marbles there are 5 blue marbles — not that there are exactly 3 red and 5 blue marbles, but that the two counts stand in that proportion. A ratio has no units of its own; $3:5$ describes the same relationship whether there are 8 marbles or 800.',
        'It matters whether a ratio compares part to part or part to whole. "Red to blue is $3:5$" is a part-to-part ratio, comparing two pieces of the same collection. "Red to total is $3:8$" is a part-to-whole ratio, since $3+5=8$ is the whole collection. Reading a problem carefully to see which comparison is being made is the single most common place ratio problems go wrong.',
      ],
      keyIdea:
        "A ratio $a:b$ describes a proportion, not an exact count; part-to-part and part-to-whole are different comparisons.",
    },
    {
      id: "a8-m11-l01-s2",
      title: "Ratios, fractions, and percentages",
      body: [
        "Every ratio can be rewritten as a fraction, and every fraction can be rewritten as a percentage, by multiplying by $100\\%$. If red to blue marbles is $3:5$, then red is $\\frac{3}{5}$ as numerous as blue — but red is $\\frac{3}{8}$ of the whole collection, since the whole is $3+5=8$ parts. Converting a ratio to a percentage almost always means dividing by the sum of all the parts, not by one of the individual terms, because a percentage is inherently a part-to-whole comparison.",
        'This conversion runs in both directions. A statement like "60% of the coins are pennies" is the same as the part-to-whole ratio $60:100$, which reduces to $3:5$; since pennies are 3 of every 5 coins, the remaining 2 of every 5 coins are non-pennies, giving a pennies-to-non-pennies part-to-part ratio of $3:2$.',
      ],
      keyIdea:
        "Convert a ratio to a percent by dividing a part by the sum of all the parts, not by another part.",
    },
    {
      id: "a8-m11-l01-s3",
      title: "Scaling a ratio to match reality",
      body: [
        'A ratio in lowest terms, such as $3:5$, is really a statement about "parts": 3 parts of one quantity for every 5 parts of the other. To match this ratio to an actual situation, find one scale factor that turns parts into real units, then apply that same scale factor to every term of the ratio. If the total is known, divide the total by the sum of the parts ($3+5=8$) to get the scale factor; if only one actual quantity is known, divide that quantity by its own number of parts instead.',
        "The same idea handles a less obvious case: matching a ratio to a known difference between two parts. If red is to blue as $3:5$ and blue outnumbers red by a known amount, that amount corresponds to $5-3=2$ parts, so dividing the known difference by 2 gives the scale factor. Whichever quantity is known — a total, a single part, or a difference — the method is the same: figure out how many parts that quantity represents, divide to find the scale factor, then multiply every term of the ratio by it.",
      ],
      keyIdea:
        "Find how many parts a known quantity (total, one part, or a difference) represents, solve for the scale factor, then multiply every term of the ratio by it.",
    },
  ],
  examples: [
    {
      id: "a8-m11-l01-ex1",
      title: "A part from a known total",
      problem:
        "A fruit basket contains apples and oranges in the ratio $3:5$. If the basket has 32 pieces of fruit in total, how many are apples?",
      steps: [
        "The ratio $3:5$ means the fruit splits into $3+5=8$ equal parts in total.",
        "Since 8 parts correspond to 32 pieces of fruit, each part is worth $32\\div8=4$ pieces.",
        "Apples make up 3 of those parts, so there are $3\\times4=12$ apples.",
      ],
      answer: "12",
      takeaway:
        "Convert a total into a number of parts before multiplying by any single term of the ratio.",
    },
    {
      id: "a8-m11-l01-ex2",
      title: "Converting a ratio to a percentage",
      problem:
        "A survey found that the ratio of students who walk to school to those who ride the bus is $7:3$. What percent of these students walk to school?",
      steps: [
        "The whole group of surveyed students corresponds to $7+3=10$ parts.",
        "Students who walk make up 7 of those 10 parts, so the fraction who walk is $\\frac{7}{10}$.",
        "Converting to a percentage: $\\frac{7}{10}\\times100\\%=70\\%$.",
      ],
      answer: "70",
      takeaway:
        "A percentage from a ratio always uses the sum of the parts as the whole, even when the ratio compares only two of several groups.",
    },
    {
      id: "a8-m11-l01-ex3",
      title: "Scaling from a single known part",
      problem:
        "A model airplane is built using a length ratio of $2:15$ compared to the real airplane. If the real airplane is 45 feet long, how long is the model, in feet?",
      steps: [
        'The real airplane\'s length corresponds to the "15" term of the ratio, which is 15 parts.',
        "Since 15 parts equal 45 feet, each part is worth $45\\div15=3$ feet.",
        "The model corresponds to 2 parts, so it is $2\\times3=6$ feet long.",
      ],
      answer: "6",
      takeaway:
        "When only one term of the ratio matches a known real quantity, use that single term to find the scale factor.",
    },
  ],
  commonMistakes: [
    "Dividing a part by another part instead of by the sum of all the parts when converting to a percentage.",
    "Scaling only one term of a ratio and forgetting to apply the same scale factor to the other terms.",
    "Treating a known difference between two quantities as if it were their total when finding the scale factor.",
  ],
  exercises: [
    {
      id: "a8-m11-l01-q1",
      role: "guided",
      kind: "numeric",
      difficulty: 2,
      question:
        "A jar contains red and green candies in the ratio $4:7$. If there are 44 candies in total, how many are green?",
      answer: "28",
      hints: [
        "Find the total number of parts by adding the two terms of the ratio.",
        "Divide the actual total by the number of parts to find how many candies one part represents.",
        "Multiply the value of one part by the green term of the ratio, which is 7.",
      ],
      solutionSteps: [
        "The ratio $4:7$ splits the candies into $4+7=11$ parts.",
        "Since 11 parts equal 44 candies, one part is worth $44\\div11=4$ candies.",
        "Green candies make up 7 parts, so there are $7\\times4=28$ green candies.",
      ],
    },
    {
      id: "a8-m11-l01-q2",
      role: "guided",
      kind: "numeric",
      difficulty: 2,
      question:
        "In a garden, the ratio of roses to tulips is $5:2$. If there are 20 tulips, how many roses are there?",
      answer: "50",
      hints: [
        'The known quantity, 20 tulips, corresponds to the "2" term of the ratio.',
        "Divide 20 by 2 to find the scale factor that turns parts into actual flowers.",
        "Multiply the scale factor by the rose term of the ratio, which is 5.",
      ],
      solutionSteps: [
        "Tulips correspond to 2 parts of the ratio, and there are 20 tulips.",
        "The scale factor is $20\\div2=10$ flowers per part.",
        "Roses correspond to 5 parts, so there are $5\\times10=50$ roses.",
      ],
    },
    {
      id: "a8-m11-l01-q3",
      role: "independent",
      kind: "numeric",
      difficulty: 3,
      question:
        "In a classroom, the ratio of boys to girls is $3:4$. If there are 6 more girls than boys, how many students are in the class in total?",
      answer: "42",
      hints: [
        "The difference between the two terms of the ratio, $4-3=1$, corresponds to the actual difference of 6 students.",
        "Use that single part's value to find the scale factor for the whole ratio.",
        "Add the two terms of the ratio together before multiplying by the scale factor, to get the total.",
      ],
      solutionSteps: [
        "The ratio $3:4$ has a difference of $4-3=1$ part, which corresponds to the 6 extra girls.",
        "So one part is worth 6 students, meaning the scale factor is 6.",
        "The total number of parts is $3+4=7$, so the class has $7\\times6=42$ students.",
      ],
    },
    {
      id: "a8-m11-l01-q4",
      role: "independent",
      kind: "numeric",
      difficulty: 3,
      question:
        "A trail mix is made of peanuts and raisins in the ratio $9:11$. What percent of the trail mix, by weight, is raisins?",
      answer: "55",
      hints: [
        "Find the total number of parts by adding the two terms of the ratio.",
        "Raisins correspond to 11 of those parts, giving a fraction of the whole trail mix.",
        "Multiply that fraction by 100% to convert it to a percentage.",
      ],
      solutionSteps: [
        "The trail mix splits into $9+11=20$ parts in total.",
        "Raisins make up 11 of the 20 parts, a fraction of $\\frac{11}{20}$ of the whole mix.",
        "Converting to a percentage: $\\frac{11}{20}\\times100\\%=55\\%$.",
      ],
    },
    {
      id: "a8-m11-l01-q5",
      role: "independent",
      kind: "mcq",
      difficulty: 3,
      question:
        "The ratio of freshmen to sophomores at a math camp is $8:5$. Which of the following could be the total number of students at the camp?",
      choices: ["50", "64", "78", "90"],
      answer: 2,
      hints: [
        "A total that matches the ratio must be evenly divisible by the sum of the two terms.",
        "Add the terms of the ratio together to find that required divisor.",
        "Check each answer choice for divisibility by that number.",
      ],
      solutionSteps: [
        "The ratio $8:5$ splits the camp into $8+5=13$ parts, so any valid total must be a multiple of 13.",
        "Checking the choices: $50\\div13$, $64\\div13$, and $90\\div13$ all leave remainders, but $78=13\\times6$ exactly.",
        "Only 78 is a multiple of 13, so it is the only possible total.",
      ],
    },
    {
      id: "a8-m11-l01-q6",
      role: "independent",
      kind: "numeric",
      difficulty: 3,
      question:
        "At a bake sale, the ratio of cookies sold to brownies sold is $5:3$. If 18 more cookies were sold than brownies, how many brownies were sold?",
      answer: "27",
      hints: [
        "Find the difference between the two terms of the ratio.",
        "Match that difference in parts to the actual difference of 18 items to find the scale factor.",
        "Multiply the scale factor by the brownies term of the ratio, which is 3.",
      ],
      solutionSteps: [
        "The ratio $5:3$ has a difference of $5-3=2$ parts, which corresponds to the 18 extra cookies sold.",
        "So one part is worth $18\\div2=9$ items, the scale factor.",
        "Brownies correspond to 3 parts, so $3\\times9=27$ brownies were sold.",
      ],
    },
  ],
  summary: [
    "A ratio $a:b$ compares two quantities by division; check whether a problem's comparison is part-to-part or part-to-whole.",
    "Convert a ratio to a percentage by dividing a part by the sum of all the parts, then multiplying by 100%.",
    "Scale a ratio to a real situation by finding what one part is worth from a known total, part, or difference, then multiplying every term by that scale factor.",
  ],
  nextConnection:
    "Ratios compare quantities at a single moment; the next lesson extends this comparison across time, turning ratios into rates that describe speed and work.",
} satisfies CourseLesson;
