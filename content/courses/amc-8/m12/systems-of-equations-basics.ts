import type { CourseLesson } from "@/lib/courses/types";

export default {
  slug: "systems-of-equations-basics",
  intro:
    "Many word problems describe two unknown quantities linked by two separate conditions. Writing one equation per condition produces a system of equations, and two standard methods — substitution and elimination — turn that system into a single equation in one variable, which can then be solved directly.",
  sections: [
    {
      id: "a8-m12-l01-s1",
      title: "Turning a word problem into a system",
      body: [
        "A system of equations problem always has two unknown quantities and two independent pieces of information relating them. The first step is to name the unknowns with variables — for instance, letting $x$ and $y$ stand for the two numbers, ages, or prices described. The second step is to translate each condition, one sentence at a time, into an equation using those variables.",
        '"The sum of two numbers is 15" becomes $x+y=15$. "One number is twice the other" becomes $x=2y$. Each condition alone leaves both unknowns undetermined, but together the two equations pin down exactly one pair of values (in most well-posed problems). Writing both equations clearly before attempting to solve either one prevents combining information incorrectly.',
      ],
      keyIdea:
        "Assign a variable to each unknown, then translate each separate condition into its own equation.",
    },
    {
      id: "a8-m12-l01-s2",
      title: "Solving by substitution",
      body: [
        "Substitution works by isolating one variable in one equation, then replacing that variable everywhere it appears in the other equation. If $x=2y$, then wherever $x$ appears in the equation $x+y=15$, it can be replaced by $2y$, giving $2y+y=15$, an equation in $y$ alone. Solving gives $y=5$, and substituting back into $x=2y$ gives $x=10$.",
        "Substitution is most efficient when one equation already isolates a variable, or can be isolated with little work — for example, when one equation states that one quantity equals an expression in the other, as in age or ticket-count problems where one quantity is described directly in terms of another.",
      ],
      keyIdea:
        "Isolate one variable in one equation, then replace it in the other equation to reduce the system to one variable.",
    },
    {
      id: "a8-m12-l01-s3",
      title: "Solving by elimination",
      body: [
        "Elimination works by adding or subtracting the two equations (or multiples of them) so that one variable cancels out entirely. If $x+y=22$ and $x-y=6$, adding the two equations directly cancels $y$: $(x+y)+(x-y)=22+6$, giving $2x=28$, so $x=14$, and then $y=22-14=8$.",
        "When the variable to eliminate does not already have matching (or opposite) coefficients, multiply one or both equations by a constant first so that it does. Elimination is usually faster than substitution when both equations are already written in the same form, such as $ax+by=c$, since no variable needs to be isolated before combining the equations.",
      ],
      keyIdea:
        "Add or subtract the equations, scaling one or both first if needed, so that one variable's coefficients cancel.",
    },
  ],
  examples: [
    {
      id: "a8-m12-l01-ex1",
      title: "Two numbers, solved by substitution",
      problem:
        "The sum of two numbers is 15, and one number is twice the other. Find the larger number.",
      steps: [
        "Let the numbers be $x$ and $y$, with $x+y=15$ and $x=2y$.",
        "Substituting $x=2y$ into the first equation: $2y+y=15$, so $3y=15$ and $y=5$.",
        "Then $x=2y=2\\times5=10$, which is the larger number.",
      ],
      answer: "10",
      takeaway:
        "When one equation already isolates a variable in terms of the other, substitution reaches the answer in one replacement.",
    },
    {
      id: "a8-m12-l01-ex2",
      title: "Two numbers, solved by elimination",
      problem:
        "The sum of two numbers is 22, and their difference is 6. Find the smaller number.",
      steps: [
        "Let the numbers be $x$ and $y$ with $x>y$, so $x+y=22$ and $x-y=6$.",
        "Adding the two equations cancels $y$: $(x+y)+(x-y)=22+6$, giving $2x=28$ and $x=14$.",
        "The smaller number is $y=22-14=8$.",
      ],
      answer: "8",
      takeaway:
        "Adding a sum equation and a difference equation for the same two quantities always cancels the smaller quantity directly.",
    },
    {
      id: "a8-m12-l01-ex3",
      title: "A ticket-pricing word problem",
      problem:
        "Adult tickets cost 8 dollars each and child tickets cost 5 dollars each. Ella bought 10 tickets in total for 65 dollars. How many child tickets did she buy?",
      steps: [
        "Let $a$ be the number of adult tickets and $c$ the number of child tickets, so $a+c=10$ and $8a+5c=65$.",
        "From the first equation, $a=10-c$. Substituting into the second equation: $8(10-c)+5c=65$.",
        "Expanding gives $80-8c+5c=65$, so $80-3c=65$, meaning $3c=15$ and $c=5$.",
      ],
      answer: "5",
      takeaway:
        "A word problem with two quantities and two totals — a count and a cost — always translates into exactly one system of two equations.",
    },
  ],
  commonMistakes: [
    "Writing only one equation from a word problem when two separate conditions were actually given.",
    "Substituting an expression into the same equation it came from instead of into the other equation.",
    "Adding two equations to eliminate a variable when the coefficients only match after a required multiplication step.",
  ],
  exercises: [
    {
      id: "a8-m12-l01-q1",
      role: "guided",
      kind: "numeric",
      difficulty: 3,
      question:
        "The sum of two numbers is 20, and one number is 4 more than the other. Find the larger number.",
      answer: "12",
      hints: [
        "Let the smaller number be $y$, so the larger number is $y+4$.",
        "Write the sum condition as an equation in $y$ alone: $y+(y+4)=20$.",
        "Solve for $y$, then add 4 to find the larger number.",
      ],
      solutionSteps: [
        "Let the numbers be $y$ and $y+4$, so $y+(y+4)=20$.",
        "This simplifies to $2y+4=20$, so $2y=16$ and $y=8$.",
        "The larger number is $y+4=8+4=12$.",
      ],
    },
    {
      id: "a8-m12-l01-q2",
      role: "guided",
      kind: "numeric",
      difficulty: 3,
      question:
        "A basketball costs $x$ dollars and a soccer ball costs $y$ dollars. Two basketballs and three soccer balls cost 76 dollars. Two basketballs and one soccer ball cost 52 dollars. What is the cost of one soccer ball, in dollars?",
      answer: "12",
      hints: [
        "Write both conditions as equations: $2x+3y=76$ and $2x+y=52$.",
        "Both equations have the same coefficient of $x$, so subtracting one from the other eliminates $x$.",
        "Subtract the second equation from the first to solve for $y$ directly.",
      ],
      solutionSteps: [
        "The two conditions give $2x+3y=76$ and $2x+y=52$.",
        "Subtracting the second equation from the first cancels $x$: $(2x+3y)-(2x+y)=76-52$, giving $2y=24$.",
        "So $y=12$, meaning one soccer ball costs 12 dollars.",
      ],
    },
    {
      id: "a8-m12-l01-q3",
      role: "independent",
      kind: "numeric",
      difficulty: 4,
      question:
        "Ravi is 3 years older than twice his sister's age. The sum of their ages is 30. How old is Ravi?",
      answer: "21",
      hints: [
        "Let Ravi's age be $r$ and his sister's age be $s$, and translate \"3 years older than twice his sister's age\" into an equation.",
        "Substitute the expression for $r$ into the sum equation to get one equation in $s$.",
        "Solve for $s$ first, then use it to find $r$.",
      ],
      solutionSteps: [
        "Let $r$ be Ravi's age and $s$ his sister's age: $r=2s+3$ and $r+s=30$.",
        "Substituting $r=2s+3$ into the sum equation: $(2s+3)+s=30$, so $3s+3=30$ and $3s=27$, giving $s=9$.",
        "Ravi's age is $r=2(9)+3=21$.",
      ],
    },
    {
      id: "a8-m12-l01-q4",
      role: "independent",
      kind: "numeric",
      difficulty: 4,
      question:
        "A movie ticket costs $x$ dollars and a bag of popcorn costs $y$ dollars. Three movie tickets and two bags of popcorn cost 26 dollars. One movie ticket and one bag of popcorn cost 10 dollars. What is the cost of one movie ticket, in dollars?",
      answer: "6",
      hints: [
        "Write both conditions as equations: $3x+2y=26$ and $x+y=10$.",
        "Multiply the second equation by 2 so that its $y$ coefficient matches the first equation's.",
        "Subtract the scaled equation from the first to eliminate $y$ and solve for $x$.",
      ],
      solutionSteps: [
        "The two conditions give $3x+2y=26$ and $x+y=10$.",
        "Multiplying the second equation by 2 gives $2x+2y=20$.",
        "Subtracting this from the first equation cancels $y$: $(3x+2y)-(2x+2y)=26-20$, giving $x=6$.",
      ],
    },
    {
      id: "a8-m12-l01-q5",
      role: "independent",
      kind: "mcq",
      difficulty: 4,
      question:
        "Which pair of equations can be solved by elimination in a single addition or subtraction step, without first multiplying either equation by a constant?",
      choices: [
        "$x+2y=7$ and $3x-y=5$",
        "$2x+3y=12$ and $2x-y=4$",
        "$x+y=5$ and $2x+3y=11$",
        "$3x+y=9$ and $x+2y=8$",
      ],
      answer: 1,
      hints: [
        "Look for a pair of equations where one variable already has matching or exactly opposite coefficients.",
        "Check the coefficient of $x$ in each pair of equations.",
        "A matching coefficient of $x$ in both equations of a pair allows that variable to cancel by direct subtraction.",
      ],
      solutionSteps: [
        "In the second pair, $2x+3y=12$ and $2x-y=4$, the coefficient of $x$ is 2 in both equations.",
        "Subtracting the second equation from the first cancels $x$ immediately: $(2x+3y)-(2x-y)=12-4$.",
        "None of the other pairs share a matching coefficient for either variable without first scaling one equation.",
      ],
    },
    {
      id: "a8-m12-l01-q6",
      role: "independent",
      kind: "numeric",
      difficulty: 4,
      question:
        "The sum of two numbers is 50, and 3 times the smaller number equals the larger number minus 2. Find the smaller number.",
      answer: "12",
      hints: [
        "Let the smaller number be $s$ and the larger number be $L$, and write both conditions as equations.",
        "Solve the second equation for $L$ in terms of $s$.",
        "Substitute that expression into the sum equation to get one equation in $s$.",
      ],
      solutionSteps: [
        "Let $s$ and $L$ be the numbers, with $s+L=50$ and $3s=L-2$, so $L=3s+2$.",
        "Substituting into the sum equation: $s+(3s+2)=50$, giving $4s+2=50$ and $4s=48$.",
        "So $s=12$, the smaller number.",
      ],
    },
  ],
  summary: [
    "Translate each separate condition in a word problem into its own equation to build a system of two equations in two unknowns.",
    "Substitution isolates one variable and replaces it in the other equation; it works best when one equation already isolates a variable.",
    "Elimination adds or subtracts (possibly scaled) equations to cancel a variable directly; it works best when both equations share the same form.",
  ],
  nextConnection:
    "The next lesson extends these same tools to equations that need a clever substitution or an auxiliary variable before they fit this basic pattern.",
} satisfies CourseLesson;
