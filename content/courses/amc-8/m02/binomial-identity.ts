import type { CourseLesson } from "@/lib/courses/types";

export default {
  slug: "binomial-identity",
  intro:
    "Combination counts are not isolated numbers — they fit together in patterns. This lesson develops two of the most useful patterns: a symmetry that lets a hard combination be rewritten as an easy one, and Pascal's rule, which builds any combination count from two smaller ones without touching a factorial.",
  sections: [
    {
      id: "a8-m02-l02-s1",
      title: "Binomial coefficients and Pascal's triangle",
      body: [
        "The values $\\binom{n}{r}$ are called binomial coefficients, and arranging them by row, with $n$ increasing downward and $r$ increasing left to right, produces Pascal's triangle. Row $n=4$, for instance, reads $\\binom{4}{0},\\binom{4}{1},\\binom{4}{2},\\binom{4}{3},\\binom{4}{4}$, which evaluate to $1,4,6,4,1$.",
        "Every entry in this triangle answers a counting question: $\\binom{4}{2}=6$ is the number of ways to choose 2 objects from 4, and it is no coincidence that this matches the number of ways to choose the other 2 objects to leave out. The rest of this lesson explains two patterns visible in the triangle: rows are symmetric left to right, and every interior entry is the sum of the two entries diagonally above it.",
      ],
      keyIdea:
        "Pascal's triangle arranges the combination counts $\\binom{n}{r}$ by row, and its visual patterns correspond to counting identities.",
    },
    {
      id: "a8-m02-l02-s2",
      title: "The symmetry identity",
      body: [
        'Choosing which $r$ objects out of $n$ to include is exactly the same decision as choosing which $n-r$ objects to leave out — every choice of an "included" group determines a unique "excluded" group, and vice versa. Because these two counting questions describe the same set of decisions, they must have the same answer: $\\binom{n}{r}=\\binom{n}{n-r}$.',
        "This identity is most useful when $r$ is large and close to $n$, since $\\binom{n}{n-r}$ then has a small bottom number and needs far fewer factors to compute. For example, computing $\\binom{20}{18}$ directly would require an 18-term factorial ratio, but $\\binom{20}{18}=\\binom{20}{2}$ needs only two.",
      ],
      keyIdea:
        "$\\binom{n}{r}=\\binom{n}{n-r}$, because choosing the included objects and choosing the excluded objects are the same decision viewed from two sides.",
    },
    {
      id: "a8-m02-l02-s3",
      title: "Pascal's rule",
      body: [
        "Pascal's rule states $\\binom{n}{r}=\\binom{n-1}{r-1}+\\binom{n-1}{r}$. It comes from casework on a single fixed object, say the last one added to the set of $n$: either that object is included in the chosen group of $r$, or it is not. If it is included, the remaining $r-1$ slots are filled from the other $n-1$ objects, giving $\\binom{n-1}{r-1}$ ways. If it is excluded, all $r$ slots are filled from the other $n-1$ objects, giving $\\binom{n-1}{r}$ ways. These two cases are disjoint and cover every possibility, so they add.",
        "This rule is the reason each row of Pascal's triangle can be built directly from the row above it by adding adjacent pairs, without ever multiplying out a factorial. It is especially useful when a few nearby combination values are already known and a related one is needed quickly.",
      ],
      keyIdea:
        "$\\binom{n}{r}=\\binom{n-1}{r-1}+\\binom{n-1}{r}$, found by splitting on whether one fixed object is included or excluded.",
    },
  ],
  examples: [
    {
      id: "a8-m02-l02-ex1",
      title: "Confirm a symmetry pair",
      problem:
        "A group of 5 students must choose a 2-person cleanup crew, leaving the other 3 students as the off-duty group. Show that the number of ways to choose the 2-person crew equals the number of ways to choose the 3-person off-duty group, and find that common value.",
      steps: [
        "Choosing which 2 students clean up completely determines which 3 students are off duty, so the two counts must be equal.",
        "Compute $\\binom{5}{2}=\\dfrac{5\\times4}{2\\times1}=10$.",
        "Compute $\\binom{5}{3}=\\dfrac{5\\times4\\times3}{3\\times2\\times1}=\\dfrac{60}{6}=10$, confirming the two counts match.",
      ],
      answer: "10",
      takeaway:
        "Choosing which $r$ objects to include is the same decision as choosing which $n-r$ objects to leave out, so $\\binom{n}{r}=\\binom{n}{n-r}$.",
    },
    {
      id: "a8-m02-l02-ex2",
      title: "Building a new value with Pascal's rule",
      problem:
        "Given that $\\binom{5}{2}=10$ and $\\binom{5}{3}=10$, use Pascal's rule to find $\\binom{6}{3}$ without expanding any factorials.",
      steps: [
        "Pascal's rule states $\\binom{n}{r}=\\binom{n-1}{r-1}+\\binom{n-1}{r}$.",
        "With $n=6$ and $r=3$: $\\binom{6}{3}=\\binom{5}{2}+\\binom{5}{3}$.",
        "Substitute the given values: $\\binom{6}{3}=10+10=20$.",
      ],
      answer: "20",
      takeaway:
        "Pascal's rule builds each combination count from two combination counts one row up, avoiding a fresh factorial computation.",
    },
    {
      id: "a8-m02-l02-ex3",
      title: "Simplify a large computation with symmetry",
      problem:
        "Find $\\binom{20}{18}$ using the symmetry identity instead of expanding an 18-term factorial ratio.",
      steps: [
        "By symmetry, $\\binom{20}{18}=\\binom{20}{20-18}=\\binom{20}{2}$.",
        "Compute the smaller combination: $\\binom{20}{2}=\\dfrac{20\\times19}{2\\times1}$.",
        "The numerator is 380, and $380\\div2=190$.",
      ],
      answer: "190",
      takeaway:
        "When $r$ is close to $n$, switch to $\\binom{n}{n-r}$ so the computation only involves a few small factors.",
    },
  ],
  commonMistakes: [
    "Believing Pascal's rule adds two combinations from the same row instead of two adjacent entries in the row above.",
    "Misapplying the symmetry identity, such as writing $\\binom{n}{r}=\\binom{n}{r-n}$, instead of the correct $\\binom{n}{r}=\\binom{n}{n-r}$.",
    "Recomputing a full factorial ratio by hand instead of noticing that symmetry or Pascal's rule already gives a shortcut.",
  ],
  exercises: [
    {
      id: "a8-m02-l02-q1",
      role: "guided",
      kind: "numeric",
      difficulty: 2,
      question:
        "Use the symmetry identity to find $\\binom{9}{7}$ by first rewriting it as a combination with a smaller bottom number.",
      answer: "36",
      hints: [
        "Rewrite $\\binom{9}{7}$ as $\\binom{9}{9-7}$.",
        "This equals $\\binom{9}{2}$.",
        "Compute $\\binom{9}{2}=\\dfrac{9\\times8}{2\\times1}$.",
      ],
      solutionSteps: [
        "By symmetry, $\\binom{9}{7}=\\binom{9}{2}$.",
        "$\\binom{9}{2}=\\dfrac{9\\times8}{2\\times1}=\\dfrac{72}{2}$.",
        "The result is 36.",
      ],
    },
    {
      id: "a8-m02-l02-q2",
      role: "guided",
      kind: "numeric",
      difficulty: 3,
      question:
        "Given $\\binom{6}{2}=15$ and $\\binom{6}{3}=20$, use Pascal's rule to find $\\binom{7}{3}$.",
      answer: "35",
      hints: [
        "Pascal's rule gives $\\binom{7}{3}=\\binom{6}{2}+\\binom{6}{3}$.",
        "Substitute the two given values into the rule.",
        "Add $15+20$.",
      ],
      solutionSteps: [
        "Pascal's rule relates $\\binom{7}{3}$ to two entries of row 6: $\\binom{6}{2}+\\binom{6}{3}$.",
        "Substituting gives $15+20$.",
        "The result is 35.",
      ],
    },
    {
      id: "a8-m02-l02-q3",
      role: "independent",
      kind: "numeric",
      difficulty: 3,
      question: "Find $\\binom{15}{13}$ using the symmetry identity.",
      answer: "105",
      hints: [
        "Rewrite $\\binom{15}{13}$ using symmetry as a combination with a smaller bottom number.",
        "This equals $\\binom{15}{2}$.",
        "Compute $\\dfrac{15\\times14}{2\\times1}$.",
      ],
      solutionSteps: [
        "By symmetry, $\\binom{15}{13}=\\binom{15}{2}$.",
        "$\\binom{15}{2}=\\dfrac{15\\times14}{2\\times1}=\\dfrac{210}{2}$.",
        "The result is 105.",
      ],
    },
    {
      id: "a8-m02-l02-q4",
      role: "independent",
      kind: "numeric",
      difficulty: 4,
      question:
        "Given $\\binom{8}{3}=56$ and $\\binom{8}{4}=70$, use Pascal's rule to find $\\binom{9}{4}$.",
      answer: "126",
      hints: [
        "Apply Pascal's rule with $n=9$ and $r=4$.",
        "This gives $\\binom{9}{4}=\\binom{8}{3}+\\binom{8}{4}$.",
        "Add the two given values together.",
      ],
      solutionSteps: [
        "Pascal's rule states $\\binom{9}{4}=\\binom{8}{3}+\\binom{8}{4}$.",
        "Substituting the given values gives $56+70$.",
        "The result is 126.",
      ],
    },
    {
      id: "a8-m02-l02-q5",
      role: "independent",
      kind: "mcq",
      difficulty: 3,
      question:
        "Which equation correctly states Pascal's rule for combinations?",
      choices: [
        "$\\binom{n}{r}=\\binom{n-1}{r}+\\binom{n-1}{r-1}$",
        "$\\binom{n}{r}=\\binom{n}{r-1}+\\binom{n}{r+1}$",
        "$\\binom{n}{r}=\\binom{n-1}{r}\\times\\binom{n-1}{r-1}$",
        "$\\binom{n}{r}=\\binom{n+1}{r}-\\binom{n+1}{r-1}$",
      ],
      answer: 0,
      hints: [
        "Pascal's rule relates a combination to two combinations from the row above it, not the same row.",
        "The two terms differ in their bottom number by exactly 1: $r$ and $r-1$.",
        "The two terms are added, not multiplied or subtracted.",
      ],
      solutionSteps: [
        "Pascal's rule builds $\\binom{n}{r}$ from two entries of row $n-1$: $\\binom{n-1}{r}$ and $\\binom{n-1}{r-1}$.",
        "The correct relationship adds these two terms.",
        "The correct equation is $\\binom{n}{r}=\\binom{n-1}{r}+\\binom{n-1}{r-1}$.",
      ],
    },
    {
      id: "a8-m02-l02-q6",
      role: "independent",
      kind: "numeric",
      difficulty: 4,
      question: "Find $\\binom{12}{10}$ using the symmetry identity.",
      answer: "66",
      hints: [
        "Rewrite $\\binom{12}{10}$ using symmetry with a smaller bottom number.",
        "This equals $\\binom{12}{2}$.",
        "Compute $\\dfrac{12\\times11}{2\\times1}$.",
      ],
      solutionSteps: [
        "By symmetry, $\\binom{12}{10}=\\binom{12}{2}$.",
        "$\\binom{12}{2}=\\dfrac{12\\times11}{2\\times1}=\\dfrac{132}{2}$.",
        "The result is 66.",
      ],
    },
  ],
  summary: [
    "Pascal's triangle arranges the combination counts $\\binom{n}{r}$ by row, one row per value of $n$.",
    "Symmetry: $\\binom{n}{r}=\\binom{n}{n-r}$, since choosing which objects to include also decides which to leave out.",
    "Pascal's rule: $\\binom{n}{r}=\\binom{n-1}{r}+\\binom{n-1}{r-1}$, found by casework on whether one particular object is included.",
  ],
  nextConnection:
    "The next lesson applies these identities and the combination formula to trickier problems that combine multiple selection steps or hidden restrictions into a single count.",
} satisfies CourseLesson;
