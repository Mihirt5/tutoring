import type { Lesson } from "@/lib/types";

export const lesson: Lesson = {
  slug: "linear-equations-mastery",
  blocks: [
    {
      type: "intro",
      body:
        "Solving a linear equation is mechanical. *Setting one up* is where problems are won. This lesson drills the translation step — from words to symbols — because on contests, the equation you write is the solution.",
    },
    {
      type: "intuition",
      title: "Equations are balanced scales",
      body:
        "An equation asserts that two expressions are the same number. Every legal move — adding to both sides, scaling both sides — preserves the balance. Solving is just undoing operations in reverse order: what was done last is undone first.",
    },
    {
      type: "quiz",
      kind: "numeric",
      question: "If $5x - 3 = 22$, what is $x$?",
      answer: 5,
      explanation: "Undo in reverse: add $3$ to get $5x = 25$, then divide: $x = 5$.",
    },
    {
      type: "example",
      title: "The translation discipline",
      problem: "Ann is twice as old as Ben. In $6$ years the sum of their ages will be $42$. How old is each now?",
      steps: [
        "Name the unknowns precisely: let $b$ = Ben's age *now*. Then Ann is $2b$ now.",
        "Translate the future condition: in $6$ years they are $b + 6$ and $2b + 6$.",
        "Equation: $(b + 6) + (2b + 6) = 42$.",
        "Solve: $3b + 12 = 42 \\Rightarrow b = 10$. Ben is $10$, Ann is $20$.",
        "Verify in the original words: in 6 years, $16 + 26 = 42$ ✓.",
      ],
      takeaway: "Define variables with a time attached (“Ben's age *now*”) — most age-problem errors are really variable-definition errors.",
    },
    {
      type: "example",
      title: "Rates: think per-hour, not per-job",
      problem: "Pipe A fills a tank in $6$ hours, pipe B in $3$. How long together?",
      steps: [
        "Times don't add — rates do. Convert each time to a rate.",
        "A: $\\tfrac16$ tank/hour. B: $\\tfrac13$ tank/hour.",
        "Together: $\\tfrac16 + \\tfrac13 = \\tfrac12$ tank/hour.",
        "One tank at $\\tfrac12$ tank/hour takes $2$ hours.",
      ],
      takeaway: "Whenever quantities combine by working simultaneously, convert to rates. The reciprocal is the bridge.",
    },
    {
      type: "insight",
      body:
        "Contest linear problems often hide a shortcut: you rarely need each variable individually. If a problem asks for $x + y$, look for a way to produce $x + y$ directly — adding the given equations often does it in one move.",
    },
    {
      type: "pitfall",
      body:
        "Answering the wrong question. You solved for Ben but the problem asked for Ann; you found when the tank is half full, not full. On the AMC, the wrong-question answer is *always* among the choices. Re-read the final sentence before committing.",
    },
    {
      type: "quiz",
      kind: "numeric",
      question: "Two numbers sum to $30$ and differ by $6$. What is the larger one?",
      answer: 18,
      explanation:
        "Add the equations $x + y = 30$ and $x - y = 6$: $2x = 36$, so $x = 18$. One addition — no substitution needed.",
    },
    {
      type: "practice",
      problemIds: ["lin-1", "lin-2", "lin-3", "ineq-1", "coord-2"],
    },
    {
      type: "summary",
      points: [
        "Define variables precisely, with time and units attached.",
        "Translate sentence by sentence; the equation mirrors the grammar.",
        "Simultaneous work → add rates, not times.",
        "Solve for what is asked — often a combination, not a single variable.",
      ],
      formulas: [
        "Work: $\\tfrac{1}{t_{\\text{together}}} = \\tfrac{1}{t_1} + \\tfrac{1}{t_2}$",
        "$x+y = s,\\; x-y = d \\;\\Rightarrow\\; x = \\tfrac{s+d}{2}$",
        "Distance $=$ rate $\\times$ time",
      ],
    },
    {
      type: "flashcards",
      cards: [
        { front: "Two pipes: $6$ h and $3$ h. Together?", back: "$\\tfrac16 + \\tfrac13 = \\tfrac12$ per hour → $2$ hours. Rates add." },
        { front: "Sum $s$, difference $d$ — the two numbers?", back: "$\\tfrac{s+d}{2}$ and $\\tfrac{s-d}{2}$." },
        { front: "Most common word-problem error?", back: "Imprecise variable definitions — pin down *whose* quantity and *when*." },
      ],
    },
  ],
};
