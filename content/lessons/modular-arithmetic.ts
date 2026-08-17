import type { Lesson } from "@/lib/types";

export const lesson: Lesson = {
  slug: "modular-arithmetic",
  blocks: [
    {
      type: "intro",
      body:
        "Modular arithmetic is clock arithmetic made rigorous: only the remainder matters. It turns questions about astronomically large numbers — the units digit of $7^{2026}$, the remainder of $3^{100}$ — into small, cyclic, finite computations. It is the engine room of contest number theory.",
    },
    {
      type: "intuition",
      title: "The clock",
      body:
        "On a 12-hour clock, $9 + 5 = 2$: we wrapped around. Working mod $n$ means wrapping around at $n$ — two numbers are *congruent* mod $n$ when they differ by a multiple of $n$, i.e. when they land on the same clock position. Addition and multiplication respect the wrap.",
    },
    {
      type: "diagram",
      kind: "mod-clock",
      caption:
        "Step around the mod-$n$ clock by a fixed stride and watch the orbit — powers and multiples always fall into cycles. Change the modulus to reshape the orbit.",
    },
    {
      type: "quiz",
      kind: "numeric",
      question: "What is $17 \\cdot 23 \\bmod 5$?",
      answer: 1,
      explanation:
        "Reduce first: $17 \\equiv 2$ and $23 \\equiv 3 \\pmod 5$, so the product $\\equiv 6 \\equiv 1$. Never multiply big numbers when the modulus is small.",
    },
    {
      type: "example",
      title: "Reduce early, reduce often",
      problem: "Today is Tuesday. What day of the week is it $100$ days from now?",
      steps: [
        "Weekdays cycle with period $7$ — this is arithmetic mod $7$.",
        "$100 = 14 \\cdot 7 + 2$, so $100 \\equiv 2 \\pmod 7$.",
        "One hundred days ahead lands the same place as two days ahead.",
        "Tuesday $+ 2 =$ Thursday.",
      ],
      takeaway: "Any question with a repeating cycle of length $n$ is a mod-$n$ question. Find the period, reduce, finish.",
    },
    {
      type: "example",
      title: "Power cycles",
      problem: "Find the units digit of $3^{2026}$.",
      steps: [
        "The units digit is the value mod $10$. Compute the first few powers: $3, 9, 27 \\to 7, 81 \\to 1$, then it repeats.",
        "The cycle is $3, 9, 7, 1$ with period $4$.",
        "Reduce the exponent mod the period: $2026 = 4 \\cdot 506 + 2$, so $2026 \\equiv 2 \\pmod 4$.",
        "The answer matches the 2nd element of the cycle: $9$.",
      ],
      takeaway: "Powers mod $n$ are eventually periodic. Find the cycle, reduce the exponent mod the cycle length — never mod $n$ itself.",
    },
    {
      type: "insight",
      body:
        "Congruences may be added, subtracted, and multiplied freely: if $a \\equiv b$ and $c \\equiv d \\pmod n$, then $a + c \\equiv b + d$ and $ac \\equiv bd$. This is why you can replace every number by its remainder *before* computing — the algebra survives the substitution.",
    },
    {
      type: "pitfall",
      body:
        "Division. From $2x \\equiv 2y \\pmod 8$ you may *not* conclude $x \\equiv y \\pmod 8$ (try $x=1, y=5$). Cancelling a factor $k$ is only safe when $\\gcd(k, n) = 1$ — otherwise the modulus shrinks: $2x \\equiv 2y \\pmod 8 \\Rightarrow x \\equiv y \\pmod 4$.",
    },
    {
      type: "quiz",
      kind: "numeric",
      question: "What is the remainder when $2^{50}$ is divided by $7$?",
      answer: 4,
      explanation:
        "$2^3 \\equiv 1 \\pmod 7$, so the cycle length is 3. $50 \\equiv 2 \\pmod 3$, so $2^{50} \\equiv 2^2 = 4$.",
    },
    {
      type: "practice",
      problemIds: ["mod-1", "mod-2", "mod-3", "mod-4", "mod-5"],
    },
    {
      type: "summary",
      points: [
        "$a \\equiv b \\pmod n$ means $n \\mid (a - b)$: same clock position.",
        "Reduce every number before computing; the algebra survives.",
        "Powers cycle — reduce exponents mod the cycle length.",
        "Cancel a factor only when it is coprime to the modulus.",
      ],
      formulas: [
        "$a \\equiv b,\\ c \\equiv d \\Rightarrow a+c \\equiv b+d,\\ ac \\equiv bd \\pmod n$",
        "Units digit of $x$ $=$ $x \\bmod 10$",
        "$ka \\equiv kb \\pmod n \\Rightarrow a \\equiv b \\pmod{n/\\gcd(k,n)}$",
      ],
    },
    {
      type: "flashcards",
      cards: [
        { front: "When can you cancel $k$ in a congruence mod $n$?", back: "When $\\gcd(k, n) = 1$; otherwise the modulus divides down by $\\gcd(k,n)$." },
        { front: "Units digit strategy for $a^{big}$", back: "Find the cycle of $a$ mod 10, reduce the exponent mod the cycle length." },
        { front: "$100$ days after Tuesday?", back: "$100 \\equiv 2 \\pmod 7$ → Thursday." },
      ],
    },
  ],
};
