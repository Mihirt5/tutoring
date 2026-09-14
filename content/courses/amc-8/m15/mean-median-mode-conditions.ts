import type { CourseLesson } from "@/lib/courses/types";

export default {
  slug: "mean-median-mode-conditions",
  intro: "Instead of computing a mean, median, or mode from a complete data set, many contest problems give the statistic and ask for a missing value. This runs each definition backward: the mean gives a direct equation for a missing sum, but the median depends on sorted position, which sometimes must be figured out rather than assumed — and every candidate answer should be checked against every condition the problem states.",
  sections: [
    {
      id: "a8-m15-l02-s1",
      title: "Working backward from the mean",
      body: [
        "Since the mean is the sum divided by the count, a known mean and count immediately give the total sum: $\\text{sum}=\\text{mean}\\times\\text{count}$. If all but one value in the data set are known, subtracting their total from this required sum finds the missing value directly. Five numbers with a mean of 20 must have a sum of $20\\times5=100$; if four of them are known, the fifth is simply 100 minus their total.",
        "This same idea extends to problems with more than one missing value, as long as enough other information (from a median or mode condition, for instance) is available to pin down the remaining unknowns.",
      ],
      keyIdea: "A known mean and count give the total sum directly; subtract the known values to find a single missing one.",
    },
    {
      id: "a8-m15-l02-s2",
      title: "Working backward from the median: position matters",
      body: [
        "Unlike the mean, the median depends on where a value lands once the data is sorted — so an unknown value's position is not always obvious in advance. If a data set is $4,9,x,15$ with $x>9$ and a stated median of 11, the position of $x$ relative to 15 must be figured out, not assumed. Trying the natural guess that $x$ falls between 9 and 15 gives sorted order $4,9,x,15$, so the median is the average of the two middle values: $\\frac{9+x}{2}=11$, giving $x=13$ — which indeed satisfies $9<13<15$, confirming the assumed order was correct.",
        "If solving under an assumed order produces a value that does not actually fit that order (for example, solving under \"$x$ is between 9 and 15\" but getting an $x$ greater than 15), that case must be discarded and a different ordering tried instead. This is why every solution to a median-backward problem needs a quick check that the found value actually belongs where it was assumed to be.",
      ],
      keyIdea: "Assume an ordering for the unknown value, solve for it, and then confirm the value actually fits that assumed ordering.",
    },
    {
      id: "a8-m15-l02-s3",
      title: "Combining multiple conditions and checking every one",
      body: [
        "A single problem often states more than one statistical condition at once — a mean and a mode, or a mean and a median — and each condition contributes its own piece of information toward the unknowns. Solving typically means using whichever condition gives the most direct equation first, then checking that the resulting values are also consistent with every other stated condition, not just the one used to solve for them.",
        "For a data set $3,5,5,8,12,x$ with mean 7, the mean gives $x=6(7)-(3+5+5+8+12)=42-33=9$ directly. Since the problem's data already has a repeated value, 5, it is worth checking that $x=9$ does not accidentally tie or change that mode — sorting the full set $3,5,5,8,9,12$ confirms 5 is still the unique mode, so the answer is consistent with every condition, not just the mean.",
      ],
      keyIdea: "Use the most direct condition to solve for an unknown, then verify the result against every other condition stated in the problem.",
    },
  ],
  examples: [
    {
      id: "a8-m15-l02-ex1",
      title: "Working backward from the mean",
      problem: "Five numbers have a mean of 20. Four of them are 15, 18, 22, and 25. Find the fifth number.",
      steps: [
        "Since the mean is 20 and there are 5 numbers, the total sum must be $20\\times5=100$.",
        "The sum of the four known numbers is $15+18+22+25=80$.",
        "The fifth number is $100-80=20$.",
      ],
      answer: "20",
      takeaway: "A known mean and count give the required total sum directly; the missing value is whatever completes that sum.",
    },
    {
      id: "a8-m15-l02-ex2",
      title: "Working backward from the median, with a position check",
      problem: "A data set consists of $4, 9, 15$, and a fourth value $x$, where $x>9$. If the median of the data set is 11, find $x$.",
      steps: [
        "Assuming $x$ falls between 9 and 15, the sorted order is $4,9,x,15$, so the median is $\\frac{9+x}{2}$.",
        "Setting this equal to 11: $\\frac{9+x}{2}=11$, so $9+x=22$ and $x=13$.",
        "Checking the assumed order: since $9<13<15$, the value $x=13$ does belong between 9 and 15, confirming the assumption was correct.",
      ],
      answer: "13",
      takeaway: "Solving for an unknown median value requires assuming an order, solving, and then confirming the result actually fits that order.",
    },
    {
      id: "a8-m15-l02-ex3",
      title: "Combining a mean condition with a mode check",
      problem: "A data set has six values: $3, 5, 5, 8, 12$, and $x$. The mean of the data set is 7. Find $x$.",
      steps: [
        "Since the mean is 7 and there are 6 values, the total sum must be $7\\times6=42$.",
        "The sum of the five known values is $3+5+5+8+12=33$, so $x=42-33=9$.",
        "Checking the mode: the full sorted data set $3,5,5,8,9,12$ still has 5 as its unique mode, so $x=9$ is consistent with the data set's existing repeated value.",
      ],
      answer: "9",
      takeaway: "After solving for an unknown from one condition, check that the result does not conflict with any other feature of the data set.",
    },
  ],
  commonMistakes: [
    "Solving a median-backward problem under an assumed order without checking that the resulting value actually satisfies that order.",
    "Using the mode or median formula in place of the mean formula (or the reverse) when working backward for a missing value.",
    "Solving for a missing value from one stated condition and reporting it without checking that it is also consistent with every other condition given in the problem.",
  ],
  exercises: [
    {
      id: "a8-m15-l02-q1", role: "guided", kind: "numeric", difficulty: 3,
      question: "Four numbers have a mean of 15. Three of them are 10, 14, and 20. Find the fourth number.",
      answer: "16",
      hints: [
        "Use the mean and the count of numbers to find the required total sum.",
        "Add the three known numbers together.",
        "Subtract that sum from the required total to find the fourth number.",
      ],
      solutionSteps: [
        "Since the mean is 15 and there are 4 numbers, the total sum must be $15\\times4=60$.",
        "The sum of the three known numbers is $10+14+20=44$.",
        "The fourth number is $60-44=16$.",
      ],
    },
    {
      id: "a8-m15-l02-q2", role: "guided", kind: "numeric", difficulty: 4,
      question: "A data set consists of $2, 6, x, 13$, where $6<x<13$, and has median 9. Find $x$.",
      answer: "12",
      hints: [
        "Since $6<x<13$, the sorted order of the data set is $2,6,x,13$.",
        "With 4 values, the median is the average of the two middle values, 6 and $x$.",
        "Set this average equal to 9 and solve for $x$.",
      ],
      solutionSteps: [
        "Because $6<x<13$, the sorted order is $2,6,x,13$, so the median is $\\frac{6+x}{2}$.",
        "Setting $\\frac{6+x}{2}=9$ gives $6+x=18$.",
        "Solving gives $x=12$, which does satisfy $6<12<13$, confirming the assumed order.",
      ],
    },
    {
      id: "a8-m15-l02-q3", role: "independent", kind: "numeric", difficulty: 5,
      question: "A data set consists of $5, 11, 20$, and a fourth value $z$, where $z>11$. If the median of the data set is 13, find $z$.",
      answer: "15",
      hints: [
        "Try assuming $z$ falls between 11 and 20, giving sorted order $5,11,z,20$.",
        "Under that assumption, the median is the average of 11 and $z$.",
        "Solve for $z$, then confirm it actually falls between 11 and 20.",
      ],
      solutionSteps: [
        "Assuming $11<z<20$, the sorted order is $5,11,z,20$, so the median is $\\frac{11+z}{2}$.",
        "Setting $\\frac{11+z}{2}=13$ gives $11+z=26$, so $z=15$.",
        "Checking: $11<15<20$, confirming the assumed order; the alternative case $z\\geq20$ would give a median of $\\frac{11+20}{2}=15.5\\neq13$, so it is not valid.",
      ],
    },
    {
      id: "a8-m15-l02-q4", role: "independent", kind: "numeric", difficulty: 5,
      question: "A data set has six values: $4, 6, 6, 10, 15$, and $w$. The mean of the data set is 8. Find $w$.",
      answer: "7",
      hints: [
        "Use the mean and the count of values to find the required total sum.",
        "Add the five known values together.",
        "Subtract that sum from the required total, then check the result does not disturb the existing mode.",
      ],
      solutionSteps: [
        "Since the mean is 8 and there are 6 values, the total sum must be $8\\times6=48$.",
        "The sum of the five known values is $4+6+6+10+15=41$, so $w=48-41=7$.",
        "Checking the mode: the sorted set $4,6,6,7,10,15$ still has 6 as its unique mode, so $w=7$ is consistent with every condition.",
      ],
    },
    {
      id: "a8-m15-l02-q5", role: "independent", kind: "mcq", difficulty: 3,
      question: "A data set of 5 numbers has mean 10. If one of the numbers is increased by 15 and no other number changes, what happens to the new mean?",
      choices: ["It increases by 15", "It increases by 3", "It stays the same", "It cannot be determined without knowing the other four numbers"],
      answer: 1,
      hints: [
        "Think about how the total sum changes when one value increases by 15.",
        "The new mean is the new sum divided by the same count of 5.",
        "Divide the increase in the sum by the number of values to find the increase in the mean.",
      ],
      solutionSteps: [
        "Increasing one value by 15 increases the total sum by exactly 15, regardless of the other values.",
        "The new mean is the new sum divided by 5, which is the old mean plus $\\frac{15}{5}=3$.",
        "So the mean increases by 3, and this holds no matter what the other four numbers are.",
      ],
    },
    {
      id: "a8-m15-l02-q6", role: "independent", kind: "numeric", difficulty: 6,
      question: "A data set of five whole numbers, listed in increasing order, is $2, 5, x, y, 17$, with $x<y$. The mean of the data set is 9 and the median is 8. Find $y-x$.",
      answer: "5",
      hints: [
        "Since the data set is already listed in increasing order with 5 values, the median is exactly the middle value.",
        "Use the median condition to find $x$ directly.",
        "Use the mean to find the total sum, then solve for $y$.",
      ],
      solutionSteps: [
        "Since the five values are already in increasing order, the median is the middle (third) value, so $x=8$.",
        "The mean condition gives a total sum of $9\\times5=45$, so $2+5+8+y+17=45$, meaning $32+y=45$ and $y=13$.",
        "Both $x=8$ and $y=13$ fit the required order $5<8<13<17$, and $y-x=13-8=5$.",
      ],
    },
  ],
  summary: [
    "A known mean and count give the total sum directly; subtract the known values to solve for a single missing one.",
    "A missing value's contribution to the median depends on its sorted position, which must be assumed, solved for, and then verified.",
    "When a problem states more than one condition, solve using the most direct one first, then check the result against every other condition.",
  ],
  nextConnection: "The next module turns to sums and products that collapse almost entirely through cancellation — telescoping — starting with how to recognize when a general term can be rewritten as a difference of simpler pieces.",
} satisfies CourseLesson;
