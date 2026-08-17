import type { Lesson } from "@/lib/types";

export const lesson: Lesson = {
  slug: "invariants-monovariants",
  blocks: [
    {
      type: "intro",
      body:
        "Welcome to olympiad thinking. A process runs — chips move, numbers merge, signs flip — and you're asked what final states are possible. The professional move is to stop watching the motion and find what *doesn't* move: an invariant. If the target state has the wrong invariant value, no sequence of moves will ever reach it. Impossibility, proved in two lines.",
    },
    {
      type: "intuition",
      title: "What survives the move?",
      body:
        "Every move changes the state — but usually not *everything about* the state. The parity of a sum, a product in disguise, a coloring count: these can pass through moves untouched. Finding an invariant means asking, for each candidate quantity: “compute it before and after one generic move — did it change?”",
    },
    {
      type: "example",
      title: "The mutilated chessboard",
      problem:
        "An $8\\times 8$ board loses two diagonally opposite corners. Can dominoes tile the remaining 62 squares?",
      steps: [
        "Color the board like a chessboard. Every domino, wherever placed, covers exactly one black and one white square — that's the invariant-flavored observation.",
        "A full tiling by 31 dominoes therefore requires exactly 31 black and 31 white squares.",
        "But opposite corners share a color: removing them leaves $32$ of one color, $30$ of the other.",
        "$31 \\ne 32$: no tiling exists. Not \"we couldn't find one\" — *none exists*.",
      ],
      takeaway: "Colorings are manufactured invariants: paint the states so that every legal move preserves a count, then compare start to target.",
    },
    {
      type: "quiz",
      kind: "mcq",
      question:
        "Numbers on a board are repeatedly replaced: pick two, erase them, write their *sum*. Which quantity is invariant?",
      choices: [
        "The count of numbers",
        "The largest number",
        "The sum of all numbers",
        "The product of all numbers",
      ],
      answer: 2,
      explanation:
        "Erasing $a, b$ and writing $a + b$ leaves the total sum unchanged. The count strictly decreases (a monovariant), and the product changes wildly.",
    },
    {
      type: "example",
      title: "An invariant in disguise",
      problem:
        "Board holds $1, 2, \\ldots, 10$. A move replaces $a, b$ with $a + b + ab$. What number remains after nine moves?",
      steps: [
        "Try to massage the move into a friendly form: $a + b + ab = (1+a)(1+b) - 1$.",
        "So if we track $1 + x$ for each number $x$, the move *multiplies* two of these and keeps the rest — the product $\\prod (1 + x_i)$ never changes.",
        "Initially: $2 \\cdot 3 \\cdots 11 = 11!/1 = 39916800$.",
        "The survivor $S$ satisfies $1 + S = 39916800$, so $S = 39916799$ — the same no matter what order you merge. The \"process\" was an illusion.",
      ],
      takeaway: "When a move looks algebraically messy, hunt for a substitution that makes it multiplicative or additive — invariants hide behind changes of variable.",
    },
    {
      type: "proof",
      title: "The invariant argument, as a template",
      body: [
        "1. Define a quantity $Q$ of the state.",
        "2. Show every legal move preserves $Q$ (check *all* move types — a single missed case voids the proof).",
        "3. Compute $Q(\\text{start})$ and $Q(\\text{target})$.",
        "4. If they differ, the target is unreachable. ∎",
        "A *monovariant* replaces step 2 with: every move strictly increases (or decreases) $Q$. Monovariants prove termination — a strictly decreasing positive integer cannot decrease forever — and prove unreachability in the other direction.",
      ],
    },
    {
      type: "insight",
      body:
        "The three most common invariant materials: **parity** (sums and counts mod 2), **coloring counts** (chessboard and beyond), and **products/sums after substitution**. When stuck, compute each of these for the start and target states — the mismatch reveals the proof.",
    },
    {
      type: "pitfall",
      body:
        "An invariant argument proves only *impossibility*. Matching invariants do NOT prove reachability — the target might be blocked for other reasons. To show something IS achievable, you must construct the move sequence explicitly.",
    },
    {
      type: "quiz",
      kind: "numeric",
      question:
        "Signs $+/-$ are placed between $1, 2, \\ldots, 10$. The all-plus total is $55$. What is the smallest nonnegative achievable value?",
      answer: 1,
      explanation:
        "Flipping the sign on $k$ changes the total by $2k$ — parity is invariant. $55$ is odd, so $0$ is impossible; $1$ is achieved by negating $\\{8,9,10\\}$: $55 - 2(27) = 1$.",
    },
    {
      type: "practice",
      problemIds: ["inv-1", "inv-2", "inv-3", "ext-1", "gph-1"],
    },
    {
      type: "summary",
      points: [
        "Invariant: preserved by every move ⇒ mismatched targets are unreachable.",
        "Monovariant: strictly monotone ⇒ processes terminate.",
        "Standard materials: parity, colorings, substituted products.",
        "Impossibility needs an invariant; possibility needs a construction. Both halves matter.",
      ],
      formulas: [
        "$a + b + ab = (1+a)(1+b) - 1$",
        "Sign flip on $k$: total changes by $2k$ (parity preserved)",
        "Domino: always 1 black + 1 white",
      ],
    },
    {
      type: "flashcards",
      cards: [
        { front: "Invariant argument in one sentence", back: "Find $Q$ preserved by every move; if $Q(\\text{start}) \\ne Q(\\text{target})$, unreachable." },
        { front: "What do monovariants prove?", back: "Termination — a strictly decreasing positive integer sequence must stop." },
        { front: "Do equal invariants prove reachability?", back: "No — impossibility only. Reachability needs an explicit construction." },
        { front: "The merge $a,b \\to a+b+ab$ preserves…", back: "$\\prod(1 + x_i)$, since $1 + (a+b+ab) = (1+a)(1+b)$." },
      ],
    },
  ],
};
