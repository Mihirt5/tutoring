import type { CourseLesson } from "@/lib/courses/types";

export default {
  slug: "dependent-or-independent",
  intro:
    "Before applying any multiplication rule to a probability problem, decide whether the events involved are independent or dependent. This lesson practices reading a problem's wording for replacement and shared-pool language, justifying that decision, and then applying the matching multiplication rule.",
  sections: [
    {
      id: "a8-m04-l06-s1",
      title: "Reading the setup for replacement language",
      body: [
        'Some problems state the replacement rule directly. Phrases like "with replacement" or "the item is put back before the next draw" describe independent events, since the pool returns to its original state before the next draw happens. Phrases like "without replacement," "the item is not returned," or "from what remains" describe dependent events, since the pool has permanently changed.',
        "Spotting this language first, before doing any arithmetic, prevents applying the wrong multiplication rule. When such a phrase appears explicitly, trust it over any assumption about how a typical experiment usually works.",
      ],
      keyIdea:
        "Explicit replacement language settles independence immediately: with replacement means independent, without replacement means dependent.",
    },
    {
      id: "a8-m04-l06-s2",
      title: "Reading the setup when replacement isn't stated outright",
      body: [
        'Many problems never use the word "replacement" at all, so the decision has to come from the structure of the setup. Two separate, non-interacting sources — a different bag for each event, two different classrooms, two different days, or two different devices — are independent, because there is no shared pool for one outcome to change.',
        'By contrast, any situation where several items are taken from one shared, fixed group, and none of them return to that group, is dependent, even if the word "probability" or "replacement" never appears. Selecting several officers one at a time from the same club, or dealing several cards from the same deck, are both dependent because each selection permanently shrinks the same pool the next selection draws from.',
      ],
      keyIdea:
        "Check whether the events draw from one shared, shrinking pool (dependent) or from separate, non-interacting pools (independent).",
    },
    {
      id: "a8-m04-l06-s3",
      title: "Applying the right rule once independence is decided",
      body: [
        "Once a problem is identified as independent, every stage's probability stays exactly as it was originally, so the final answer is simply the product of the unchanged probabilities. Once a problem is identified as dependent, the count and category totals must be updated after every stage before computing the next fraction, and only then should the updated stage probabilities be multiplied together.",
        'Writing out the justification in a sentence — "these are independent because..." or "these are dependent because..." — before doing the arithmetic catches mistakes early and makes the final multiplication straightforward to check.',
      ],
      keyIdea:
        "Independent events multiply unchanged probabilities; dependent events multiply probabilities updated after each stage.",
    },
  ],
  examples: [
    {
      id: "a8-m04-l06-ex1",
      title: "A coin and a separate deck of cards",
      problem:
        "A coin is flipped, and separately, a card is drawn from a full 52-card deck. Are these two events independent or dependent? Find the probability that the coin shows heads and the card is a heart.",
      steps: [
        "The coin and the deck are two separate, non-interacting sources — flipping the coin cannot change which cards remain in the deck — so the events are independent.",
        "$P(\\text{heads})=\\dfrac{1}{2}$ and $P(\\text{heart})=\\dfrac{13}{52}=\\dfrac{1}{4}$, so multiply: $\\dfrac{1}{2}\\times\\dfrac{1}{4}=\\dfrac{1}{8}$.",
        "Checking by counting: there are $2\\times52=104$ equally likely (coin, card) outcomes, and $1\\times13=13$ of them have heads and a heart, giving $\\dfrac{13}{104}=\\dfrac{1}{8}$.",
      ],
      answer: "1/8",
      takeaway:
        "Two separate sources with no shared pool are independent, regardless of how similar their setups look.",
    },
    {
      id: "a8-m04-l06-ex2",
      title: "Candies eaten one at a time",
      problem:
        "A jar has 5 yellow and 3 purple candies. Two candies are eaten one at a time, and the first is not replaced before the second is chosen. Are these two events independent or dependent? Find the probability that the first candy eaten is yellow and the second is purple.",
      steps: [
        'The phrase "not replaced" means the second candy is chosen from a jar that is missing the first candy, so the events are dependent.',
        "$P(\\text{first yellow})=\\dfrac{5}{8}$. After removing one yellow candy, 4 yellow and 3 purple remain among 7, so $P(\\text{second purple})=\\dfrac{3}{7}$. Multiply: $\\dfrac{5}{8}\\times\\dfrac{3}{7}=\\dfrac{15}{56}$.",
        "Checking by counting ordered outcomes: there are $8\\times7=56$ ordered ways to eat 2 distinct candies, and $5\\times3=15$ of them are (yellow, purple), giving $\\dfrac{15}{56}$.",
      ],
      answer: "15/56",
      takeaway:
        'The phrase "not replaced" is a direct signal that the pool has permanently changed for the next event.',
    },
    {
      id: "a8-m04-l06-ex3",
      title: "Two separate classroom bags",
      problem:
        "Two different classrooms each have their own opaque bag: Classroom A's bag has 2 red and 3 blue tiles, and Classroom B's bag has 4 red and 2 blue tiles. One tile is drawn at random from each bag. Are these two events independent or dependent? Find the probability that both tiles drawn are red.",
      steps: [
        "The two bags belong to different classrooms and never share tiles, so drawing from one bag cannot affect what is available in the other; the events are independent.",
        "$P(\\text{red from A})=\\dfrac{2}{5}$ and $P(\\text{red from B})=\\dfrac{4}{6}=\\dfrac{2}{3}$, so multiply: $\\dfrac{2}{5}\\times\\dfrac{2}{3}=\\dfrac{4}{15}$.",
        "Checking by counting: treating the tiles in each bag as distinguishable gives $5\\times6=30$ equally likely ordered outcomes, and $2\\times4=8$ of them are (red, red), giving $\\dfrac{8}{30}=\\dfrac{4}{15}$.",
      ],
      answer: "4/15",
      takeaway:
        "Having the same kind of setup in two places does not create dependence unless the two places actually share a pool.",
    },
  ],
  commonMistakes: [
    "Assuming an event is dependent just because two draws happen from bags with the same kind of items, without checking whether the pools are actually shared.",
    'Missing the phrase "without replacement" or "not returned" and treating a dependent setup as independent.',
    "Updating the counts for a second stage even when the two events come from entirely separate pools that were never connected.",
  ],
  exercises: [
    {
      id: "a8-m04-l06-q1",
      role: "guided",
      kind: "numeric",
      difficulty: 3,
      question:
        "A number cube is rolled, and separately, a second identical number cube is rolled. Are the two rolls independent or dependent? Find the probability that both rolls show a number greater than 4.",
      answer: "1/9",
      hints: [
        "Two separate dice being rolled do not share a pool of outcomes, so check whether one roll can affect the other.",
        "Since the dice are independent, multiply each roll's probability of showing a number greater than 4.",
        "Compute $\\dfrac{1}{3}\\times\\dfrac{1}{3}$.",
      ],
      solutionSteps: [
        "The two dice rolls are independent because rolling one does not change the other.",
        "$P(\\text{greater than }4)=\\dfrac{2}{6}=\\dfrac{1}{3}$ for each die.",
        "Multiply: $\\dfrac{1}{3}\\times\\dfrac{1}{3}=\\dfrac{1}{9}$.",
      ],
    },
    {
      id: "a8-m04-l06-q2",
      role: "guided",
      kind: "numeric",
      difficulty: 3,
      question:
        "A basket has 4 green apples and 2 red apples. Two apples are picked one after another, and the first apple picked is not put back. Are the two picks independent or dependent? Find the probability that both apples picked are green.",
      answer: "2/5",
      hints: [
        'The phrase "not put back" signals that the first pick changes what remains for the second pick.',
        "Update both the number of green apples and the total for the second draw.",
        "Multiply $\\dfrac{2}{3}$ by the updated $\\dfrac{3}{5}$, then simplify.",
      ],
      solutionSteps: [
        "The picks are dependent because the first apple is not returned to the basket.",
        "$P(\\text{first green})=\\dfrac{4}{6}=\\dfrac{2}{3}$; after removing it, $P(\\text{second green})=\\dfrac{3}{5}$ from the remaining 5 apples.",
        "Multiply and simplify: $\\dfrac{2}{3}\\times\\dfrac{3}{5}=\\dfrac{6}{15}=\\dfrac{2}{5}$.",
      ],
    },
    {
      id: "a8-m04-l06-q3",
      role: "independent",
      kind: "numeric",
      difficulty: 3,
      question:
        "A spinner with 5 equal sections numbered 1 through 5 is spun, and independently, a fair coin is flipped. What is the probability that the spinner lands on 5 and the coin shows tails?",
      answer: "1/10",
      hints: [
        "A spinner and a coin are separate devices, so consider whether one outcome could possibly affect the other.",
        "Since they are independent, multiply the two individual probabilities.",
        "Compute $\\dfrac{1}{5}\\times\\dfrac{1}{2}$.",
      ],
      solutionSteps: [
        "The spinner and coin are independent because they are separate devices.",
        "$P(\\text{spinner shows }5)=\\dfrac{1}{5}$ and $P(\\text{tails})=\\dfrac{1}{2}$.",
        "Multiply: $\\dfrac{1}{5}\\times\\dfrac{1}{2}=\\dfrac{1}{10}$.",
      ],
    },
    {
      id: "a8-m04-l06-q4",
      role: "independent",
      kind: "numeric",
      difficulty: 4,
      question:
        "A drawer has 3 large shirts and 5 small shirts. Two shirts are pulled out one at a time and neither is returned to the drawer. Are the two pulls independent or dependent? Find the probability that both shirts pulled are small.",
      answer: "5/14",
      hints: [
        "Since neither shirt is returned, the second pull's pool of shirts is different from the first.",
        "Update the number of small shirts and the total remaining after the first pull.",
        "Multiply $\\dfrac{5}{8}$ by the updated $\\dfrac{4}{7}$, then simplify.",
      ],
      solutionSteps: [
        "The pulls are dependent because the shirts are not returned to the drawer.",
        "$P(\\text{first small})=\\dfrac{5}{8}$; after removing it, $P(\\text{second small})=\\dfrac{4}{7}$ from the remaining 7 shirts.",
        "Multiply and simplify: $\\dfrac{5}{8}\\times\\dfrac{4}{7}=\\dfrac{20}{56}=\\dfrac{5}{14}$.",
      ],
    },
    {
      id: "a8-m04-l06-q5",
      role: "independent",
      kind: "mcq",
      difficulty: 4,
      question:
        "A teacher randomly calls on one student from a class of 20, and on a completely different day, randomly calls on one student from a different class of 15. Which best describes these two events, and why?",
      choices: [
        "Dependent, because both involve calling on a student",
        "Independent, because the two classes are separate pools that never interact",
        "Dependent, because the second class has fewer students",
        "Independent, because both days involve the same teacher",
      ],
      answer: 1,
      hints: [
        "Focus on whether the two selections draw from the same pool of students, not on surface similarities like both involving a teacher.",
        "The two classes never share students, so removing or selecting from one cannot affect the other.",
        "The correct reasoning should mention the two pools being separate and non-interacting.",
      ],
      solutionSteps: [
        "The key test for independence is whether the two selections share a pool that one outcome could change.",
        "The two classes are entirely separate groups of students, so calling on one student never affects the other class.",
        "The two events are independent because the pools never interact.",
      ],
    },
    {
      id: "a8-m04-l06-q6",
      role: "independent",
      kind: "numeric",
      difficulty: 4,
      question:
        "A cooler has 6 juice boxes and 4 water bottles. Two drinks are taken out one at a time for two different people, and the first drink taken is not placed back in the cooler. Are the two selections independent or dependent? Find the probability that the first drink taken is water and the second is juice.",
      answer: "4/15",
      hints: [
        'The phrase "not placed back" signals that the two selections share the same shrinking pool.',
        "Update the total and the juice count after the first drink is removed.",
        "Multiply $P(\\text{first water})$ by the updated $P(\\text{second juice})=\\dfrac{6}{9}$.",
      ],
      solutionSteps: [
        "The selections are dependent because the first drink is not returned to the cooler.",
        "$P(\\text{first water})=\\dfrac{4}{10}=\\dfrac{2}{5}$; after removing it, $P(\\text{second juice})=\\dfrac{6}{9}=\\dfrac{2}{3}$ from the remaining 9 drinks.",
        "Multiply: $\\dfrac{2}{5}\\times\\dfrac{2}{3}=\\dfrac{4}{15}$.",
      ],
    },
  ],
  summary: [
    'Look for replacement language: "with replacement" or separate, non-interacting setups signal independence, while "without replacement" or a shared shrinking pool signals dependence.',
    "Independent events keep the same probability at every stage; dependent events require updating counts after each stage.",
    "Justify the independence decision explicitly before choosing which multiplication rule to apply.",
  ],
  nextConnection:
    "The next module, Casework, generalizes the case-splitting habit from probability problems into a general strategy for counting problems with multiple distinct scenarios.",
} satisfies CourseLesson;
