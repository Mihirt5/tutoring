import type { CourseLesson } from "@/lib/courses/types";

export default {
  slug: "telescoping-sums",
  intro: "Sums of fractions like $\\frac{1}{1\\times2}+\\frac{1}{2\\times3}+\\frac{1}{3\\times4}+\\cdots$ do not look like they telescope at first glance, but a partial-fraction-style split turns each term into a difference of two simpler fractions, revealing the same cancellation pattern from the previous lesson. This lesson builds that splitting technique and extends it to sums where the fractions skip over an index.",
  sections: [
    {
      id: "a8-m16-l02-s1",
      title: "Splitting a fraction for telescoping",
      body: [
        "A fraction of the form $\\frac{1}{k(k+1)}$ splits into a difference of two simpler fractions: $\\frac{1}{k(k+1)}=\\frac{1}{k}-\\frac{1}{k+1}$. This can be checked directly by combining the right side over a common denominator: $\\frac{1}{k}-\\frac{1}{k+1}=\\frac{(k+1)-k}{k(k+1)}=\\frac{1}{k(k+1)}$.",
        "More generally, a fraction $\\frac{1}{k(k+d)}$, where the two factors in the denominator differ by $d$, splits as $\\frac{1}{k(k+d)}=\\frac{1}{d}\\left(\\frac{1}{k}-\\frac{1}{k+d}\\right)$. The factor of $\\frac{1}{d}$ is required to make the split exact: combining the right side over a common denominator gives $\\frac{1}{d}\\cdot\\frac{d}{k(k+d)}=\\frac{1}{k(k+d)}$, confirming the identity.",
        "This split is worth memorizing as a pattern rather than re-deriving every time: look at the two factors multiplied together in the denominator, subtract the smaller from the larger to find $d$, and write the difference of reciprocals scaled by $\\frac{1}{d}$ out front. Spotting a denominator that factors into two terms differing by a constant is the entire skill behind recognizing that a fraction sum is secretly telescoping.",
      ],
      keyIdea: "$\\dfrac{1}{k(k+d)}=\\dfrac{1}{d}\\left(\\dfrac{1}{k}-\\dfrac{1}{k+d}\\right)$; for $d=1$, this is simply $\\dfrac{1}{k}-\\dfrac{1}{k+1}$.",
    },
    {
      id: "a8-m16-l02-s2",
      title: "Evaluating a finite telescoping sum",
      body: [
        "Once every term is rewritten as $\\frac{1}{k}-\\frac{1}{k+1}$, the sum $\\sum_{k=1}^{n}\\frac{1}{k(k+1)}$ becomes $\\sum_{k=1}^{n}\\left(\\frac{1}{k}-\\frac{1}{k+1}\\right)$, which telescopes exactly as in the previous lesson: every middle fraction cancels, leaving $\\frac{1}{1}-\\frac{1}{n+1}=1-\\frac{1}{n+1}=\\frac{n}{n+1}$.",
        "The same process handles a sum that does not start at $k=1$: for $\\sum_{k=a}^{b}\\frac{1}{k(k+1)}$, the surviving pieces are the first fraction, $\\frac{1}{a}$, and the negative of the last fraction, $\\frac{1}{b+1}$, giving $\\frac{1}{a}-\\frac{1}{b+1}$.",
      ],
      keyIdea: "After splitting, $\\sum_{k=a}^{b}\\frac{1}{k(k+1)}$ telescopes to $\\frac{1}{a}-\\frac{1}{b+1}$, keeping only the first and last surviving fractions.",
    },
    {
      id: "a8-m16-l02-s3",
      title: "Shifted-index sums: when more than one term survives",
      body: [
        "When the denominator's two factors differ by more than 1, such as $\\frac{1}{k(k+2)}$, the split $\\frac{1}{2}\\left(\\frac{1}{k}-\\frac{1}{k+2}\\right)$ no longer cancels neighbor-to-neighbor, because a term's positive piece $\\frac{1}{k}$ only cancels with the negative piece $-\\frac{1}{k+2}$ appearing two steps later, not the very next term.",
        "This means two consecutive fractions survive at the start of the sum and two survive at the end, instead of just one on each side. Writing out $\\sum_{k=1}^{6}\\frac{1}{k(k+2)}=\\frac{1}{2}\\Big[\\left(\\tfrac{1}{1}-\\tfrac{1}{3}\\right)+\\left(\\tfrac{1}{2}-\\tfrac{1}{4}\\right)+\\left(\\tfrac{1}{3}-\\tfrac{1}{5}\\right)+\\left(\\tfrac{1}{4}-\\tfrac{1}{6}\\right)+\\left(\\tfrac{1}{5}-\\tfrac{1}{7}\\right)+\\left(\\tfrac{1}{6}-\\tfrac{1}{8}\\right)\\Big]$ shows $\\frac{1}{3},\\frac{1}{4},\\frac{1}{5},\\frac{1}{6}$ each cancelling against a matching negative piece two terms later, leaving only $\\frac{1}{1}+\\frac{1}{2}-\\frac{1}{7}-\\frac{1}{8}$ inside the brackets.",
      ],
      keyIdea: "When the split skips by $d>1$, exactly $d$ fractions survive at the start and $d$ at the end, not just one on each side.",
    },
  ],
  examples: [
    {
      id: "a8-m16-l02-ex1",
      title: "A basic telescoping fraction sum",
      problem: "Evaluate $\\displaystyle\\sum_{k=1}^{5}\\frac{1}{k(k+1)}$.",
      steps: [
        "Split each term: $\\frac{1}{k(k+1)}=\\frac{1}{k}-\\frac{1}{k+1}$.",
        "The sum telescopes to $\\frac{1}{1}-\\frac{1}{6}$.",
        "This equals $1-\\frac{1}{6}=\\frac{5}{6}$.",
      ],
      answer: "5/6",
      takeaway: "Splitting each term before summing turns a sum of five fractions into a single subtraction.",
    },
    {
      id: "a8-m16-l02-ex2",
      title: "A sum that does not start at $k=1$",
      problem: "Evaluate $\\displaystyle\\sum_{k=3}^{8}\\frac{1}{k(k+1)}$.",
      steps: [
        "Split each term: $\\frac{1}{k(k+1)}=\\frac{1}{k}-\\frac{1}{k+1}$.",
        "The sum telescopes to the first fraction, $\\frac{1}{3}$, minus the last, $\\frac{1}{9}$.",
        "This equals $\\frac{1}{3}-\\frac{1}{9}=\\frac{3}{9}-\\frac{1}{9}=\\frac{2}{9}$.",
      ],
      answer: "2/9",
      takeaway: "A sum that starts above $k=1$ still telescopes; only the identity of the surviving first and last fractions changes.",
    },
    {
      id: "a8-m16-l02-ex3",
      title: "A shifted-index sum with two survivors on each side",
      problem: "Evaluate $\\displaystyle\\sum_{k=1}^{6}\\frac{1}{k(k+2)}$.",
      steps: [
        "Split each term using $d=2$: $\\frac{1}{k(k+2)}=\\frac{1}{2}\\left(\\frac{1}{k}-\\frac{1}{k+2}\\right)$.",
        "Writing out the six terms, $\\frac{1}{3},\\frac{1}{4},\\frac{1}{5},\\frac{1}{6}$ each cancel against a matching negative piece two terms later, leaving $\\frac{1}{2}\\left[\\left(1+\\frac{1}{2}\\right)-\\left(\\frac{1}{7}+\\frac{1}{8}\\right)\\right]$.",
        "Simplifying inside the brackets: $\\frac{3}{2}-\\frac{15}{56}=\\frac{84}{56}-\\frac{15}{56}=\\frac{69}{56}$, so the sum is $\\frac{1}{2}\\times\\frac{69}{56}=\\frac{69}{112}$.",
      ],
      answer: "69/112",
      takeaway: "With a denominator gap of 2, two fractions survive at each end of the sum, not just one.",
    },
  ],
  commonMistakes: [
    "Splitting $\\frac{1}{k(k+d)}$ without the required factor of $\\frac{1}{d}$ in front.",
    "Assuming only one term survives at each end of a shifted-index sum, when a gap of $d>1$ actually leaves $d$ terms surviving on each side.",
    "Using the wrong last index when the sum starts above $k=1$, forgetting that the surviving negative piece is $\\frac{1}{b+1}$ for a sum ending at $k=b$.",
  ],
  exercises: [
    {
      id: "a8-m16-l02-q1", role: "guided", kind: "numeric", difficulty: 4,
      question: "Evaluate $\\displaystyle\\sum_{k=1}^{4}\\frac{1}{k(k+1)}$.",
      answer: "4/5",
      hints: [
        "Split each term using $\\frac{1}{k(k+1)}=\\frac{1}{k}-\\frac{1}{k+1}$.",
        "Write out the sum and cancel the middle fractions.",
        "Subtract the last surviving fraction from the first.",
      ],
      solutionSteps: [
        "Splitting each term: $\\frac{1}{k(k+1)}=\\frac{1}{k}-\\frac{1}{k+1}$.",
        "The sum telescopes to $\\frac{1}{1}-\\frac{1}{5}$.",
        "This equals $1-\\frac{1}{5}=\\frac{4}{5}$.",
      ],
    },
    {
      id: "a8-m16-l02-q2", role: "guided", kind: "numeric", difficulty: 4,
      question: "Evaluate $\\displaystyle\\sum_{k=2}^{6}\\frac{1}{k(k+1)}$.",
      answer: "5/14",
      hints: [
        "Split each term using $\\frac{1}{k(k+1)}=\\frac{1}{k}-\\frac{1}{k+1}$.",
        "Identify the first surviving fraction, based on where the sum starts.",
        "Subtract the fraction corresponding to one past the last index from the first surviving fraction.",
      ],
      solutionSteps: [
        "Splitting each term and telescoping, the surviving pieces are the first fraction, $\\frac{1}{2}$, and the last, $\\frac{1}{7}$.",
        "The sum equals $\\frac{1}{2}-\\frac{1}{7}$.",
        "This equals $\\frac{7}{14}-\\frac{2}{14}=\\frac{5}{14}$.",
      ],
    },
    {
      id: "a8-m16-l02-q3", role: "independent", kind: "numeric", difficulty: 4,
      question: "Evaluate $\\displaystyle\\sum_{k=1}^{9}\\frac{1}{k(k+1)}$.",
      answer: "9/10",
      hints: [
        "Split each term using $\\frac{1}{k(k+1)}=\\frac{1}{k}-\\frac{1}{k+1}$.",
        "Determine the last surviving negative fraction based on the upper index.",
        "Subtract that fraction from 1.",
      ],
      solutionSteps: [
        "Splitting each term, the sum telescopes to $\\frac{1}{1}-\\frac{1}{10}$.",
        "This equals $1-\\frac{1}{10}$.",
        "The result is $\\frac{9}{10}$.",
      ],
    },
    {
      id: "a8-m16-l02-q4", role: "independent", kind: "numeric", difficulty: 6,
      question: "Evaluate $\\displaystyle\\sum_{k=1}^{5}\\frac{1}{k(k+2)}$.",
      answer: "25/42",
      hints: [
        "Split each term using $\\frac{1}{k(k+2)}=\\frac{1}{2}\\left(\\frac{1}{k}-\\frac{1}{k+2}\\right)$.",
        "Since the gap is 2, two fractions survive at the start and two at the end.",
        "Identify the two surviving fractions on each side, then simplify inside the brackets before multiplying by $\\frac{1}{2}$.",
      ],
      solutionSteps: [
        "Splitting with $d=2$: $\\sum_{k=1}^{5}\\frac{1}{k(k+2)}=\\frac{1}{2}\\left[\\left(1+\\frac{1}{2}\\right)-\\left(\\frac{1}{6}+\\frac{1}{7}\\right)\\right]$.",
        "Simplifying inside the brackets: $\\frac{3}{2}-\\frac{13}{42}=\\frac{63}{42}-\\frac{13}{42}=\\frac{50}{42}=\\frac{25}{21}$.",
        "Multiplying by $\\frac{1}{2}$ gives $\\frac{25}{42}$.",
      ],
    },
    {
      id: "a8-m16-l02-q5", role: "independent", kind: "mcq", difficulty: 4,
      question: "Which identity correctly splits $\\dfrac{1}{k(k+3)}$ for a telescoping sum?",
      choices: ["$\\dfrac{1}{k}-\\dfrac{1}{k+3}$", "$\\dfrac{1}{3}\\left(\\dfrac{1}{k}-\\dfrac{1}{k+3}\\right)$", "$\\dfrac{1}{3}\\left(\\dfrac{1}{k}+\\dfrac{1}{k+3}\\right)$", "$\\dfrac{1}{k+3}-\\dfrac{1}{k}$"],
      answer: 1,
      hints: [
        "Recall the general split $\\frac{1}{k(k+d)}=\\frac{1}{d}\\left(\\frac{1}{k}-\\frac{1}{k+d}\\right)$.",
        "Here the gap between the two denominator factors is $d=3$.",
        "Check which choice includes both the correct factor of $\\frac{1}{3}$ and the correct sign.",
      ],
      solutionSteps: [
        "The general split is $\\frac{1}{k(k+d)}=\\frac{1}{d}\\left(\\frac{1}{k}-\\frac{1}{k+d}\\right)$, and here $d=3$.",
        "Substituting $d=3$ gives $\\frac{1}{3}\\left(\\frac{1}{k}-\\frac{1}{k+3}\\right)$.",
        "The other choices are missing the required factor of $\\frac{1}{3}$, have the wrong sign, or both.",
      ],
    },
    {
      id: "a8-m16-l02-q6", role: "independent", kind: "numeric", difficulty: 6,
      question: "Evaluate $\\displaystyle\\sum_{k=1}^{8}\\frac{1}{k(k+2)}$.",
      answer: "29/45",
      hints: [
        "Split each term using $\\frac{1}{k(k+2)}=\\frac{1}{2}\\left(\\frac{1}{k}-\\frac{1}{k+2}\\right)$.",
        "Since the gap is 2, two fractions survive at the start and two at the end, based on the upper index of 8.",
        "Simplify inside the brackets before multiplying by $\\frac{1}{2}$.",
      ],
      solutionSteps: [
        "Splitting with $d=2$: $\\sum_{k=1}^{8}\\frac{1}{k(k+2)}=\\frac{1}{2}\\left[\\left(1+\\frac{1}{2}\\right)-\\left(\\frac{1}{9}+\\frac{1}{10}\\right)\\right]$.",
        "Simplifying inside the brackets: $\\frac{3}{2}-\\frac{19}{90}=\\frac{135}{90}-\\frac{19}{90}=\\frac{116}{90}=\\frac{58}{45}$.",
        "Multiplying by $\\frac{1}{2}$ gives $\\frac{29}{45}$.",
      ],
    },
  ],
  summary: [
    "A fraction $\\frac{1}{k(k+d)}$ splits as $\\frac{1}{d}\\left(\\frac{1}{k}-\\frac{1}{k+d}\\right)$; for $d=1$ this is simply $\\frac{1}{k}-\\frac{1}{k+1}$.",
    "After splitting, $\\sum_{k=a}^{b}\\frac{1}{k(k+1)}$ telescopes to $\\frac{1}{a}-\\frac{1}{b+1}$.",
    "When the denominator gap $d$ is greater than 1, exactly $d$ fractions survive at the start and $d$ at the end, not just one on each side.",
  ],
  nextConnection: "The same splitting idea works on products instead of sums — the next lesson develops telescoping products, where factors cancel instead of terms subtracting away.",
} satisfies CourseLesson;
