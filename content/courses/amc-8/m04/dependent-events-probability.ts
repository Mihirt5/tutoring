import type { CourseLesson } from "@/lib/courses/types";

export default {
  slug: "dependent-events-probability",
  intro:
    "Dependent events occur when the outcome of one event changes the probabilities available for the next. This lesson explains how removing an item without replacing it shifts the counts a later draw depends on, and shows how to chain several dependent draws together by multiplying updated probabilities stage by stage.",
  sections: [
    {
      id: "a8-m04-l05-s1",
      title: "When one outcome changes the next",
      body: [
        "Two events are dependent when knowing that one of them happened changes what is possible, or how likely it is, for the other. The clearest example is drawing items from a shared pool without putting anything back: once one item is removed, both the total number of items and the number of items in its category shrink for the next draw.",
        "Contrast this with the independent situations from the previous lesson, where an item is replaced before the next draw, restoring the original counts. Whenever a problem describes drawing several objects from the same fixed group and never mentions returning them, treat every draw after the first as depending on what has already been removed.",
      ],
      keyIdea:
        "Removing an item without replacing it changes both the total and the category count available for the next draw.",
    },
    {
      id: "a8-m04-l05-s2",
      title: "Computing probabilities without replacement",
      body: [
        "To find the probability of a second draw given the first draw's outcome, update the counts before computing a new fraction: subtract 1 from the total number of items, and subtract 1 from the count of whichever category the first item belonged to. If the first item drawn shares a category with what the second draw is looking for, that category's count also drops by 1; otherwise only the total drops.",
        "For example, from a bag of 5 red and 3 blue marbles, drawing a red marble first leaves 4 red and 3 blue among 7 remaining marbles, so the next draw's probability of red becomes $\\dfrac{4}{7}$ instead of the original $\\dfrac{5}{8}$.",
      ],
      keyIdea:
        "After removing an item, recompute the next draw's probability using the updated total and updated category count.",
    },
    {
      id: "a8-m04-l05-s3",
      title: "Chaining multiple dependent draws",
      body: [
        "When a problem asks for the probability of a specific sequence of several dependent draws, multiply the stage-by-stage probabilities in order, updating the counts after each stage before computing the next fraction. This mirrors the multiplication principle used for counting arrangements, except each factor is itself a probability computed from the pool as it exists at that stage.",
        "A useful way to check a chained answer is to imagine every individual object as distinguishable and count favorable ordered sequences directly, then divide by the total number of ordered sequences; this direct count should match the product of the stage-by-stage probabilities.",
      ],
      keyIdea:
        "Multiply each stage's updated probability in sequence, and check the result against a direct count of ordered outcomes.",
    },
  ],
  examples: [
    {
      id: "a8-m04-l05-ex1",
      title: "Two marbles without replacement",
      problem:
        "A bag has 5 red and 3 blue marbles. Two marbles are drawn one at a time without replacement. What is the probability that both marbles drawn are red?",
      steps: [
        "$P(\\text{first red})=\\dfrac{5}{8}$.",
        "After removing one red marble, 4 red and 3 blue remain among 7 total, so $P(\\text{second red})=\\dfrac{4}{7}$. Multiply: $\\dfrac{5}{8}\\times\\dfrac{4}{7}=\\dfrac{20}{56}=\\dfrac{5}{14}$.",
        "Checking with combinations: the number of ways to choose 2 red marbles out of 5 divided by the number of ways to choose any 2 marbles out of 8 is $\\dfrac{\\binom{5}{2}}{\\binom{8}{2}}=\\dfrac{10}{28}=\\dfrac{5}{14}$, confirming the answer.",
      ],
      answer: "5/14",
      takeaway:
        "A sequential without-replacement probability matches the corresponding ratio of combination counts.",
    },
    {
      id: "a8-m04-l05-ex2",
      title: "Socks drawn one at a time",
      problem:
        "A drawer has 4 black socks and 2 white socks. Two socks are drawn one at a time without replacement. What is the probability that the first sock drawn is black and the second is white?",
      steps: [
        "$P(\\text{first black})=\\dfrac{4}{6}=\\dfrac{2}{3}$.",
        "After removing one black sock, 3 black and 2 white remain among 5 total, so $P(\\text{second white})=\\dfrac{2}{5}$. Multiply: $\\dfrac{2}{3}\\times\\dfrac{2}{5}=\\dfrac{4}{15}$.",
        "Checking by counting ordered outcomes: there are $6\\times5=30$ ordered draws of 2 distinct socks, and $4\\times2=8$ of them are (black, white), giving $\\dfrac{8}{30}=\\dfrac{4}{15}$.",
      ],
      answer: "4/15",
      takeaway:
        "Counting ordered outcomes directly is a reliable check on a chained without-replacement probability.",
    },
    {
      id: "a8-m04-l05-ex3",
      title: "Three marbles in a specific order",
      problem:
        "A box has 3 red, 2 green, and 1 yellow marble. Three marbles are drawn one at a time without replacement. What is the probability that the marbles are drawn in the exact order red, then green, then yellow?",
      steps: [
        "$P(\\text{red first})=\\dfrac{3}{6}=\\dfrac{1}{2}$. After removing a red marble, 2 red, 2 green, 1 yellow remain among 5, so $P(\\text{green second})=\\dfrac{2}{5}$.",
        "After removing a green marble, 2 red, 1 green, 1 yellow remain among 4, so $P(\\text{yellow third})=\\dfrac{1}{4}$. Multiply all three: $\\dfrac{1}{2}\\times\\dfrac{2}{5}\\times\\dfrac{1}{4}=\\dfrac{2}{40}=\\dfrac{1}{20}$.",
        "Checking by treating the 6 marbles as distinguishable individuals: there are $6\\times5\\times4=120$ ordered draws of 3 marbles, and the favorable sequences pick any of the 3 red marbles first, any of the 2 green marbles second, and the single yellow marble third, giving $3\\times2\\times1=6$ favorable sequences, so $\\dfrac{6}{120}=\\dfrac{1}{20}$.",
      ],
      answer: "1/20",
      takeaway:
        "Treating identical-colored marbles as distinguishable individuals gives an independent way to check a chained probability.",
    },
  ],
  commonMistakes: [
    "Reusing the original total or original category count for a later draw instead of updating both after each item is removed.",
    "Treating draws without replacement as independent and multiplying the first-stage probability by itself.",
    "Forgetting that removing an item of the same category as the next draw changes both the numerator and denominator for that stage, while removing an item of a different category only changes the denominator.",
  ],
  exercises: [
    {
      id: "a8-m04-l05-q1",
      role: "guided",
      kind: "numeric",
      difficulty: 3,
      question:
        "A bag has 4 red and 4 blue marbles. Two marbles are drawn one at a time without replacement. What is the probability that both marbles drawn are blue?",
      answer: "3/14",
      hints: [
        "After the first marble is removed, the total number of marbles remaining changes for the second draw.",
        "Since the first marble drawn was blue, one fewer blue marble remains for the second draw.",
        "Multiply $P(\\text{first blue})$ by the updated $P(\\text{second blue})=\\dfrac{3}{7}$.",
      ],
      solutionSteps: [
        "$P(\\text{first blue})=\\dfrac{4}{8}=\\dfrac{1}{2}$.",
        "After removing one blue marble, 3 blue and 4 red remain out of 7 total, so $P(\\text{second blue})=\\dfrac{3}{7}$.",
        "Multiply: $\\dfrac{1}{2}\\times\\dfrac{3}{7}=\\dfrac{3}{14}$.",
      ],
    },
    {
      id: "a8-m04-l05-q2",
      role: "guided",
      kind: "numeric",
      difficulty: 3,
      question:
        "A class has 10 students, 6 girls and 4 boys. Two students are chosen one after another without replacement to be line leaders. What is the probability that the first chosen is a boy and the second chosen is a girl?",
      answer: "4/15",
      hints: [
        "Choosing the first line leader changes how many students remain for the second choice.",
        "Since the first chosen was a boy, all 6 girls are still available among the remaining students.",
        "Multiply $P(\\text{first boy})$ by the updated $P(\\text{second girl})=\\dfrac{6}{9}$.",
      ],
      solutionSteps: [
        "$P(\\text{first boy})=\\dfrac{4}{10}=\\dfrac{2}{5}$.",
        "After removing one boy, 6 girls remain out of 9 students, so $P(\\text{second girl})=\\dfrac{6}{9}=\\dfrac{2}{3}$.",
        "Multiply: $\\dfrac{2}{5}\\times\\dfrac{2}{3}=\\dfrac{4}{15}$.",
      ],
    },
    {
      id: "a8-m04-l05-q3",
      role: "independent",
      kind: "numeric",
      difficulty: 4,
      question:
        "A drawer has 5 black socks and 3 white socks. Two socks are drawn one at a time without replacement. What is the probability that both socks drawn are black?",
      answer: "5/14",
      hints: [
        "Removing the first black sock changes both the number of black socks and the total for the second draw.",
        "Update both counts before computing the second draw's probability.",
        "Multiply $\\dfrac{5}{8}$ by the updated $\\dfrac{4}{7}$, then simplify.",
      ],
      solutionSteps: [
        "$P(\\text{first black})=\\dfrac{5}{8}$.",
        "After removing one black sock, 4 black remain out of 7 total, so $P(\\text{second black})=\\dfrac{4}{7}$.",
        "Multiply and simplify: $\\dfrac{5}{8}\\times\\dfrac{4}{7}=\\dfrac{20}{56}=\\dfrac{5}{14}$.",
      ],
    },
    {
      id: "a8-m04-l05-q4",
      role: "independent",
      kind: "numeric",
      difficulty: 5,
      question:
        "A box has 4 blue pens and 2 red pens. Three pens are drawn one at a time without replacement. What is the probability that the first pen is blue, the second is blue, and the third is red?",
      answer: "1/5",
      hints: [
        "Update the counts of blue pens and the total after each pen is removed.",
        "Multiply the three stage probabilities in order: first blue, then blue again, then red.",
        "Compute $\\dfrac{2}{3}\\times\\dfrac{3}{5}\\times\\dfrac{1}{2}$, simplifying as you go.",
      ],
      solutionSteps: [
        "$P(\\text{first blue})=\\dfrac{4}{6}=\\dfrac{2}{3}$.",
        "After removing that pen, 3 blue remain among 5 pens, so $P(\\text{second blue})=\\dfrac{3}{5}$.",
        "After removing another blue pen, $P(\\text{third red})=\\dfrac{2}{4}=\\dfrac{1}{2}$; multiplying all three gives $\\dfrac{2}{3}\\times\\dfrac{3}{5}\\times\\dfrac{1}{2}=\\dfrac{1}{5}$.",
      ],
    },
    {
      id: "a8-m04-l05-q5",
      role: "independent",
      kind: "mcq",
      difficulty: 4,
      question:
        "A hat contains 3 winning tickets and 7 losing tickets. Two tickets are drawn one at a time without replacement. Which expression gives the probability that both tickets drawn are winning tickets?",
      choices: [
        "$\\dfrac{3}{10}\\times\\dfrac{3}{10}$",
        "$\\dfrac{3}{10}\\times\\dfrac{2}{9}$",
        "$\\dfrac{3}{10}\\times\\dfrac{7}{9}$",
        "$\\dfrac{3}{10}+\\dfrac{2}{9}$",
      ],
      answer: 1,
      hints: [
        "After the first winning ticket is removed, both the number of winning tickets and the total number of tickets decrease.",
        "The second draw's probability should use the remaining winning tickets out of the remaining total tickets.",
        "The two stage probabilities should be multiplied, not added.",
      ],
      solutionSteps: [
        "$P(\\text{first winning})=\\dfrac{3}{10}$.",
        "After removing one winning ticket, 2 winning tickets remain out of 9 total, so $P(\\text{second winning})=\\dfrac{2}{9}$.",
        "The correct expression is $\\dfrac{3}{10}\\times\\dfrac{2}{9}$.",
      ],
    },
    {
      id: "a8-m04-l05-q6",
      role: "independent",
      kind: "numeric",
      difficulty: 4,
      question:
        "A shelf has 6 fiction books and 4 nonfiction books. Two books are chosen one at a time without replacement. What is the probability that the first book chosen is nonfiction and the second is fiction?",
      answer: "4/15",
      hints: [
        "Removing the first book changes the total and possibly one category's count for the second draw.",
        "Since the first book removed was nonfiction, all 6 fiction books remain among the remaining books.",
        "Multiply $P(\\text{first nonfiction})$ by the updated $P(\\text{second fiction})=\\dfrac{6}{9}$.",
      ],
      solutionSteps: [
        "$P(\\text{first nonfiction})=\\dfrac{4}{10}=\\dfrac{2}{5}$.",
        "After removing one nonfiction book, 6 fiction books remain out of 9, so $P(\\text{second fiction})=\\dfrac{6}{9}=\\dfrac{2}{3}$.",
        "Multiply: $\\dfrac{2}{5}\\times\\dfrac{2}{3}=\\dfrac{4}{15}$.",
      ],
    },
  ],
  summary: [
    "Dependent events occur when the outcome of one draw changes the probabilities available for the next.",
    "Sampling without replacement updates both the total count and the relevant category count at each stage.",
    "Chain dependent probabilities by multiplying each stage's updated probability in sequence, and check the result against a direct count of ordered outcomes.",
  ],
  nextConnection:
    "The next lesson practices telling independent and dependent setups apart from a problem's wording alone, then applying the correct multiplication rule.",
} satisfies CourseLesson;
