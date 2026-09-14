import type { CourseLesson } from "@/lib/courses/types";

export default {
  slug: "combinations-fundamentals",
  intro:
    "A combination is a selection of objects where order does not matter. Two selections that use the same objects, regardless of the order they were picked in, count as the same combination. This lesson builds the combination formula directly from the permutation formula and gives a clear test for choosing between the two.",
  sections: [
    {
      id: "a8-m02-l01-s1",
      title: "What is a combination?",
      body: [
        "A combination is an unordered selection of some of the objects from a larger set. If a club with members Ana, Ben, Cy, and Dee needs to pick a 2-person committee where both members have the identical role, then picking Ana and Ben is the exact same committee as picking Ben and Ana — the order the two names were chosen in makes no difference to the outcome. This is the opposite situation from a permutation, where swapping two objects always creates a new, distinct arrangement.",
        "Listing every 2-person committee from these 4 members directly shows this: AB, AC, AD, BC, BD, and CD are the only distinct pairs, giving 6 committees in total. Notice that BA was never listed separately from AB, because the two labelings describe the same committee.",
      ],
      keyIdea:
        "A selection is a combination exactly when swapping two chosen objects leaves the outcome unchanged.",
    },
    {
      id: "a8-m02-l01-s2",
      title: "From permutations to combinations",
      body: [
        "The permutation count $P(n,r)$ counts ordered selections of $r$ objects from $n$, so it treats every reordering of the same $r$ objects as a different outcome. Each unordered group of $r$ objects can itself be arranged in $r!$ different orders, so every combination gets counted exactly $r!$ times inside $P(n,r)$.",
        'Dividing removes that overcounting: the number of combinations is $\\binom{n}{r}=\\dfrac{P(n,r)}{r!}=\\dfrac{n!}{r!\\,(n-r)!}$. The symbol $\\binom{n}{r}$ is read "n choose r" and is the standard notation for a combination count.',
      ],
      keyIdea:
        "Divide the permutation count by $r!$ to remove the overcounting from order.",
    },
    {
      id: "a8-m02-l01-s3",
      title: "Choosing between permutations and combinations",
      body: [
        'Certain words signal an unordered selection: "choose," "select," or "form a group, committee, or team" where the members share one role. Other words signal an ordered selection: "arrange," "order," "assign to positions," or "line up," or any phrasing where the roles being filled are different from each other.',
        "The same group of people can give two different counts depending on the roles involved. Choosing 2 co-captains from a team of 6, where both co-captains have the identical title, is a combination: $\\binom{6}{2}=15$. Choosing a president and a vice president from the same 6 people, where the two titles are different, is a permutation: $P(6,2)=30$, exactly double the combination count, because each pair of people can be split into the two distinct roles in 2 ways.",
      ],
      keyIdea:
        "Check whether swapping two selected objects changes the roles involved — if not, count combinations; if so, count permutations.",
    },
  ],
  examples: [
    {
      id: "a8-m02-l01-ex1",
      title: "Choose a committee of 2",
      problem:
        "A club has 4 members: Ana, Ben, Cy, and Dee. How many different 2-person committees can be formed, where the two committee members have the identical role?",
      steps: [
        "List every pair of the 4 members: AB, AC, AD, BC, BD, CD.",
        "Each pair appears only once because swapping the two names names the same committee, so order does not matter.",
        "There are 6 such pairs, so $\\binom{4}{2}=6$.",
      ],
      answer: "6",
      takeaway:
        "Listing small cases directly confirms the combination formula: $\\binom{4}{2}=\\dfrac{4\\times3}{2\\times1}=6$.",
    },
    {
      id: "a8-m02-l01-ex2",
      title: "Choosing toppings",
      problem:
        "A shop offers 6 toppings. In how many ways can a customer choose 3 toppings for a pizza, where the order the toppings are chosen in does not matter?",
      steps: [
        "The number of ordered selections of 3 toppings from 6 is $6\\times5\\times4=120$.",
        "Each unordered group of 3 toppings can be ordered in $3!=6$ ways, so every group is counted 6 times among the 120 ordered selections.",
        "Dividing removes the overcounting: $120\\div6=20$.",
      ],
      answer: "20",
      takeaway:
        "Divide the ordered count by $r!$ because each unordered group of $r$ items was ordered $r!$ different ways.",
    },
    {
      id: "a8-m02-l01-ex3",
      title: "Choosing books for a trip",
      problem:
        "A traveler owns 10 different books and wants to bring exactly 4 of them on a trip. How many different sets of 4 books can be chosen?",
      steps: [
        "Apply the combination formula with $n=10$ and $r=4$: $\\binom{10}{4}=\\dfrac{10!}{4!\\,6!}$.",
        "Cancel the shared factorial: $\\dfrac{10\\times9\\times8\\times7}{4\\times3\\times2\\times1}$.",
        "The numerator is 5040 and the denominator is 24, and $5040\\div24=210$.",
      ],
      answer: "210",
      takeaway:
        "The combination formula lets larger cases be computed directly without listing every set.",
    },
  ],
  commonMistakes: [
    "Using the permutation count $P(n,r)$ when the problem describes an unordered group, which overcounts every selection by $r!$.",
    "Dividing by the wrong factorial, such as dividing by $(n-r)!$ a second time instead of by $r!$.",
    "Forgetting to reduce the fraction before multiplying, leading to arithmetic errors with unnecessarily large numbers.",
  ],
  exercises: [
    {
      id: "a8-m02-l01-q1",
      role: "guided",
      kind: "numeric",
      difficulty: 2,
      question:
        "A group of 5 friends wants to send 3 of them to pick up snacks, with no distinct roles among the 3. How many different groups of 3 can be chosen?",
      answer: "10",
      hints: [
        "The 3 friends sent to pick up snacks form a group, not an ordered list, so this is a combination.",
        "Apply $\\binom{5}{3}=\\dfrac{5\\times4\\times3}{3\\times2\\times1}$.",
        "Compute the numerator and denominator separately before dividing: $60\\div6$.",
      ],
      solutionSteps: [
        "Choosing 3 friends out of 5 with no distinct roles is a combination problem.",
        "$\\binom{5}{3}=\\dfrac{5\\times4\\times3}{3\\times2\\times1}=\\dfrac{60}{6}$.",
        "The result is 10.",
      ],
    },
    {
      id: "a8-m02-l01-q2",
      role: "guided",
      kind: "numeric",
      difficulty: 2,
      question:
        "An ice cream shop has 7 flavors. How many different 2-flavor combinations can be chosen for a sundae, if the two scoops are otherwise identical?",
      answer: "21",
      hints: [
        "Since the two scoops are identical except for flavor, only the set of 2 flavors matters, not an order.",
        "Use $\\binom{7}{2}=\\dfrac{7\\times6}{2\\times1}$.",
        "Compute $42\\div2$.",
      ],
      solutionSteps: [
        "This is a combination because swapping which scoop is placed first does not change the sundae.",
        "$\\binom{7}{2}=\\dfrac{7\\times6}{2\\times1}=\\dfrac{42}{2}$.",
        "The result is 21.",
      ],
    },
    {
      id: "a8-m02-l01-q3",
      role: "independent",
      kind: "numeric",
      difficulty: 3,
      question:
        "A coach must choose 4 starting players from a roster of 9 players, where all 4 starters share the same role. How many different starting groups are possible?",
      answer: "126",
      hints: [
        "All 4 starters share one role, so the order they are chosen in does not matter.",
        "Apply $\\binom{9}{4}=\\dfrac{9\\times8\\times7\\times6}{4\\times3\\times2\\times1}$.",
        "Simplify before multiplying out fully, such as cancelling a factor of 4 into the 8.",
      ],
      solutionSteps: [
        "Choosing 4 identical-role starters from 9 players is a combination.",
        "$\\binom{9}{4}=\\dfrac{9\\times8\\times7\\times6}{4\\times3\\times2\\times1}=\\dfrac{3024}{24}$.",
        "The result is 126.",
      ],
    },
    {
      id: "a8-m02-l01-q4",
      role: "independent",
      kind: "numeric",
      difficulty: 3,
      question:
        "A book club with 8 members must select a 3-person committee to choose next month's book, with no distinct roles on the committee. How many different committees can be formed?",
      answer: "56",
      hints: [
        "No committee member has a special role, so this counts unordered groups.",
        "Apply $\\binom{8}{3}=\\dfrac{8\\times7\\times6}{3\\times2\\times1}$.",
        "The numerator is 336 and the denominator is 6.",
      ],
      solutionSteps: [
        "Selecting a 3-person committee with identical roles from 8 members is a combination.",
        "$\\binom{8}{3}=\\dfrac{8\\times7\\times6}{3\\times2\\times1}=\\dfrac{336}{6}$.",
        "The result is 56.",
      ],
    },
    {
      id: "a8-m02-l01-q5",
      role: "independent",
      kind: "mcq",
      difficulty: 3,
      question:
        "Which expression correctly counts the number of ways to choose 2 books from a shelf of 5 distinct books, where the order chosen does not matter?",
      choices: [
        "$5\\times4$",
        "$\\dfrac{5\\times4}{2\\times1}$",
        "$5^2$",
        "$5+4$",
      ],
      answer: 1,
      hints: [
        "Choosing 2 books with no assigned roles is a combination, not a permutation.",
        "The ordered count $5\\times4$ counts each pair of books twice, once for each order.",
        "Divide the ordered count by $2!$ to remove that double-counting.",
      ],
      solutionSteps: [
        "The ordered selection count is $5\\times4=20$.",
        "Each unordered pair of books was counted twice, once per order, so divide by $2!=2$.",
        "The correct expression is $\\dfrac{5\\times4}{2\\times1}$, which equals 10.",
      ],
    },
    {
      id: "a8-m02-l01-q6",
      role: "independent",
      kind: "numeric",
      difficulty: 3,
      question:
        "A student must choose 3 elective classes from 10 available electives, where the electives chosen are not assigned to any particular time slot. How many different sets of electives are possible?",
      answer: "120",
      hints: [
        "Since no elective is assigned a special slot, this counts unordered sets of 3 electives.",
        "Apply $\\binom{10}{3}=\\dfrac{10\\times9\\times8}{3\\times2\\times1}$.",
        "Compute the numerator 720 and divide by 6.",
      ],
      solutionSteps: [
        "Choosing 3 electives from 10 with no ordering is a combination.",
        "$\\binom{10}{3}=\\dfrac{10\\times9\\times8}{3\\times2\\times1}=\\dfrac{720}{6}$.",
        "The result is 120.",
      ],
    },
  ],
  summary: [
    "A combination counts unordered selections; swapping two chosen objects gives the same outcome.",
    "The combination formula divides the permutation count by $r!$: $\\binom{n}{r}=\\dfrac{n!}{r!\\,(n-r)!}$.",
    "Decide between permutations and combinations by checking whether swapping two chosen objects changes the roles involved.",
  ],
  nextConnection:
    "The next lesson explores identities that connect combinations to each other, including the symmetry $\\binom{n}{r}=\\binom{n}{n-r}$ and Pascal's rule for building larger combination counts from smaller ones.",
} satisfies CourseLesson;
