"use client";

import Link from "next/link";
import { MathText } from "@/components/MathText";
import { CONCEPTS, conceptById, problemsForConcept } from "@/lib/spot/bank";
import { LEITNER_DAYS, isDue, tallyBy } from "@/lib/spot/engine";
import {
  AREAS,
  AREA_NAMES,
  LEVEL_NAMES,
  type Concept,
} from "@/lib/spot/schema";
import { useProgress } from "@/lib/store";

const levelLabel = (l: Concept["level"][number]) =>
  l === "Beyond" ? "Olympiad" : LEVEL_NAMES[l];

export function ConceptIndex() {
  const p = useProgress();
  const tally = tallyBy(p.spot.attempts, (a) => a.conceptId);

  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">
          <Link href="/spot">Spot the Concept</Link> · Concept cards
        </p>
        <h1>The toolkit.</h1>
        <p className="page-sub">
          Every concept the quiz asks about, with the surface features that
          should make you reach for it.
        </p>
      </header>

      {AREAS.map((area) => (
        <section key={area} className="spot-area">
          <h2>{AREA_NAMES[area]}</h2>
          <div className="spot-card-grid">
            {CONCEPTS.filter((c) => c.area === area).map((c) => {
              const t = tally[c.id];
              const n = problemsForConcept(c.id).length;
              return (
                <Link
                  key={c.id}
                  href={`/spot/concepts/${c.id}`}
                  className="glass spot-card"
                >
                  <span className="spot-card-name">{c.name}</span>
                  <span className="mono spot-muted">
                    {c.frequency} · {n} problem{n === 1 ? "" : "s"}
                    {t ? ` · ${t.correct}/${t.n} spotted` : ""}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

export function ConceptCard({ id }: { id: string }) {
  const p = useProgress();
  const c = conceptById.get(id);
  if (!c) {
    return (
      <div className="page">
        <p>
          Unknown concept. <Link href="/spot/concepts">All concept cards</Link>
        </p>
      </div>
    );
  }
  const problems = problemsForConcept(c.id);
  const t = tallyBy(p.spot.attempts, (a) => a.conceptId)[c.id];
  const card = p.spot.boxes[c.id];

  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">
          <Link href="/spot/concepts">Concept cards</Link> ·{" "}
          {AREA_NAMES[c.area]} · {c.subarea}
        </p>
        <h1>{c.name}</h1>
        <p className="mono spot-muted">
          {c.level.map(levelLabel).join(" · ")} · {c.frequency}
        </p>
      </header>

      <section className="glass spot-panel">
        <p className="mono lp-tag">Statement</p>
        <p className="spot-statement">
          <MathText text={c.statement} />
        </p>

        <p className="mono lp-tag">Reach for it when you see</p>
        <ul className="spot-triggers">
          {c.triggers.map((tr) => (
            <li key={tr}>
              <MathText text={tr} />
            </li>
          ))}
        </ul>

        <p className="mono lp-tag">Often confused with</p>
        <div className="spot-chips">
          {c.confusable_with.map((o) => (
            <Link
              key={o}
              href={`/spot/concepts/${o}`}
              className="chip clickable"
            >
              {conceptById.get(o)?.name ?? o}
            </Link>
          ))}
        </div>

        <p className="mono lp-tag">Your record</p>
        <p className="spot-muted">
          {t ? `Spotted ${t.correct} of ${t.n}` : "Not seen in a quiz yet"}
          {card &&
            ` · box ${card.box + 1}/${LEITNER_DAYS.length}` +
              (isDue(card, Date.now())
                ? " · due now"
                : ` · next review ${new Date(card.due).toLocaleDateString()}`)}
        </p>
      </section>

      <section className="glass spot-panel">
        <p className="mono lp-tag">
          Problems that hinge on it ({problems.length})
        </p>
        {problems.length === 0 ? (
          <p className="spot-muted">
            No problems in the bank for this concept yet.
          </p>
        ) : (
          <ul className="spot-problem-list">
            {problems.map((pr) => (
              <li key={pr.id}>
                <span className="mono spot-muted">
                  {pr.id} · {LEVEL_NAMES[pr.level]}
                </span>
                <MathText text={pr.problem} />
              </li>
            ))}
          </ul>
        )}
        {c.example_refs.length > 0 && (
          <p className="spot-muted spot-ref">
            Similar contest problems: {c.example_refs.join(", ")}
          </p>
        )}
      </section>
    </div>
  );
}
