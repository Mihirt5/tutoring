import {
  ConceptSchema,
  ProblemSchema,
  choiceCount,
  AREA_PREFIX,
  type Concept,
  type SpotProblem,
} from "./schema.ts";

// Bank validator. Pure: takes parsed JSON, returns problems found.
// Errors block; warnings report drift (like the frequency mix) without failing.

export interface Report {
  errors: string[];
  warnings: string[];
}

// Target share of problems by the primary concept's frequency.
export const FREQUENCY_TARGET = { core: 0.6, common: 0.3, rare: 0.1 } as const;
const FREQUENCY_TOLERANCE = 0.15;
const MIX_MIN_BANK = 40; // below this the mix is too noisy to judge

const norm = (s: string) => s.toLowerCase().replace(/\s+/g, "");

// Unescaped $ delimiters must pair up, or KaTeX shows raw LaTeX.
function unbalancedMath(text: string): boolean {
  const dollars = text.replace(/\\\$/g, "").match(/\$/g)?.length ?? 0;
  return dollars % 2 !== 0;
}

export function validateConcepts(raw: unknown): {
  concepts: Concept[];
  report: Report;
} {
  const report: Report = { errors: [], warnings: [] };
  if (!Array.isArray(raw)) {
    report.errors.push("concepts.json: expected an array");
    return { concepts: [], report };
  }
  const concepts: Concept[] = [];
  raw.forEach((c, i) => {
    const parsed = ConceptSchema.safeParse(c);
    if (!parsed.success) {
      const label = (c as { id?: string })?.id ?? `#${i}`;
      for (const issue of parsed.error.issues)
        report.errors.push(
          `concept ${label}: ${issue.path.join(".") || "(root)"} ${issue.message}`,
        );
    } else concepts.push(parsed.data);
  });
  const ids = new Set<string>();
  for (const c of concepts) {
    if (ids.has(c.id)) report.errors.push(`concept ${c.id}: duplicate id`);
    ids.add(c.id);
  }
  for (const c of concepts) {
    for (const other of c.confusable_with) {
      if (other === c.id)
        report.errors.push(`concept ${c.id}: confusable with itself`);
      else if (!ids.has(other))
        report.errors.push(`concept ${c.id}: unknown confusable "${other}"`);
    }
    for (const [field, text] of [
      ["statement", c.statement],
      ...c.triggers.map((t) => ["trigger", t]),
    ])
      if (unbalancedMath(text))
        report.errors.push(`concept ${c.id}: unbalanced $ in ${field}`);
  }
  return { concepts, report };
}

export function validateProblems(
  raw: unknown[],
  concepts: Concept[],
  opts: { checkMix?: boolean } = {},
): { problems: SpotProblem[]; report: Report } {
  const report: Report = { errors: [], warnings: [] };
  const byId = new Map(concepts.map((c) => [c.id, c]));
  const problems: SpotProblem[] = [];
  raw.forEach((p, i) => {
    const parsed = ProblemSchema.safeParse(p);
    if (!parsed.success) {
      const label = (p as { id?: string })?.id ?? `#${i}`;
      for (const issue of parsed.error.issues)
        report.errors.push(
          `problem ${label}: ${issue.path.join(".") || "(root)"} ${issue.message}`,
        );
    } else problems.push(parsed.data);
  });

  const seen = new Set<string>();
  for (const p of problems) {
    const err = (msg: string) => report.errors.push(`problem ${p.id}: ${msg}`);
    if (seen.has(p.id)) err("duplicate id");
    seen.add(p.id);

    const primary = byId.get(p.primary_concept);
    if (!primary) err(`unknown primary_concept "${p.primary_concept}"`);
    else if (!p.id.startsWith(AREA_PREFIX[primary.area] + "-"))
      err(`id prefix doesn't match area "${primary.area}"`);

    for (const cid of [...p.also_valid, ...p.distractors])
      if (!byId.has(cid)) err(`unknown concept "${cid}"`);
    if (p.also_valid.includes(p.primary_concept))
      err("primary_concept is also listed in also_valid");
    if (p.distractors.includes(p.primary_concept))
      err("primary_concept is also a distractor");
    for (const cid of p.distractors)
      if (p.also_valid.includes(cid))
        err(`"${cid}" is both a distractor and also_valid`);
    if (new Set(p.distractors).size !== p.distractors.length)
      err("duplicate distractor");

    const need = choiceCount(p.level) - 1;
    if (p.distractors.length !== need)
      err(
        `level ${p.level} needs exactly ${need} distractors, has ${p.distractors.length}`,
      );

    for (const cid of p.distractors)
      if (!p.why_not[cid]) err(`why_not missing for distractor "${cid}"`);
    for (const key of Object.keys(p.why_not))
      if (!p.distractors.includes(key))
        err(`why_not has "${key}", which isn't a distractor`);
    for (const cid of p.also_valid)
      if (!p.also_valid_notes[cid])
        err(`also_valid_notes missing for "${cid}"`);
    for (const key of Object.keys(p.also_valid_notes))
      if (!p.also_valid.includes(key))
        err(`also_valid_notes has "${key}", which isn't also_valid`);

    // Giveaways: the problem text must not name a choice or quote its formula.
    const text = p.problem.toLowerCase();
    const flat = norm(p.problem);
    for (const cid of [p.primary_concept, ...p.also_valid, ...p.distractors]) {
      const c = byId.get(cid);
      if (!c) continue;
      if (text.includes(c.name.toLowerCase()))
        err(`problem text names the concept "${c.name}"`);
      for (const piece of c.statement.split(/[;,]|\$/).map(norm))
        if (piece.length >= 8 && flat.includes(piece))
          err(`problem text contains the formula for "${c.name}"`);
    }

    const texts: [string, string][] = [
      ["problem", p.problem],
      ["trigger_explanation", p.trigger_explanation],
      ["first_move", p.first_move],
      ["solution_sketch", p.solution_sketch],
      ...Object.entries(p.why_not).map(
        ([k, v]) => [`why_not.${k}`, v] as [string, string],
      ),
      ...Object.entries(p.also_valid_notes).map(
        ([k, v]) => [`also_valid_notes.${k}`, v] as [string, string],
      ),
    ];
    for (const [field, t] of texts)
      if (unbalancedMath(t)) err(`unbalanced $ in ${field}`);

    if (
      primary &&
      !primary.level.some(
        (l) => l === p.level || (p.level === "12" && l === "10"),
      )
    )
      report.warnings.push(
        `problem ${p.id}: level ${p.level} isn't listed for "${primary.id}"`,
      );
  }

  if (opts.checkMix !== false) {
    const counts = { core: 0, common: 0, rare: 0 };
    for (const p of problems) {
      const f = byId.get(p.primary_concept)?.frequency;
      if (f) counts[f]++;
    }
    const total = problems.length;
    const mix = (Object.keys(counts) as (keyof typeof counts)[])
      .map((f) => `${f} ${Math.round((counts[f] / Math.max(1, total)) * 100)}%`)
      .join(", ");
    const off = (Object.keys(counts) as (keyof typeof counts)[]).filter(
      (f) =>
        Math.abs(counts[f] / Math.max(1, total) - FREQUENCY_TARGET[f]) >
        FREQUENCY_TOLERANCE,
    );
    if (off.length > 0) {
      const msg = `frequency mix is ${mix} (target core 60%, common 30%, rare 10%)`;
      if (total >= MIX_MIN_BANK) report.errors.push(msg);
      else
        report.warnings.push(
          `${msg}; enforced once the bank has ${MIX_MIN_BANK}+ problems`,
        );
    }
  }

  return { problems, report };
}
