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
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

      gsap.from("[data-hero]", {
        y: reduced ? 0 : 16,
        autoAlpha: 0,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.07,
        delay: 0.1,
      });

      gsap.utils.toArray<Element>("[data-reveal]").forEach(el => {
        gsap.from(el, {
          y: reduced ? 0 : 20,
          autoAlpha: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      document.querySelectorAll("[data-step]").forEach(step => {
        ScrollTrigger.create({
          trigger: step,
          start: "top 62%",
          end: "bottom 38%",
          onToggle: self => step.classList.toggle("active", self.isActive),
        });
      });

      gsap.to("#method-rail-fill", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: "#method-steps", start: "top 70%", end: "bottom 40%", scrub: 0.4 },
      });

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

    return () => ctx.revert();
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
            <a href="#why">Why us</a>
            <a href="#curriculum">Curriculum</a>
            <a href="#pricing">Pricing</a>
            <Link href="/learn">Platform</Link>
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
              One continuous curriculum from AMC&nbsp;8 to the IMO: interactive lessons
              that gate on understanding, adaptive practice, scored mock contests, and a
              Socratic AI coach that hints but never hands you the answer.
            </p>
            <div className="hero-actions" data-hero>
              <Link className="btn btn-solid" href="/learn">Start learning free</Link>
              <a className="btn btn-ghost" href="#curriculum">See the curriculum</a>
            </div>
            <p className="hero-path mono" data-hero>
              <span>PATH</span>
              <span>AMC&nbsp;8</span><span className="sep">→</span><span>AMC&nbsp;10/12</span>
              <span className="sep">→</span><span>AIME</span><span className="sep">→</span><span>USAMO</span>
              <span className="sep">→</span><span className="accent">IMO</span>
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
              <article className="card glass plus-corners program-card wide" data-reveal>
                <p className="card-index mono">P·01</p>
                <h3>AMC 8</h3>
                <p className="card-tag">Foundations of contest thinking</p>
                <p>Number sense, clever counting, and geometric intuition. Students learn that
                  contest problems are puzzles with structure — and that structure can be found.</p>
                <ul className="chip-row" role="list">
                  <li>Number Theory</li><li>Counting</li><li>Geometry</li><li>Logic</li>
                </ul>
                <p className="card-meta mono">Grades 5–8 · Self-paced · Adaptive practice</p>
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
                <h3>USAMO</h3>
                <p className="card-tag">The art of proof</p>
                <p>Olympiad geometry, inequalities, functional equations, and number theory —
                  argued with complete rigor, written to be read.</p>
                <p className="card-meta mono">Proof-based · 6 problems · 9 hours</p>
              </article>

              <article className="card glass plus-corners program-card" data-reveal>
                <p className="card-index mono">P·05</p>
                <h3>IMO Preparation</h3>
                <p className="card-tag">The summit</p>
                <p>Modeled on national team preparation: daily problem sets, mock olympiads,
                  and AI-guided review built on frameworks from former IMO medalists.</p>
                <p className="card-meta mono">By invitation · Year-round · Self-paced</p>
              </article>

              <article className="card glass plus-corners program-card" data-reveal>
                <p className="card-index mono">P·06</p>
                <h3>Advanced Problem Solving</h3>
                <p className="card-tag">Beyond the syllabus</p>
                <p>Research-style seminars for students who have outgrown the contest calendar —
                  Putnam preparation, mathematical writing, and open problems.</p>
                <p className="card-meta mono">Post-olympiad · Seminar format · Rolling</p>
              </article>
            </div>
          </div>
        </section>

        {/* METHOD */}
        <section className="section section-tight" id="method">
          <div className="container">
            <div className="sticky-grid">
              <div className="sticky-col">
                <p className="eyebrow" data-reveal>§ 02 · The Lucid Method</p>
                <h2 data-reveal>Reasoning is<br />a discipline.</h2>
                <p className="section-sub" data-reveal>
                  Five stages, in strict logical order. Each one is a prerequisite
                  for the next — like lemmas building toward a theorem.
                </p>
                <div className="method-rail" aria-hidden="true">
                  <div className="method-rail-fill" id="method-rail-fill" />
                </div>
              </div>

              <div className="steps" id="method-steps">
                <div className="step glass" data-step>
                  <p className="step-num mono">Lemma 1</p>
                  <h3>Foundations</h3>
                  <p>Every technique rests on first principles. We rebuild algebra, geometry,
                    combinatorics, and number theory from those principles up — so nothing
                    is memorized that can instead be derived.</p>
                </div>
                <div className="step glass" data-step>
                  <p className="step-num mono">Lemma 2</p>
                  <h3>Pattern Recognition</h3>
                  <p>Students learn to see structure: invariants, symmetry, extremal cases,
                    parity. The trained instinct that turns a blank page into a plan.</p>
                </div>
                <div className="step glass" data-step>
                  <p className="step-num mono">Lemma 3</p>
                  <h3>Proof Writing</h3>
                  <p>From intuition to rigor. Students write, critique, and rewrite arguments
                    until precision becomes second nature — the skill that separates
                    AIME qualifiers from olympiad medalists.</p>
                </div>
                <div className="step glass" data-step>
                  <p className="step-num mono">Lemma 4</p>
                  <h3>Creative Problem Solving</h3>
                  <p>Non-routine problems with no labeled method. The core olympiad skill:
                    constructing an approach that did not exist before you sat down.</p>
                </div>
                <div className="step glass" data-step>
                  <p className="step-num mono">Theorem</p>
                  <h3>Timed Competition Practice</h3>
                  <p>Full simulations under authentic constraints, followed by forensic review
                    of every decision — the ones that worked, and the ones that almost did.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROBLEM */}
        <section className="section section-tight" id="problem">
          <div className="container">
            <div className="sticky-grid">
              <div className="sticky-col">
                <p className="eyebrow" data-reveal>§ 03 · Guided Reasoning</p>
                <h2 data-reveal>Reasoning,<br />not recall.</h2>
                <p className="section-sub" data-reveal>
                  Watch a competition problem dissolve under structured thought.
                  This is how every Lucid lesson works — questions, not answers,
                  until the answer is inevitable.
                </p>
                <div className="problem-card glass plus-corners" data-reveal>
                  <p className="mono problem-label">AIME-style · Number Theory</p>
                  <p className="problem-text serif-math">
                    Find the number of ordered pairs (a,&nbsp;b) of positive integers
                    such that&nbsp;lcm(a,&nbsp;b)&nbsp;=&nbsp;2<sup>3</sup>·5<sup>7</sup>.
                  </p>
                </div>
              </div>

              <div className="steps" id="problem-steps">
                <div className="step glass" data-step>
                  <p className="step-num mono">Step 1 · Observe</p>
                  <h3>Structure first</h3>
                  <p>Both a and b must divide 2<sup>3</sup>·5<sup>7</sup>, so write
                    a&nbsp;=&nbsp;2<sup>x₁</sup>5<sup>y₁</sup> and b&nbsp;=&nbsp;2<sup>x₂</sup>5<sup>y₂</sup>.
                    The problem is secretly about exponents.</p>
                </div>
                <div className="step glass" data-step>
                  <p className="step-num mono">Step 2 · Reduce</p>
                  <h3>Split by independence</h3>
                  <p>The lcm condition becomes max(x₁,&nbsp;x₂)&nbsp;=&nbsp;3 and
                    max(y₁,&nbsp;y₂)&nbsp;=&nbsp;7 — two independent conditions.
                    Count each, then multiply.</p>
                </div>
                <div className="step glass" data-step>
                  <p className="step-num mono">Step 3 · Count</p>
                  <h3>A one-line lemma</h3>
                  <p>Pairs with max(m,&nbsp;n)&nbsp;=&nbsp;k number exactly 2k&nbsp;+&nbsp;1:
                    either m&nbsp;=&nbsp;k (k&nbsp;+&nbsp;1 choices for n),
                    or n&nbsp;=&nbsp;k with m&nbsp;&lt;&nbsp;k (k more).</p>
                </div>
                <div className="step glass" data-step>
                  <p className="step-num mono">Step 4 · Conclude</p>
                  <h3>Multiply and finish</h3>
                  <p>(2·3&nbsp;+&nbsp;1)(2·7&nbsp;+&nbsp;1)&nbsp;=&nbsp;7&nbsp;×&nbsp;15.</p>
                  <p className="answer mono">Answer&nbsp;=&nbsp;105</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHY US */}
        <section className="section" id="why">
          <div className="container">
            <header className="section-head">
              <p className="eyebrow" data-reveal>§ 04 · Why Lucid</p>
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
                <p>Six programs, one trajectory: AMC 8 through IMO Prep, each stage
                  a strict prerequisite for the next.</p>
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
              <p className="eyebrow" data-reveal>§ 05 · Curriculum</p>
              <h2 data-reveal>From first principles<br />to the IMO.</h2>
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
                ["Stage 4 · USAMO", "Rigor", "Complete written proofs, graded to olympiad standard. Inequalities, olympiad geometry, functional equations."],
                ["Stage 5 · IMO", "Mastery", "Elite-level training: daily problem sets, mock olympiads, and an AI coach built on frameworks from those who have medaled."],
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
              <p className="eyebrow" data-reveal>§ 06 · Pricing</p>
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
              <p className="eyebrow" data-reveal>§ 07 · FAQ</p>
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
            <p className="eyebrow" data-reveal>§ 08 · Q.E.D.</p>
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
