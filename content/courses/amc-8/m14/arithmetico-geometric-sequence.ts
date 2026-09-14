import type { CourseLesson } from "@/lib/courses/types";

export default {
  slug: "arithmetico-geometric-sequence",
  intro:
    "An arithmetico-geometric sequence multiplies an arithmetic sequence and a geometric sequence together, term by term — most often the positions $1,2,3,\\ldots$ multiplied by successive powers of a common ratio. Neither the arithmetic sum formula nor the geometric sum formula applies directly to such a sum, but the shift-and-subtract idea behind the geometric sum formula extends to handle it completely.",
  sections: [
    {
      id: "a8-m14-l04-s1",
      title: "Recognizing the pattern",
      body: [
        "An arithmetico-geometric sequence looks like $1,\\ 2r,\\ 3r^2,\\ 4r^3,\\ldots$: the $k$th term is the $k$th term of an arithmetic sequence (here, just the position $k$) multiplied by the $k$th term of a geometric sequence (here, $r^{k-1}$). Sums of such sequences show up whenever a growing count is weighted by a shrinking or growing factor, and they cannot be summed with either the plain arithmetic or plain geometric sum formula alone, since neither formula accounts for both patterns at once.",
        "The telltale sign is a sum where the coefficients increase (or otherwise follow an arithmetic pattern) while the powers of some fixed number increase alongside them, as in $S=1+2r+3r^2+4r^3$. Spotting this shape is the first step; the shift-and-subtract technique below is what actually evaluates it.",
      ],
      keyIdea:
        "An arithmetico-geometric sum multiplies an arithmetic sequence and a geometric sequence term by term, such as position $k$ times $r^{k-1}$.",
    },
    {
      id: "a8-m14-l04-s2",
      title: "The shift-and-subtract technique",
      body: [
        "The same idea that derives the geometric sum formula solves this harder case: multiply the entire sum by the common ratio, then subtract. For $S=1+2r+3r^2+4r^3$, multiplying every term by $r$ shifts each power up by one: $rS=r+2r^2+3r^3+4r^4$. Subtracting lines up matching powers of $r$: $S-rS=1+(2-1)r+(3-2)r^2+(4-3)r^3-4r^4=1+r+r^2+r^3-4r^4$.",
        "The coefficients that survive the subtraction are all 1, so what remains on the right side is a plain geometric series, $1+r+r^2+r^3$, minus one leftover boundary term, $4r^4$, coming from the highest-indexed term that had nothing to subtract against. Collecting everything gives $(1-r)S=(1+r+r^2+r^3)-4r^4$, and dividing both sides by $1-r$ (valid whenever $r\\neq1$) isolates $S$.",
      ],
      keyIdea:
        "Compute $S-rS$: the coefficients collapse to a plain geometric series minus one leftover boundary term, then divide by $1-r$.",
    },
    {
      id: "a8-m14-l04-s3",
      title: "Scaling the technique to a longer sum",
      body: [
        "The same three moves — multiply by $r$, subtract, then divide by $1-r$ — apply no matter how many terms the sum has. For $n$ terms, the general pattern is $(1-r)S=(1+r+r^2+\\cdots+r^{n-1})-nr^n$: the geometric part always runs from $r^0$ to $r^{n-1}$, and the boundary term is always $n$ (the last coefficient) times $r^n$ (one power beyond the geometric part).",
        "This means the geometric part can be evaluated with the ordinary geometric sum formula from the previous lesson, leaving only careful bookkeeping of the single boundary term and one final division. The technique scales to long sums exactly because it replaces $n$ separate additions with one geometric-sum calculation and one subtraction.",
      ],
      keyIdea:
        "For $n$ terms, $(1-r)S=(1+r+\\cdots+r^{n-1})-nr^n$; evaluate the geometric part with the standard formula, then divide by $1-r$.",
    },
  ],
  examples: [
    {
      id: "a8-m14-l04-ex1",
      title: "A first shift-and-subtract sum",
      problem:
        "Find $S=1+2\\left(\\frac{1}{2}\\right)+3\\left(\\frac{1}{2}\\right)^2+4\\left(\\frac{1}{2}\\right)^3$.",
      steps: [
        "Multiply by $r=\\frac{1}{2}$: $\\frac{1}{2}S=\\frac{1}{2}+2\\left(\\frac{1}{2}\\right)^2+3\\left(\\frac{1}{2}\\right)^3+4\\left(\\frac{1}{2}\\right)^4$.",
        "Subtracting gives $\\left(1-\\frac{1}{2}\\right)S=\\left(1+\\frac{1}{2}+\\left(\\frac{1}{2}\\right)^2+\\left(\\frac{1}{2}\\right)^3\\right)-4\\left(\\frac{1}{2}\\right)^4=\\frac{15}{8}-\\frac{1}{4}=\\frac{13}{8}$.",
        "Dividing by $1-\\frac{1}{2}=\\frac{1}{2}$ gives $S=\\frac{13}{8}\\div\\frac{1}{2}=\\frac{13}{4}$.",
      ],
      answer: "13/4",
      takeaway:
        "Multiplying by $r$ and subtracting turns four separate terms into one geometric sum plus one boundary term.",
    },
    {
      id: "a8-m14-l04-ex2",
      title: "A sum that simplifies to a whole number",
      problem:
        "Find $S=1+2\\left(\\frac{1}{3}\\right)+3\\left(\\frac{1}{3}\\right)^2$.",
      steps: [
        "Multiply by $r=\\frac{1}{3}$: $\\frac{1}{3}S=\\frac{1}{3}+2\\left(\\frac{1}{3}\\right)^2+3\\left(\\frac{1}{3}\\right)^3$.",
        "Subtracting gives $\\left(1-\\frac{1}{3}\\right)S=\\left(1+\\frac{1}{3}+\\left(\\frac{1}{3}\\right)^2\\right)-3\\left(\\frac{1}{3}\\right)^3=\\frac{13}{9}-\\frac{1}{9}=\\frac{12}{9}=\\frac{4}{3}$.",
        "Dividing by $1-\\frac{1}{3}=\\frac{2}{3}$ gives $S=\\frac{4}{3}\\div\\frac{2}{3}=2$.",
      ],
      answer: "2",
      takeaway:
        "The shift-and-subtract result can simplify all the way to a whole number, even though every individual term is a fraction.",
    },
    {
      id: "a8-m14-l04-ex3",
      title: "A longer contest-style sum",
      problem:
        "Find $S=1+2\\left(\\frac{1}{2}\\right)+3\\left(\\frac{1}{2}\\right)^2+4\\left(\\frac{1}{2}\\right)^3+5\\left(\\frac{1}{2}\\right)^4+6\\left(\\frac{1}{2}\\right)^5$.",
      steps: [
        "Here $n=6$ and $r=\\frac{1}{2}$, so $(1-r)S=\\left(1+r+r^2+r^3+r^4+r^5\\right)-6r^6$.",
        "The geometric part sums to $\\dfrac{1-\\left(\\frac{1}{2}\\right)^6}{1-\\frac{1}{2}}=\\dfrac{\\frac{63}{64}}{\\frac{1}{2}}=\\frac{63}{32}$, and the boundary term is $6\\left(\\frac{1}{2}\\right)^6=\\frac{6}{64}=\\frac{3}{32}$.",
        "So $\\frac{1}{2}S=\\frac{63}{32}-\\frac{3}{32}=\\frac{60}{32}=\\frac{15}{8}$, giving $S=\\frac{15}{8}\\div\\frac{1}{2}=\\frac{15}{4}$.",
      ],
      answer: "15/4",
      takeaway:
        "Even with six terms, the technique needs only one geometric-sum calculation and one boundary term, not six separate additions.",
    },
  ],
  commonMistakes: [
    "Trying to apply the plain geometric sum formula directly to a sum whose coefficients are not all equal to 1.",
    "Forgetting the leftover boundary term (the highest coefficient times $r^n$) that remains after subtracting $rS$ from $S$.",
    "Dividing by $1-r$ before finishing the subtraction, instead of first simplifying the right-hand side completely.",
  ],
  exercises: [
    {
      id: "a8-m14-l04-q1",
      role: "guided",
      kind: "numeric",
      difficulty: 5,
      question:
        "Find $S=1+2\\left(\\frac{1}{2}\\right)+3\\left(\\frac{1}{2}\\right)^2$.",
      answer: "11/4",
      hints: [
        "Multiply $S$ by $\\frac{1}{2}$ and align the matching powers of $\\frac{1}{2}$ before subtracting.",
        "The right-hand side after subtracting becomes a 3-term geometric series minus one boundary term of $3\\left(\\frac{1}{2}\\right)^3$.",
        "Divide the simplified right-hand side by $1-\\frac{1}{2}$ to isolate $S$.",
      ],
      solutionSteps: [
        "Multiplying by $r=\\frac{1}{2}$: $\\frac{1}{2}S=\\frac{1}{2}+2\\left(\\frac{1}{2}\\right)^2+3\\left(\\frac{1}{2}\\right)^3$.",
        "Subtracting gives $\\frac{1}{2}S_{\\text{diff}}=\\left(1+\\frac{1}{2}+\\left(\\frac{1}{2}\\right)^2\\right)-3\\left(\\frac{1}{2}\\right)^3=\\frac{7}{4}-\\frac{3}{8}=\\frac{11}{8}$.",
        "Dividing by $\\frac{1}{2}$ gives $S=\\frac{11}{8}\\div\\frac{1}{2}=\\frac{11}{4}$.",
      ],
    },
    {
      id: "a8-m14-l04-q2",
      role: "guided",
      kind: "numeric",
      difficulty: 5,
      question:
        "Find $S=1+2\\left(\\frac{1}{3}\\right)+3\\left(\\frac{1}{3}\\right)^2+4\\left(\\frac{1}{3}\\right)^3$.",
      answer: "58/27",
      hints: [
        "Multiply $S$ by $\\frac{1}{3}$ and subtract to line up matching powers.",
        "The result on the right is a 4-term geometric series minus a boundary term of $4\\left(\\frac{1}{3}\\right)^4$.",
        "Divide by $1-\\frac{1}{3}$ to isolate $S$.",
      ],
      solutionSteps: [
        "Multiplying by $r=\\frac{1}{3}$ and subtracting: $\\left(1-\\frac{1}{3}\\right)S=\\left(1+\\frac{1}{3}+\\left(\\frac{1}{3}\\right)^2+\\left(\\frac{1}{3}\\right)^3\\right)-4\\left(\\frac{1}{3}\\right)^4$.",
        "The geometric part is $\\frac{40}{27}$ and the boundary term is $\\frac{4}{81}$, so $\\frac{2}{3}S=\\frac{120}{81}-\\frac{4}{81}=\\frac{116}{81}$.",
        "Dividing by $\\frac{2}{3}$ gives $S=\\frac{116}{81}\\times\\frac{3}{2}=\\frac{58}{27}$.",
      ],
    },
    {
      id: "a8-m14-l04-q3",
      role: "independent",
      kind: "numeric",
      difficulty: 6,
      question:
        "Find $S=1+2\\left(\\frac{1}{2}\\right)+3\\left(\\frac{1}{2}\\right)^2+4\\left(\\frac{1}{2}\\right)^3+5\\left(\\frac{1}{2}\\right)^4$.",
      answer: "57/16",
      hints: [
        "Multiply $S$ by $\\frac{1}{2}$ and subtract, tracking all five terms carefully.",
        "The right side becomes a 5-term geometric series minus a boundary term of $5\\left(\\frac{1}{2}\\right)^5$.",
        "Evaluate the geometric part with the standard sum formula before dividing by $1-\\frac{1}{2}$.",
      ],
      solutionSteps: [
        "Multiplying by $r=\\frac{1}{2}$ and subtracting: $\\frac{1}{2}S=\\left(1+\\frac{1}{2}+\\left(\\frac{1}{2}\\right)^2+\\left(\\frac{1}{2}\\right)^3+\\left(\\frac{1}{2}\\right)^4\\right)-5\\left(\\frac{1}{2}\\right)^5$.",
        "The geometric part is $\\frac{31}{16}$ and the boundary term is $\\frac{5}{32}$, so $\\frac{1}{2}S=\\frac{62}{32}-\\frac{5}{32}=\\frac{57}{32}$.",
        "Dividing by $\\frac{1}{2}$ gives $S=\\frac{57}{32}\\times2=\\frac{57}{16}$.",
      ],
    },
    {
      id: "a8-m14-l04-q4",
      role: "independent",
      kind: "numeric",
      difficulty: 6,
      question:
        "Find $S=1+2\\left(\\frac{1}{4}\\right)+3\\left(\\frac{1}{4}\\right)^2+4\\left(\\frac{1}{4}\\right)^3$.",
      answer: "7/4",
      hints: [
        "Multiply $S$ by $\\frac{1}{4}$ and subtract to line up matching powers.",
        "The right side becomes a 4-term geometric series minus a boundary term of $4\\left(\\frac{1}{4}\\right)^4$.",
        "Divide by $1-\\frac{1}{4}$ to isolate $S$.",
      ],
      solutionSteps: [
        "Multiplying by $r=\\frac{1}{4}$ and subtracting: $\\frac{3}{4}S=\\left(1+\\frac{1}{4}+\\left(\\frac{1}{4}\\right)^2+\\left(\\frac{1}{4}\\right)^3\\right)-4\\left(\\frac{1}{4}\\right)^4$.",
        "The geometric part is $\\frac{85}{64}$ and the boundary term is $\\frac{4}{256}=\\frac{1}{64}$, so $\\frac{3}{4}S=\\frac{85}{64}-\\frac{1}{64}=\\frac{84}{64}=\\frac{21}{16}$.",
        "Dividing by $\\frac{3}{4}$ gives $S=\\frac{21}{16}\\times\\frac{4}{3}=\\frac{7}{4}$.",
      ],
    },
    {
      id: "a8-m14-l04-q5",
      role: "independent",
      kind: "mcq",
      difficulty: 5,
      question:
        "When applying the shift-and-subtract technique to $S=1+2r+3r^2+\\cdots+nr^{n-1}$, what does the right-hand side of $(1-r)S$ simplify to before dividing?",
      choices: [
        "A geometric series of $n$ terms only, with no leftover term",
        "A geometric series of $n$ terms minus a single boundary term of $nr^n$",
        "An arithmetic series of $n$ terms plus a single boundary term",
        "The original sum $S$ multiplied by $n$",
      ],
      answer: 1,
      hints: [
        "Recall what happens to the coefficients when $S$ and $rS$ are subtracted term by term.",
        "Every coefficient except the last one becomes exactly 1 after subtracting.",
        "The very last term of $rS$ has nothing left in $S$ to subtract against, so it survives as a leftover piece.",
      ],
      solutionSteps: [
        "Subtracting $rS$ from $S$ turns every coefficient except the last into 1, producing the plain geometric series $1+r+r^2+\\cdots+r^{n-1}$.",
        "The highest term of $rS$, namely $nr^n$, has no matching term in $S$ to cancel against, so it remains as a leftover boundary term.",
        "This matches the second choice: a geometric series of $n$ terms minus the single boundary term $nr^n$.",
      ],
    },
    {
      id: "a8-m14-l04-q6",
      role: "independent",
      kind: "numeric",
      difficulty: 6,
      question:
        "Find $S=1+2\\left(\\frac{1}{2}\\right)+3\\left(\\frac{1}{2}\\right)^2+4\\left(\\frac{1}{2}\\right)^3+5\\left(\\frac{1}{2}\\right)^4+6\\left(\\frac{1}{2}\\right)^5+7\\left(\\frac{1}{2}\\right)^6$.",
      answer: "247/64",
      hints: [
        "Set up $(1-r)S$ for $n=7$ and $r=\\frac{1}{2}$: a 7-term geometric series minus a boundary term of $7r^7$.",
        "Compute the geometric part using the sum formula, then compute the boundary term separately.",
        "Subtract the boundary term from the geometric part, then divide by $1-\\frac{1}{2}$.",
      ],
      solutionSteps: [
        "Setting up $(1-r)S$ with $n=7$, $r=\\frac{1}{2}$: $\\frac{1}{2}S=\\left(1+\\frac{1}{2}+\\cdots+\\left(\\frac{1}{2}\\right)^6\\right)-7\\left(\\frac{1}{2}\\right)^7$.",
        "The geometric part is $\\dfrac{1-\\left(\\frac{1}{2}\\right)^7}{1-\\frac{1}{2}}=\\frac{127}{64}$, and the boundary term is $\\frac{7}{128}$, so $\\frac{1}{2}S=\\frac{254}{128}-\\frac{7}{128}=\\frac{247}{128}$.",
        "Dividing by $\\frac{1}{2}$ gives $S=\\frac{247}{128}\\times2=\\frac{247}{64}$.",
      ],
    },
  ],
  summary: [
    "An arithmetico-geometric sum multiplies an arithmetic sequence (often just the positions $1,2,3,\\ldots$) by a geometric sequence, term by term.",
    "Multiplying the sum $S$ by the common ratio $r$ and subtracting collapses the coefficients to a plain geometric series, leaving one leftover boundary term.",
    "Divide the simplified result by $1-r$ to isolate $S$; the geometric part can always be evaluated with the standard geometric sum formula.",
  ],
  nextConnection:
    "The next module shifts from sequences to data sets, starting with the mean, median, and mode that summarize a whole list of numbers with a single value.",
} satisfies CourseLesson;
