import type { CourseLesson } from "@/lib/courses/types";

export default {
  slug: "quadratics-discriminants-and-intersections",
  intro:
    "You do not always need to calculate roots to understand a quadratic. Its square form, discriminant, and graph describe the same relationship from three useful viewpoints.",
  sections: [
    {
      id: "a1012-m02-l02-s1",
      title: "Square form locates the turning point",
      body: [
        "A quadratic with nonzero leading coefficient can be written as $a(x-h)^2+k$. Because the square is smallest at $x=h$, this form identifies the vertex $(h,k)$. Positive $a$ makes the graph open upward and gives a minimum; negative $a$ makes it open downward and gives a maximum. The sign of the leading coefficient therefore affects the meaning of every bound.",
        "The horizontal axis corresponds to output zero. A quadratic graph may cross it twice, touch it once, or miss it. Compare the vertex height and opening direction before doing algebra. This geometric prediction is a useful independent check on the number of roots produced by a calculation.",
      ],
      keyIdea:
        "Square form explains where the graph turns and whether zero output is reachable.",
    },
    {
      id: "a1012-m02-l02-s2",
      title: "The discriminant counts real roots",
      body: [
        "The quadratic formula solves $ax^2+bx+c=0$ as $x=(-b\\pm\\sqrt{b^2-4ac})/(2a)$. The quantity $D=b^2-4ac$ is the discriminant. If $D>0$, the two signs produce distinct real roots. If $D=0$, they produce the same root. If $D<0$, no real square root exists and there are no real roots.",
        "A double root is still one distinct input, even though its factor occurs twice. When a question says exactly one intersection, translate it into $D=0$ for the resulting quadratic. If a parameter changes the leading coefficient, first check separately whether it can become zero, because the equation would then cease to be quadratic.",
      ],
      keyIdea:
        "For a genuine quadratic, positive, zero, and negative discriminants mean two, one, and zero distinct real roots.",
    },
    {
      id: "a1012-m02-l02-s3",
      title: "An intersection satisfies both rules",
      body: [
        "Two graphs intersect where the same input produces the same output. Set their formulas equal, move everything to one side, and solve the resulting equation. Each permitted input then determines an output. Counting algebraic roots counts intersection points only after checking domains and ensuring no denominator clearing created an invalid root.",
        "A tangent line meets a parabola at a double intersection input. Horizontal tangents occur at the vertex, while other tangent lines can be studied using a discriminant equation. After determining a parameter, substitute it back to locate the contact point. This final step confirms both the algebraic condition and the geometric interpretation.",
      ],
      keyIdea: "Set outputs equal to locate or count graph intersections.",
    },
  ],
  examples: [
    {
      id: "a1012-m02-l02-ex1",
      title: "See a missing intersection two ways",
      problem: "How many real roots does $x^2-8x+18=0$ have?",
      steps: [
        "Complete the square: $x^2-8x+18=(x-4)^2+2$.",
        "The expression is always at least 2, so it cannot equal zero.",
        "Equivalently, $D=64-72=-8<0$; there are no real roots.",
      ],
      answer: "0",
      takeaway: "Square form and discriminant give matching explanations.",
    },
    {
      id: "a1012-m02-l02-ex2",
      title: "Intersect a line and a parabola",
      problem:
        "The graphs $y=x^2+1$ and $y=4x-2$ intersect. Find the sum of their intersection x-coordinates.",
      steps: [
        "Set outputs equal: $x^2+1=4x-2$.",
        "Rearrange and factor: $x^2-4x+3=(x-1)(x-3)=0$.",
        "The x-coordinates are 1 and 3, giving sum 4.",
      ],
      answer: "4",
      takeaway:
        "Intersections are simultaneous solutions of the two graph equations.",
    },
    {
      id: "a1012-m02-l02-ex3",
      title: "Find a parameter for a double positive root",
      problem:
        "For which positive $k$ does $x^2-kx+16=0$ have exactly one real root?",
      steps: [
        "The discriminant must be zero: $k^2-64=0$.",
        "This gives $k=8$ or $k=-8$; positivity selects 8.",
        "The resulting expression is $(x-4)^2$, confirming a single positive root.",
      ],
      answer: "8",
      takeaway:
        "Parameter restrictions can select among the discriminant equation solutions.",
    },
  ],
  commonMistakes: [
    "Counting a repeated root as two distinct intersection points.",
    "Using the discriminant formula after the leading coefficient becomes zero.",
    "Forgetting to apply a stated sign restriction to a parameter.",
  ],
  exercises: [
    {
      id: "a1012-m02-l02-q1",
      role: "guided",
      question: "How many distinct real roots does $2x^2+4x+5=0$ have?",
      hints: [
        "Identify $a,b,c$.",
        "Compute $b^2-4ac$.",
        "A negative discriminant has no real square root.",
      ],
      solutionSteps: [
        "Here $a=2,b=4,c=5$.",
        "The discriminant is $16-40=-24$.",
        "Since it is negative, there are 0 real roots.",
      ],
      difficulty: 4,
      kind: "numeric",
      answer: "0",
    },
    {
      id: "a1012-m02-l02-q2",
      role: "guided",
      question:
        "The horizontal line $y=c$ is tangent to $y=x^2-2x+5$. Find $c$.",
      hints: [
        "Find the vertex height.",
        "Complete the square as $(x-1)^2+4$.",
        "A horizontal tangent passes through the vertex.",
      ],
      solutionSteps: [
        "The parabola has minimum output 4 at $x=1$.",
        "A horizontal line at any higher output meets it twice; any lower one misses it.",
        "Thus the unique horizontal tangent is $y=4$, giving $c=4$.",
      ],
      difficulty: 4,
      kind: "numeric",
      answer: "4",
    },
    {
      id: "a1012-m02-l02-q3",
      role: "independent",
      question: "The discriminant of $x^2+bx+12$ is 25. Find $b^2$.",
      hints: [
        "Use the definition of discriminant.",
        "Write $b^2-48=25$.",
        "Add 48 to both sides.",
      ],
      solutionSteps: [
        "The coefficients are $a=1$ and $c=12$.",
        "The condition becomes $b^2-4(1)(12)=25$.",
        "Therefore $b^2=73$.",
      ],
      difficulty: 5,
      kind: "numeric",
      answer: "73",
    },
    {
      id: "a1012-m02-l02-q4",
      role: "independent",
      question:
        "The line $y=mx$ meets $y=x^2+9$ at exactly one point. Find $m^2$.",
      hints: [
        "Set the outputs equal.",
        "The resulting quadratic is $x^2-mx+9=0$.",
        "Require its discriminant to vanish.",
      ],
      solutionSteps: [
        "Intersection inputs solve $x^2-mx+9=0$.",
        "Exactly one distinct root requires $m^2-36=0$.",
        "Thus $m^2=36$; slopes 6 and $-6$ each give a tangent.",
      ],
      difficulty: 5,
      kind: "numeric",
      answer: "36",
    },
    {
      id: "a1012-m02-l02-q5",
      role: "independent",
      question: "Find the larger real solution of $(x-4)^2=9$.",
      hints: [
        "A square of 9 comes from 3 or $-3$.",
        "Write $x-4=\\pm3$.",
        "Compare the two resulting inputs.",
      ],
      solutionSteps: [
        "The two cases give $x=4+3$ and $x=4-3$.",
        "The roots are 7 and 1.",
        "Both satisfy the original squared equation, and the larger is 7.",
      ],
      difficulty: 5,
      kind: "numeric",
      answer: "7",
    },
    {
      id: "a1012-m02-l02-q6",
      role: "independent",
      question:
        "For some real $t$, the equation $x^2-2tx+t+2=0$ has root 1. Find its other root.",
      hints: [
        "Use the known root to find $t$.",
        "Substitute $x=1$ into the equation.",
        "Factor the resulting quadratic.",
      ],
      solutionSteps: [
        "Substitution gives $1-2t+t+2=0$, so $t=3$.",
        "The equation becomes $x^2-6x+5=0=(x-1)(x-5)$.",
        "Its other root is 5.",
      ],
      difficulty: 5,
      kind: "numeric",
      answer: "5",
    },
  ],
  summary: [
    "Square form locates the vertex.",
    "The discriminant counts distinct real roots.",
    "Set outputs equal to translate a graph intersection into algebra.",
  ],
  nextConnection:
    "The next lesson reads sums, products, and symmetric expressions directly from polynomial coefficients without solving for each root.",
} satisfies CourseLesson;
