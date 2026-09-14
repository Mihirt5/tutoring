import type { CourseLesson } from "@/lib/courses/types";

export default {
  slug: "systems-and-equation-restrictions",
  intro:
    "An equation is a claim about particular inputs. A good solution method narrows those inputs without accidentally losing a valid answer or inventing an invalid one.",
  sections: [
    {
      id: "a1012-m01-l02-s1",
      title: "Two constraints describe one shared solution",
      body: [
        "A system asks for values that satisfy every equation simultaneously. Substitution replaces one variable using a relationship that is already known; elimination combines equations to remove a variable. Both methods aim to expose the quantity you need with fewer unknowns. If the target is a sum or a product, you may not need every variable separately.",
        "To eliminate safely, apply operations to whole equations. Multiplying an equation by a nonzero constant preserves its solutions, and adding a known equality to another is valid. After finding a candidate, substitute it into both original equations. A pair that fits only one line has not solved the system.",
      ],
      keyIdea:
        "Choose substitution when a variable is already isolated; choose elimination when coefficients align.",
    },
    {
      id: "a1012-m01-l02-s2",
      title: "Some operations are not reversible",
      body: [
        "Squaring sends both a positive number and its negative to the same value. Thus squaring an equation can add candidates that did not satisfy the original signs. A square-root expression is nonnegative, so its opposite side must also be nonnegative. Record that condition before squaring, then test every resulting candidate in the initial equation.",
        "Division has a different hazard: dividing by an expression that could be zero can remove solutions. Split into the zero case and the nonzero case before dividing. Multiplication by a denominator is useful only after listing its forbidden zeros. Think of each algebraic operation as having an entry condition that must be satisfied.",
      ],
      keyIdea:
        "A candidate is not an answer until it passes the original equation.",
    },
    {
      id: "a1012-m01-l02-s3",
      title: "Keep the domain visible while you solve",
      body: [
        "For real-valued problems, even roots require nonnegative radicands and fractions require nonzero denominators. These restrictions come from the meaning of the expressions, before any solving begins. Intersect all restrictions if several expressions occur. A short note such as $x\\ge3$ can reject an extraneous candidate immediately and make the calculation easier to audit.",
        "An equation may have no solutions, one solution, several solutions, or all inputs in its domain as solutions. Do not force every question into a single-answer pattern. When two constraints become the same equation after simplification, they do not provide independent information; when they contradict each other, no shared solution exists.",
      ],
      keyIdea:
        "Record restrictions, transform, solve, and check: those are four separate steps.",
    },
  ],
  examples: [
    {
      id: "a1012-m01-l02-ex1",
      title: "Eliminate a variable by substitution",
      problem: "Solve $2x+3y=17$ and $x-y=1$, then find $xy$.",
      steps: [
        "The second equation gives $x=y+1$.",
        "Substitute: $2(y+1)+3y=17$, so $5y=15$ and $y=3$.",
        "Then $x=4$; both equations hold and $xy=12$.",
      ],
      answer: "12",
      takeaway: "A simple isolated relationship makes substitution economical.",
    },
    {
      id: "a1012-m01-l02-ex2",
      title: "Squaring creates a candidate to reject",
      problem: "Solve $\\sqrt{2x+3}=x$ over the real numbers.",
      steps: [
        "The right side must be nonnegative, so $x\\ge0$.",
        "Squaring gives $x^2-2x-3=0$, or $(x-3)(x+1)=0$.",
        "The candidates are 3 and $-1$; the sign condition excludes $-1$.",
        "Check $x=3$: $\\sqrt9=3$.",
      ],
      answer: "3",
      takeaway:
        "The sign restriction prevents an extra squared-equation root from becoming an answer.",
    },
    {
      id: "a1012-m01-l02-ex3",
      title: "Clear denominators with restrictions",
      problem: "Find the sum of all real solutions of $1/(x-1)+1/(x+1)=3/4$.",
      steps: [
        "The restrictions are $x\\ne1,-1$. Combining fractions gives $2x/(x^2-1)=3/4$.",
        "Cross-multiply to obtain $3x^2-8x-3=0=(3x+1)(x-3)$.",
        "The candidates $x=-1/3$ and $x=3$ satisfy the restrictions and the original equation.",
        "Their sum is $3-1/3=8/3$.",
      ],
      answer: "8/3",
      takeaway:
        "Clearing denominators is safe when forbidden zeros stay excluded.",
    },
  ],
  commonMistakes: [
    "Dividing by an expression before checking whether it can equal zero.",
    "Accepting every solution produced by squaring.",
    "Checking a candidate only in a simplified equation.",
  ],
  exercises: [
    {
      id: "a1012-m01-l02-q1",
      role: "guided",
      question: "If $3a+2b=18$ and $a-b=1$, find $a+b$.",
      hints: [
        "Isolate $a$ in the second equation.",
        "Substitute $a=b+1$ in the first equation.",
        "Solve $5b+3=18$.",
      ],
      solutionSteps: [
        "Substitution gives $3(b+1)+2b=18$.",
        "Thus $b=3$ and $a=4$.",
        "Their sum is 7, and the original constraints check.",
      ],
      difficulty: 4,
      kind: "numeric",
      answer: "7",
    },
    {
      id: "a1012-m01-l02-q2",
      role: "guided",
      question: "Solve $\\sqrt{x+6}=x-6$ over the reals.",
      hints: [
        "Nonnegativity of the right side requires $x\\ge6$.",
        "Squaring gives $x+6=x^2-12x+36$.",
        "Factor $x^2-13x+30$.",
      ],
      solutionSteps: [
        "The squared equation is $(x-3)(x-10)=0$.",
        "Only $x=10$ meets $x\\ge6$.",
        "The original equation checks: $\\sqrt{16}=4=10-6$.",
      ],
      difficulty: 4,
      kind: "numeric",
      answer: "10",
    },
    {
      id: "a1012-m01-l02-q3",
      role: "independent",
      question: "How many real solutions does $(x-2)(x+5)=3(x-2)$ have?",
      hints: [
        "Do not divide immediately by $x-2$.",
        "Move everything to one side and factor.",
        "Use $(x-2)(x+2)=0$.",
      ],
      solutionSteps: [
        "Subtract the right side to obtain $(x-2)(x+5-3)=0$.",
        "The roots are $x=2$ and $x=-2$.",
        "Both satisfy the original equation, so there are 2 solutions.",
      ],
      difficulty: 5,
      kind: "numeric",
      answer: "2",
    },
    {
      id: "a1012-m01-l02-q4",
      role: "independent",
      question: "Find the real solution of $(x+1)/(x-2)=2$.",
      hints: [
        "Exclude $x=2$.",
        "Multiply both sides by $x-2$.",
        "Solve $x+1=2x-4$.",
      ],
      solutionSteps: [
        "The denominator requires $x\\ne2$.",
        "Clearing it gives $x=5$.",
        "Substitution gives $6/3=2$, confirming 5.",
      ],
      difficulty: 5,
      kind: "numeric",
      answer: "5",
    },
    {
      id: "a1012-m01-l02-q5",
      role: "independent",
      question:
        "Real numbers $u,v$ satisfy $u+v=8$ and $u^2-v^2=24$. Find $u-v$.",
      hints: [
        "Factor the difference of squares.",
        "Use the given sum as one factor.",
        "Solve $8(u-v)=24$.",
      ],
      solutionSteps: [
        "The identity gives $(u-v)(u+v)=24$.",
        "Substituting $u+v=8$ yields $8(u-v)=24$.",
        "Therefore $u-v=3$; the corresponding pair is $u=11/2,v=5/2$.",
      ],
      difficulty: 5,
      kind: "numeric",
      answer: "3",
    },
    {
      id: "a1012-m01-l02-q6",
      role: "independent",
      question: "How many real numbers satisfy $\\sqrt{x^2}=x-2$?",
      hints: [
        "Replace $\\sqrt{x^2}$ by $|x|$.",
        "Consider nonnegative and negative $x$ separately.",
        "For $x\\ge0$, the equation becomes $x=x-2$.",
      ],
      solutionSteps: [
        "If $x\\ge0$, then $x=x-2$ is impossible.",
        "If $x<0$, then $-x=x-2$ gives $x=1$, contradicting that case.",
        "No real solution remains, so the answer is 0.",
      ],
      difficulty: 5,
      kind: "numeric",
      answer: "0",
    },
  ],
  summary: [
    "A system requires every constraint to hold.",
    "Write denominator and radical restrictions before transforming.",
    "Check candidates in the original expressions.",
  ],
  nextConnection:
    "The next lesson asks what values an expression can reach, replacing the search for exact solutions with careful bounds and equality cases.",
} satisfies CourseLesson;
