# Spot the Concept: content guide

Spot the Concept (`/spot`) shows a contest-style problem and asks which concept unlocks it. The student names the concept and doesn't solve the problem. All content lives in this folder as JSON. Code reads it, but you never need to touch code to add problems.

```
content/spot/
  concepts.json            the concept taxonomy (one entry per concept)
  problems/<area>.json     the live bank: algebra, geometry, combinatorics, number-theory
  drafts/                  generator output; never loaded by the app
```

The schemas are in `lib/spot/schema.ts`. The validator rules are in `lib/spot/validate.ts`.

## Status

`concepts.json` is a **provisional draft**. It was written without the AMC/AIME syllabus report (`amc-syllabus.md`). It applies the core and rare lists from the spec, and `example_refs` is empty everywhere because no contest references have been verified. When the report arrives, rebuild the taxonomy from it and check every `primary_concept`, `also_valid` and `distractors` id in the bank against the new ids.

The seed bank has 12 problems, 3 per area. It's enough to exercise every screen, but it's below the 40 problems at which the frequency mix becomes enforced.

## Adding a problem

1. **Write it** in the right `problems/<area>.json`, with an id like `geo-0042` (the prefix must match the area: `alg`, `geo`, `comb` or `nt`). Every field is required except `inspired_by`.
   - `primary_concept` must be the key step. A student who knows only the distractors should get stuck.
   - `distractors`: exactly 3 for AMC 10/12 problems and 4 for AIME. Take them from the concept's `confusable_with`, or from concepts that share the problem's surface features.
   - `also_valid`: other legitimate first moves. These are never distractors. Each one needs an entry in `also_valid_notes` explaining why the primary concept is faster. The quiz sometimes swaps one into the choices, and picking it gets "Valid route, but not the key idea."
   - `why_not`: one entry per distractor.
   - `first_move`: the opening step only, not the solution.
   - `answer`: a string, either an integer or a fraction like `"49/54"`. "Now solve it" compares answers exactly, so `0.5` matches `1/2`.
   - `inspired_by` (optional): a reference such as `"2020 AMC 12B #12"`. The app shows it as "Similar to …" with an AoPS wiki link. Never copy contest text; MAA owns it.
   - Wrap all math in `$…$` and escape backslashes in JSON (`\\frac`).
2. **Add an answer check** to `scripts/spot/verify_answers.py`. It should compute the answer independently, by brute force where you can, without retracing the written solution.
3. **Review the distractors.** Try each one as a first move. If one works, move it to `also_valid` and pick a new distractor. Record the reasoning in `docs/spot-verification.json`.
4. **Run the checks:**

   ```sh
   npm run spot:validate   # schema, ids, choice counts, giveaways, math delimiters, frequency mix
   npm run spot:verify     # every answer recomputed with sympy
   npm test                # includes a test that the shipped bank validates
   ```

   The app also validates the bank when it loads and refuses to start if the bank is invalid.

### What the validator rejects

- Malformed records, duplicate ids, unknown concept ids, and an id prefix that doesn't match the area.
- A concept listed as both a distractor and also-valid, or the primary concept appearing in either list.
- The wrong number of distractors for the level.
- A missing `why_not` or `also_valid_notes` entry.
- Problem text that names any of its choices, or quotes a formula from a choice's `statement`.
- Unbalanced `$` in any text field, which would show raw LaTeX in the UI.
- Once the bank has 40 or more problems: a frequency mix more than 15 points off the 60/30/10 core/common/rare target. Below 40 it's a warning.

## Generating drafts

```sh
npm run spot:generate -- --area geometry --count 5
npm run spot:generate -- --area algebra --level AIME --count 3
npm run spot:generate -- --concept power-of-a-point,vieta --count 2
npm run spot:generate -- --area combinatorics --dry-run   # print the prompts, no API call
```

The generator needs `OPENROUTER_API_KEY` in `.env.local`. It samples concepts by frequency (60/30/10) unless you name them, assigns fresh ids, writes to `drafts/`, and lists any validation errors. Model output is often wrong, so treat drafts as unreviewed. Promote a draft by moving it into `problems/<area>.json` only after steps 2–4 above.

To validate a draft file on its own: `npm run spot:validate -- content/spot/drafts/<file>.json`.

## One-time setup for the answer checker

```sh
python3 -m venv scripts/spot/.venv
scripts/spot/.venv/bin/pip install sympy
```

The virtual environment folder is gitignored.

## Concept entries

Each concept has `id`, `name`, `area`, `subarea`, `level` (any of `10`, `12`, `AIME`, `Beyond`), `statement`, `frequency` (`core`, `common` or `rare`), `triggers` (2–5 surface features that should bring it to mind), `confusable_with` (the source for distractors) and `example_refs`. Concepts tagged only `Beyond` (olympiad level) stay in the data but are hidden from the app.
