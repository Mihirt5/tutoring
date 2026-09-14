import type { CourseLesson } from "@/lib/courses/types";

export default {
  slug: "casework-in-probability",
  intro:
    "Some events can happen in more than one mutually exclusive way, such as a dice sum of 7 or 11. This lesson splits such events into disjoint cases, finds each case's probability separately, and adds them together using the addition rule for events that cannot both occur.",
  sections: [
    {
      id: "a8-m04-l03-s1",
      title: "Recognizing when a problem needs cases",
      body: [
        'An event needs casework when it can occur through more than one distinguishable route, and no single outcome can satisfy more than one of those routes at once. For example, "the sum of two dice is 7 or 11" is really two separate events — sum equals 7, and sum equals 11 — and a single roll can produce only one sum, so the two routes never overlap.',
        'The signal to look for is the word "or" connecting two conditions that describe different, non-overlapping outcomes. If the two conditions could both be true at the same time for some outcome, the event is not a clean case split and needs a different technique to avoid double-counting.',
      ],
      keyIdea:
        "Casework applies when an event splits into routes that cannot both happen at once.",
    },
    {
      id: "a8-m04-l03-s2",
      title: "Computing each case's probability separately",
      body: [
        "Once the cases are identified, each one is treated as its own probability problem: build or reuse the sample space, count the favorable outcomes for that specific case, and divide by the total. The methods from the previous two lessons — listing an explicit sample space and labeling identical-looking objects individually — apply within each case exactly as before.",
        "It helps to keep the total sample space size the same across all cases being compared, since the cases will eventually be combined over that same total. For two dice, every case uses the same 36-outcome sample space; only the favorable count changes from case to case.",
      ],
      keyIdea:
        "Solve each case as its own probability problem using the same underlying sample space.",
    },
    {
      id: "a8-m04-l03-s3",
      title: "Adding case probabilities: the addition rule for disjoint events",
      body: [
        "Because the cases cannot overlap, the total probability of the combined event is simply the sum of the individual case probabilities: $P(\\text{case 1 or case 2})=P(\\text{case 1})+P(\\text{case 2})$. This works because adding disjoint favorable counts and then dividing by the shared total gives the same result as dividing each case first and then adding.",
        "This addition rule fails if the cases are not actually disjoint, since an outcome belonging to both cases would then be counted twice. Before adding, it is worth double-checking that no single outcome could satisfy more than one case, the same exhaustive, non-overlapping standard used for casework in counting problems.",
      ],
      keyIdea:
        "Add case probabilities only when the cases are genuinely disjoint; otherwise some outcomes get counted twice.",
    },
  ],
  examples: [
    {
      id: "a8-m04-l03-ex1",
      title: "Red or green from a mixed bag",
      problem:
        "A single marble is drawn from a bag of 3 red, 2 blue, and 1 green marble, all individually distinguishable objects. What is the probability that the marble is red or green?",
      steps: [
        'The event "red or green" splits into two disjoint cases: drawing a red marble or drawing a green marble; a single marble cannot be both.',
        "The probability of red is $\\dfrac{3}{6}$ and the probability of green is $\\dfrac{1}{6}$.",
        "Since the cases don't overlap, add them: $\\dfrac{3}{6}+\\dfrac{1}{6}=\\dfrac{4}{6}=\\dfrac{2}{3}$.",
      ],
      answer: "2/3",
      takeaway:
        "When an event can happen through mutually exclusive routes, compute each route's probability and add them.",
    },
    {
      id: "a8-m04-l03-ex2",
      title: "Dice sum of 7 or 11",
      problem:
        "Two fair six-sided dice are rolled. What is the probability that the sum is 7 or 11?",
      steps: [
        "Sum equal to 7 and sum equal to 11 are disjoint cases, since a single roll produces only one sum.",
        "From the 36-outcome sample space, 6 outcomes give a sum of 7 and 2 outcomes give a sum of 11.",
        "Add the two case probabilities: $\\dfrac{6}{36}+\\dfrac{2}{36}=\\dfrac{8}{36}=\\dfrac{2}{9}$.",
      ],
      answer: "2/9",
      takeaway:
        "Casework over disjoint sums works because no roll can produce two different sums at once, so the favorable counts simply add.",
    },
    {
      id: "a8-m04-l03-ex3",
      title: "A combined coin-and-die event",
      problem:
        "A fair coin is flipped and a fair six-sided die is rolled. What is the probability that the result is either heads together with an even number, or tails together with a number greater than 4?",
      steps: [
        "These two descriptions are disjoint cases, since a single trial shows either heads or tails, never both.",
        "There are $2\\times6=12$ equally likely coin-die outcomes; heads-with-even gives 3 of them ($H2,H4,H6$), and tails-with-greater-than-4 gives 2 of them ($T5,T6$).",
        "Add the two case counts and divide by the total: $\\dfrac{3+2}{12}=\\dfrac{5}{12}$.",
      ],
      answer: "5/12",
      takeaway:
        "Casework applies just as well to combined experiments like a coin and a die, as long as the cases are checked to be mutually exclusive.",
    },
  ],
  commonMistakes: [
    "Splitting into cases that actually overlap, which double-counts some outcomes when the probabilities are added.",
    "Missing a case entirely, which undercounts the true probability.",
    "Forgetting to recompute the total sample space size for a combined experiment, such as a coin and a die together.",
  ],
  exercises: [
    {
      id: "a8-m04-l03-q1",
      role: "guided",
      kind: "numeric",
      difficulty: 2,
      question:
        "A bag has 4 red, 3 blue, and 2 yellow marbles, all individually distinguishable. One marble is drawn at random. What is the probability that the marble is blue or yellow?",
      answer: "5/9",
      hints: [
        "Identify that blue and yellow cannot both describe the same single marble.",
        "Find the probability of each color separately out of the 9 marbles.",
        "Add the two probabilities together.",
      ],
      solutionSteps: [
        "Blue and yellow are disjoint outcomes for a single marble.",
        "$P(\\text{blue})=\\dfrac{3}{9}$ and $P(\\text{yellow})=\\dfrac{2}{9}$.",
        "Adding gives $\\dfrac{3}{9}+\\dfrac{2}{9}=\\dfrac{5}{9}$.",
      ],
    },
    {
      id: "a8-m04-l03-q2",
      role: "guided",
      kind: "numeric",
      difficulty: 3,
      question:
        "Two fair six-sided dice are rolled. What is the probability that the sum is 2 or 12?",
      answer: "1/18",
      hints: [
        "These two sums cannot both occur on the same roll.",
        "Count the outcomes giving each sum from the 36-outcome sample space.",
        "Add the two counts and divide by 36.",
      ],
      solutionSteps: [
        "Sum 2 occurs only as $(1,1)$, and sum 12 occurs only as $(6,6)$: 1 outcome each.",
        "These are disjoint cases, so add: $1+1=2$ favorable outcomes out of 36.",
        "The probability is $\\dfrac{2}{36}=\\dfrac{1}{18}$.",
      ],
    },
    {
      id: "a8-m04-l03-q3",
      role: "independent",
      kind: "numeric",
      difficulty: 3,
      question:
        "A drawer has 5 black socks, 3 white socks, and 2 gray socks, all individually distinguishable. One sock is drawn at random. What is the probability that the sock is black or gray?",
      answer: "7/10",
      hints: [
        "Black and gray cannot describe the same single sock.",
        "Find each color's probability out of the 10 socks.",
        "Add the two probabilities.",
      ],
      solutionSteps: [
        "$P(\\text{black})=\\dfrac{5}{10}$ and $P(\\text{gray})=\\dfrac{2}{10}$.",
        "These are disjoint cases.",
        "Adding gives $\\dfrac{5}{10}+\\dfrac{2}{10}=\\dfrac{7}{10}$.",
      ],
    },
    {
      id: "a8-m04-l03-q4",
      role: "independent",
      kind: "numeric",
      difficulty: 3,
      question:
        "A fair coin is flipped twice. What is the probability that the two flips show the same result, that is, both heads or both tails?",
      answer: "1/2",
      hints: [
        "Both-heads and both-tails cannot happen on the same pair of flips.",
        "List all 4 equally likely outcomes of two flips.",
        "Add the probability of both heads to the probability of both tails.",
      ],
      solutionSteps: [
        "The sample space is $\\{HH,HT,TH,TT\\}$, 4 equally likely outcomes.",
        "Both heads is 1 outcome and both tails is 1 outcome, disjoint cases.",
        "The probability is $\\dfrac{1}{4}+\\dfrac{1}{4}=\\dfrac{1}{2}$.",
      ],
    },
    {
      id: "a8-m04-l03-q5",
      role: "independent",
      kind: "mcq",
      difficulty: 4,
      question:
        "Two fair six-sided dice are rolled. Which fraction gives the probability that the sum is 5 or 9?",
      choices: [
        "$\\dfrac{2}{9}$",
        "$\\dfrac{1}{6}$",
        "$\\dfrac{4}{9}$",
        "$\\dfrac{1}{9}$",
      ],
      answer: 0,
      hints: [
        "Sum 5 and sum 9 cannot both occur on one roll.",
        "Count the ordered pairs giving each sum separately.",
        "Add the two counts and divide by 36, then reduce.",
      ],
      solutionSteps: [
        "Sum 5 has 4 outcomes and sum 9 has 4 outcomes, both from the 36-outcome sample space.",
        "These are disjoint cases, so add: $4+4=8$.",
        "The probability is $\\dfrac{8}{36}=\\dfrac{2}{9}$.",
      ],
    },
    {
      id: "a8-m04-l03-q6",
      role: "independent",
      kind: "numeric",
      difficulty: 3,
      question:
        "A bag has 6 distinguishable chips numbered 1 through 6. One chip is drawn at random. What is the probability that the chip shows a number less than 3 or greater than 5?",
      answer: "1/2",
      hints: [
        "These two ranges of numbers cannot overlap on a single chip.",
        "Count how many chips fall in each range separately.",
        "Add the two counts and divide by 6.",
      ],
      solutionSteps: [
        "Chips less than 3: $\\{1,2\\}$, 2 chips. Chips greater than 5: $\\{6\\}$, 1 chip.",
        "These are disjoint cases, so add: $2+1=3$.",
        "The probability is $\\dfrac{3}{6}=\\dfrac{1}{2}$.",
      ],
    },
  ],
  summary: [
    "Casework in probability splits an event into mutually exclusive routes and adds each route's probability.",
    "Every case must be checked to be truly disjoint from every other case, or the sum overcounts.",
    "The same casework idea applies to single experiments, combined experiments, and multi-object draws alike.",
  ],
  nextConnection:
    "The next lesson turns to events from separate experiments and asks when their probabilities can simply be multiplied together, which requires the events to be independent.",
} satisfies CourseLesson;
