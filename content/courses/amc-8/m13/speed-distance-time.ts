import type { CourseLesson } from "@/lib/courses/types";

export default {
  slug: "speed-distance-time",
  intro:
    "Distance, speed, and time are linked by a single equation, distance equals speed times time, but contest problems rarely hand that equation to you directly. Multi-leg trips hide a tempting shortcut that gives the wrong average speed, and problems about two moving objects require combining their speeds correctly depending on whether they move toward, apart from, or after one another.",
  sections: [
    {
      id: "a8-m13-l01-s1",
      title: "The distance-speed-time equation",
      body: [
        "The core relationship is $\\text{distance}=\\text{speed}\\times\\text{time}$, and it rearranges to solve for whichever quantity is missing: $\\text{time}=\\frac{\\text{distance}}{\\text{speed}}$ or $\\text{speed}=\\frac{\\text{distance}}{\\text{time}}$. Before using this equation, check that the units match — a speed given in miles per hour should be multiplied by a time in hours, not minutes, or the result will be off by a factor of 60.",
        "A constant speed makes this equation apply directly to the whole trip. Most contest problems, however, involve more than one leg of travel or more than one moving object, which is where the equation must be applied piece by piece rather than all at once.",
      ],
      keyIdea:
        "Distance equals speed times time; rearrange for time or speed as needed, and always match units before multiplying.",
    },
    {
      id: "a8-m13-l01-s2",
      title: "Average speed over multiple legs",
      body: [
        "Average speed for an entire trip is always $\\frac{\\text{total distance}}{\\text{total time}}$ — it is not the simple average of the individual speeds unless each leg takes exactly the same amount of time. A car that travels 60 miles at 30 mph and then another 60 miles at 60 mph spends 2 hours on the first leg and only 1 hour on the second, for a total of 120 miles in 3 hours, giving an average speed of $40$ mph — not the simple average of 30 and 60, which would incorrectly give 45.",
        "The reason the simple average fails is that more time is spent traveling at the slower speed whenever the distances (rather than the times) are equal, which pulls the true average speed below the midpoint of the two speeds. Always compute the time for each leg separately, add the distances and the times separately, and only then divide.",
      ],
      keyIdea:
        "Average speed is total distance divided by total time, never the simple average of two speeds unless the times are equal.",
    },
    {
      id: "a8-m13-l01-s3",
      title: "Meeting and catch-up problems",
      body: [
        "When two objects travel toward each other starting some distance apart, the gap between them closes at the sum of their two speeds, since both objects are contributing to closing the same distance. Two trains 300 miles apart, closing at 40 mph and 60 mph, close the gap at a combined $40+60=100$ mph, meeting after $300\\div100=3$ hours.",
        "When one object chases another moving in the same direction, the gap between them changes at the difference of their speeds, since the faster one only gains ground at the rate by which it outpaces the slower one. If the chasing object also starts later or further behind, that starting gap is treated exactly like the distance in a normal distance-speed-time problem, using the difference of the two speeds as the effective closing speed.",
      ],
      keyIdea:
        "Objects moving toward each other close the gap at the sum of their speeds; a chaser gains on a target moving the same direction at the difference of their speeds.",
    },
  ],
  examples: [
    {
      id: "a8-m13-l01-ex1",
      title: "A direct application of distance equals speed times time",
      problem:
        "A cyclist travels at a constant speed of 15 miles per hour for 3 hours. How far does the cyclist travel?",
      steps: [
        "The units already match: miles per hour and hours.",
        "Apply the equation directly: distance $=$ speed $\\times$ time.",
        "This gives $15\\times3=45$ miles.",
      ],
      answer: "45",
      takeaway:
        "When the speed is constant and the units already match, the distance-speed-time equation applies in a single multiplication.",
    },
    {
      id: "a8-m13-l01-ex2",
      title: "Average speed is not the simple average",
      problem:
        "A car travels 60 miles at 30 miles per hour, then another 60 miles at 60 miles per hour. What is the car's average speed, in miles per hour, for the entire trip?",
      steps: [
        "The first leg takes $60\\div30=2$ hours, and the second leg takes $60\\div60=1$ hour.",
        "The total distance is $60+60=120$ miles, and the total time is $2+1=3$ hours.",
        "The average speed is $\\frac{120}{3}=40$ miles per hour.",
      ],
      answer: "40",
      takeaway:
        "Compute total distance and total time separately before dividing; the simple average of the two speeds, 45, is not the correct average speed here.",
    },
    {
      id: "a8-m13-l01-ex3",
      title: "A meeting problem",
      problem:
        "Two trains start 300 miles apart and travel toward each other, one at 40 miles per hour and the other at 60 miles per hour. How many hours until they meet?",
      steps: [
        "Since the trains move toward each other, their combined closing speed is $40+60=100$ miles per hour.",
        "The full 300-mile gap must close at this combined speed.",
        "The time to meet is $300\\div100=3$ hours.",
      ],
      answer: "3",
      takeaway:
        "Two objects moving toward each other close their gap at the sum of their individual speeds.",
    },
  ],
  commonMistakes: [
    "Averaging two speeds directly instead of computing total distance divided by total time.",
    "Adding two speeds for a catch-up problem instead of subtracting them, or the reverse for a meeting problem.",
    "Mixing time units, such as multiplying a speed in miles per hour by a time given in minutes without converting first.",
  ],
  exercises: [
    {
      id: "a8-m13-l01-q1",
      role: "guided",
      kind: "numeric",
      difficulty: 3,
      question:
        "A car starts 20 miles ahead of a motorcycle, both traveling in the same direction. The car travels at 40 miles per hour and the motorcycle travels at 60 miles per hour. How many hours does it take the motorcycle to catch up to the car?",
      answer: "1",
      hints: [
        "Since both vehicles move in the same direction, the motorcycle gains ground at the difference of the two speeds.",
        "Find that difference in speeds first.",
        "Divide the 20-mile starting gap by the difference in speeds.",
      ],
      solutionSteps: [
        "The motorcycle gains on the car at a rate of $60-40=20$ miles per hour.",
        "The starting gap to close is 20 miles.",
        "The time to catch up is $20\\div20=1$ hour.",
      ],
    },
    {
      id: "a8-m13-l01-q2",
      role: "guided",
      kind: "numeric",
      difficulty: 3,
      question:
        "A runner covers 10 miles at a constant speed of 8 miles per hour. How many hours does the run take?",
      answer: "5/4",
      hints: [
        "Rearrange the distance-speed-time equation to solve for time.",
        "Divide the distance by the speed.",
        "Simplify the resulting fraction.",
      ],
      solutionSteps: [
        "Time equals distance divided by speed: $\\text{time}=\\frac{10}{8}$.",
        "Simplifying the fraction $\\frac{10}{8}$ gives $\\frac{5}{4}$.",
        "The run takes $\\frac{5}{4}$ hours.",
      ],
    },
    {
      id: "a8-m13-l01-q3",
      role: "independent",
      kind: "numeric",
      difficulty: 4,
      question:
        "A hiker walks 8 miles in 2 hours, then jogs 9 miles in 1 hour. What is the hiker's average speed, in miles per hour, for the entire trip?",
      answer: "17/3",
      hints: [
        "Add the two distances together to find the total distance.",
        "Add the two times together to find the total time.",
        "Divide the total distance by the total time.",
      ],
      solutionSteps: [
        "The total distance is $8+9=17$ miles.",
        "The total time is $2+1=3$ hours.",
        "The average speed is $\\frac{17}{3}$ miles per hour.",
      ],
    },
    {
      id: "a8-m13-l01-q4",
      role: "independent",
      kind: "numeric",
      difficulty: 4,
      question:
        "Two cyclists start 150 miles apart and ride toward each other, one at 25 miles per hour and the other at 35 miles per hour. How many hours until they meet?",
      answer: "5/2",
      hints: [
        "Since the cyclists move toward each other, their gap closes at the sum of their speeds.",
        "Add the two speeds together.",
        "Divide the starting distance by that combined speed.",
      ],
      solutionSteps: [
        "The combined closing speed is $25+35=60$ miles per hour.",
        "The starting gap is 150 miles.",
        "The time to meet is $150\\div60=\\frac{5}{2}$ hours.",
      ],
    },
    {
      id: "a8-m13-l01-q5",
      role: "independent",
      kind: "mcq",
      difficulty: 4,
      question:
        "A car travels the first half of a trip (by distance) at 40 miles per hour and the second half (an equal distance) at 60 miles per hour. Which statement is true about the car's average speed for the whole trip?",
      choices: [
        "It equals 50 mph, the average of the two speeds",
        "It is less than 50 mph, since more time is spent at the slower speed",
        "It is greater than 50 mph, since more time is spent at the faster speed",
        "It cannot be determined without knowing the total distance",
      ],
      answer: 1,
      hints: [
        "Try picking a convenient total distance, such as 120 miles split into two 60-mile halves, and compute the actual average speed.",
        "Find the time spent on each half separately, since the halves are equal in distance, not in time.",
        "Compare the time spent at 40 mph to the time spent at 60 mph.",
      ],
      solutionSteps: [
        "Using a sample distance of 60 miles per half: the first half takes $60\\div40=1.5$ hours, and the second half takes $60\\div60=1$ hour.",
        "The total distance is 120 miles and the total time is $1.5+1=2.5$ hours, giving an average speed of $120\\div2.5=48$ mph.",
        "This result, 48 mph, holds for any total distance (the distance cancels out) and is less than 50 mph, because more time is spent traveling at the slower 40 mph speed.",
      ],
    },
    {
      id: "a8-m13-l01-q6",
      role: "independent",
      kind: "numeric",
      difficulty: 5,
      question:
        "Two cars leave the same point traveling in the same direction. Car A leaves first at a constant 50 miles per hour. Car B leaves 1 hour later at a constant 70 miles per hour. How many hours after Car B leaves does Car B catch up to Car A?",
      answer: "5/2",
      hints: [
        "Find how far ahead Car A already is by the time Car B starts moving.",
        "From that moment, Car B gains on Car A at the difference of their speeds.",
        "Divide the starting gap by that difference in speeds.",
      ],
      solutionSteps: [
        "By the time Car B starts, Car A has already traveled $50\\times1=50$ miles.",
        "From that point on, Car B gains ground at $70-50=20$ miles per hour.",
        "The time for Car B to close the 50-mile gap is $50\\div20=\\frac{5}{2}$ hours after Car B leaves.",
      ],
    },
  ],
  summary: [
    "Distance equals speed times time; rearrange this equation to solve for time or speed, always matching units first.",
    "Average speed for a multi-leg trip is total distance divided by total time, not the simple average of the individual speeds.",
    "Two objects moving toward each other close their gap at the sum of their speeds; a chaser gains on a target moving the same direction at the difference of their speeds.",
  ],
  nextConnection:
    "Distance problems often ask for a term in an evenly spaced sequence of positions or times — the next module builds the formulas for arithmetic and geometric sequences that handle exactly this kind of pattern.",
} satisfies CourseLesson;
