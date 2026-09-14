import type { CourseLesson } from "@/lib/courses/types";

export default {
  slug: "domains-composition-inverses-and-graphs",
  intro:
    "A function is a rule with an agreement about which inputs are allowed. We will follow inputs through several rules, reverse a rule when possible, and interpret the same relationships on a graph.",
  sections: [
    {
      id: "a1012-m02-l01-s1",
      title: "A rule and its allowed inputs",
      body: [
        "A function assigns exactly one output to each input in its domain. The domain is part of the function: the same expression on different input sets can describe different functions. A real square root requires a nonnegative radicand, while a denominator must be nonzero. A piecewise rule chooses its formula by testing the input against a stated condition; it does not ask you to choose whichever formula is convenient.",
        "Function notation is a request to apply the rule. In $f(a+1)$, replace every occurrence of the input variable by the entire expression $a+1$, using parentheses where needed. Changing the output is different: $f(a)+1$ adds one after the rule has already been applied. Keeping those operations separate prevents many errors.",
      ],
      keyIdea: "Read the input restriction before evaluating the formula.",
    },
    {
      id: "a1012-m02-l01-s2",
      title: "Composition follows an ordered path",
      body: [
        "The composition $f(g(x))$ means first apply $g$, then send its output into $f$. The starting value must lie in the domain of $g$, and the intermediate output must lie in the domain of $f$. Checking only the original input is insufficient. The order usually matters because the two rules change the input in different ways.",
        "For a graph, a point $(a,b)$ states that input $a$ produces output $b$. Replacing the rule by $f(x-h)+k$ shifts that point to $(a+h,b+k)$. The input shift has the seemingly reversed sign because the new input must be $a+h$ to make the inner expression equal the old input $a$.",
      ],
      keyIdea:
        "For composition, track the intermediate output; for a shift, solve for the new input.",
    },
    {
      id: "a1012-m02-l01-s3",
      title: "An inverse reverses an unambiguous rule",
      body: [
        "An inverse function reverses input and output. It exists on the chosen range only when no two allowed inputs produce the same output. To find a formula, write $y=f(x)$ and solve for $x$ in terms of $y$. The old output is now the input to the inverse. This process is not taking the reciprocal of the function value.",
        "A linear rule with nonzero slope has a unique reverse. A squaring rule on all real numbers does not, because opposite inputs have the same square. Restricting its domain to nonnegative inputs makes the square-root function its inverse. Check an inverse by composing the two rules and recovering the original allowed input.",
      ],
      keyIdea:
        "An inverse must undo the rule on its stated domain, not merely rearrange symbols.",
    },
  ],
  examples: [
    {
      id: "a1012-m02-l01-ex1",
      title: "Evaluate within the domain",
      problem:
        "Let $f(x)=(2x+1)/(x-3)$. Find $f(5)$ and the excluded real input.",
      steps: [
        "The denominator is zero at $x=3$, so this input is excluded.",
        "Substitute 5 in both places: $f(5)=(10+1)/(5-3)$.",
        "The result is $11/2$.",
      ],
      answer: "11/2; excluded input 3",
      takeaway:
        "Substitution respects the entire formula and its restrictions.",
    },
    {
      id: "a1012-m02-l01-ex2",
      title: "The order changes the output",
      problem:
        "For $f(x)=2x-1$ and $g(x)=x^2+3$, find $f(g(2))$ and $g(f(2))$.",
      steps: [
        "First $g(2)=7$, so $f(g(2))=f(7)=13$.",
        "In the other order, $f(2)=3$.",
        "Then $g(f(2))=g(3)=12$, so the two outputs differ.",
      ],
      answer: "13 and 12",
      takeaway: "Composition is an ordered process.",
    },
    {
      id: "a1012-m02-l01-ex3",
      title: "Reverse a linear rule",
      problem: "If $f(x)=(3x+4)/2$, find $f^{-1}(11)$.",
      steps: [
        "Write $y=(3x+4)/2$ and multiply by 2.",
        "Solving $2y=3x+4$ gives $x=(2y-4)/3$.",
        "At $y=11$, the inverse output is $(22-4)/3=6$.",
      ],
      answer: "6",
      takeaway: "The inverse answers which input produced a specified output.",
    },
  ],
  commonMistakes: [
    "Confusing a composition with multiplication.",
    "Ignoring a restriction on the intermediate output.",
    "Reading $f^{-1}$ as $1/f$.",
  ],
  exercises: [
    {
      id: "a1012-m02-l01-q1",
      role: "guided",
      question:
        "What is the greatest real input allowed for $f(x)=\\sqrt{9-2x}$?",
      hints: [
        "Require a nonnegative radicand.",
        "Solve $9-2x\\ge0$.",
        "Check whether the endpoint is allowed.",
      ],
      solutionSteps: [
        "The square root requires $9-2x\\ge0$.",
        "This is equivalent to $x\\le9/2$.",
        "At $x=9/2$, the radicand is zero, so the greatest input is $9/2$.",
      ],
      difficulty: 4,
      kind: "numeric",
      answer: "9/2",
    },
    {
      id: "a1012-m02-l01-q2",
      role: "guided",
      question: "If $f(x)=x^2$ and $g(x)=x-3$, find $f(g(5))$.",
      hints: [
        "Apply the inner rule first.",
        "Compute $g(5)=2$.",
        "Now apply the squaring rule.",
      ],
      solutionSteps: [
        "The inner rule sends 5 to $5-3=2$.",
        "The outer rule sends 2 to $2^2$.",
        "Thus $f(g(5))=4$.",
      ],
      difficulty: 4,
      kind: "numeric",
      answer: "4",
    },
    {
      id: "a1012-m02-l01-q3",
      role: "independent",
      question:
        "Let $f(x)=x+2$ for $x<1$ and $f(x)=3x$ for $x\\ge1$. Find $f(0)+f(1)$.",
      hints: [
        "Choose the branch separately for each input.",
        "Zero uses the first branch; one uses the second.",
        "Compute the two outputs before adding.",
      ],
      solutionSteps: [
        "Since $0<1$, $f(0)=2$.",
        "Since $1\\ge1$, $f(1)=3$.",
        "Their sum is 5.",
      ],
      difficulty: 5,
      kind: "numeric",
      answer: "5",
    },
    {
      id: "a1012-m02-l01-q4",
      role: "independent",
      question: "For $f(x)=(x-5)/4$, find $f^{-1}(3)$.",
      hints: [
        "Ask which input produces output 3.",
        "Solve $(x-5)/4=3$.",
        "Undo division before undoing subtraction.",
      ],
      solutionSteps: [
        "The desired input satisfies $x-5=12$.",
        "Thus $x=17$.",
        "Checking gives $f(17)=12/4=3$, so the inverse value is 17.",
      ],
      difficulty: 5,
      kind: "numeric",
      answer: "17",
    },
    {
      id: "a1012-m02-l01-q5",
      role: "independent",
      question:
        "The graph of $f$ contains $(4,-1)$. Its corresponding point on $g(x)=f(x-2)+3$ is $(a,b)$. Find $a+b$.",
      hints: [
        "Set the inner input equal to 4.",
        "Solve $a-2=4$, then add 3 to the old output.",
        "The new point is $(6,2)$.",
      ],
      solutionSteps: [
        "The new input is $a=6$ because $6-2=4$.",
        "The new output is $b=-1+3=2$.",
        "Therefore $a+b=8$.",
      ],
      difficulty: 5,
      kind: "numeric",
      answer: "8",
    },
    {
      id: "a1012-m02-l01-q6",
      role: "independent",
      question: "For $f(x)=3x-8$, solve $f(f(x))=x$.",
      hints: [
        "Substitute the whole inner expression.",
        "The composition is $3(3x-8)-8$.",
        "Solve $9x-32=x$.",
      ],
      solutionSteps: [
        "Expanding gives $f(f(x))=9x-32$.",
        "Equality with $x$ requires $8x=32$.",
        "Thus $x=4$, and $f(4)=4$ verifies the result.",
      ],
      difficulty: 5,
      kind: "numeric",
      answer: "4",
    },
  ],
  summary: [
    "A function includes its domain.",
    "Apply composed rules from inside outward.",
    "An inverse reverses a one-to-one input-output relationship.",
  ],
  nextConnection:
    "The next lesson compares quadratic graphs with lines and uses the discriminant to decide how many intersections are possible.",
} satisfies CourseLesson;
