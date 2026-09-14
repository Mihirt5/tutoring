import type { CourseLesson } from "@/lib/courses/types";

export default {
  slug: "independent-events-probability",
  intro:
    "Two events are independent when the outcome of one has no effect on the possible outcomes or probabilities of the other. This lesson defines independence precisely, builds the multiplication rule for combining independent probabilities, and teaches how to recognize independence from the way a problem is set up.",
  sections: [
    {
      id: "a8-m04-l04-s1",
      title: "What makes two events independent?",
      body: [
        "Two events are independent exactly when knowing that one of them happened gives no new information about whether the other happened. Flipping a coin and then flipping it again are independent: the coin has no memory, so the second flip's chances of heads or tails stay the same no matter what the first flip showed.",
        "Independence often shows up when two experiments use separate objects or separate pools that never interact — a die rolled in one hand and a coin flipped in the other, two people spinning two different spinners, or a marble drawn from a bag and then replaced before a second marble is drawn from that same bag. In every case, nothing about the first outcome changes what is possible or how likely it is for the second.",
      ],
      keyIdea:
        "Events are independent when the outcome of one leaves the other's probabilities completely unchanged.",
    },
    {
      id: "a8-m04-l04-s2",
      title: "The multiplication rule for independent events",
      body: [
        "When two events $A$ and $B$ are independent, the probability that both happen is the product of their individual probabilities: $P(A\\text{ and }B)=P(A)\\times P(B)$. This matches the multiplication principle used for counting: if $A$ has one probability among a set of equally likely outcomes and $B$ has another among a separate set, the combined outcome's chance is the product of the two fractions.",
        "This rule extends to any number of independent events by multiplying all of their probabilities together, in the same way the multiplication principle chains multiple independent choices. Three independent coin flips landing on heads every time has probability $\\dfrac{1}{2}\\times\\dfrac{1}{2}\\times\\dfrac{1}{2}=\\dfrac{1}{8}$.",
      ],
      keyIdea:
        "For independent events, multiply the individual probabilities: $P(A\\text{ and }B)=P(A)\\times P(B)$.",
    },
    {
      id: "a8-m04-l04-s3",
      title: "Recognizing independence from a problem's setup",
      body: [
        'Certain setups reliably signal independence: two separate devices (a coin and a die, two different spinners), two separate people or locations, or a draw from a bag where the item is replaced before the next draw. "With replacement" is a common phrase that restores a bag or deck to its original state, which keeps every later draw\'s probabilities identical to the first.',
        "By contrast, drawing several items from one shared pool without putting anything back changes what remains available, so those draws are not independent — that situation is covered in the next lesson. Before multiplying probabilities together, always check whether the two events could possibly affect the same pool of outcomes.",
      ],
      keyIdea:
        "Separate devices, separate pools, or draws with replacement are the clearest signals of independence.",
    },
  ],
  examples: [
    {
      id: "a8-m04-l04-ex1",
      title: "Two fair coins",
      problem:
        "Two fair coins are flipped. What is the probability that both coins land on heads?",
      steps: [
        "The two coin flips are independent because neither coin affects the other.",
        "Each coin lands on heads with probability $\\dfrac{1}{2}$, so multiply: $\\dfrac{1}{2}\\times\\dfrac{1}{2}=\\dfrac{1}{4}$.",
        "Checking against the full sample space $\\{HH,HT,TH,TT\\}$, exactly 1 of the 4 equally likely outcomes is $HH$, confirming $\\dfrac{1}{4}$.",
      ],
      answer: "1/4",
      takeaway:
        "The multiplication rule for independent events matches a direct count of the full sample space.",
    },
    {
      id: "a8-m04-l04-ex2",
      title: "Two dice with different conditions",
      problem:
        "Two fair six-sided dice are rolled. What is the probability that the first die shows a 5 and the second die shows an even number?",
      steps: [
        "The two dice rolls are independent, since one die's result cannot affect the other.",
        "$P(\\text{first is }5)=\\dfrac{1}{6}$ and $P(\\text{second is even})=\\dfrac{3}{6}=\\dfrac{1}{2}$, so multiply: $\\dfrac{1}{6}\\times\\dfrac{1}{2}=\\dfrac{1}{12}$.",
        "Checking by counting ordered outcomes: there are 36 equally likely rolls, and exactly 3 have a first die of 5 with an even second die $(5,2),(5,4),(5,6)$, giving $\\dfrac{3}{36}=\\dfrac{1}{12}$.",
      ],
      answer: "1/12",
      takeaway:
        "Counting the full 36-outcome sample space directly confirms the product of the two individual probabilities.",
    },
    {
      id: "a8-m04-l04-ex3",
      title: "Drawing with replacement",
      problem:
        "A bag has 4 red and 6 blue marbles. A marble is drawn, its color noted, and then it is put back before a second marble is drawn. What is the probability that the first marble drawn is red and the second is blue?",
      steps: [
        "Because the first marble is replaced before the second draw, the bag is identical for both draws, so the two draws are independent.",
        "$P(\\text{first red})=\\dfrac{4}{10}=\\dfrac{2}{5}$ and $P(\\text{second blue})=\\dfrac{6}{10}=\\dfrac{3}{5}$, so multiply: $\\dfrac{2}{5}\\times\\dfrac{3}{5}=\\dfrac{6}{25}$.",
        "Checking by counting ordered outcomes with replacement: there are $10\\times10=100$ equally likely ordered pairs, and $4\\times6=24$ of them are (red, blue), giving $\\dfrac{24}{100}=\\dfrac{6}{25}$.",
      ],
      answer: "6/25",
      takeaway:
        "Replacing the marble restores the bag to its original state, so the second draw's probabilities never change.",
    },
  ],
  commonMistakes: [
    "Adding the probabilities of independent events instead of multiplying them.",
    "Assuming two events are independent just because they involve different-looking objects, without checking whether the events actually share a pool that one outcome could change.",
    "Forgetting that replacing a drawn item restores the original odds, which is exactly what keeps later draws independent from earlier ones.",
  ],
  exercises: [
    {
      id: "a8-m04-l04-q1",
      role: "guided",
      kind: "numeric",
      difficulty: 2,
      question:
        "A fair coin is flipped and a fair six-sided die is rolled. What is the probability that the coin shows heads and the die shows a 6?",
      answer: "1/12",
      hints: [
        "The coin flip and the die roll are separate experiments that do not affect each other.",
        "Since they are independent, multiply their individual probabilities.",
        "Compute $\\dfrac{1}{2}\\times\\dfrac{1}{6}$.",
      ],
      solutionSteps: [
        "The coin and die are independent because neither outcome affects the other.",
        "$P(\\text{heads})=\\dfrac{1}{2}$ and $P(\\text{a }6)=\\dfrac{1}{6}$.",
        "Multiply: $\\dfrac{1}{2}\\times\\dfrac{1}{6}=\\dfrac{1}{12}$.",
      ],
    },
    {
      id: "a8-m04-l04-q2",
      role: "guided",
      kind: "numeric",
      difficulty: 2,
      question:
        "A spinner has 4 equal sections colored red, blue, green, and yellow. The spinner is spun twice. What is the probability that both spins land on green?",
      answer: "1/16",
      hints: [
        "Each spin is a separate, independent event because the spinner resets between spins.",
        "Multiply the probability of green on the first spin by the probability of green on the second spin.",
        "Compute $\\dfrac{1}{4}\\times\\dfrac{1}{4}$.",
      ],
      solutionSteps: [
        "Each spin is independent, so the multiplication rule applies.",
        "$P(\\text{green})=\\dfrac{1}{4}$ for each spin.",
        "Multiply: $\\dfrac{1}{4}\\times\\dfrac{1}{4}=\\dfrac{1}{16}$.",
      ],
    },
    {
      id: "a8-m04-l04-q3",
      role: "independent",
      kind: "numeric",
      difficulty: 3,
      question:
        "A fair coin is flipped 3 times. What is the probability that all three flips are tails?",
      answer: "1/8",
      hints: [
        "Each flip does not affect the others, so use the multiplication rule for all three flips.",
        "Multiply the probability of tails for each of the 3 flips.",
        "Compute $\\left(\\dfrac{1}{2}\\right)^3$.",
      ],
      solutionSteps: [
        "The three flips are independent.",
        "$P(\\text{tails})=\\dfrac{1}{2}$ each time.",
        "Multiply: $\\dfrac{1}{2}\\times\\dfrac{1}{2}\\times\\dfrac{1}{2}=\\dfrac{1}{8}$.",
      ],
    },
    {
      id: "a8-m04-l04-q4",
      role: "independent",
      kind: "numeric",
      difficulty: 4,
      question:
        "Bag A has 3 red and 2 blue marbles. Bag B has 5 red and 3 blue marbles. One marble is drawn from each bag. What is the probability that both drawn marbles are red?",
      answer: "3/8",
      hints: [
        "Drawing from two separate bags are independent events.",
        "Compute each bag's probability of red separately, then multiply.",
        "Compute $\\dfrac{3}{5}\\times\\dfrac{5}{8}$, and simplify the result.",
      ],
      solutionSteps: [
        "The two draws are independent since they come from separate bags.",
        "$P(\\text{red from A})=\\dfrac{3}{5}$ and $P(\\text{red from B})=\\dfrac{5}{8}$.",
        "Multiply and simplify: $\\dfrac{3}{5}\\times\\dfrac{5}{8}=\\dfrac{15}{40}=\\dfrac{3}{8}$.",
      ],
    },
    {
      id: "a8-m04-l04-q5",
      role: "independent",
      kind: "mcq",
      difficulty: 4,
      question:
        "A fair six-sided die is rolled twice. Which expression gives the probability that the first roll is a 3 and the second roll is greater than 4?",
      choices: [
        "$\\dfrac{1}{6}+\\dfrac{1}{3}$",
        "$\\dfrac{1}{6}\\times\\dfrac{1}{3}$",
        "$\\dfrac{1}{6}\\times\\dfrac{4}{6}$",
        "$\\dfrac{1}{3}\\times\\dfrac{1}{3}$",
      ],
      answer: 1,
      hints: [
        "The two rolls are independent, so their probabilities should be multiplied, not added.",
        "The probability the second roll is greater than 4 means it is a 5 or a 6, which is 2 out of 6 outcomes.",
        "Multiply $P(\\text{first is }3)$ by $P(\\text{second is greater than }4)$.",
      ],
      solutionSteps: [
        "The two rolls do not affect each other, so multiply rather than add.",
        "$P(\\text{first}=3)=\\dfrac{1}{6}$, and $P(\\text{second}>4)=\\dfrac{2}{6}=\\dfrac{1}{3}$.",
        "The correct expression is $\\dfrac{1}{6}\\times\\dfrac{1}{3}$.",
      ],
    },
    {
      id: "a8-m04-l04-q6",
      role: "independent",
      kind: "numeric",
      difficulty: 3,
      question:
        "A fair coin is flipped and, separately, a card is drawn from a standard 52-card deck. What is the probability that the coin shows heads and the card is a king?",
      answer: "1/26",
      hints: [
        "The coin flip and the card draw are independent because they come from separate random processes.",
        "There are 4 kings in a standard 52-card deck.",
        "Multiply $P(\\text{heads})$ by $P(\\text{king})$.",
      ],
      solutionSteps: [
        "The coin flip and card draw do not affect each other.",
        "$P(\\text{heads})=\\dfrac{1}{2}$, and $P(\\text{king})=\\dfrac{4}{52}=\\dfrac{1}{13}$.",
        "Multiply: $\\dfrac{1}{2}\\times\\dfrac{1}{13}=\\dfrac{1}{26}$.",
      ],
    },
  ],
  summary: [
    "Two events are independent when the outcome of one does not change the probabilities of the other.",
    "For independent events, multiply their individual probabilities: $P(A\\text{ and }B)=P(A)\\times P(B)$.",
    "Look for setup clues like separate experiments, separate pools, or draws with replacement to recognize independence.",
  ],
  nextConnection:
    "The next lesson turns to dependent events, where removing an item without replacing it changes the probabilities available for the next draw.",
} satisfies CourseLesson;
