import type { CourseLesson } from "@/lib/courses/types";

export default {
  slug: "tricky-combinations",
  intro:
    "Real counting problems rarely ask for a single, plain combination. They often split a selection across several groups, force or forbid a particular member, or hide these conditions inside ordinary-sounding language. This lesson combines the formula and identities from the last two lessons into a small toolkit for those harder cases, and shows how to check the result against a smaller version of the same problem.",
  sections: [
    {
      id: "a8-m02-l03-s1",
      title: "Multiplying independent selection steps",
      body: [
        "Some problems ask for a selection made of several separate parts, such as choosing some members from one group and other members from an unrelated group. Because the choice made within one group has no effect on the choices available in the other group, the multiplication principle applies: compute each group's combination count on its own, then multiply the counts together.",
        "This is the same multiplication principle used for permutations, just applied to combination counts instead of ordered counts. The key check is that the groups truly do not interact — no object can belong to both pools, and no restriction links a choice in one group to a choice in the other.",
      ],
      keyIdea:
        "When a selection is split across separate, non-interacting groups, multiply each group's own combination count.",
    },
    {
      id: "a8-m02-l03-s2",
      title: "Selections with required or forbidden members",
      body: [
        "If a problem requires a specific object to be part of the chosen group, that object's seat is already decided, so it should be set aside before counting. Only the remaining seats need to be filled, and they are filled from the remaining pool: a group of size $r$ from $n$ objects that must include one fixed object reduces to choosing $r-1$ objects from the other $n-1$.",
        "If a problem instead forbids a specific object from being chosen, remove that object from the pool entirely before applying the combination formula: a group of size $r$ from $n$ objects that must exclude one fixed object reduces to choosing $r$ objects from the other $n-1$. In both cases, the trick is the same — resolve the special object first, then count the remaining, unrestricted choice.",
      ],
      keyIdea:
        "Resolve a required or forbidden object first, then apply the combination formula to whatever remains.",
    },
    {
      id: "a8-m02-l03-s3",
      title: "Checking a count against a smaller case",
      body: [
        'Before trusting a combination count on a problem with large numbers, it helps to test the same method on a small, listable version of the problem. If a rule like "remove the excluded person, then choose from what remains" gives a count that matches direct listing on, say, 4 people instead of 40, then the reasoning has been confirmed and can be trusted at the larger scale.',
        "This habit catches a very common error: miscounting how many objects remain after an object is fixed or removed. A small-case check takes only a moment and is far cheaper than working through an entire contest problem with a subtly wrong pool size.",
      ],
      keyIdea:
        "Test a counting method on a small, listable case before relying on it for a larger problem.",
    },
  ],
  examples: [
    {
      id: "a8-m02-l03-ex1",
      title: "Choosing from two separate groups",
      problem:
        "A trivia team needs 2 members chosen from 5 available math specialists and 3 members chosen from 4 available science specialists. How many different teams can be formed?",
      steps: [
        "The math specialists are chosen independently of the science specialists, so the multiplication principle applies to the two group counts.",
        "Ways to choose the math specialists: $\\binom{5}{2}=\\dfrac{5\\times4}{2\\times1}=10$. Ways to choose the science specialists: $\\binom{4}{3}=4$.",
        "Multiply the two independent counts: $10\\times4=40$.",
      ],
      answer: "40",
      takeaway:
        "When a problem selects from several separate groups, compute each group's combination count separately and multiply them together.",
    },
    {
      id: "a8-m02-l03-ex2",
      title: "A committee that must include one person",
      problem:
        "A club has 8 members, including its president. A 4-person planning committee is chosen, and the president must be on it. How many different committees are possible?",
      steps: [
        "Since the president is required, that single seat on the committee is already decided.",
        "Only the remaining 3 committee seats need to be filled, chosen from the other 7 members.",
        "Compute $\\binom{7}{3}=\\dfrac{7\\times6\\times5}{3\\times2\\times1}=\\dfrac{210}{6}=35$.",
      ],
      answer: "35",
      takeaway:
        "A required member can be set aside first, reducing the problem to choosing the remaining seats from the remaining people.",
    },
    {
      id: "a8-m02-l03-ex3",
      title: "A committee that must exclude one person",
      problem:
        "A group of 9 people wants to select a 4-person committee, but one member, Farid, has a scheduling conflict and cannot serve. How many different committees are possible, and how does checking a smaller version of this problem confirm the method?",
      steps: [
        "Since Farid cannot serve, remove him from the pool, leaving 8 eligible people to fill all 4 committee seats.",
        "Compute $\\binom{8}{4}=\\dfrac{8\\times7\\times6\\times5}{4\\times3\\times2\\times1}=\\dfrac{1680}{24}=70$.",
        "Checking a smaller version confirms the method: with only 4 people and one excluded, choosing a 2-person committee gives $\\binom{3}{2}=3$, which matches directly listing the 3 possible pairs from the 3 eligible people.",
      ],
      answer: "70",
      takeaway:
        "Excluding a person shrinks the available pool before applying the combination formula; testing the same method on a small case checks that no step was skipped.",
    },
  ],
  commonMistakes: [
    "Adding the combination counts from separate groups instead of multiplying them.",
    "Forgetting to remove a required or excluded person from the pool before applying the combination formula to the remaining seats.",
    "Skipping a small-case check that would have caught an error in how many people remain after fixing or removing one person.",
  ],
  exercises: [
    {
      id: "a8-m02-l03-q1",
      role: "guided",
      kind: "numeric",
      difficulty: 3,
      question:
        "A photography club selects 2 photographers from 4 available seniors and 2 photographers from 5 available juniors for an exhibit. How many different groups of 4 photographers can be formed?",
      answer: "60",
      hints: [
        "The seniors and juniors are chosen independently, so compute each combination count separately.",
        "Ways to choose seniors: $\\binom{4}{2}$. Ways to choose juniors: $\\binom{5}{2}$.",
        "Multiply the two counts together.",
      ],
      solutionSteps: [
        "Compute $\\binom{4}{2}=\\dfrac{4\\times3}{2\\times1}=6$ for the seniors.",
        "Compute $\\binom{5}{2}=\\dfrac{5\\times4}{2\\times1}=10$ for the juniors.",
        "Multiply the independent counts: $6\\times10=60$.",
      ],
    },
    {
      id: "a8-m02-l03-q2",
      role: "guided",
      kind: "numeric",
      difficulty: 3,
      question:
        "A debate team of 6 people includes its captain. A 3-person panel for the next round is chosen, and the captain must be on the panel. How many different panels are possible?",
      answer: "10",
      hints: [
        "The captain's seat is already decided, so only the remaining seats need to be filled.",
        "Choose the remaining 2 panel seats from the other 5 team members.",
        "Compute $\\binom{5}{2}$.",
      ],
      solutionSteps: [
        "With the captain fixed, only 2 more seats need to be filled from the remaining 5 members.",
        "Compute $\\binom{5}{2}=\\dfrac{5\\times4}{2\\times1}=10$.",
        "The result is 10.",
      ],
    },
    {
      id: "a8-m02-l03-q3",
      role: "independent",
      kind: "numeric",
      difficulty: 4,
      question:
        "A charity event needs a crew of 3 chosen from 6 available adults and a crew of 2 chosen from 5 available teenagers. How many different combined crews of 5 people can be formed?",
      answer: "200",
      hints: [
        "The adult crew and teenager crew are chosen independently.",
        "Compute $\\binom{6}{3}$ for the adults and $\\binom{5}{2}$ for the teenagers.",
        "Multiply the two independent counts together.",
      ],
      solutionSteps: [
        "Compute $\\binom{6}{3}=\\dfrac{6\\times5\\times4}{3\\times2\\times1}=20$ for the adults.",
        "Compute $\\binom{5}{2}=\\dfrac{5\\times4}{2\\times1}=10$ for the teenagers.",
        "Multiply the counts: $20\\times10=200$.",
      ],
    },
    {
      id: "a8-m02-l03-q4",
      role: "independent",
      kind: "numeric",
      difficulty: 4,
      question:
        "A study group of 10 students must choose a 4-person presentation team, but one student, Wren, is unavailable that week and cannot be chosen. How many different presentation teams are possible?",
      answer: "126",
      hints: [
        "Since Wren is unavailable, remove her from the pool before choosing the team.",
        "All 4 team members must come from the remaining 9 students.",
        "Compute $\\binom{9}{4}$.",
      ],
      solutionSteps: [
        "Removing the unavailable student leaves 9 eligible students.",
        "All 4 seats are filled from this reduced pool: $\\binom{9}{4}=\\dfrac{9\\times8\\times7\\times6}{4\\times3\\times2\\times1}=126$.",
        "The result is 126.",
      ],
    },
    {
      id: "a8-m02-l03-q5",
      role: "independent",
      kind: "mcq",
      difficulty: 4,
      question:
        "A 12-person club must select a 5-person committee, and one member, Coach Lee, is required to be on it. Which expression correctly counts the number of possible committees?",
      choices: [
        "$\\binom{12}{5}$",
        "$\\binom{11}{4}$",
        "$\\binom{11}{5}$",
        "$\\binom{12}{4}$",
      ],
      answer: 1,
      hints: [
        "Coach Lee's seat on the committee is already decided, so do not count her as a free choice.",
        "Only the remaining seats need to be filled from the remaining members.",
        "There are 11 remaining members and 4 remaining seats to fill.",
      ],
      solutionSteps: [
        "Fixing Coach Lee's seat leaves 4 more seats to fill.",
        "Those 4 seats are filled from the other 11 members: $\\binom{11}{4}$.",
        "The correct expression is $\\binom{11}{4}$.",
      ],
    },
    {
      id: "a8-m02-l03-q6",
      role: "independent",
      kind: "numeric",
      difficulty: 4,
      question:
        "A 7-person committee is formed from 5 available scientists and 6 available engineers, with exactly 3 scientists and 4 engineers on the committee. How many different committees are possible?",
      answer: "150",
      hints: [
        "The scientists and engineers are chosen independently of each other.",
        "Compute $\\binom{5}{3}$ for the scientists and $\\binom{6}{4}$ for the engineers.",
        "Multiply the two independent counts together.",
      ],
      solutionSteps: [
        "Compute $\\binom{5}{3}=\\dfrac{5\\times4\\times3}{3\\times2\\times1}=10$ for the scientists.",
        "Compute $\\binom{6}{4}=\\binom{6}{2}=\\dfrac{6\\times5}{2\\times1}=15$ for the engineers.",
        "Multiply the counts: $10\\times15=150$.",
      ],
    },
  ],
  summary: [
    "When a problem selects from separate independent groups, compute each group's combination count and multiply them.",
    "A required or excluded person can be set aside first, reducing the problem to choosing the remaining seats from the remaining pool.",
    "Checking a method on a small, listable case catches errors before trusting it on a larger problem.",
  ],
  nextConnection:
    "The next module turns to counting arrangements of letters in a word, where repeated letters require dividing by more than one factorial at once.",
} satisfies CourseLesson;
