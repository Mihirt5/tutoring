import type { CourseLesson } from "@/lib/courses/types";

export default {
  slug: "circular-arrangements",
  intro:
    'Arranging objects around a circle looks like ordinary permutation counting, but rotating the whole circle produces an arrangement that looks identical to the original — so the usual $n!$ count overcounts. This lesson develops the fix for rotations, extends it to arrangements that can also be flipped over, and shows when a "circular" arrangement is actually an ordinary permutation in disguise.',
  sections: [
    {
      id: "a8-m01-l05-s1",
      title: "Why circular arrangements divide by n",
      body: [
        "Seat 5 people around a round table with no distinguishing marks on the seats. If everyone shifts one seat to the right, the new seating looks exactly the same as before — every person still has the same neighbors in the same relative order, just rotated. Since only the relative arrangement matters, all 5 rotations of one seating count as a single arrangement, not five different ones.",
        "The fix is to remove the rotational freedom before counting: fix one specific person's seat as a reference point, then arrange everyone else relative to that fixed position. With one person's seat fixed, the remaining $n-1$ people can be arranged in $(n-1)!$ ways, and this equals the ordinary $n!$ arrangements divided by the $n$ rotations that all represent the same seating: $\\dfrac{n!}{n}=(n-1)!$.",
      ],
      keyIdea:
        "Fix one object's position to remove rotational symmetry, leaving $(n-1)!$ distinct circular arrangements for $n$ distinct objects.",
    },
    {
      id: "a8-m01-l05-s2",
      title: "When flipping also produces the same arrangement",
      body: [
        "A round table with people facing the center has a genuine left and right — flipping the whole table over would require passing through the table itself, which is not a real motion, so a clockwise seating and its mirror-image counterclockwise seating are counted as different arrangements. A bracelet or necklace is different: it can physically be turned over in space, so a clockwise arrangement of beads and its mirror image are the same physical object.",
        "When flipping is a real possibility, each distinct arrangement is counted twice by $(n-1)!$ — once for each direction it could be read — so divide by an additional factor of 2, giving $\\dfrac{(n-1)!}{2}$. Whether this extra division applies depends entirely on whether the physical object can actually be flipped over; read the problem's setup carefully rather than applying the same formula everywhere.",
      ],
      keyIdea:
        "Divide by an extra factor of 2 only when the arrangement can be physically flipped over, such as a bracelet or necklace.",
    },
    {
      id: "a8-m01-l05-s3",
      title: "Numbered seats break the rotational symmetry",
      body: [
        "The entire reason to divide by $n$ is that rotating an unmarked circular arrangement produces something indistinguishable from the original. If the seats themselves are numbered or otherwise distinguishable — seat 1, seat 2, seat 3, and so on — then rotating the people no longer produces the same arrangement, because each person is now sitting in a different numbered seat than before.",
        "In that case, the problem is really an ordinary permutation of $n$ people into $n$ distinguishable positions, and the answer is simply $n!$, with no division at all. Before applying the circular-arrangement formula, always check whether the positions around the circle are truly identical to each other or secretly distinguishable.",
      ],
      keyIdea:
        "If the positions around the circle are distinguishable from each other, use ordinary $n!$, not $(n-1)!$.",
    },
  ],
  examples: [
    {
      id: "a8-m01-l05-ex1",
      title: "Seat people around an unmarked table",
      problem:
        "In how many distinct ways can 5 people be seated around a round table, where the seats are identical and only the relative order of people matters?",
      steps: [
        "Fix one person's seat as a reference point to remove the rotational symmetry.",
        "The remaining 4 people can be arranged in the remaining 4 seats in $4!$ ways.",
        "This equals $4\\times3\\times2\\times1=24$.",
      ],
      answer: "24",
      takeaway:
        "Fixing one person's position converts a circular arrangement into an ordinary arrangement of the rest.",
    },
    {
      id: "a8-m01-l05-ex2",
      title: "String beads on a bracelet",
      problem:
        "In how many distinct ways can 6 different beads be strung on a bracelet, if the bracelet can be turned over?",
      steps: [
        "Since rotating the bracelet gives the same arrangement, start from $(6-1)!=5!=120$.",
        "Since the bracelet can also be flipped over, each arrangement is counted twice by that number.",
        "Divide by 2: $\\dfrac{120}{2}=60$.",
      ],
      answer: "60",
      takeaway:
        "A bracelet or necklace that can be flipped needs both the rotation division and an extra division by 2.",
    },
    {
      id: "a8-m01-l05-ex3",
      title: "Numbered chairs in a circle",
      problem:
        "In how many ways can 4 people be seated in 4 numbered chairs arranged in a circle?",
      steps: [
        "The chairs are numbered, so they are distinguishable positions, not identical ones.",
        "Rotating the people changes who sits in which numbered chair, so no rotations are counted as the same.",
        "This is an ordinary arrangement of 4 people into 4 distinguishable chairs: $4!=24$.",
      ],
      answer: "24",
      takeaway:
        "Numbered or otherwise distinguishable seats mean the circular-arrangement division does not apply.",
    },
  ],
  commonMistakes: [
    "Applying $(n-1)!$ to a circle of numbered or otherwise distinguishable positions, where ordinary $n!$ is correct instead.",
    "Forgetting the extra division by 2 for an arrangement that can be physically flipped over, such as a bracelet.",
    "Dividing by 2 for a seating arrangement, such as people around a table, that cannot actually be flipped over in the real setup described.",
  ],
  exercises: [
    {
      id: "a8-m01-l05-q1",
      role: "guided",
      kind: "numeric",
      difficulty: 3,
      question:
        "In how many distinct ways can 4 people be seated around a round table with identical, unmarked seats?",
      answer: "6",
      hints: [
        "Fix one person's seat to remove the rotational symmetry.",
        "Arrange the remaining people in the remaining seats.",
        "Compute $(4-1)!$.",
      ],
      solutionSteps: [
        "Fixing one person's seat leaves 3 people to arrange in the remaining 3 seats.",
        "This is $3!$.",
        "The value is 6.",
      ],
    },
    {
      id: "a8-m01-l05-q2",
      role: "guided",
      kind: "numeric",
      difficulty: 3,
      question:
        "In how many distinct ways can 6 people be seated around a round table with identical, unmarked seats?",
      answer: "120",
      hints: [
        "Fix one person's seat to remove the rotational symmetry.",
        "Arrange the remaining people in the remaining seats.",
        "Compute $(6-1)!$.",
      ],
      solutionSteps: [
        "Fixing one person's seat leaves 5 people to arrange in the remaining 5 seats.",
        "This is $5!$.",
        "The value is 120.",
      ],
    },
    {
      id: "a8-m01-l05-q3",
      role: "independent",
      kind: "numeric",
      difficulty: 4,
      question:
        "In how many distinct ways can 5 different charms be strung on a bracelet that can be turned over?",
      answer: "12",
      hints: [
        "Start with the circular-arrangement count $(5-1)!$.",
        "The bracelet can be flipped, so divide by an extra factor of 2.",
        "Simplify the resulting fraction.",
      ],
      solutionSteps: [
        "The rotation-only circular count is $(5-1)!=4!=24$.",
        "Since the bracelet can be flipped, divide by 2.",
        "The result is $\\dfrac{24}{2}=12$.",
      ],
    },
    {
      id: "a8-m01-l05-q4",
      role: "independent",
      kind: "numeric",
      difficulty: 4,
      question:
        "In how many distinct ways can 7 people be seated around a round table with identical, unmarked seats?",
      answer: "720",
      hints: [
        "Fix one person's seat to remove the rotational symmetry.",
        "Arrange the remaining people in the remaining seats.",
        "Compute $(7-1)!$.",
      ],
      solutionSteps: [
        "Fixing one person's seat leaves 6 people to arrange in the remaining 6 seats.",
        "This is $6!$.",
        "The value is 720.",
      ],
    },
    {
      id: "a8-m01-l05-q5",
      role: "independent",
      kind: "mcq",
      difficulty: 4,
      question:
        "Which of the following situations should use ordinary $n!$ counting instead of the circular-arrangement formula $(n-1)!$?",
      choices: [
        "People seated around a round table with identical, unmarked seats",
        "People seated in a circle of numbered chairs",
        "Beads strung on a necklace that can rotate but cannot be flipped",
        "Friends arranged in a circle for a photo, where only relative order matters",
      ],
      answer: 1,
      hints: [
        "The $(n-1)!$ formula relies on rotations of the arrangement looking identical.",
        "Numbered chairs make every position distinguishable from every other position.",
        "Check which situation breaks the assumption that rotations produce the same arrangement.",
      ],
      solutionSteps: [
        "The other three situations all involve positions that are identical to each other before anyone is placed, so rotations genuinely produce the same arrangement.",
        "Numbered chairs are distinguishable positions, so rotating the people changes who occupies which numbered chair.",
        "That situation calls for ordinary $n!$ counting, making it the correct choice.",
      ],
    },
    {
      id: "a8-m01-l05-q6",
      role: "independent",
      kind: "numeric",
      difficulty: 5,
      question:
        "In how many distinct ways can 8 different keys be placed on a keyring that can be turned over?",
      answer: "2520",
      hints: [
        "Start with the circular-arrangement count $(8-1)!$.",
        "The keyring can be flipped, so divide by an extra factor of 2.",
        "Simplify the resulting fraction.",
      ],
      solutionSteps: [
        "The rotation-only circular count is $(8-1)!=7!=5040$.",
        "Since the keyring can be flipped, divide by 2.",
        "The result is $\\dfrac{5040}{2}=2520$.",
      ],
    },
  ],
  summary: [
    "Fixing one object's position removes rotational symmetry, giving $(n-1)!$ distinct circular arrangements for $n$ distinct objects.",
    "Divide by an additional factor of 2 only when the arrangement can be physically flipped over, such as a bracelet or necklace.",
    "If the positions around the circle are distinguishable, such as numbered seats, use ordinary $n!$ instead.",
  ],
  nextConnection:
    "Next, the focus shifts from arrangements where order matters to selections where it does not: choosing a group of objects without regard to order, counted with combinations.",
} satisfies CourseLesson;
