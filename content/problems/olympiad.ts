import type { Problem } from "@/lib/types";

export const OLYMPIAD_PROBLEMS: Problem[] = [
  {
    id: "inv-1",
    statement:
      "An $8 \\times 8$ board has two diagonally opposite corner squares removed. How many ways can the remaining $62$ squares be tiled by $31$ dominoes?",
    answerType: "integer",
    answer: 0,
    difficulty: 7,
    estMinutes: 5,
    topicId: "invariants",
    subtopic: "Coloring arguments",
    source: "Olympiad classic",
    tags: ["coloring", "parity", "impossibility"],
    hints: [
      "Color the board like a chessboard and watch what a domino covers.",
      "Every domino covers one black and one white square.",
      "Opposite corners share a color — count the remaining squares of each color.",
    ],
    solution:
      "Chessboard-color the squares. Each domino covers one black and one white, so any tiling needs equal counts. But opposite corners are the same color, leaving $32$ of one color and $30$ of the other. No tiling exists: $0$.",
    commonMistakes: ["Searching for tilings instead of proving impossibility — 'count = 0' problems usually hide an invariant."],
  },
  {
    id: "inv-2",
    statement:
      "The numbers $1, 2, \\ldots, 10$ are on a board. A move erases two numbers $a, b$ and writes $a + b + ab$. After nine moves one number remains. What are its last three digits?",
    answerType: "integer",
    answer: 799,
    difficulty: 8,
    estMinutes: 8,
    topicId: "invariants",
    subtopic: "Invariant quantities",
    source: "Olympiad classic",
    tags: ["invariant", "product"],
    hints: [
      "Find a quantity unchanged by the move $\\{a,b\\} \\to a+b+ab$.",
      "$a + b + ab = (1+a)(1+b) - 1$.",
      "The product $\\prod (1 + x_i)$ never changes.",
    ],
    solution:
      "Since $1 + (a+b+ab) = (1+a)(1+b)$, the product of $(1+x)$ over all numbers is invariant. It starts as $2 \\cdot 3 \\cdots 11 = 11!/1! = 39916800$. The final number is $39916800 - 1 = 39916799$; last three digits: $799$.",
  },
  {
    id: "inv-3",
    statement:
      "Signs $+$ or $-$ are placed between the numbers $1, 2, \\ldots, 10$. What is the smallest nonnegative value the resulting expression can take?",
    answerType: "integer",
    answer: 1,
    difficulty: 7,
    estMinutes: 5,
    topicId: "invariants",
    subtopic: "Parity",
    source: "Olympiad classic",
    tags: ["parity", "signed-sums"],
    hints: [
      "Flipping a $+$ to $-$ changes the sum by an even amount.",
      "So the parity of the total is fixed. What is $1 + \\cdots + 10$?",
      "$55$ is odd — an even result like $0$ is impossible.",
    ],
    solution:
      "Flipping the sign on $k$ shifts the total by $2k$, so the total's parity never changes. The all-plus sum is $55$, odd — so $0$ is unreachable. And $1$ is achievable: making $\\{8, 9, 10\\}$ negative subtracts $2 \\cdot 27 = 54$, giving $1+2+3+4+5+6+7-8-9-10 = 1$. Minimum nonnegative value: $1$.",
    commonMistakes: ["Hunting for 0 numerically — parity forbids it."],
  },
  {
    id: "ext-1",
    statement:
      "What is the smallest $n$ such that any $n$ integers must contain two whose difference is divisible by $7$?",
    answerType: "integer",
    answer: 8,
    difficulty: 7,
    estMinutes: 4,
    topicId: "extremal",
    subtopic: "Pigeonhole with residues",
    source: "Olympiad classic",
    tags: ["pigeonhole", "residues"],
    hints: [
      "Two numbers differ by a multiple of 7 exactly when they share a residue mod 7.",
      "How many residues mod 7 exist?",
      "Seven integers can occupy all seven residues; the eighth must collide.",
    ],
    solution:
      "There are $7$ residue classes mod $7$. Seven integers can be pairwise incongruent, but $8$ force two into the same class — whose difference is then divisible by $7$. Answer: $8$.",
  },
  {
    id: "gph-1",
    statement:
      "At a party of $9$ people, is it possible that everyone shakes hands with exactly $3$ others? Enter the number of such handshake configurations if impossible, enter $0$.",
    answerType: "integer",
    answer: 0,
    difficulty: 7,
    estMinutes: 4,
    topicId: "graph-theory",
    subtopic: "Handshake lemma",
    source: "Olympiad classic",
    tags: ["handshake-lemma", "parity"],
    hints: [
      "Sum everyone's handshake counts. What does that total count?",
      "Each handshake is counted twice — once per participant.",
      "$9 \\cdot 3 = 27$ is odd. Can twice an integer be odd?",
    ],
    solution:
      "The sum of degrees is twice the number of handshakes, hence even. But $9 \\cdot 3 = 27$ is odd — impossible. Answer: $0$.",
  },
  {
    id: "gph-2",
    statement:
      "How many edges does the complete graph $K_8$ have?",
    answerType: "integer",
    answer: 28,
    difficulty: 6,
    estMinutes: 2,
    topicId: "graph-theory",
    subtopic: "Complete graphs",
    source: "AMC 10 style",
    tags: ["complete-graph", "combinations"],
    hints: [
      "Every pair of vertices contributes exactly one edge.",
      "Count pairs from 8 vertices.",
      "$\\binom{8}{2}$.",
    ],
    solution: "$\\binom{8}{2} = 28$ edges.",
  },
  {
    id: "gph-3",
    statement: "A tree has $15$ vertices. How many edges does it have?",
    answerType: "integer",
    answer: 14,
    difficulty: 7,
    estMinutes: 2,
    topicId: "graph-theory",
    subtopic: "Trees",
    source: "Olympiad training",
    tags: ["trees"],
    hints: [
      "Trees are connected and acyclic.",
      "Build a tree one vertex at a time — each new vertex needs exactly one new edge.",
      "A tree on $n$ vertices always has $n - 1$ edges.",
    ],
    solution:
      "Every tree on $n$ vertices has exactly $n-1$ edges: $14$.",
  },
  {
    id: "rec-1",
    statement:
      "Define $f(1) = 1$ and $f(n) = f(n-1) + n$ for $n \\ge 2$. What is $f(20)$?",
    answerType: "integer",
    answer: 210,
    difficulty: 6,
    estMinutes: 3,
    topicId: "recursion",
    subtopic: "Unrolling recursions",
    source: "AMC 10 style",
    tags: ["recursion", "triangular-numbers"],
    hints: [
      "Unroll: $f(n) = 1 + 2 + \\cdots + n$.",
      "These are the triangular numbers.",
      "$f(20) = \\tfrac{20 \\cdot 21}{2}$.",
    ],
    solution:
      "$f(n) = \\tfrac{n(n+1)}{2}$, so $f(20) = 210$.",
  },
  {
    id: "rec-2",
    statement:
      "How many ways can a $2 \\times 10$ rectangle be tiled by $1 \\times 2$ dominoes?",
    answerType: "integer",
    answer: 89,
    difficulty: 7,
    estMinutes: 5,
    topicId: "recursion",
    subtopic: "Tiling recurrences",
    source: "AIME style",
    tags: ["tiling", "fibonacci"],
    hints: [
      "Look at the leftmost column: what can cover it?",
      "One vertical domino (leaving $2\\times(n-1)$) or two horizontals (leaving $2\\times(n-2)$).",
      "So $T(n) = T(n-1) + T(n-2)$ with $T(1)=1$, $T(2)=2$ — Fibonacci.",
    ],
    solution:
      "The recurrence $T(n) = T(n-1) + T(n-2)$, $T(1) = 1$, $T(2) = 2$ gives $1, 2, 3, 5, 8, 13, 21, 34, 55, 89$. So $T(10) = 89$.",
  },
  {
    id: "fe-1",
    statement:
      "A function satisfies $f(x + y) = f(x) + f(y)$ for all real $x, y$, and $f(1) = 3$. What is $f(7)$?",
    answerType: "integer",
    answer: 21,
    difficulty: 7,
    estMinutes: 3,
    topicId: "functional-equations",
    subtopic: "Cauchy on integers",
    source: "Olympiad training",
    tags: ["cauchy", "additive"],
    hints: [
      "Build up from $f(1)$.",
      "$f(2) = f(1+1) = 2f(1)$.",
      "Induction gives $f(n) = n f(1)$ for integers.",
    ],
    solution:
      "Additivity gives $f(n) = n f(1)$ for positive integers by induction, so $f(7) = 21$.",
  },
  {
    id: "fe-2",
    statement:
      "A function satisfies $f(x) + 2f\\!\\left(\\tfrac{1}{x}\\right) = 3x$ for all $x \\ne 0$. What is $f(2)$?",
    answerType: "integer",
    answer: -1,
    difficulty: 8,
    estMinutes: 6,
    topicId: "functional-equations",
    subtopic: "Substitution systems",
    source: "AMC 12 style",
    tags: ["substitution", "system"],
    hints: [
      "You have one equation with two unknown values: $f(2)$ and $f(1/2)$.",
      "Substitute $x = 2$ and then $x = \\tfrac12$ to get two equations.",
      "Solve the $2\\times 2$ linear system.",
    ],
    solution:
      "At $x=2$: $f(2) + 2f(\\tfrac12) = 6$. At $x=\\tfrac12$: $f(\\tfrac12) + 2f(2) = \\tfrac32$. Doubling the second and subtracting: $3f(2) = 3 - 6 = -3$, so $f(2) = -1$.",
    commonMistakes: ["Stopping after one substitution — the second substitution closes the system."],
  },
  {
    id: "ineqo-1",
    statement:
      "What is the minimum value of $x + \\tfrac{4}{x}$ for $x > 0$?",
    answerType: "integer",
    answer: 4,
    difficulty: 7,
    estMinutes: 3,
    topicId: "inequalities-olympiad",
    subtopic: "AM-GM",
    source: "AMC 12 style",
    tags: ["am-gm", "optimization"],
    hints: [
      "The two terms have a constant product.",
      "AM-GM: $a + b \\ge 2\\sqrt{ab}$.",
      "Equality when $x = \\tfrac4x$.",
    ],
    solution:
      "By AM-GM, $x + \\tfrac4x \\ge 2\\sqrt{4} = 4$, with equality at $x = 2$. Minimum: $4$.",
    commonMistakes: ["Forgetting to verify the equality case is attainable."],
  },
  {
    id: "ineqo-2",
    statement:
      "For positive reals $a, b$, what is the minimum value of $(a + b)\\left(\\tfrac{1}{a} + \\tfrac{1}{b}\\right)$?",
    answerType: "integer",
    answer: 4,
    difficulty: 8,
    estMinutes: 4,
    topicId: "inequalities-olympiad",
    subtopic: "Cauchy-Schwarz",
    source: "Olympiad training",
    tags: ["cauchy-schwarz", "am-gm"],
    hints: [
      "Expand, or apply Cauchy-Schwarz directly.",
      "Expansion gives $2 + \\tfrac{a}{b} + \\tfrac{b}{a}$.",
      "$\\tfrac ab + \\tfrac ba \\ge 2$ by AM-GM.",
    ],
    solution:
      "Expanding: $2 + \\tfrac ab + \\tfrac ba \\ge 2 + 2 = 4$, equality at $a = b$. (Cauchy-Schwarz gives $\\ge (1+1)^2 = 4$ in one line.)",
  },
  {
    id: "og-1",
    statement:
      "Quadrilateral $ABCD$ is cyclic with $\\angle A = 70°$. What is $\\angle C$ in degrees?",
    answerType: "integer",
    answer: 110,
    difficulty: 7,
    estMinutes: 2,
    topicId: "olympiad-geometry",
    subtopic: "Cyclic quadrilaterals",
    source: "Olympiad training",
    tags: ["cyclic", "angles"],
    hints: [
      "Opposite angles of a cyclic quadrilateral have a fixed sum.",
      "They are supplementary.",
      "$180° - 70°$.",
    ],
    solution:
      "In a cyclic quadrilateral, opposite angles sum to $180°$: $\\angle C = 110°$.",
  },
  {
    id: "og-2",
    statement:
      "Equilateral triangle $ABC$ is inscribed in a circle, and $P$ lies on arc $BC$ not containing $A$. If $PB = 3$ and $PC = 5$, what is $PA$?",
    answerType: "integer",
    answer: 8,
    difficulty: 9,
    estMinutes: 6,
    topicId: "olympiad-geometry",
    subtopic: "Ptolemy's theorem",
    source: "Olympiad classic",
    tags: ["ptolemy", "cyclic", "equilateral"],
    hints: [
      "$ABPC$ is a cyclic quadrilateral — Ptolemy applies.",
      "Ptolemy: $PA \\cdot BC = PB \\cdot AC + PC \\cdot AB$.",
      "All triangle sides are equal — cancel them.",
    ],
    solution:
      "Ptolemy on cyclic $ABPC$: $PA \\cdot BC = PB \\cdot AC + PC \\cdot AB$. With $AB = BC = CA = s$: $PA = PB + PC = 8$. A gem: for any such $P$, $PA = PB + PC$.",
  },
  {
    id: "gf-1",
    statement:
      "How many ways can you make $10$ cents from $1$-cent, $2$-cent, and $5$-cent coins?",
    answerType: "integer",
    answer: 10,
    difficulty: 8,
    estMinutes: 5,
    topicId: "generating-functions",
    subtopic: "Coin partitions",
    source: "Olympiad training",
    tags: ["generating-functions", "partitions", "casework"],
    hints: [
      "Case on the number of 5-cent coins.",
      "With the 5s fixed, count the 2s; the 1s are forced.",
      "Zero 5s: six ways ($0$–$5$ twos). One 5: three ways. Two 5s: one way.",
    ],
    solution:
      "Casework on 5s: none → remainder $10$ from 1s/2s: $2$-count $\\in \\{0..5\\}$, $6$ ways; one → remainder $5$: $2$-count $\\in \\{0,1,2\\}$, $3$ ways; two → $1$ way. Total $10$. (Equivalently, the coefficient of $x^{10}$ in $\\tfrac{1}{(1-x)(1-x^2)(1-x^5)}$.)",
  },
];
