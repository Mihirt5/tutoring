import type { CourseLesson } from "@/lib/courses/types";

export default {
  slug: "rate-and-work",
  intro: "A rate compares a quantity to a unit of something else, most often time — pages per minute, miles per hour, or jobs per day. This lesson turns rates into a single reusable equation, amount equals rate times time, and shows how two separate work rates combine into one when people or machines work together.",
  sections: [
    {
      id: "a8-m11-l02-s1",
      title: "A rate is an amount per unit",
      body: [
        "A rate is a ratio where one of the two quantities is a fixed unit, usually a unit of time. \"A printer produces 25 pages per minute\" is a rate: 25 pages for every 1 minute. Because the denominator is fixed at 1 unit, a rate can be multiplied directly by however many units are actually involved to get a total amount, without first finding a scale factor the way a general ratio problem requires.",
        "Finding a rate from raw data means dividing the amount produced by the time it took: a machine that makes 150 pages in 6 minutes has a rate of $150\\div6=25$ pages per minute. This division step is essential whenever a rate is not stated outright but must be computed from a total amount and a total time first.",
      ],
      keyIdea: "A rate is amount divided by time; once known, it converts any amount of time directly into a total amount.",
    },
    {
      id: "a8-m11-l02-s2",
      title: "Combining work rates",
      body: [
        "When two workers or machines act on the same job at the same time, their rates add — but only when the rates are expressed as \"fraction of the job per unit of time,\" not as \"hours to finish the whole job.\" A painter who finishes a fence alone in 6 hours completes $\\frac{1}{6}$ of the fence every hour; a second painter who takes 3 hours alone completes $\\frac{1}{3}$ of the fence every hour. Working together, they complete $\\frac{1}{6}+\\frac{1}{3}=\\frac{1}{2}$ of the fence every hour.",
        "This combined rate is itself a rate, so it converts back into a total time the same way any rate does: if $\\frac{1}{2}$ of the job is completed every hour, the whole job (1 job) takes $1\\div\\frac{1}{2}=2$ hours. A common error is to average the two individual times instead of adding the rates — averaging $6$ and $3$ hours gives $4.5$, which is not the correct combined time.",
      ],
      keyIdea: "Convert each worker's time into a fraction-of-the-job-per-hour rate, add the rates, then invert the sum to get the combined time.",
    },
    {
      id: "a8-m11-l02-s3",
      title: "The rate-time-amount equation",
      body: [
        "Every rate problem, whether it involves distance, printing, or work, follows the same equation: $\\text{amount}=\\text{rate}\\times\\text{time}$. Depending on which two quantities a problem provides, this equation is solved for whichever one is missing — dividing amount by rate to find time, or dividing amount by time to find rate.",
        "This equation also handles partial completion: if a hose fills a pool at $\\frac{1}{8}$ of the pool per hour and runs for 3 hours, the amount filled is $\\frac{1}{8}\\times3=\\frac{3}{8}$ of the pool, leaving $1-\\frac{3}{8}=\\frac{5}{8}$ of the pool still empty. Watching for whether a question asks for the amount completed or the amount remaining is essential, since the two are complements of each other.",
      ],
      keyIdea: "Amount equals rate times time; solve for whichever quantity a problem leaves missing, and watch for completed-versus-remaining phrasing.",
    },
  ],
  examples: [
    {
      id: "a8-m11-l02-ex1",
      title: "Finding and using a rate",
      problem: "A printer prints 150 pages in 6 minutes. At that same rate, how many pages does it print in 10 minutes?",
      steps: [
        "First find the rate: $150\\div6=25$ pages per minute.",
        "Apply the rate to the new time using amount $=$ rate $\\times$ time.",
        "The amount is $25\\times10=250$ pages.",
      ],
      answer: "250",
      takeaway: "Compute the rate first when it is not given directly, then multiply by the requested time.",
    },
    {
      id: "a8-m11-l02-ex2",
      title: "Combining two work rates",
      problem: "Painter A can paint a fence alone in 6 hours. Painter B can paint the same fence alone in 3 hours. Working together at their same individual rates, how many hours will it take them to paint the fence?",
      steps: [
        "Painter A's rate is $\\frac{1}{6}$ of the fence per hour, and Painter B's rate is $\\frac{1}{3}$ of the fence per hour.",
        "Their combined rate is $\\frac{1}{6}+\\frac{1}{3}=\\frac{1}{6}+\\frac{2}{6}=\\frac{3}{6}=\\frac{1}{2}$ of the fence per hour.",
        "The combined time is $1\\div\\frac{1}{2}=2$ hours.",
      ],
      answer: "2",
      takeaway: "Add individual rates, not individual times, to find a combined work rate.",
    },
    {
      id: "a8-m11-l02-ex3",
      title: "Amount completed versus amount remaining",
      problem: "A hose fills a pool at a rate of $\\frac{1}{8}$ of the pool per hour. After the hose runs for 3 hours, what fraction of the pool remains empty?",
      steps: [
        "The amount filled after 3 hours is $\\frac{1}{8}\\times3=\\frac{3}{8}$ of the pool.",
        "The whole pool represents 1 full pool, so the remaining fraction is $1-\\frac{3}{8}$.",
        "This equals $\\frac{8}{8}-\\frac{3}{8}=\\frac{5}{8}$.",
      ],
      answer: "5/8",
      takeaway: "The amount remaining is the complement of the amount completed: subtract the completed fraction from 1.",
    },
  ],
  commonMistakes: [
    "Averaging two workers' individual completion times instead of adding their rates.",
    "Forgetting to invert a combined rate back into a time by dividing 1 by the rate.",
    "Answering with the amount completed when the problem asks for the amount remaining, or the reverse.",
  ],
  exercises: [
    {
      id: "a8-m11-l02-q1", role: "guided", kind: "numeric", difficulty: 3,
      question: "A factory machine produces 84 toys in 4 hours. At that same rate, how many toys does it produce in 7 hours?",
      answer: "147",
      hints: [
        "Find the machine's rate in toys per hour by dividing the amount by the time.",
        "Once the rate is known, multiply it by the new number of hours.",
        "Use amount equals rate times time with the new time of 7 hours.",
      ],
      solutionSteps: [
        "The machine's rate is $84\\div4=21$ toys per hour.",
        "Using amount equals rate times time with 7 hours: $21\\times7$.",
        "This gives $147$ toys.",
      ],
    },
    {
      id: "a8-m11-l02-q2", role: "guided", kind: "numeric", difficulty: 3,
      question: "Hose A can fill a tank alone in 10 hours. Hose B can fill the same tank alone in 15 hours. If both hoses run together, how many hours will it take to fill the tank?",
      answer: "6",
      hints: [
        "Write each hose's rate as a fraction of the tank per hour.",
        "Add the two rates together using a common denominator.",
        "Invert the combined rate to find the combined time.",
      ],
      solutionSteps: [
        "Hose A's rate is $\\frac{1}{10}$ and Hose B's rate is $\\frac{1}{15}$ of the tank per hour.",
        "Using a common denominator of 30: $\\frac{3}{30}+\\frac{2}{30}=\\frac{5}{30}=\\frac{1}{6}$ of the tank per hour.",
        "The combined time is $1\\div\\frac{1}{6}=6$ hours.",
      ],
    },
    {
      id: "a8-m11-l02-q3", role: "independent", kind: "numeric", difficulty: 4,
      question: "Working alone, Mia can mow a lawn in 4 hours, and Noah can mow the same lawn in 6 hours. If they work together at their same individual rates, how many hours will it take them to mow the lawn?",
      answer: "12/5",
      hints: [
        "Write Mia's and Noah's rates as fractions of the lawn per hour.",
        "Add the two rates using a common denominator of 12.",
        "Invert the combined rate to find the combined time.",
      ],
      solutionSteps: [
        "Mia's rate is $\\frac{1}{4}$ and Noah's rate is $\\frac{1}{6}$ of the lawn per hour.",
        "Adding with a common denominator of 12: $\\frac{3}{12}+\\frac{2}{12}=\\frac{5}{12}$ of the lawn per hour.",
        "The combined time is $1\\div\\frac{5}{12}=\\frac{12}{5}$ hours.",
      ],
    },
    {
      id: "a8-m11-l02-q4", role: "independent", kind: "numeric", difficulty: 4,
      question: "A pipe fills a pool at a rate of $\\frac{1}{12}$ of the pool per hour. Working alone at this constant rate, how many hours does it take the pipe to fill $\\frac{3}{4}$ of the pool?",
      answer: "9",
      hints: [
        "Use amount equals rate times time, where the amount is $\\frac{3}{4}$ of the pool.",
        "Solve for time by dividing the amount by the rate.",
        "Dividing by a fraction means multiplying by its reciprocal.",
      ],
      solutionSteps: [
        "From amount $=$ rate $\\times$ time, the time is $\\frac{3}{4}\\div\\frac{1}{12}$.",
        "Dividing by $\\frac{1}{12}$ is the same as multiplying by 12: $\\frac{3}{4}\\times12$.",
        "This equals $9$ hours.",
      ],
    },
    {
      id: "a8-m11-l02-q5", role: "independent", kind: "mcq", difficulty: 3,
      question: "A car travels at a constant rate of 50 miles per hour. Which expression gives the distance, in miles, traveled after $t$ hours?",
      choices: ["$50+t$", "$50t$", "$50/t$", "$t/50$"],
      answer: 1,
      hints: [
        "Recall the general rate-time-amount equation.",
        "The amount here is distance, the rate is 50 miles per hour, and the time is $t$.",
        "Amount equals rate multiplied by time, not added or divided.",
      ],
      solutionSteps: [
        "The rate-time-amount equation states amount $=$ rate $\\times$ time.",
        "Substituting the given rate of 50 miles per hour and time $t$ gives distance $=50\\times t$.",
        "This matches the expression $50t$.",
      ],
    },
    {
      id: "a8-m11-l02-q6", role: "independent", kind: "numeric", difficulty: 5,
      question: "Working together, pump A and pump B can drain a tank in 5 hours. Pump A alone can drain the tank in 15 hours. How many hours would it take pump B alone to drain the tank?",
      answer: "15/2",
      hints: [
        "The combined rate of both pumps is $\\frac{1}{5}$ of the tank per hour.",
        "Pump A's individual rate is $\\frac{1}{15}$ of the tank per hour.",
        "Subtract pump A's rate from the combined rate to find pump B's rate, then invert it.",
      ],
      solutionSteps: [
        "The combined rate is $\\frac{1}{5}$, and pump A's rate is $\\frac{1}{15}$, both in tanks per hour.",
        "Pump B's rate is the difference: $\\frac{1}{5}-\\frac{1}{15}=\\frac{3}{15}-\\frac{1}{15}=\\frac{2}{15}$ of the tank per hour.",
        "Pump B's time alone is $1\\div\\frac{2}{15}=\\frac{15}{2}$ hours.",
      ],
    },
  ],
  summary: [
    "A rate is an amount divided by a unit of time, and it converts directly into a total amount by multiplying by any number of units.",
    "Combine work rates by adding fractions of the job completed per unit of time, never by averaging completion times, then invert the sum for the combined time.",
    "Use amount equals rate times time to solve for whichever quantity is missing, and watch for whether a question asks for the amount completed or the amount remaining.",
  ],
  nextConnection: "The next module builds equations directly from situations like these — the algebra needed to set up and solve for an unknown rate, time, or amount using systems of equations.",
} satisfies CourseLesson;
