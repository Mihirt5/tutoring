import type { CourseLesson } from "@/lib/courses/types";

export default {
  slug: "word-rearrangements-with-constraints",
  intro:
    "Many word-rearrangement problems add a restriction on top of the basic count: certain letters must sit next to each other, or certain letters must never sit next to each other. This lesson develops the glue technique for togetherness and the total-minus-together technique for separation, then combines both with the multinomial formula from the previous lesson.",
  sections: [
    {
      id: "a8-m03-l02-s1",
      title: "Letters that must stay together",
      body: [
        "When a problem requires two or more specific letters to sit next to each other, treat that whole cluster of letters as a single glued block. Arranging the block along with the remaining letters is then an ordinary arrangement problem with one fewer item than the total letter count, since the block counts as one unit.",
        "After arranging the block and the other letters, multiply by the number of ways to order the letters inside the block itself, since sliding the block into a position does not fix the internal order of the letters glued inside it. If the letters glued together are all different from each other, that internal count is a plain factorial of the block's size; if some of the glued letters are identical to each other, the internal count must itself be divided by the appropriate factorial, exactly as in ordinary word rearrangements.",
      ],
      keyIdea:
        "Glue the required-together letters into one block, arrange the block with the remaining letters, then multiply by the block's internal arrangements.",
    },
    {
      id: "a8-m03-l02-s2",
      title: "Letters that must stay apart",
      body: [
        "A separation requirement is usually easiest to handle with complementary counting: first find the total number of arrangements with no restriction, then subtract the number of arrangements where the two letters are adjacent, computed with the glue technique from the first section. What remains is exactly the count where the two letters are never adjacent.",
        "This works because every arrangement of the letters falls into exactly one of two groups: the two letters are adjacent, or they are not. Counting the first group and subtracting it from the total for all arrangements automatically finds the size of the second group, without needing to place the separated letters directly.",
      ],
      keyIdea:
        "Subtract the together-count from the total unrestricted count to find how many arrangements keep two letters apart.",
    },
    {
      id: "a8-m03-l02-s3",
      title: "Combining constraints with repeated letters",
      body: [
        "A word can have both a togetherness requirement and repeated letters at the same time, and the two techniques combine directly. Glue the required letters into a block as before, but now check whether any of the glued letters are identical to each other or to letters outside the block, and divide by the appropriate factorial wherever a repeat occurs, both inside the block and among the remaining items.",
        "A useful special case appears when the letters required to stay together are themselves identical, such as two copies of the same letter. In that case, the block has only one possible internal order, since swapping two identical letters inside the block does not create a new arrangement, so no extra factor is multiplied in for the block's internal order.",
      ],
      keyIdea:
        "Apply the multinomial formula inside and outside the glued block exactly as in an ordinary word rearrangement, remembering that identical glued letters need no internal-order factor.",
    },
  ],
  examples: [
    {
      id: "a8-m03-l02-ex1",
      title: "Two distinct letters that must stay together",
      problem:
        "How many ways can the letters of the word TRAIN be arranged in a row if T and R must stay together, in either order?",
      steps: [
        "Glue T and R into a single block, leaving 4 items to arrange: the block, A, I, and N.",
        "These 4 items are all distinct, so they arrange in $4!=24$ ways.",
        "The block itself can be ordered as TR or RT, giving an extra factor of $2!=2$, so the total is $24\\times2=48$.",
      ],
      answer: "48",
      takeaway:
        "Gluing two required letters into one block turns the problem into arranging one fewer item, times the block's own internal arrangements.",
    },
    {
      id: "a8-m03-l02-ex2",
      title: "Two distinct letters that must stay apart",
      problem:
        "How many ways can the letters of the word CHAIR be arranged in a row if C and H must NOT be adjacent?",
      steps: [
        "The total number of arrangements of the 5 distinct letters, with no restriction, is $5!=120$.",
        "Gluing C and H together leaves 4 items to arrange in $4!=24$ ways, times $2!=2$ internal orders of the block, giving $24\\times2=48$ arrangements with them adjacent.",
        "Subtracting the adjacent count from the total gives the arrangements where they are not adjacent: $120-48=72$.",
      ],
      answer: "72",
      takeaway:
        "Subtracting the glued-together count from the unrestricted total finds the arrangements where two letters are never adjacent.",
    },
    {
      id: "a8-m03-l02-ex3",
      title: "Identical letters that must stay together",
      problem:
        "The word APPLE has letters A, P, P, L, E. How many ways can these letters be arranged in a row if the two P's must stay together?",
      steps: [
        "Glue the two P's into a single block, leaving 4 items to arrange: the block, A, L, and E.",
        "These 4 items are all distinct from each other, so they arrange in $4!=24$ ways.",
        "Because the two P's inside the block are identical, there is only 1 way to order them internally, so no extra factor is needed and the total stays at 24.",
      ],
      answer: "24",
      takeaway:
        "When the letters glued into a block are identical to each other, the block has only one internal order, unlike a block made of two different letters.",
    },
  ],
  commonMistakes: [
    "Forgetting to multiply by the block's internal arrangements after gluing two different required letters together.",
    "Multiplying by an extra $2!$ for a glued block whose two letters are identical, when that block actually has only one internal order.",
    "Trying to place separated letters directly instead of using the simpler total-minus-together approach, which often leads to missed or double-counted cases.",
  ],
  exercises: [
    {
      id: "a8-m03-l02-q1",
      role: "guided",
      kind: "numeric",
      difficulty: 3,
      question:
        "How many ways can the letters of the word SPARK be arranged in a row if S and P must stay together, in either order?",
      answer: "48",
      hints: [
        "Treat the letters S and P as a single glued block since they must stay together.",
        "Arranging the block along with the other 3 letters means arranging 4 items total.",
        "Multiply the arrangements of the 4 items by the 2 internal orders of the block: $4!\\times2!$.",
      ],
      solutionSteps: [
        "Glue S and P into one block, leaving 4 items to arrange: the block, A, R, and K.",
        "These 4 items arrange in $4!=24$ ways, and the block itself can be S-then-P or P-then-S, giving a factor of $2!=2$.",
        "The total is $24\\times2=48$.",
      ],
    },
    {
      id: "a8-m03-l02-q2",
      role: "guided",
      kind: "numeric",
      difficulty: 3,
      question:
        "How many ways can the letters of the word CLOUD be arranged in a row if C and L must NOT be adjacent?",
      answer: "72",
      hints: [
        "First find the total number of arrangements of all 5 letters with no restriction.",
        "Then find how many of those arrangements have C and L adjacent, using the glue technique.",
        "Subtract the adjacent count from the total: $120-48$.",
      ],
      solutionSteps: [
        "The total number of arrangements of the 5 distinct letters is $5!=120$.",
        "Gluing C and L together gives 4 items to arrange, so $4!\\times2!=48$ arrangements have them adjacent.",
        "Subtracting gives the arrangements where they are not adjacent: $120-48=72$.",
      ],
    },
    {
      id: "a8-m03-l02-q3",
      role: "independent",
      kind: "numeric",
      difficulty: 4,
      question:
        "How many ways can the letters of the word MARBLE be arranged in a row if A and R must stay together, in either order?",
      answer: "240",
      hints: [
        "Glue A and R into a single block since they must stay together.",
        "Arranging the block with the other 4 letters means arranging 5 items total.",
        "Multiply by the block's internal arrangements: $5!\\times2!$.",
      ],
      solutionSteps: [
        "Glue A and R into one block, leaving 5 items: the block, M, B, L, and E.",
        "These 5 items arrange in $5!=120$ ways, and the block has $2!=2$ internal orders.",
        "The total is $120\\times2=240$.",
      ],
    },
    {
      id: "a8-m03-l02-q4",
      role: "independent",
      kind: "numeric",
      difficulty: 4,
      question:
        "How many ways can the letters of the word FLIGHT be arranged in a row if F and L must NOT be adjacent?",
      answer: "480",
      hints: [
        "Find the total number of unrestricted arrangements of the 6 distinct letters first.",
        "Then use the glue technique to count how many of those arrangements have F and L adjacent.",
        "Subtract the adjacent count from the total: $720-240$.",
      ],
      solutionSteps: [
        "The total number of arrangements of the 6 distinct letters is $6!=720$.",
        "Gluing F and L together gives 5 items to arrange, so $5!\\times2!=240$ arrangements have them adjacent.",
        "Subtracting gives $720-240=480$.",
      ],
    },
    {
      id: "a8-m03-l02-q5",
      role: "independent",
      kind: "mcq",
      difficulty: 4,
      question:
        "The word ADDER has letters A, D, D, E, R, where the two D's must stay together. Which expression correctly counts the number of distinct arrangements?",
      choices: ["$4!$", "$4!\\times2!$", "$\\dfrac{5!}{2!}$", "$5!$"],
      answer: 0,
      hints: [
        "Since the two D's are identical, gluing them together forms a block with only one possible internal order.",
        "After gluing, count how many separate items need to be arranged.",
        "There is no extra factor of $2!$ here, unlike gluing two different letters together.",
      ],
      solutionSteps: [
        "Gluing the two identical D's together forms one block, leaving 4 items to arrange: the block, A, E, and R.",
        "Because the two D's inside the block are identical, there is only 1 way to order them internally, not 2.",
        "The count is simply $4!=24$, matching the first choice.",
      ],
    },
    {
      id: "a8-m03-l02-q6",
      role: "independent",
      kind: "numeric",
      difficulty: 5,
      question:
        "How many ways can the letters of the word GIGGLE be arranged in a row if all three G's must be together as one contiguous block?",
      answer: "24",
      hints: [
        "Since the three G's are identical, gluing them together forms a block with only one possible internal order.",
        "After gluing the G's into one block, count how many separate items remain: the block plus the other distinct letters.",
        "Arrange those items as if they were all distinct, since none of the remaining letters repeat.",
      ],
      solutionSteps: [
        "Gluing the three identical G's together forms one block, leaving 4 items to arrange: the block, I, L, and E.",
        "These 4 items are all distinct from each other, and the block has only 1 internal order since its three letters are identical.",
        "The count is $4!=24$.",
      ],
    },
  ],
  summary: [
    "A togetherness requirement is handled by gluing the required letters into one block, then arranging the block with the remaining items.",
    "A separation requirement is handled by subtracting the glued-together count from the total unrestricted count.",
    "When the letters glued into a block are identical to each other, the block needs no internal-order factor, unlike a block of different letters.",
  ],
  nextConnection:
    "The next module turns to probability, starting from the definition of probability as favorable outcomes over total outcomes and building an explicit sample space for a simple experiment.",
} satisfies CourseLesson;
