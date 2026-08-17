"use client";

import Link from "next/link";
import { PATHS } from "@/content/curriculum";
import { TRACKS, trackById } from "@/content/tracks";
import { TOPICS } from "@/content/topics";
import { useProgress, setTrack } from "@/lib/store";
import { readiness, predictScore } from "@/lib/engine/predictor";
import { recommendLessons } from "@/lib/engine/recommend";
import { Ring } from "@/components/charts";

export default function LearnPage() {
  const p = useProgress();
  const track = trackById.get(p.track) ?? TRACKS[2];
  const recs = recommendLessons(p, track, 3);

  const pathMastery = (pathId: string) => {
    const topics = TOPICS.filter(t => t.pathId === pathId);
    const rated = topics.map(t => p.mastery[t.id]?.rating ?? 0);
    return rated.length ? rated.reduce((a, b) => a + b, 0) / rated.length : 0;
  };

  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">Curriculum</p>
        <h1>The ascent, mapped.</h1>
        <p className="page-sub">
          Seven learning paths from arithmetic to olympiad thought. Your track sets
          the destination; the engine recommends the next step.
        </p>
      </header>

      <section className="learn-track glass">
        <div className="learn-track-info">
          <p className="mono lp-tag">Your competition track</p>
          <div className="learn-track-picker">
            {TRACKS.map(t => (
              <button
                key={t.id}
                className={`chip clickable mono${t.id === p.track ? " active" : ""}`}
                onClick={() => setTrack(t.id)}
              >
                {t.short}
              </button>
            ))}
          </div>
          <p className="learn-track-pred">
            Predicted {track.name}: <strong>{predictScore(track, p.mastery)}</strong>
            <span className="mono"> / {track.officialMax}</span>
          </p>
        </div>
        <Ring value={readiness(track, p.mastery)} label="readiness" />
        <div className="learn-recs">
          <p className="mono lp-tag">Recommended next</p>
          {recs.map(l => (
            <Link key={l.slug} className="learn-rec" href={`/lesson/${l.slug}`}>
              <span>{l.title}</span>
              <span className="mono">{l.status === "full" ? `~${l.estMinutes} min →` : "outline"}</span>
            </Link>
          ))}
        </div>
      </section>

      <div className="path-grid">
        {PATHS.map((path, i) => {
          const lessons = path.units.flatMap(u => u.lessons);
          const done = lessons.filter(l => p.lessons[l.slug]?.completed).length;
          const mastery = pathMastery(path.id);
          return (
            <Link key={path.id} href={`/learn/${path.id}`} className="path-card glass plus-corners">
              <p className="card-index mono">PATH·{String(i + 1).padStart(2, "0")}</p>
              <h2>{path.title}</h2>
              <p className="card-tag">{path.tagline}</p>
              <p className="path-desc">{path.description}</p>
              <div className="path-meter" title={`Average topic rating: ${Math.round(mastery)}/100`}>
                <span style={{ width: `${Math.max(2, mastery)}%` }} />
              </div>
              <p className="card-meta mono">
                {done}/{lessons.length} lessons complete · rating {Math.round(mastery)}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
