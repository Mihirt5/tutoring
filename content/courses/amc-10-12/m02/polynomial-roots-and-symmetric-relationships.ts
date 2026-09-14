import type { CourseLesson } from "@/lib/courses/types";

export default {
  slug: "polynomial-roots-and-symmetric-relationships",
  intro:
    "A polynomial may hide its roots behind awkward radicals while displaying everything you need about their sum and product. In this lesson, you will read that information directly and use it to answer questions without solving for each root.",
  sections: [
    {
      id: "a1012-m02-l03-s1",
      title: "Coefficients are a compressed record of the roots",
      body: [
        "If a quadratic has roots $r$ and $s$ and leading coefficient $A$, its factored form is $A(x-r)(x-s)$. Expanding gives $Ax^2-A(r+s)x+Ars$. Compare this with $Ax^2+Bx+C$: the coefficient of $x$ records the negative of the root sum, multiplied by $A$, while the constant records the root product, multiplied by $A$.",
        "Consequently, $r+s=-B/A$ and $rs=C/A$. These relationships, often called Vieta's formulas, come from multiplication rather than a separate trick to memorize. They work even when the roots are irrational, repeated, or nonreal. A contest problem asking for a sum of powers may therefore be easier than a problem asking for the roots themselves.",
      ],
      keyIdea:
        "First write $S=r+s$ and $P=rs$. Do not assume the polynomial is monic: divide the coefficients by its leading coefficient.",
    },
    {
      id: "a1012-m02-l03-s2",
      title: "Rewrite the target before computing",
      body: [
        "An expression is symmetric if exchanging the roots leaves it unchanged. Expand $(r+s)^2$ to obtain $r^2+s^2=S^2-2P$. Expanding the cube similarly gives $r^3+s^3=S^3-3PS$. The useful move is to connect the requested expression to $S$ and $P$ before inserting numbers; this keeps the structure visible and reduces arithmetic.",
        "Reciprocals need one extra check: neither root may be zero. When $P\\ne0$, $1/r+1/s=S/P$, and the sum of the squared reciprocals is $(S^2-2P)/P^2$. Shifted products also simplify: $(r-h)(s-h)=P-hS+h^2$. In each case, expansion supplies the justification, so you can reconstruct the relationship under contest pressure.",
      ],
      diagram: {
        kind: "table",
        title: "Translate a symmetric target",
        headers: ["Requested expression", "In terms of S and P"],
        rows: [
          ["$r^2+s^2$", "$S^2-2P$"],
          ["$r^3+s^3$", "$S^3-3PS$"],
          ["$(r-h)(s-h)$", "$P-hS+h^2$"],
        ],
      },
    },
    {
      id: "a1012-m02-l03-s3",
      title: "Evaluation can replace a long expansion",
      body: [
        "For a monic cubic $F(x)=(x-a)(x-b)(x-c)$, substituting $x=t$ immediately gives $(t-a)(t-b)(t-c)=F(t)$. This is especially effective when the target contains the same shift in every factor. Be careful about reversing factors: replacing all three factors by their negatives changes the sign of the product.",
        "Coefficient relationships can also reveal an unknown parameter. Translate a stated relation between the roots into an equation involving their sum or product, then check the root conditions in the original question. Positivity, distinctness, and nonzero denominators are information; they are not automatic consequences of an algebraic manipulation.",
      ],
      keyIdea:
        "Choose the representation that resembles the target: coefficients for sums and products, or polynomial evaluation for a product of shifted roots.",
    },
  ],
  examples: [
    {
      id: "a1012-m02-l03-ex1",
      title: "An awkward quadratic, a simple target",
      problem:
        "The roots of $2x^2-7x+3=0$ are $r$ and $s$. Find $r^2+s^2$ without finding the roots.",
      steps: [
        "Compare coefficients: $S=r+s=7/2$ and $P=rs=3/2$.",
        "Expand $S^2=r^2+2rs+s^2$, so the target is $S^2-2P$.",
        "Substitute: $(7/2)^2-2(3/2)=49/4-3=37/4$.",
      ],
      answer: "37/4",
      takeaway:
        "Normalizing the leading coefficient matters; the root sum is not 7.",
    },
    {
      id: "a1012-m02-l03-ex2",
      title: "A shifted product from one substitution",
      problem:
        "The roots of $F(x)=x^3-2x^2-5x+6$ are $a,b,c$. Find $(a+1)(b+1)(c+1)$.",
      steps: [
        "Write $F(-1)=(-1-a)(-1-b)(-1-c)$.",
        "Each factor is the negative of the corresponding factor in the target. There are three negatives, so the target equals $-F(-1)$.",
        "Evaluate $F(-1)=-1-2+5+6=8$.",
        "Therefore $(a+1)(b+1)(c+1)=-8$.",
      ],
      answer: "-8",
      takeaway:
        "Matching a product to a polynomial can avoid both root-finding and expansion.",
    },
    {
      id: "a1012-m02-l03-ex3",
      title: "Recovering a coefficient from a root condition",
      problem:
        "The positive roots $a,b$ of $x^2-kx+12=0$ satisfy $a/b+b/a=25/12$. Find $k$.",
      steps: [
        "Vieta gives $ab=12$ and $a+b=k$.",
        "Combine the fractions: $(a^2+b^2)/(ab)=25/12$, so $a^2+b^2=25$.",
        "Then $k^2=(a+b)^2=a^2+b^2+2ab=25+24=49$.",
        "Both roots are positive, so their sum is positive: $k=7$. The resulting polynomial factors as $(x-3)(x-4)$, confirming the condition.",
      ],
      answer: "7",
      takeaway: "A sign condition can select the valid answer after squaring.",
    },
  ],
  commonMistakes: [
    "Using $B/A$ for the root sum instead of $-B/A$.",
    "Writing $r^2+s^2=(r+s)^2$ and forgetting the cross term $2rs$.",
    "Taking reciprocals when a root could be zero, or ignoring a minus sign when reversing an odd number of factors.",
  ],
  exercises: [
    {
      id: "a1012-m02-l03-q1",
      role: "guided",
      kind: "numeric",
      difficulty: 5,
      question:
        "The roots of $x^2-9x+14=0$ are $r,s$. Find $r^3+s^3$ using their sum and product.",
      answer: "351",
      hints: [
        "Read the sum and product from the coefficients.",
        "Expand $(r+s)^3$ and group the mixed terms as $3rs(r+s)$.",
        "Evaluate $9^3-3\\cdot14\\cdot9$.",
      ],
      solutionSteps: [
        "The sum is $S=9$ and the product is $P=14$.",
        "The identity $r^3+s^3=S^3-3PS$ follows from expanding the cube.",
        "Thus the answer is $729-378=351$.",
      ],
    },
    {
      id: "a1012-m02-l03-q2",
      role: "guided",
      kind: "numeric",
      difficulty: 6,
      question: "The roots of $3x^2+6x-5=0$ are $u,v$. Find $1/u^2+1/v^2$.",
      answer: "66/25",
      hints: [
        "The product is nonzero, so reciprocals are defined.",
        "Write the target as $(u^2+v^2)/(uv)^2$.",
        "Use $S=-2$ and $P=-5/3$ in $(S^2-2P)/P^2$.",
      ],
      solutionSteps: [
        "Vieta gives $S=-2$ and $P=-5/3$.",
        "The numerator is $u^2+v^2=4+10/3=22/3$.",
        "The denominator is $P^2=25/9$, so the target is $(22/3)(9/25)=66/25$.",
      ],
    },
    {
      id: "a1012-m02-l03-q3",
      role: "independent",
      kind: "numeric",
      difficulty: 5,
      question: "If $r,s$ are the roots of $-4x^2+20x-7=0$, find $(r-1)(s-1)$.",
      answer: "-9/4",
      hints: [
        "The leading coefficient is negative; keep it in both coefficient ratios.",
        "Expand the target as $rs-(r+s)+1$.",
        "The sum is 5 and the product is $7/4$.",
      ],
      solutionSteps: [
        "The root sum is $-20/(-4)=5$ and the product is $(-7)/(-4)=7/4$.",
        "Expanding gives $(r-1)(s-1)=P-S+1$.",
        "Hence the value is $7/4-5+1=-9/4$.",
      ],
    },
    {
      id: "a1012-m02-l03-q4",
      role: "independent",
      kind: "numeric",
      difficulty: 6,
      question: "The roots of $x^2-6x+2=0$ are $a,b$. Find $a^4+b^4$.",
      answer: "1016",
      hints: [
        "First calculate $a^2+b^2$.",
        "Square that result, remembering the cross term $2a^2b^2$.",
        "Use $a^2+b^2=32$ and $a^2b^2=4$.",
      ],
      solutionSteps: [
        "Here $S=6$ and $P=2$, giving $a^2+b^2=36-4=32$.",
        "The squared product is $a^2b^2=P^2=4$.",
        "Therefore $a^4+b^4=(a^2+b^2)^2-2a^2b^2=1024-8=1016$.",
      ],
    },
    {
      id: "a1012-m02-l03-q5",
      role: "independent",
      kind: "numeric",
      difficulty: 6,
      question:
        "The two roots of $x^2-mx+18=0$ are positive, and one is three times the other. Find $m^2$.",
      answer: "96",
      hints: [
        "Call the smaller root $t$, making the other root $3t$.",
        "Their product determines $t^2$ without requiring a radical.",
        "Their sum is $4t=m$; square this relationship.",
      ],
      solutionSteps: [
        "The product condition is $t(3t)=18$, so $t^2=6$.",
        "The root sum is $t+3t=4t=m$.",
        "Squaring yields $m^2=16t^2=96$. Positivity selects $t=\\sqrt6$, which is consistent with both roots being positive.",
      ],
    },
    {
      id: "a1012-m02-l03-q6",
      role: "independent",
      kind: "mcq",
      difficulty: 6,
      question:
        "The roots of $x^2-5x+3=0$ are $r,s$. Which monic polynomial has roots $1/r$ and $1/s$?",
      choices: [
        "$x^2-5x+1/3$",
        "$x^2-(5/3)x+1/3$",
        "$x^2+(5/3)x+1/3$",
        "$x^2-(3/5)x+3$",
      ],
      answer: 1,
      hints: [
        "A monic quadratic is $x^2-(\\text{sum of roots})x+\\text{product of roots}$.",
        "The reciprocal root sum is $(r+s)/(rs)$.",
        "The new sum is $5/3$ and the new product is $1/3$.",
      ],
      solutionSteps: [
        "The original roots have sum 5 and product 3; neither root is zero.",
        "Their reciprocals have sum $5/3$ and product $1/3$.",
        "The required monic polynomial is $x^2-(5/3)x+1/3$.",
      ],
    },
  ],
  summary: [
    "Derive root relationships by expanding a factored polynomial.",
    "Translate symmetric expressions into a root sum and product before substituting numbers.",
    "Evaluate a polynomial directly when its factors match the requested shifted product.",
    "Check leading coefficients, signs, and nonzero or positivity conditions.",
  ],
  nextConnection:
    "The next module studies integer structure. The habit of replacing a complicated expression by its factors will help you organize divisors, test divisibility, and uncover restrictions on integer solutions.",
} satisfies CourseLesson;
