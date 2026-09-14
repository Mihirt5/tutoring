import type { CourseLesson } from "@/lib/courses/types";

export default {
  slug: "telescoping-basics",
  intro:
    "A telescoping sum is a sum whose terms cancel out almost entirely once each term is written as a difference of two simpler pieces, leaving only a first piece and a last piece behind — the way a collapsible telescope shrinks down to just its two end sections. This lesson builds the core mechanism: writing a term as a difference, and tracking exactly which pieces survive the cancellation.",
  sections: [
    {
      id: "a8-m16-l01-s1",
      title: "What telescoping means",
      body: [
        "A sum telescopes when every term can be written as a difference $a_{k+1}-a_k$ for some sequence of values $a_1,a_2,a_3,\\ldots$. Adding up such terms from $k=1$ to $k=n$ produces $(a_2-a_1)+(a_3-a_2)+(a_4-a_3)+\\cdots+(a_{n+1}-a_n)$, and every middle value appears twice with opposite signs — once as a positive piece in one term, and once as a negative piece in the next term — so it cancels out completely.",
        "What remains after every cancellation is just $a_{n+1}-a_1$: the very last positive piece and the very first negative piece, with nothing in between. In general, $\\sum_{k=1}^{n}(a_{k+1}-a_k)=a_{n+1}-a_1$, no matter how large $n$ is or how complicated the individual values $a_k$ are.",
      ],
      keyIdea:
        "A sum of the form $\\sum_{k=1}^{n}(a_{k+1}-a_k)$ always collapses to $a_{n+1}-a_1$, since every middle value cancels.",
    },
    {
      id: "a8-m16-l01-s2",
      title: "Rewriting a term as a difference",
      body: [
        "The real skill in telescoping is not adding an already-differenced sum, but recognizing that an ordinary-looking term secretly equals a difference of two simpler values. The $k$th odd number, $2k-1$, is exactly the difference of consecutive squares: $k^2-(k-1)^2=2k-1$. This means the sum of the first $n$ odd numbers telescopes: $\\sum_{k=1}^{n}(2k-1)=\\sum_{k=1}^{n}\\big(k^2-(k-1)^2\\big)=n^2-0^2=n^2$, instantly explaining the classic fact that the first $n$ odd numbers sum to $n^2$.",
        "Finding the right rewriting is a matter of pattern-matching: look for a family of values (squares, triangular numbers, products of consecutive integers) whose consecutive differences match the term being summed, then rewrite every term in the sum using that family.",
      ],
      keyIdea:
        "Rewrite each term as $a_{k+1}-a_k$ for some recognizable family $a_k$ (such as squares) whose consecutive differences match the term.",
    },
    {
      id: "a8-m16-l01-s3",
      title: "Confirming exactly what survives",
      body: [
        'Even after spotting a telescoping pattern, it pays to write out the first two or three terms and the last one or two terms explicitly, rather than trusting the general formula blindly — this catches off-by-one errors in exactly which piece is the "first" and which is the "last." For a sum running from $k=1$ to $k=n$, writing out $(a_2-a_1)+(a_3-a_2)+\\cdots+(a_{n+1}-a_n)$ makes it visually clear that $a_2$ through $a_n$ each appear once positively and once negatively, while only $a_1$ (negative) and $a_{n+1}$ (positive) never get cancelled.',
        'This check matters most when the sum\'s starting or ending index is unusual — for instance, a sum that starts at $k=0$ or ends at $k=n-1$ shifts which specific values survive, and assuming the "obvious" first and last terms without checking is a common source of errors.',
      ],
      keyIdea:
        "Write out the first few and last few terms explicitly to confirm exactly which two pieces survive, especially when the index range is unusual.",
    },
  ],
  examples: [
    {
      id: "a8-m16-l01-ex1",
      title: "A direct telescoping sum",
      problem: "Evaluate $(2-1)+(3-2)+(4-3)+(5-4)+(6-5)$.",
      steps: [
        "Each term has the form (next value) minus (current value), so the sum telescopes.",
        "Every middle value — 2, 3, 4, and 5 — appears once positively and once negatively, cancelling out.",
        "Only the first negative piece, $-1$, and the last positive piece, $6$, survive: $6-1=5$.",
      ],
      answer: "5",
      takeaway:
        "Writing out a telescoping sum term by term makes the cancellation of every middle value visible.",
    },
    {
      id: "a8-m16-l01-ex2",
      title: "Summing odd numbers via squares",
      problem:
        "Find $1+3+5+7+9+11$ (the first six odd numbers) by rewriting each term as a difference of consecutive squares.",
      steps: [
        "The $k$th odd number is $2k-1$, which equals $k^2-(k-1)^2$.",
        "Summing from $k=1$ to $k=6$: $\\sum_{k=1}^{6}\\big(k^2-(k-1)^2\\big)$ telescopes to $6^2-0^2$.",
        "This equals $36-0=36$.",
      ],
      answer: "36",
      takeaway:
        "Recognizing $2k-1$ as a difference of consecutive squares turns a sum of odd numbers into a single subtraction.",
    },
    {
      id: "a8-m16-l01-ex3",
      title: "Confirming which pieces survive",
      problem:
        "Evaluate $\\big(f(1)-f(0)\\big)+\\big(f(2)-f(1)\\big)+\\big(f(3)-f(2)\\big)+\\cdots+\\big(f(10)-f(9)\\big)$, given that $f(0)=3$ and $f(10)=57$.",
      steps: [
        "This sum has the telescoping form $\\sum_{k=1}^{10}\\big(f(k)-f(k-1)\\big)$.",
        "Every value $f(1)$ through $f(9)$ appears once positively (in its own term) and once negatively (in the next term), cancelling completely.",
        "Only $f(0)$ (negative) and $f(10)$ (positive) survive: $57-3=54$.",
      ],
      answer: "54",
      takeaway:
        "The individual values $f(1)$ through $f(9)$ never need to be known — only the first and last values matter.",
    },
  ],
  commonMistakes: [
    "Adding a telescoping sum term by term instead of recognizing that nearly everything cancels.",
    'Misidentifying which value is the true "first" or "last" surviving piece when the sum\'s index range does not start at the obvious place.',
    "Failing to notice that a term like $2k-1$ can be rewritten as a difference of squares, and instead trying to sum it directly.",
  ],
  exercises: [
    {
      id: "a8-m16-l01-q1",
      role: "guided",
      kind: "numeric",
      difficulty: 2,
      question: "Evaluate $(4-2)+(6-4)+(8-6)+(10-8)$.",
      answer: "8",
      hints: [
        "Check that each term has the form (next value) minus (current value).",
        "Identify which values appear in the middle and will cancel.",
        "Only the very first negative value and the very last positive value survive.",
      ],
      solutionSteps: [
        "Each term is of the form (next value) minus (current value), so the sum telescopes.",
        "The middle values, 4, 6, and 8, each appear once positively and once negatively, cancelling out.",
        "What remains is the last value minus the first value: $10-2=8$.",
      ],
    },
    {
      id: "a8-m16-l01-q2",
      role: "guided",
      kind: "numeric",
      difficulty: 3,
      question:
        "Find $1+3+5+7$ (the first four odd numbers) by rewriting each term as a difference of consecutive squares and cancelling.",
      answer: "16",
      hints: [
        "Recall that the $k$th odd number, $2k-1$, equals $k^2-(k-1)^2$.",
        "Rewrite the sum as $\\sum_{k=1}^{4}\\big(k^2-(k-1)^2\\big)$.",
        "This telescopes to the last square minus the first square.",
      ],
      solutionSteps: [
        "Using $2k-1=k^2-(k-1)^2$, the sum becomes $\\sum_{k=1}^{4}\\big(k^2-(k-1)^2\\big)$.",
        "This telescopes to $4^2-0^2$.",
        "The result is $16-0=16$.",
      ],
    },
    {
      id: "a8-m16-l01-q3",
      role: "independent",
      kind: "numeric",
      difficulty: 3,
      question:
        "Evaluate $\\big(g(1)-g(0)\\big)+\\big(g(2)-g(1)\\big)+\\big(g(3)-g(2)\\big)+\\big(g(4)-g(3)\\big)+\\big(g(5)-g(4)\\big)$, given that $g(0)=7$ and $g(5)=42$.",
      answer: "35",
      hints: [
        "Identify which values in the sum appear both positively and negatively.",
        "Only the first and last values of $g$ survive the cancellation.",
        "Subtract the first value from the last value.",
      ],
      solutionSteps: [
        "The values $g(1)$ through $g(4)$ each appear once positively and once negatively, cancelling completely.",
        "Only $g(0)$ (negative) and $g(5)$ (positive) survive.",
        "The sum equals $42-7=35$.",
      ],
    },
    {
      id: "a8-m16-l01-q4",
      role: "independent",
      kind: "numeric",
      difficulty: 4,
      question:
        "Find $1+3+5+7+9+11+13$ (the first seven odd numbers) using the difference-of-squares telescoping method.",
      answer: "49",
      hints: [
        "Rewrite each odd number $2k-1$ as $k^2-(k-1)^2$.",
        "Sum this rewritten expression from $k=1$ to $k=7$.",
        "The sum telescopes to a single square.",
      ],
      solutionSteps: [
        "Using $2k-1=k^2-(k-1)^2$, the sum becomes $\\sum_{k=1}^{7}\\big(k^2-(k-1)^2\\big)$.",
        "This telescopes to $7^2-0^2$.",
        "The result is $49-0=49$, matching the direct sum $1+3+5+7+9+11+13=49$.",
      ],
    },
    {
      id: "a8-m16-l01-q5",
      role: "independent",
      kind: "mcq",
      difficulty: 3,
      question:
        "In a telescoping sum $\\sum_{k=1}^{n}(a_{k+1}-a_k)$, which terms remain after all cancellation?",
      choices: [
        "Every term remains; no cancellation occurs",
        "Only $a_{n+1}$ and $-a_1$ remain",
        "Only the middle terms remain",
        "The sum is always zero",
      ],
      answer: 1,
      hints: [
        "Write out the first two terms and the last term of the sum to see which values repeat.",
        "Each value $a_2$ through $a_n$ appears once positively and once negatively.",
        "Identify the one value that only ever appears negatively, and the one value that only ever appears positively.",
      ],
      solutionSteps: [
        "Writing out the sum as $(a_2-a_1)+(a_3-a_2)+\\cdots+(a_{n+1}-a_n)$ shows every value from $a_2$ to $a_n$ appearing once positively and once negatively.",
        "The value $a_1$ only ever appears negatively, and $a_{n+1}$ only ever appears positively.",
        "So the sum collapses to $a_{n+1}-a_1$, matching the second choice.",
      ],
    },
    {
      id: "a8-m16-l01-q6",
      role: "independent",
      kind: "numeric",
      difficulty: 5,
      question:
        "Find $2+4+6+8+10+12$ (the first six positive even numbers) by rewriting the $k$th term $2k$ as $k(k+1)-(k-1)k$ and cancelling.",
      answer: "42",
      hints: [
        "Check that $k(k+1)-(k-1)k$ really does simplify to $2k$.",
        "Rewrite the sum as $\\sum_{k=1}^{6}\\big(k(k+1)-(k-1)k\\big)$.",
        "This telescopes to a single product minus another single product.",
      ],
      solutionSteps: [
        "Simplifying $k(k+1)-(k-1)k=k\\big((k+1)-(k-1)\\big)=2k$, confirming the identity.",
        "The sum $\\sum_{k=1}^{6}\\big(k(k+1)-(k-1)k\\big)$ telescopes to $6\\times7-0\\times1$.",
        "This equals $42-0=42$, matching the direct sum $2+4+6+8+10+12=42$.",
      ],
    },
  ],
  summary: [
    "A telescoping sum $\\sum_{k=1}^{n}(a_{k+1}-a_k)$ always collapses to $a_{n+1}-a_1$, since every middle value cancels.",
    "Recognizing a term as a difference of a recognizable family, like $2k-1=k^2-(k-1)^2$, is the key step that reveals a telescoping pattern.",
    "Write out the first few and last few terms explicitly to confirm exactly which two pieces survive, especially for unusual index ranges.",
  ],
  nextConnection:
    "The next lesson extends this same idea to sums involving fractions, using a partial-fraction-style split to reveal telescoping patterns that are not obvious at first glance.",
} satisfies CourseLesson;
