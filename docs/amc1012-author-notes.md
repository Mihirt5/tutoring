# AMC 10/12 authoring and verification notes

This file records original project work. Source text and source examples are not included.

- Private concept index: `/private/tmp/lucid-course-reference/amc1012-concepts.json`.
- Scope: ten modules, three lessons each. Lesson content is written separately in `content/courses/amc-10-12/m01` through `m10`.
- AMC 12-specific content: module 8 lesson 3 and all of module 9. The other lessons form the shared course.
- Required lesson form: three teaching sections, three worked examples, two guided exercises, four independent exercises, intentional hints, complete solutions, common mistakes, summary, and next-lesson connection.
- Numeric exercise answers use integers or rational strings. Algebraic-expression answers use multiple choice. All problem structures and prose are newly authored.

## Representative lesson

`m02/polynomial-roots-and-symmetric-relationships.ts` is complete.

| Item | Author verification                                                     | Result         |
| ---- | ----------------------------------------------------------------------- | -------------- |
| ex1  | Expand the square of the root sum; exact rational arithmetic            | 37/4           |
| ex2  | Substitute the shift in the cubic, then account for three sign changes  | -8             |
| ex3  | Use the product and ratio condition; check the resulting positive roots | 7              |
| q1   | Direct cube sum from the independently factored roots                   | 351            |
| q2   | Form the squared reciprocal sum using exact fractions                   | 66/25          |
| q3   | Expand the shifted product with the normalized coefficients             | -9/4           |
| q4   | Apply the squared-sum identity twice                                    | 1016           |
| q5   | Parameterize the two positive roots by their stated ratio               | 96             |
| q6   | Construct a monic polynomial from reciprocal sum and product            | Choice index 1 |

Author checks: all nine tasks pass exact arithmetic/substitution checks; all 131 mathematical fragments pass KaTeX with errors enabled; 279 words of teaching section prose; required 3/2/4 example/exercise counts. Root independently solved all nine tasks and confirmed the answers. The following lesson connection now leads into integer structure.

Remaining modules await the representative lesson UI quality gate before bulk authoring. Publication and overall course validation are tracked by the root implementation agent.
