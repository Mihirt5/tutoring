import type { CourseLesson } from "@/lib/courses/types";

export default {
  slug: "advanced-equation-solving",
  intro:
    "Some equations resist the direct substitution-or-elimination approach from the previous lesson, but reveal a shortcut once a repeated expression is treated as its own quantity or once two equations are combined cleverly instead of solved variable by variable. This lesson builds the habit of looking for that shortcut, and of checking any answer against every condition in the original problem before trusting it.",
  sections: [
    {
      id: "a8-m12-l02-s1",
      title: "Combining equations without solving for every variable",
      body: [
        "Not every system needs to be solved all the way down to individual variables. If a question only asks for $x+y$, and adding the two given equations directly produces a multiple of $x+y$, there is no need to find $x$ and $y$ separately first. For instance, given $2x+3y=12$ and $3x+2y=13$, adding both equations gives $5x+5y=25$, and dividing by 5 gives $x+y=5$ immediately — without ever finding $x$ or $y$ individually.",
        "Recognizing this shortcut means checking, before grinding through a full solve, whether the requested quantity already matches some combination (a sum, a difference, or a scaled combination) of the given equations added or subtracted together.",
      ],
      keyIdea:
        "Before solving for every variable, check whether adding or subtracting the given equations directly produces the requested quantity.",
    },
    {
      id: "a8-m12-l02-s2",
      title: "Introducing an auxiliary variable",
      body: [
        'When the same expression, such as a sum $x+y$, appears repeatedly inside a problem, it is often easier to name that expression with a single new variable and solve for it directly, rather than expanding everything back into $x$ and $y$. For a problem like "three times the sum of two numbers is 18 more than twice the sum of the same two numbers," letting $s=x+y$ turns the sentence into $3s=2s+18$, which solves immediately to $s=18$ — the individual values of $x$ and $y$ are never needed.',
        "This same idea extends to systems of three equations in three unknowns that each pair two of the variables, such as $x+y=11$, $y+z=15$, and $x+z=14$. Adding all three equations counts every variable exactly twice, giving $2(x+y+z)=40$, so $x+y+z=20$ — a single addition that finds the total sum instantly, even though no individual equation mentions all three variables at once.",
      ],
      keyIdea:
        "Name a repeated or requested expression as its own variable, and solve for that expression directly instead of expanding it back into its parts.",
    },
    {
      id: "a8-m12-l02-s3",
      title: "Verifying against every original condition",
      body: [
        "An algebraic shortcut can silently drop information: adding two equations, for example, can only recover $x+y$, not $x$ and $y$ separately, and squaring both sides of an equation can introduce solutions that do not actually satisfy the original statement. Any time a shortcut is used, the final answer should be checked directly against every sentence in the original problem, not just against the combined equation that produced it.",
        'For a system with a sum and a product, such as "two positive numbers have a sum of 12 and a product of 35," the identity $(x-y)^2=(x+y)^2-4xy$ gives the positive difference between the numbers without solving a quadratic: $(x-y)^2=12^2-4(35)=144-140=4$, so the difference is 2. Checking against the original conditions confirms this: the actual numbers are 5 and 7, since $5+7=12$ and $5\\times7=35$, and their difference is indeed $7-5=2$.',
      ],
      keyIdea:
        "After using a shortcut or identity, confirm the final answer satisfies every original condition in the problem, not just the combined equation used to find it.",
    },
  ],
  examples: [
    {
      id: "a8-m12-l02-ex1",
      title: "Finding a sum without finding either variable",
      problem: "If $2x+3y=12$ and $3x+2y=13$, find the value of $x+y$.",
      steps: [
        "Adding the two equations directly: $(2x+3y)+(3x+2y)=12+13$.",
        "The left side simplifies to $5x+5y=25$.",
        "Dividing both sides by 5 gives $x+y=5$, without ever solving for $x$ or $y$ individually.",
      ],
      answer: "5",
      takeaway:
        "When the requested quantity is a multiple of the sum of the two equations' left sides, add the equations directly instead of solving for each variable.",
    },
    {
      id: "a8-m12-l02-ex2",
      title: "An auxiliary variable for a repeated sum",
      problem:
        "Three times the sum of two numbers is 18 more than twice the sum of the same two numbers. Find the sum of the two numbers.",
      steps: [
        'Let $s$ stand for the sum of the two numbers, so "three times the sum" is $3s$ and "twice the sum" is $2s$.',
        "The sentence translates to $3s=2s+18$.",
        "Subtracting $2s$ from both sides gives $s=18$, which is the sum of the two numbers — their individual values were never needed.",
      ],
      answer: "18",
      takeaway:
        "Naming a repeated expression with a single variable turns a wordy sentence into a one-step equation.",
    },
    {
      id: "a8-m12-l02-ex3",
      title: "Sum and product, verified against both conditions",
      problem:
        "Two positive numbers have a sum of 12 and a product of 35. Find the positive difference between the two numbers.",
      steps: [
        "Using the identity $(x-y)^2=(x+y)^2-4xy$ with $x+y=12$ and $xy=35$: $(x-y)^2=12^2-4(35)=144-140=4$.",
        "Taking the positive square root gives $x-y=2$.",
        "Checking against both original conditions: the numbers 5 and 7 satisfy $5+7=12$ and $5\\times7=35$, and their difference is $7-5=2$, confirming the answer.",
      ],
      answer: "2",
      takeaway:
        "The identity $(x-y)^2=(x+y)^2-4xy$ finds a difference from a sum and a product without solving a quadratic, but the result should still be checked against both original conditions.",
    },
  ],
  commonMistakes: [
    "Solving fully for every individual variable even when the problem only asks for a combination, such as a sum, that a shortcut would give directly.",
    "Forgetting to check a shortcut answer against every original condition, especially after squaring or using an identity that can hide information.",
    "Introducing an auxiliary variable but then accidentally solving for one of the original variables instead of the auxiliary quantity the problem actually asked for.",
  ],
  exercises: [
    {
      id: "a8-m12-l02-q1",
      role: "guided",
      kind: "numeric",
      difficulty: 4,
      question: "If $4x+5y=39$ and $5x+4y=33$, find the value of $x+y$.",
      answer: "8",
      hints: [
        "Try adding the two equations directly rather than solving for $x$ and $y$ separately.",
        "Adding the left sides gives $9x+9y$, a multiple of $x+y$.",
        "Divide the sum of the right sides by 9 to isolate $x+y$.",
      ],
      solutionSteps: [
        "Adding the equations: $(4x+5y)+(5x+4y)=39+33$, giving $9x+9y=72$.",
        "Dividing both sides by 9 gives $x+y=8$.",
        "Checking: $x=1$ and $y=7$ satisfy both original equations ($4(1)+5(7)=39$ and $5(1)+4(7)=33$), and $1+7=8$.",
      ],
    },
    {
      id: "a8-m12-l02-q2",
      role: "guided",
      kind: "numeric",
      difficulty: 4,
      question:
        "Four times the sum of two numbers equals 21 more than the sum itself. Find the sum of the two numbers.",
      answer: "7",
      hints: [
        "Let $s$ represent the sum of the two numbers.",
        "Translate the sentence directly into an equation using $s$ on both sides.",
        "Solve the resulting one-variable equation for $s$.",
      ],
      solutionSteps: [
        "Let $s$ be the sum of the two numbers, so the sentence becomes $4s=s+21$.",
        "Subtracting $s$ from both sides gives $3s=21$.",
        "Dividing by 3 gives $s=7$, the sum of the two numbers.",
      ],
    },
    {
      id: "a8-m12-l02-q3",
      role: "independent",
      kind: "numeric",
      difficulty: 5,
      question:
        "Two positive numbers have a sum of 15 and a product of 44. Find the positive difference between the two numbers.",
      answer: "7",
      hints: [
        "Use the identity $(x-y)^2=(x+y)^2-4xy$ with the given sum and product.",
        "Substitute the sum and product into the identity and simplify.",
        "Take the positive square root to find the difference, then verify against both original conditions.",
      ],
      solutionSteps: [
        "Using $(x-y)^2=(x+y)^2-4xy$ with $x+y=15$ and $xy=44$: $(x-y)^2=15^2-4(44)=225-176=49$.",
        "Taking the positive square root gives $x-y=7$.",
        "Checking: the numbers 4 and 11 satisfy $4+11=15$ and $4\\times11=44$, with difference $11-4=7$.",
      ],
    },
    {
      id: "a8-m12-l02-q4",
      role: "independent",
      kind: "numeric",
      difficulty: 5,
      question: "If $3a+2b=27$ and $2a+3b=28$, find the value of $a+b$.",
      answer: "11",
      hints: [
        "Add the two equations directly instead of solving for $a$ and $b$ separately.",
        "The sum of the left sides is a multiple of $a+b$.",
        "Divide the sum of the right sides by that same multiple.",
      ],
      solutionSteps: [
        "Adding the equations: $(3a+2b)+(2a+3b)=27+28$, giving $5a+5b=55$.",
        "Dividing both sides by 5 gives $a+b=11$.",
        "Checking: $a=5$ and $b=6$ satisfy both original equations ($3(5)+2(6)=27$ and $2(5)+3(6)=28$), and $5+6=11$.",
      ],
    },
    {
      id: "a8-m12-l02-q5",
      role: "independent",
      kind: "mcq",
      difficulty: 4,
      question:
        "A problem states that $3(x+y)-2=16$. What is the most efficient first step to find the value of $x+y$?",
      choices: [
        "Solve for $x$ first, then for $y$",
        "Let $s=x+y$ and solve $3s-2=16$ for $s$",
        "Guess and check integer values of $x$ and $y$",
        "Square both sides of the equation",
      ],
      answer: 1,
      hints: [
        "The equation involves the expression $x+y$ as a single repeated unit, not $x$ and $y$ separately.",
        "Naming that unit with a new variable turns the equation into a simple one-variable equation.",
        "There is no need to find individual values when only the combined expression is requested.",
      ],
      solutionSteps: [
        "The equation only ever uses the combination $x+y$, never $x$ or $y$ alone, so there is not enough information to find them individually.",
        "Letting $s=x+y$ turns the equation into $3s-2=16$, a simple one-variable equation.",
        "This solves directly to $s=6$, which is the value of $x+y$ that the problem actually asks for.",
      ],
    },
    {
      id: "a8-m12-l02-q6",
      role: "independent",
      kind: "numeric",
      difficulty: 5,
      question:
        "Given $x+y=11$, $y+z=15$, and $x+z=14$, find the value of $x+y+z$.",
      answer: "20",
      hints: [
        "Add all three equations together at once.",
        "Notice that each variable appears in exactly two of the three equations, so it is counted exactly twice in the sum.",
        "Divide the total by 2 to find $x+y+z$.",
      ],
      solutionSteps: [
        "Adding all three equations: $(x+y)+(y+z)+(x+z)=11+15+14$, giving $2x+2y+2z=40$.",
        "Dividing both sides by 2 gives $x+y+z=20$.",
        "Checking: $x=5$, $y=6$, $z=9$ satisfy all three original equations, and $5+6+9=20$.",
      ],
    },
  ],
  summary: [
    "Before solving a system variable by variable, check whether adding or subtracting the equations directly produces the requested quantity.",
    "Name a repeated or requested expression with a single auxiliary variable, and solve for that expression instead of expanding it back into its parts.",
    "Always verify a shortcut's final answer against every original condition in the problem, since combining equations can hide whether individual values actually exist.",
  ],
  nextConnection:
    "The next lesson applies these same techniques to full word problems, where the challenge shifts from manipulating given equations to first choosing which quantities to name as variables.",
} satisfies CourseLesson;
