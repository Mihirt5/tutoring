"use client";

// LUCID marketing landing. One client component: a restrained lattice
// hero backdrop + GSAP scroll orchestration + all page sections.
// The platform lives at /learn.

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroLattice } from "./HeroLattice";

function BrandMark() {
  return (
    <svg className="brand-mark" viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="13" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.55" />
      <path d="M16 6 L25.5 22 L6.5 22 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function FaqItem({ q, children }: { q: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item glass${open ? " open" : ""}`} data-reveal>
      <button className="faq-q" aria-expanded={open} onClick={() => setOpen(o => !o)}>
        <span>{q}</span>
        <span className="faq-mark mono" aria-hidden="true">+</span>
      </button>
      <div className="faq-a">
        <div className="faq-a-inner">{children}</div>
      </div>
    </div>
  );
}

export default function Landing() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Section reveals: a plain observer, independent of the rAF loop.
    // (The hero entrance is pure CSS — see globals.css.)
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));

    const ctx = gsap.context(() => {
      const nav = document.getElementById("nav")!;
      ScrollTrigger.create({
        start: 40,
        onEnter: () => nav.classList.add("scrolled"),
        onLeaveBack: () => nav.classList.remove("scrolled"),
      });

      gsap.to("#nav-progress-fill", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: document.body, start: 0, end: "max", scrub: 0.3 },
      });

      // Method strip: pin the section and sweep the highlighted lemma across
      // the row as the user scrolls through it. Below 900px the strip wraps
      // to a plain stack, so the scroll-jack is desktop-only.
      const methodSteps = gsap.utils.toArray<HTMLElement>("#method-steps [data-step]");
      if (methodSteps.length) {
        methodSteps[0].classList.add("active");

        ScrollTrigger.matchMedia({
          "(min-width: 901px)": () => {
            const scrollDistance = methodSteps.length * 360;

            ScrollTrigger.create({
              trigger: ".method-section",
              start: "top top+=64",
              end: "+=" + scrollDistance,
              pin: true,
              scrub: 0.5,
              onUpdate: self => {
                const idx = Math.min(
                  methodSteps.length - 1,
                  Math.floor(self.progress * methodSteps.length),
                );
                methodSteps.forEach((el, i) => el.classList.toggle("active", i === idx));
              },
            });

            gsap.to("#method-rail-fill", {
              scaleX: 1,
              ease: "none",
              scrollTrigger: { trigger: ".method-section", start: "top top", end: "+=" + scrollDistance, scrub: 0.5 },
            });
          },
        });
      }

      gsap.to("#timeline-fill", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: { trigger: "#timeline", start: "top 65%", end: "bottom 55%", scrub: 0.4 },
      });

      document.querySelectorAll(".milestone").forEach(m => {
        ScrollTrigger.create({
          trigger: m,
          start: "top 62%",
          onEnter: () => m.classList.add("lit"),
          onLeaveBack: () => m.classList.remove("lit"),
        });
      });
    }, rootRef);

    return () => {
      io.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <div ref={rootRef}>
      <header className="nav" id="nav">
        <div className="nav-inner">
          <a className="brand" href="#top" aria-label="Lucid Institute — home">
            <BrandMark />
            <span className="brand-name">LUCID</span>
          </a>
          <nav className="nav-links" aria-label="Primary">
            <a href="#programs">Programs</a>
            <a href="#method">Method</a>
            <a href="#curriculum">Curriculum</a>
            <a href="#pricing">Pricing</a>
          </nav>
          <div className="nav-actions">
            <Link className="btn btn-small btn-ghost" href="/login">Log in</Link>
            <Link className="btn btn-small btn-solid" href="/learn">Enter the platform</Link>
          </div>
        </div>
        <div className="nav-progress" aria-hidden="true"><div className="nav-progress-fill" id="nav-progress-fill" /></div>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="hero" id="hero">
          <HeroLattice />
          <div className="container">
            <p className="eyebrow" data-hero>Institute of Competition Mathematics</p>
            <h1 className="hero-title">
              <span className="line" data-hero>Learn competition math</span>
              <span className="line" data-hero>by solving, not watching<span className="accent">.</span></span>
            </h1>
            <p className="hero-sub" data-hero>
              One continuous curriculum from AMC&nbsp;8 to advanced problem solving: interactive
              lessons that gate on understanding, adaptive practice, scored mock contests, and a
              Socratic AI coach that hints but never hands you the answer.
            </p>
            <div className="hero-actions" data-hero>
              <Link className="btn btn-solid" href="/learn">Start learning free</Link>
              <a className="btn btn-ghost" href="#curriculum">See the curriculum</a>
            </div>
            <p className="hero-path mono" data-hero>
              <span>PATH</span>
              <span>AMC&nbsp;8</span><span className="sep">→</span><span>AMC&nbsp;10/12</span>
              <span className="sep">→</span><span>AIME</span><span className="sep">→</span><span>USAMTS</span>
              <span className="sep">→</span><span className="accent">Problem Solving</span>
            </p>
          </div>
        </section>

        {/* TRUST STRIP */}
        <div className="trust-strip">
          <div className="container">
            <span className="trust-label">Built for the full climb</span>
            <div className="trust-figs">
              <span><strong>58</strong> lessons</span>
              <span><strong>104</strong> original problems</span>
              <span><strong>7</strong> contest tracks</span>
              <span><strong>$5</strong>/mo to start</span>
            </div>
          </div>
        </div>

        {/* PROGRAMS */}
        <section className="section" id="programs">
          <div className="container">
            <header className="section-head">
              <p className="eyebrow" data-reveal>§ 01 · Programs</p>
              <h2 data-reveal>Six programs.<br />One trajectory.</h2>
              <p className="section-sub" data-reveal>
                Every program is a stage of the same ascent — from first principles to
                the frontier of pre-college mathematics.
              </p>
            </header>

            <div className="programs-grid">
              <article className="card glass plus-corners program-card" data-reveal>
                <p className="card-index mono">P·01</p>
                <h3>AMC 8</h3>
                <p className="card-tag">Foundations of contest thinking</p>
                <p>Number sense, clever counting, and geometric intuition — contest problems
                  as puzzles with findable structure.</p>
                <ul className="chip-row" role="list">
                  <li>Number Theory</li><li>Counting</li><li>Geometry</li>
                </ul>
                <p className="card-meta mono">Grades 5–8 · Self-paced</p>
              </article>

              <article className="card glass plus-corners program-card" data-reveal>
                <p className="card-index mono">P·02</p>
                <h3>AMC 10/12</h3>
                <p className="card-tag">Speed, precision, depth</p>
                <p>Algebraic technique, combinatorial identities, and trigonometry executed
                  cleanly under time pressure.</p>
                <p className="card-meta mono">Grades 8–12 · 25 problems · 75 minutes</p>
              </article>

              <article className="card glass plus-corners program-card" data-reveal>
                <p className="card-index mono">P·03</p>
                <h3>AIME</h3>
                <p className="card-tag">Where problems become puzzles</p>
                <p>Multi-step problems demanding synthesis across domains. We train the
                  decomposition instinct: reduce, transform, conquer.</p>
                <p className="card-meta mono">Invitational · 15 problems · 3 hours</p>
              </article>

              <article className="card glass plus-corners program-card" data-reveal>
                <p className="card-index mono">P·04</p>
                <h3>USAMTS</h3>
                <p className="card-tag">The art of proof</p>
                <p>Take-home, untimed rounds argued with complete rigor. The talent-search
                  format that rewards a clean write-up over a fast guess.</p>
                <p className="card-meta mono">Proof-based · Take-home · Untimed</p>
              </article>

              <article className="card glass plus-corners program-card" data-reveal>
                <p className="card-index mono">P·05</p>
                <h3>Problem Solving</h3>
                <p className="card-tag">Standardized test math</p>
                <p>SAT and ACT-style math built on the same reasoning habits — fast,
                  accurate technique applied to a different clock.</p>
                <p className="card-meta mono">Grades 8–12 · Self-paced · Adaptive practice</p>
              </article>

              <article className="card glass plus-corners program-card" data-reveal>
                <p className="card-index mono">P·06</p>
                <h3>Advanced Problem Solving</h3>
                <p className="card-tag">Beyond the syllabus</p>
                <p>For students who have finished the core curriculum — open-ended, non-routine
                  problems with no labeled method and no single right approach.</p>
                <p className="card-meta mono">Post-curriculum · Seminar format · Rolling</p>
              </article>
            </div>
          </div>
        </section>

        {/* METHOD */}
        <section className="section section-tight method-section" id="method">
          <div className="container">
            <header className="section-head">
              <p className="eyebrow" data-reveal>§ 02 · The Lucid Method</p>
              <h2 data-reveal>Reasoning is<br />a discipline.</h2>
              <p className="section-sub" data-reveal>
                Five stages, in strict logical order. Each one is a prerequisite
                for the next — like lemmas building toward a theorem.
              </p>
              <div className="method-rail" aria-hidden="true">
                <div className="method-rail-fill" id="method-rail-fill" />
              </div>
            </header>

            <div className="method-strip" id="method-steps">
              <div className="method-card glass" data-step>
                <p className="step-num mono">Lemma 1</p>
                <h3>Foundations</h3>
                <p>School mathematics rebuilt from first principles, so nothing is
                  memorized that can instead be derived.</p>
              </div>
              <div className="method-card glass" data-step>
                <p className="step-num mono">Lemma 2</p>
                <h3>Pattern Recognition</h3>
                <p>Seeing structure: invariants, symmetry, extremal cases, parity —
                  the instinct that turns a blank page into a plan.</p>
              </div>
              <div className="method-card glass" data-step>
                <p className="step-num mono">Lemma 3</p>
                <h3>Proof Writing</h3>
                <p>From intuition to rigor — write, critique, and rewrite arguments
                  until precision becomes second nature.</p>
              </div>
              <div className="method-card glass" data-step>
                <p className="step-num mono">Lemma 4</p>
                <h3>Creative Problem Solving</h3>
                <p>Non-routine problems with no labeled method — constructing an
                  approach that did not exist before you sat down.</p>
              </div>
              <div className="method-card glass" data-step>
                <p className="step-num mono">Theorem</p>
                <h3>Timed Competition Practice</h3>
                <p>Full simulations under authentic constraints, then forensic
                  review of every decision.</p>
              </div>
            </div>
          </div>
        </section>

        {/* WHY US */}
        <section className="section" id="why">
          <div className="container">
            <header className="section-head">
              <p className="eyebrow" data-reveal>§ 03 · Why Lucid</p>
              <h2 data-reveal>Built differently.</h2>
              <p className="section-sub" data-reveal>
                No cohorts to keep up with and no coach to schedule around — just you,
                the curriculum, and an AI that won&rsquo;t let you fake understanding.
              </p>
            </header>

            <div className="why-grid">
              <article className="card glass why-card" data-reveal>
                <div className="why-icon" aria-hidden="true"><span>∂</span></div>
                <h3>100% virtual, always on</h3>
                <p>Every lesson, problem, and mock contest lives on the platform.
                  Log in whenever you have twenty minutes — there&rsquo;s no seat to book.</p>
              </article>
              <article className="card glass why-card" data-reveal>
                <div className="why-icon" aria-hidden="true"><span>λ</span></div>
                <h3>Coached, not lectured</h3>
                <p>The AI coach asks before it answers — Socratic hints, never the
                  final answer, so understanding is earned, not copied.</p>
              </article>
              <article className="card glass why-card" data-reveal>
                <div className="why-icon" aria-hidden="true"><span>Σ</span></div>
                <h3>One continuous curriculum</h3>
                <p>Six programs, one trajectory: AMC 8 through advanced problem solving,
                  each stage a strict prerequisite for the next.</p>
              </article>
              <article className="card glass why-card" data-reveal>
                <div className="why-icon" aria-hidden="true"><span>$</span></div>
                <h3>Priced like software</h3>
                <p>Plans start at $5/month — a virtual platform shouldn&rsquo;t cost
                  what an hour of private tutoring does.</p>
              </article>
            </div>
          </div>
        </section>

        {/* CURRICULUM */}
        <section className="section" id="curriculum">
          <div className="container">
            <header className="section-head">
              <p className="eyebrow" data-reveal>§ 04 · Curriculum</p>
              <h2 data-reveal>From first principles<br />to advanced problem solving.</h2>
              <p className="section-sub" data-reveal>
                A single continuous path. Each milestone unlocks the next —
                no stage skipped, no gap left unproved.
              </p>
            </header>

            <div className="timeline" id="timeline">
              <div className="timeline-rail" aria-hidden="true"><div className="timeline-fill" id="timeline-fill" /></div>

              {[
                ["Stage 0 · Months 0–6", "Foundations", "Rigorous re-derivation of school mathematics. Fluency drills, first proofs, and the habit of asking why."],
                ["Stage 1 · AMC 8", "Contest Fluency", "First exposure to competition structure. Speed with accuracy, pattern libraries, honest error analysis."],
                ["Stage 2 · AMC 10/12", "Technique Under Pressure", "The full toolbox — Vieta, telescoping, mass points, generating intuitions — executed in 75 minutes."],
                ["Stage 3 · AIME", "Synthesis", "Problems that cross domain boundaries. Decomposition strategy, answer-extraction discipline, three-hour endurance."],
                ["Stage 4 · USAMTS", "Rigor", "Complete written proofs on take-home, untimed rounds. Precision and clarity replace speed as the constraint."],
                ["Stage 5 · Problem Solving", "Mastery", "Open-ended, non-routine problems and standardized test math — reasoning habits applied to any clock, any format."],
              ].map(([stage, title, body]) => (
                <div className="milestone" data-reveal key={stage}>
                  <div className="milestone-node" aria-hidden="true" />
                  <div className="milestone-card glass">
                    <p className="mono milestone-stage">{stage}</p>
                    <h3>{title}</h3>
                    <p>{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section className="section" id="pricing">
          <div className="container">
            <header className="section-head">
              <p className="eyebrow" data-reveal>§ 05 · Pricing</p>
              <h2 data-reveal>Choose your intensity.</h2>
              <p className="section-sub" data-reveal>
                Every tier includes the full curriculum platform, problem bank,
                mock contests, and the AI coach.
              </p>
            </header>

            <div className="pricing-grid">
              <article className="card glass price-card" data-reveal>
                <p className="mono price-tier">Starter</p>
                <p className="price"><span className="price-num">$5</span><span className="price-per">/month</span></p>
                <ul role="list">
                  <li>Full curriculum platform: lessons, bank, contests</li>
                  <li>AI coach, Socratic hints on every problem</li>
                  <li>Monthly mock competition, scored</li>
                  <li>Progress tracking &amp; mastery roadmap</li>
                </ul>
                <Link className="btn btn-ghost btn-block" href="/signup">Start free</Link>
              </article>

              <article className="card glass price-card featured" data-reveal>
                <p className="featured-flag mono">Most chosen</p>
                <p className="mono price-tier">Plus</p>
                <p className="price"><span className="price-num">$10</span><span className="price-per">/month</span></p>
                <ul role="list">
                  <li>Everything in Starter</li>
                  <li>Unlimited AI coach access</li>
                  <li>Weekly mock competitions, scored</li>
                  <li>Written solutions to every problem</li>
                  <li>Full progress analytics</li>
                </ul>
                <Link className="btn btn-solid btn-block" href="/signup">Get Plus</Link>
              </article>

              <article className="card glass price-card" data-reveal>
                <p className="mono price-tier">Pro</p>
                <p className="price"><span className="price-num">$15</span><span className="price-per">/month</span></p>
                <ul role="list">
                  <li>Everything in Plus</li>
                  <li>Priority AI coach, deeper proof review</li>
                  <li>Competition-day strategy guides</li>
                  <li>Early access to new content</li>
                </ul>
                <Link className="btn btn-ghost btn-block" href="/signup">Get Pro</Link>
              </article>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section" id="faq">
          <div className="container container-narrow">
            <header className="section-head">
              <p className="eyebrow" data-reveal>§ 06 · FAQ</p>
              <h2 data-reveal>Open questions.</h2>
            </header>

            <div className="faq-list">
              <FaqItem q="Who is Lucid for?">
                <p>Students in grades 5–12 who want to compete seriously in mathematics —
                  from first-time AMC 8 entrants to students preparing for national olympiad
                  selection. Ambition matters more than current level; the platform places
                  you by trajectory, not trophy case.</p>
              </FaqItem>
              <FaqItem q="My student has never done a competition. Where do they start?">
                <p>With the free platform. The adaptive engine measures reasoning habits
                  rather than syllabus coverage and recommends the exact entry point on the
                  curriculum roadmap — no placement test anxiety required.</p>
              </FaqItem>
              <FaqItem q="How does the platform differ from watching video courses?">
                <p>Nothing here is passive. Every lesson is built from interactive blocks —
                  intuition, guided discovery, inline checks that gate progression, worked
                  examples that reveal step by step, and practice with escalating hints.
                  You cannot scrub to the end.</p>
              </FaqItem>
              <FaqItem q="Is this self-paced, or are there scheduled sessions?">
                <p>Entirely self-paced and 100% virtual. There's no cohort to keep up with
                  and no seat to book — every lesson, problem set, and mock contest is on
                  the platform whenever you are, and the AI coach is there the moment you
                  get stuck.</p>
              </FaqItem>
              <FaqItem q="How much independent work is expected?">
                <p>Four to eight hours weekly, depending on tier. Competition mathematics is
                  learned by struggling with problems, not by watching solutions — the
                  platform exists to sharpen that struggle, not replace it.</p>
              </FaqItem>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="cta" id="apply">
          <div className="container">
            <p className="eyebrow" data-reveal>§ 07 · Q.E.D.</p>
            <h2 className="cta-title" data-reveal>
              Start with one problem<span className="accent">.</span>
            </h2>
            <p className="section-sub cta-sub" data-reveal>
              The full curriculum, problem bank, and AI coach are open — free to start,
              no card required.
            </p>
            <div className="hero-actions cta-actions" data-reveal>
              <Link className="btn btn-solid btn-large" href="/learn">Enter the platform</Link>
              <a className="btn btn-ghost btn-large" href="#programs">Review the programs</a>
            </div>
            <span className="qed" data-reveal aria-hidden="true" />
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <a className="brand" href="#top" aria-label="Lucid Institute — home">
            <BrandMark />
            <span className="brand-name">LUCID</span>
          </a>
          <p className="footer-note mono">Institute of Competition Mathematics · Est. on first principles</p>
          <p className="footer-copy mono">© <span suppressHydrationWarning>{new Date().getFullYear()}</span> Lucid Institute</p>
        </div>
      </footer>
    </div>
  );
}
