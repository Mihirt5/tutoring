import type { Lesson } from "@/lib/types";

export const lesson: Lesson = {
  slug: "counting-fundamentals",
  blocks: [
    {
      type: "intro",
      body:
        "Counting is the most learnable superpower in competition math. There are only two fundamental rules — multiply independent choices, add exclusive cases — but wielding them without double-counting is a discipline. This lesson builds that discipline.",
    },
    {
      type: "intuition",
      title: "Build the object, step by step",
      body:
        "To count objects, imagine *constructing* one: each construction step with $n$ options multiplies the count by $n$. The product rule is really a statement about decision trees — every leaf of the tree is one object, and multiplying branch counts counts the leaves.",
    },
    {
      type: "diagram",
      kind: "grid-paths",
      caption:
        "Each cell shows the number of lattice paths reaching it — every cell is the sum of its left and lower neighbors. Pascal's triangle, hiding in a grid.",
    },
    {
      type: "quiz",
      kind: "numeric",
      question: "A menu has $3$ appetizers, $4$ mains, and $2$ desserts. How many three-course meals are possible?",
      answer: 24,
      explanation: "Independent choices multiply: $3 \\cdot 4 \\cdot 2 = 24$.",
    },
    {
      type: "example",
      title: "Slots with restrictions",
      problem: "How many codes consist of two distinct letters followed by two distinct digits?",
      steps: [
        "Construct a code slot by slot, honoring restrictions as you go.",
        "First letter: $26$ options. Second letter: must differ — $25$.",
        "First digit: $10$. Second digit: $9$.",
        "Multiply: $26 \\cdot 25 \\cdot 10 \\cdot 9 = 58500$.",
      ],
      takeaway: "Handle a restriction at the moment you fill the restricted slot — the earlier choices shrink the pool.",
    },
    {
      type: "example",
      title: "“At least one” means count the opposite",
      problem: "How many three-digit numbers contain at least one $7$?",
      steps: [
        "Counting the 7-containing numbers directly splits into messy overlapping cases.",
        "Count the complement: three-digit numbers with *no* $7$ anywhere.",
        "First digit: $1$–$9$ minus $7$ → $8$ options. Each other digit: $9$ options. Total: $8 \\cdot 9 \\cdot 9 = 648$.",
        "Subtract from all $900$ three-digit numbers: $900 - 648 = 252$.",
      ],
      takeaway: "The phrase “at least one” is a flashing sign: count everything, subtract the none case.",
    },
    {
      type: "insight",
      body:
        "The sum rule needs *disjoint* cases; the product rule needs *independent* steps (each stage has the same number of options regardless of earlier choices). Almost every counting error is a silent violation of one of these two conditions.",
    },
    {
      type: "pitfall",
      body:
        "Double counting. If you count committees by choosing “a leader, then two members,” each committee gets counted once per possible leader — three times. Either divide by the overcount factor, or redesign the construction so each object arises exactly once.",
    },
    {
      type: "quiz",
      kind: "numeric",
      question: "How many two-digit numbers have both digits even? (The digits $0, 2, 4, 6, 8$ are even.)",
      answer: 20,
      explanation:
        "First digit: even and nonzero → $\\{2,4,6,8\\}$, $4$ options. Second digit: any of $5$. Total $4 \\cdot 5 = 20$.",
    },
    {
      type: "practice",
      problemIds: ["cnt-1", "cnt-2", "cnt-3", "cnt-4"],
    },
    {
      type: "summary",
      points: [
        "Product rule: independent construction steps multiply.",
        "Sum rule: disjoint cases add.",
        "“At least one” → complementary counting.",
        "Watch for double counting: each object must be built exactly one way.",
      ],
      formulas: [
        "Slots: $n_1 \\cdot n_2 \\cdots n_k$",
        "Complement: $|A| = |\\text{total}| - |A^c|$",
        "Overcounting fix: divide by the number of constructions per object",
      ],
    },
    {
      type: "flashcards",
      cards: [
        { front: "When does the product rule apply?", back: "When each step's option count doesn't depend on earlier choices." },
        { front: "\"At least one\" strategy", back: "Complement: total minus the none case." },
        { front: "Counted each object $k$ times?", back: "Divide the total by $k$ — or rebuild the construction to be unambiguous." },
      ],
    },
  ],
};
