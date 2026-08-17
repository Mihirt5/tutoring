"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { pathById } from "@/content/curriculum";
import { topicName } from "@/content/topics";
import { useProgress } from "@/lib/store";
import { prereqsMet } from "@/lib/engine/recommend";

export default function PathPage() {
  const { path: pathId } = useParams<{ path: string }>();
  const path = pathById.get(pathId);
  const p = useProgress();

  if (!path) {
    return (
      <div className="page"><p>Unknown path. <Link href="/learn" className="accent">Back to curriculum</Link></p></div>
    );
  }

  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow"><Link href="/learn">Curriculum</Link> · {path.title}</p>
        <h1>{path.title}</h1>
        <p className="page-sub">{path.description}</p>
      </header>

      {path.units.map(unit => (
        <section key={unit.id} className="unit">
          <h2 className="unit-title">{unit.title}</h2>
          <div className="unit-lessons">
            {unit.lessons.map(l => {
              const done = p.lessons[l.slug]?.completed;
              const unlocked = prereqsMet(l, p);
              return (
                <Link
                  key={l.slug}
                  href={`/lesson/${l.slug}`}
                  className={`lesson-card glass${done ? " done" : ""}${!unlocked ? " locked" : ""}`}
                >
                  <div className="lesson-card-top">
                    <span className="mono lesson-card-meta">
                      {topicName(l.topicId)} · d{l.difficulty} · ~{l.estMinutes}m
                    </span>
                    <span className="mono lesson-card-state">
                      {done ? "✓ complete" : l.status === "full" ? "interactive" : "outline"}
                    </span>
                  </div>
                  <h3>{l.title}</h3>
                  <p className="lesson-card-sum">{l.summary}</p>
                  <ul className="lesson-card-obj">
                    {l.objectives.slice(0, 3).map(o => <li key={o}>{o}</li>)}
                  </ul>
                  {!unlocked && (
                    <p className="mono lesson-card-lock">
                      prerequisite: {l.prereqs.filter(pr => !p.lessons[pr]?.completed).join(", ")}
                    </p>
                  )}
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
