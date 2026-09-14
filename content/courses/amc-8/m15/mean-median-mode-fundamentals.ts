import type { CourseLesson } from "@/lib/courses/types";

export default {
  slug: "mean-median-mode-fundamentals",
  intro:
    'Mean, median, and mode are three different ways to describe a "typical" value in a data set, and they can give noticeably different answers for the same data. Knowing how each one is computed, and how each one reacts to an unusually large or small value, makes it possible to choose the right measure for a given question.',
  sections: [
    {
      id: "a8-m15-l01-s1",
      title: "Three measures, three definitions",
      body: [
        'The mean is the sum of all the values divided by how many values there are — the familiar "average." The median is the middle value once the data is sorted in order; with an odd number of values there is a single middle value, and with an even number of values the median is the average of the two middle values. The mode is the value (or values) that appears most often in the data set; a data set can have one mode, more than one mode if there is a tie, or no mode at all if every value appears the same number of times.',
        "Computing the median always requires sorting the data first — reading off the middle of an unsorted list gives a meaningless answer. Computing the mode requires counting how many times each distinct value appears, not just looking for a value that seems common.",
      ],
      keyIdea:
        "Mean is sum divided by count, median is the middle of the sorted data, and mode is the most frequent value.",
    },
    {
      id: "a8-m15-l01-s2",
      title: "How each measure reacts to an outlier",
      body: [
        "An outlier — a value far larger or smaller than the rest of the data — pulls the mean noticeably toward itself, since every value contributes to the sum. In the data set $2,3,4,5,50$, the mean is $\\frac{2+3+4+5+50}{5}=12.8$, far above every value except the outlier itself, because the single value 50 dominates the sum.",
        "The median, by contrast, only depends on which value sits in the middle position once the data is sorted, so a single extreme value has no effect on it unless it changes which value occupies that middle spot. For the same data set, the median is just 4 — the middle of $2,3,4,5,50$ — completely unaffected by how large the outlier happens to be. The mode is similarly unaffected by a single outlier, unless that outlier happens to repeat often enough to become the most frequent value itself.",
      ],
      keyIdea:
        "An outlier pulls the mean toward itself but leaves the median (and usually the mode) unchanged.",
    },
    {
      id: "a8-m15-l01-s3",
      title: "Choosing the right measure",
      body: [
        'Which measure best describes a "typical" value depends on what the data represents and what question is being asked. When a data set has an outlier or is heavily skewed — such as home prices in a neighborhood with one unusually expensive mansion — the median usually gives a more representative sense of a typical value, since it resists being dragged toward the extreme.',
        'The mode is the right choice when the data represents categories rather than numerical quantities, such as favorite colors or shoe sizes sold, where "most common" is the natural notion of typical. The mean remains the standard choice whenever every value should contribute proportionally to the result, such as computing a total that will later be redistributed evenly.',
      ],
      keyIdea:
        'Use the median when outliers or skew are present, the mode for categorical "most common" questions, and the mean when every value should count proportionally.',
    },
  ],
  examples: [
    {
      id: "a8-m15-l01-ex1",
      title: "Computing a mean",
      problem: "Find the mean of the data set $4, 7, 9, 12, 13$.",
      steps: [
        "Add all five values together: $4+7+9+12+13=45$.",
        "Divide the sum by the number of values, 5.",
        "The mean is $45\\div5=9$.",
      ],
      answer: "9",
      takeaway:
        "The mean is always the sum of the values divided by how many values there are.",
    },
    {
      id: "a8-m15-l01-ex2",
      title: "Computing a median with an even count",
      problem: "Find the median of the data set $3, 8, 10, 15$.",
      steps: [
        "The data is already sorted in increasing order.",
        "With 4 values (an even count), the median is the average of the two middle values, 8 and 10.",
        "The median is $\\frac{8+10}{2}=9$.",
      ],
      answer: "9",
      takeaway:
        "With an even number of values, the median averages the two middle values rather than picking a single one.",
    },
    {
      id: "a8-m15-l01-ex3",
      title: "The gap between mean and median with an outlier",
      problem:
        "The data set $2, 3, 4, 5, 50$ has a mean and a median. Find the positive difference between the mean and the median.",
      steps: [
        "The mean is $\\frac{2+3+4+5+50}{5}=\\frac{64}{5}=12.8$.",
        "The median, the middle value of the sorted data, is 4.",
        "The positive difference is $12.8-4=8.8$.",
      ],
      answer: "44/5",
      takeaway:
        "A single large outlier can pull the mean far above the median, revealing how differently the two measures respond to extreme values.",
    },
  ],
  commonMistakes: [
    "Finding the median of an unsorted list instead of sorting the data first.",
    "Forgetting to average the two middle values when a data set has an even number of entries.",
    "Assuming the mode must be a value near the middle of the data, rather than checking which value actually repeats most often.",
  ],
  exercises: [
    {
      id: "a8-m15-l01-q1",
      role: "guided",
      kind: "numeric",
      difficulty: 1,
      question: "Find the mean of the data set $6, 10, 11, 15, 18$.",
      answer: "12",
      hints: [
        "Add all five values together first.",
        "Count how many values are in the data set.",
        "Divide the sum by the count.",
      ],
      solutionSteps: [
        "The sum of the values is $6+10+11+15+18=60$.",
        "There are 5 values in the data set.",
        "The mean is $60\\div5=12$.",
      ],
    },
    {
      id: "a8-m15-l01-q2",
      role: "guided",
      kind: "numeric",
      difficulty: 2,
      question: "Find the median of the data set $5, 9, 2, 8$.",
      answer: "13/2",
      hints: [
        "Sort the data in increasing order first.",
        "Since there are 4 values, the median is the average of the two middle ones.",
        "Add the two middle values and divide by 2.",
      ],
      solutionSteps: [
        "Sorted in increasing order, the data is $2,5,8,9$.",
        "With 4 values, the median is the average of the two middle values, 5 and 8.",
        "The median is $\\frac{5+8}{2}=\\frac{13}{2}$.",
      ],
    },
    {
      id: "a8-m15-l01-q3",
      role: "independent",
      kind: "numeric",
      difficulty: 2,
      question: "Find the mode of the data set $3, 7, 7, 9, 12, 7, 9$.",
      answer: "7",
      hints: [
        "Count how many times each distinct value appears in the data set.",
        "The mode is the value with the highest count.",
        "Compare the count of 7 to the count of every other value.",
      ],
      solutionSteps: [
        "Counting each value: 3 appears once, 7 appears three times, 9 appears twice, and 12 appears once.",
        "The value 7 appears more often than any other value.",
        "The mode is $7$.",
      ],
    },
    {
      id: "a8-m15-l01-q4",
      role: "independent",
      kind: "numeric",
      difficulty: 3,
      question:
        "The data set $10, 12, 14, 16, 88$ has mean $M$ and median $m$. Find $M-m$.",
      answer: "14",
      hints: [
        "Compute the mean by summing all five values and dividing by 5.",
        "Compute the median as the middle value of the already-sorted data.",
        "Subtract the median from the mean.",
      ],
      solutionSteps: [
        "The mean is $M=\\frac{10+12+14+16+88}{5}=\\frac{140}{5}=28$.",
        "The median is the middle value of the sorted data, $m=14$.",
        "The difference is $M-m=28-14=14$.",
      ],
    },
    {
      id: "a8-m15-l01-q5",
      role: "independent",
      kind: "mcq",
      difficulty: 2,
      question:
        'A real estate report wants to describe a "typical" home price in a neighborhood where one mansion sells for far more than every other home. Which measure of center best avoids being skewed by that one expensive sale?',
      choices: ["Mean", "Median", "Mode", "Range"],
      answer: 1,
      hints: [
        "Think about which measure is most affected by a single extreme value.",
        "The mansion's price acts as an outlier in the data set of home prices.",
        "One measure resists being pulled toward an outlier because it only depends on the middle position of the sorted data.",
      ],
      solutionSteps: [
        "The mean would be pulled sharply upward by the single very expensive mansion sale.",
        "The median only depends on the middle value of the sorted data, so it is not affected by how extreme the mansion's price is.",
        "The median is the measure that best represents a typical home price here.",
      ],
    },
    {
      id: "a8-m15-l01-q6",
      role: "independent",
      kind: "numeric",
      difficulty: 4,
      question:
        "A data set has five values: $4, 6, 6, x, 10$, and its mean is 7. Find the mode of the data set.",
      answer: "6",
      hints: [
        "Use the mean to write an equation for the sum of all five values.",
        "Solve that equation for $x$.",
        "Once $x$ is known, count how often each value appears to find the mode.",
      ],
      solutionSteps: [
        "Since the mean is 7 and there are 5 values, the sum must be $7\\times5=35$.",
        "So $4+6+6+x+10=35$, meaning $26+x=35$ and $x=9$.",
        "The full data set is $4,6,6,9,10$, in which 6 appears twice and every other value appears once, so the mode is $6$.",
      ],
    },
  ],
  summary: [
    "The mean is the sum of the values divided by the count, the median is the middle of the sorted data, and the mode is the most frequent value.",
    "An outlier pulls the mean toward itself, but leaves the median — and usually the mode — unaffected.",
    'Choose the median for skewed data with outliers, the mode for categorical "most common" questions, and the mean when every value should count proportionally.',
  ],
  nextConnection:
    "The next lesson works backward from a stated mean, median, or mode to reconstruct missing values in a data set, often combining several such conditions in a single problem.",
} satisfies CourseLesson;
