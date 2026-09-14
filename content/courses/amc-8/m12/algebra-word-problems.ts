import type { CourseLesson } from "@/lib/courses/types";

export default {
  slug: "algebra-word-problems",
  intro:
    "A full word problem often bundles several conditions and several possible unknowns into a single paragraph. Solving it well means breaking the paragraph into separate conditions, choosing a variable that keeps the resulting equations simple, and — at the very end — making sure the number reported actually answers the question that was asked, not just the variable that was solved for.",
  sections: [
    {
      id: "a8-m12-l03-s1",
      title: "Breaking a paragraph into conditions",
      body: [
        'A multi-sentence word problem is really a list of separate conditions joined together in prose. Reading it one sentence at a time, and turning each sentence into its own short equation, keeps the translation manageable even when the whole paragraph looks complicated. Phrases like "more than," "less than," "twice as many as," and "the sum of" each have a direct algebraic translation, and mixing up their order is the most common source of an incorrect equation.',
        '"Sam has 20 dollars more than Priya" becomes $\\text{Sam}=\\text{Priya}+20$ — the quantity that comes right after "more than" is the one being added to, not the one doing the adding. Reading the sentence slowly, phrase by phrase, in the order it is written prevents this equation from accidentally being flipped.',
      ],
      keyIdea:
        "Translate each sentence of a word problem into its own equation, reading comparison phrases in the exact order they appear.",
    },
    {
      id: "a8-m12-l03-s2",
      title: "Choosing a variable that keeps equations simple",
      body: [
        'A word problem often allows more than one reasonable choice of variable, and some choices lead to much simpler equations than others. If a condition is phrased in terms of a total — "a friend received 3 more than half of the total" — letting the variable stand for the total itself avoids introducing a fraction that would otherwise appear when solving backward from a part to the whole.',
        'As a rule, look at which quantity the problem\'s conditions are phrased directly in terms of, and let that quantity be the variable; the other unknowns can then usually be written as simple expressions in that variable, without any division. When a condition is a comparison such as "7 fewer than twice the number of child tickets," letting the variable be the child ticket count lets the adult count be written directly as $2c-7$, with no fraction required.',
      ],
      keyIdea:
        "Let the variable stand for whichever quantity the problem's conditions are phrased directly in terms of, so the other unknowns come out as fraction-free expressions.",
    },
    {
      id: "a8-m12-l03-s3",
      title: "Interpreting the solution in the problem's own terms",
      body: [
        "Solving the equation produces a value for whichever variable was chosen, but that variable is not always the quantity the question actually asked for. If the variable represents Priya's money but the question asks how much Sam has, the final answer requires one more step: substituting the solved value back into the expression for Sam's money, not simply reporting the variable's value.",
        "A finished answer should also be sanity-checked against the real-world meaning of the problem: counts of people, tickets, or packages should be non-negative whole numbers, and a reported answer that is negative or fractional when the context requires a whole count is a signal that a sentence was mistranslated somewhere earlier.",
      ],
      keyIdea:
        "Substitute the solved variable back into whatever expression the actual question refers to, and check that the final answer makes sense in the problem's real-world context.",
    },
  ],
  examples: [
    {
      id: "a8-m12-l03-ex1",
      title: "Solving for one quantity, answering for another",
      problem:
        "Sam has 20 dollars more than Priya. Together they have 84 dollars. How much money does Sam have?",
      steps: [
        "Let $p$ be the amount of money Priya has, so Sam has $p+20$.",
        "The total condition gives $p+(p+20)=84$, so $2p+20=84$, meaning $2p=64$ and $p=32$.",
        "The question asks for Sam's money, not Priya's, so the answer is $p+20=32+20=52$.",
      ],
      answer: "52",
      takeaway:
        "Solving for the chosen variable is not the last step whenever the question asks about a different quantity built from that variable.",
    },
    {
      id: "a8-m12-l03-ex2",
      title: "Choosing the total as the variable",
      problem:
        "A number of stamps is shared so that one friend receives 3 more than half of the total. That friend received 15 stamps. How many stamps were there in total?",
      steps: [
        "Since the condition is phrased directly in terms of the total, let $T$ be the total number of stamps.",
        "The condition translates to $\\frac{T}{2}+3=15$.",
        "Subtracting 3 gives $\\frac{T}{2}=12$, so $T=24$.",
      ],
      answer: "24",
      takeaway:
        "Letting the variable match the quantity a condition is phrased in terms of avoids working backward through an extra fraction.",
    },
    {
      id: "a8-m12-l03-ex3",
      title: "Interpreting a whole-number answer in context",
      problem:
        "A store sells pens in packs of 4. Maria buys some packs and gives 6 pens to her friend, leaving her with 18 pens. How many packs did she buy?",
      steps: [
        "Let $p$ be the number of packs Maria bought, so she started with $4p$ pens.",
        "After giving away 6 pens she has $4p-6=18$ pens left.",
        "Solving gives $4p=24$, so $p=6$ packs — a whole number, which makes sense since packs cannot be bought fractionally.",
      ],
      answer: "6",
      takeaway:
        "Confirming that a final answer is a sensible whole number is a useful check that the equation was set up correctly.",
    },
  ],
  commonMistakes: [
    "Flipping a comparison phrase, such as writing $\\text{Priya}=\\text{Sam}+20$ instead of $\\text{Sam}=\\text{Priya}+20$.",
    "Reporting the value of the variable that was solved for, even when the question asked about a different quantity built from it.",
    "Choosing a variable for a quantity that is only ever described indirectly, introducing avoidable fractions into every equation.",
  ],
  exercises: [
    {
      id: "a8-m12-l03-q1",
      role: "guided",
      kind: "numeric",
      difficulty: 3,
      question:
        "In 5 years, Maya will be twice as old as she was 3 years ago. How old is Maya now?",
      answer: "11",
      hints: [
        "Let $m$ be Maya's current age, and write expressions for her age in 5 years and her age 3 years ago.",
        "Translate the sentence into an equation relating those two expressions.",
        "Solve the resulting equation for $m$.",
      ],
      solutionSteps: [
        "Let $m$ be Maya's current age, so in 5 years she is $m+5$ and 3 years ago she was $m-3$.",
        "The condition gives $m+5=2(m-3)$, which expands to $m+5=2m-6$.",
        "Solving gives $11=m$, so Maya is 11 years old now.",
      ],
    },
    {
      id: "a8-m12-l03-q2",
      role: "guided",
      kind: "numeric",
      difficulty: 3,
      question:
        "A rectangular garden's length is 5 meters more than its width. If the perimeter is 34 meters, what is the width, in meters?",
      answer: "6",
      hints: [
        "Let $w$ be the width, and write the length as an expression in $w$.",
        "Use the perimeter formula $2(\\text{length}+\\text{width})=34$.",
        "Substitute the expression for the length and solve for $w$.",
      ],
      solutionSteps: [
        "Let $w$ be the width, so the length is $w+5$.",
        "The perimeter condition gives $2\\big((w+5)+w\\big)=34$, so $2(2w+5)=34$, meaning $4w+10=34$.",
        "Solving gives $4w=24$, so $w=6$ meters.",
      ],
    },
    {
      id: "a8-m12-l03-q3",
      role: "independent",
      kind: "numeric",
      difficulty: 4,
      question:
        "A number of cookies is divided among some kids so each gets 4 less than a third of the total. Each kid received 6 cookies. How many cookies were there in total?",
      answer: "30",
      hints: [
        "The condition is phrased directly in terms of the total, so let the variable stand for the total.",
        'Translate "4 less than a third of the total equals 6" into an equation.',
        "Solve for the total by first isolating the fraction of the total.",
      ],
      solutionSteps: [
        "Let $T$ be the total number of cookies, so the condition is $\\frac{T}{3}-4=6$.",
        "Adding 4 to both sides gives $\\frac{T}{3}=10$.",
        "Multiplying both sides by 3 gives $T=30$ cookies in total.",
      ],
    },
    {
      id: "a8-m12-l03-q4",
      role: "independent",
      kind: "numeric",
      difficulty: 4,
      question:
        "A jar has red and blue marbles. There are 8 more blue marbles than red marbles, and together the marbles total 52. How many blue marbles are in the jar?",
      answer: "30",
      hints: [
        "Let $r$ be the number of red marbles, and write the number of blue marbles as an expression in $r$.",
        "Use the total condition to write and solve an equation in $r$.",
        "Remember the question asks for the number of blue marbles, not red.",
      ],
      solutionSteps: [
        "Let $r$ be the number of red marbles, so the blue marbles number $r+8$.",
        "The total condition gives $r+(r+8)=52$, so $2r+8=52$, meaning $2r=44$ and $r=22$.",
        "The question asks for blue marbles, which is $r+8=22+8=30$.",
      ],
    },
    {
      id: "a8-m12-l03-q5",
      role: "independent",
      kind: "mcq",
      difficulty: 4,
      question:
        'A problem states: "The number of adult tickets sold was 7 fewer than twice the number of child tickets sold, and 63 tickets were sold in total." Which choice of variable leads to equations without any fractions?',
      choices: [
        "Let $a$ = number of adult tickets; then $c=\\frac{a+7}{2}$",
        "Let $c$ = number of child tickets; then $a=2c-7$",
        "Let $x$ = half the total number of tickets",
        "Let $a$ = number of adult tickets; then $c=\\frac{a}{2}+7$",
      ],
      answer: 1,
      hints: [
        "Look at which quantity the comparison sentence is phrased directly in terms of.",
        '"7 fewer than twice the number of child tickets" describes the adult count directly using the child count.',
        "Letting the variable be that directly-described quantity avoids needing to divide by 2 to express the other one.",
      ],
      solutionSteps: [
        "The sentence describes the adult count directly as an expression in the child count: adult $=2\\times\\text{child}-7$.",
        "Letting $c$ be the number of child tickets makes this expression fraction-free: $a=2c-7$.",
        "The other choices either invert this relationship, requiring a division by 2, or use an unhelpful variable like half the total.",
      ],
    },
    {
      id: "a8-m12-l03-q6",
      role: "independent",
      kind: "numeric",
      difficulty: 5,
      question:
        "A number is increased by 6, and the result is tripled. This equals the number decreased by 4, then doubled, then increased by 50. Find the number.",
      answer: "24",
      hints: [
        "Let $n$ be the number, and translate each side of the comparison into its own expression.",
        "Set the two expressions equal to each other to form one equation.",
        "Expand both sides fully before combining like terms and solving for $n$.",
      ],
      solutionSteps: [
        "Let $n$ be the number: the left side is $3(n+6)$ and the right side is $2(n-4)+50$.",
        "Setting them equal: $3(n+6)=2(n-4)+50$, which expands to $3n+18=2n-8+50=2n+42$.",
        "Solving gives $n=24$; checking, $3(24+6)=90$ and $2(24-4)+50=90$, confirming the answer.",
      ],
    },
  ],
  summary: [
    "Translate a word problem sentence by sentence, reading comparison phrases in the exact order they are written.",
    "Choose a variable for whichever quantity the problem's conditions are phrased directly in terms of, so the other unknowns avoid fractions.",
    "Substitute the solved variable back into the expression the question actually asks about, and check that the final answer is sensible in context.",
  ],
  nextConnection:
    "The next module applies this same word-problem discipline to a single, very common setup — distance equals speed times time — where choosing the right variable matters just as much.",
} satisfies CourseLesson;
