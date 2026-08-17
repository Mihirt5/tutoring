import type { Lesson } from "@/lib/types";

export const lesson: Lesson = {
  slug: "casework-complementary",
  blocks: [
    {
      type: "intro",
      body:
        "When a counting problem resists a single clean construction, you split it. Casework is controlled demolition: break the problem into pieces you *can* count, then reassemble. The craft lies in choosing cases that are exhaustive, disjoint, and few.",
    },
    {
      type: "intuition",
      title: "Choose the splitting variable",
      body:
        "Good casework starts with the right question: “what single feature, once fixed, makes the rest easy?” Split on the number of 5-cent coins, the position of the largest element, the color of the first ball. A well-chosen splitter turns one hard problem into three easy ones; a poor one turns it into eleven medium ones.",
    },
    {
      type: "example",
      title: "Inclusion-exclusion in one line",
      problem: "How many integers from $1$ to $100$ are divisible by $3$ or $5$?",
      steps: [
        "Count each set: multiples of $3$: $\\lfloor 100/3 \\rfloor = 33$; multiples of $5$: $20$.",
        "Adding them counts multiples of $15$ twice.",
        "Multiples of $15$: $\\lfloor 100/15 \\rfloor = 6$.",
        "Correct: $33 + 20 - 6 = 47$.",
      ],
      takeaway: "When cases overlap, add them anyway — then subtract each overlap exactly once. That's inclusion-exclusion.",
    },
    {
      type: "quiz",
      kind: "numeric",
      question: "How many integers from $1$ to $50$ are divisible by $4$ or $6$?",
      answer: 16,
      explanation:
        "$\\lfloor 50/4 \\rfloor = 12$, $\\lfloor 50/6 \\rfloor = 8$, and the overlap is multiples of $\\text{lcm}(4,6)=12$: $4$ of them. $12 + 8 - 4 = 16$.",
    },
    {
      type: "example",
      title: "Complementary counting under pressure",
      problem: "A fair coin is flipped $4$ times. What is the probability of at least two heads?",
      steps: [
        "“At least two” spans three cases (2, 3, 4 heads) — but its complement spans only two (0 or 1).",
        "$P(0 \\text{ heads}) = \\tfrac{1}{16}$; $P(1 \\text{ head}) = \\tfrac{4}{16}$ (the head can occupy any of 4 positions).",
        "Complement total: $\\tfrac{5}{16}$.",
        "Answer: $1 - \\tfrac{5}{16} = \\tfrac{11}{16}$.",
      ],
      takeaway: "Count whichever side of the boundary has fewer cases. “At least $k$” with small $k$ ⇒ complement.",
    },
    {
      type: "insight",
      body:
        "Before computing any case, write the full case list and check two things: every object falls in *some* case (exhaustive), and no object falls in *two* (disjoint). Thirty seconds of verification prevents the classic contest disaster — a beautiful computation of the wrong partition.",
    },
    {
      type: "pitfall",
      body:
        "Cases that quietly overlap. Counting “numbers with a 7 in the tens place” plus “numbers with a 7 in the units place” double-counts $77$. If your cases are defined by *properties* rather than by a *partition*, expect overlap and reach for inclusion-exclusion.",
    },
    {
      type: "quiz",
      kind: "numeric",
      question:
        "A committee of $3$ is chosen from $5$ boys and $4$ girls. How many committees include at least one girl?",
      answer: 74,
      explanation:
        "Complement: all-boy committees number $\\binom{5}{3} = 10$. Total $\\binom{9}{3} = 84$. So $84 - 10 = 74$.",
    },
    {
      type: "practice",
      problemIds: ["case-1", "case-2", "case-3", "cnt-4"],
    },
    {
      type: "summary",
      points: [
        "Split on the feature that makes the remainder easy.",
        "Verify cases are exhaustive and disjoint before computing.",
        "Overlapping properties ⇒ inclusion-exclusion.",
        "Count the smaller side: complement beats a long case list.",
      ],
      formulas: [
        "$|A \\cup B| = |A| + |B| - |A \\cap B|$",
        "$P(\\text{at least one}) = 1 - P(\\text{none})$",
        "Multiples of $d$ up to $n$: $\\lfloor n/d \\rfloor$",
      ],
    },
    {
      type: "flashcards",
      cards: [
        { front: "Two checks before computing cases", back: "Exhaustive (covers everything) and disjoint (no overlaps)." },
        { front: "$|A \\cup B|$", back: "$|A| + |B| - |A \\cap B|$." },
        { front: "\"At least one\" reflex", back: "$1 - P(\\text{none})$ — the complement is almost always smaller." },
      ],
    },
  ],
};
