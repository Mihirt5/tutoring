"use client";

// AXIOM marketing landing — ported from the original Vite build.
// One client component: cinematic Three.js canvas + GSAP scroll
// orchestration + all page sections. The platform lives at /learn.

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initScene, CAM_START, TRAVEL } from "./scene.js";

const STAGE_SECTIONS: Record<string, string> = {
  genesis: "#hero",
  platonic: "#programs",
  surface: "#method",
  euler: "#problem",
  network: "#coaches",
  primes: "#results",
  helix: "#curriculum",
  finale: "#apply",
};

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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const world = initScene(canvasRef.current);
    const tick = () => world.tick();
    gsap.ticker.add(tick);
    world.setReduced(reduced);

    const placeStages = () => {
      const doc = document.documentElement.scrollHeight - window.innerHeight;
      if (doc <= 0) return;
      for (const [name, sel] of Object.entries(STAGE_SECTIONS)) {
        const el = document.querySelector<HTMLElement>(sel);
        if (!el) continue;
        const center = el.offsetTop + el.offsetHeight / 2 - window.innerHeight / 2;
        const p = Math.min(Math.max(center / doc, 0), 1);
        world.placeStage(name, CAM_START - p * TRAVEL - 13);
      }
    };

    const onPointer = (e: PointerEvent) => {
      world.setPointer(
        (e.clientX / window.innerWidth) * 2 - 1,
        (e.clientY / window.innerHeight) * 2 - 1,
      );
    };
    if (!reduced && matchMedia("(pointer: fine)").matches) {
      window.addEventListener("pointermove", onPointer);
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: document.body,
        start: 0,
        end: () => document.documentElement.scrollHeight - window.innerHeight,
        onUpdate: self => world.setProgress(self.progress),
      });

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
        y: reduced ? 0 : 42,
        autoAlpha: 0,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.09,
        delay: 0.2,
      });

      gsap.utils.toArray<Element>("[data-reveal]").forEach(el => {
        gsap.from(el, {
          y: reduced ? 0 : 38,
          autoAlpha: 0,
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 86%", once: true },
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
        scaleY: 1,
        ease: "none",
        scrollTrigger: { trigger: "#method-steps", start: "top 70%", end: "bottom 40%", scrub: 0.4 },
      });

      document.querySelectorAll<HTMLElement>("[data-count]").forEach(el => {
        const target = parseFloat(el.dataset.count!);
        const decimals = parseInt(el.dataset.decimals || "0", 10);
        const counter = { v: 0 };
        gsap.to(counter, {
          v: target,
          duration: 2.2,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
          onUpdate: () => {
            el.textContent = decimals
              ? counter.v.toFixed(decimals)
              : Math.round(counter.v).toLocaleString("en-US");
          },
        });
      });

      gsap.to("#timeline-fill", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: "#timeline",
          start: "top 65%",
          end: "bottom 55%",
          scrub: 0.4,
          onUpdate: self => world.setRoadmap(self.progress),
        },
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

    ScrollTrigger.addEventListener("refresh", placeStages);
    placeStages();
    requestAnimationFrame(placeStages);

    return () => {
      ctx.revert();
      ScrollTrigger.removeEventListener("refresh", placeStages);
      window.removeEventListener("pointermove", onPointer);
      gsap.ticker.remove(tick);
      world.dispose();
    };
  }, []);

  return (
    <div ref={rootRef}>
      <div className="stage">
        <canvas id="bg-canvas" ref={canvasRef} aria-hidden="true" />
        <div className="stage-vignette" aria-hidden="true" />
      </div>

      <header className="nav" id="nav">
        <div className="nav-inner">
          <a className="brand" href="#top" aria-label="Axiom Institute — home">
            <BrandMark />
            <span className="brand-name">AXIOM</span>
          </a>
          <nav className="nav-links" aria-label="Primary">
            <a href="#programs">Programs</a>
            <a href="#method">Method</a>
            <a href="#coaches">Coaches</a>
            <a href="#results">Results</a>
            <a href="#curriculum">Curriculum</a>
            <a href="#pricing">Pricing</a>
            <Link href="/learn">Platform</Link>
          </nav>
          <Link className="btn btn-small btn-solid" href="/learn">Enter Academy</Link>
        </div>
        <div className="nav-progress" aria-hidden="true"><div className="nav-progress-fill" id="nav-progress-fill" /></div>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="hero" id="hero">
          <div className="container">
            <p className="eyebrow" data-hero>Axiom · Institute of Competition Mathematics</p>
            <h1 className="hero-title">
              <span className="line" data-hero>Master</span>
              <span className="line" data-hero>Competition</span>
              <span className="line" data-hero>Mathematics<span className="accent">.</span></span>
            </h1>
            <p className="hero-sub" data-hero>
              A complete learning ecosystem for competition mathematics — interactive
              lessons, adaptive practice, mock contests, and AI coaching, from
              AMC&nbsp;8 through the IMO.
            </p>
            <div className="hero-actions" data-hero>
              <Link className="btn btn-solid" href="/learn">Start Learning Free</Link>
              <a className="btn btn-ghost" href="#programs">Explore Programs</a>
            </div>
            <p className="hero-path mono" data-hero>
              AMC&nbsp;8 <span className="sep">→</span> AMC&nbsp;10/12 <span className="sep">→</span> AIME
              <span className="sep">→</span> USAMO <span className="sep">→</span> IMO
            </p>
          </div>
          <a className="scroll-cue mono" href="#programs" data-hero>
            <span>The proof begins below</span>
            <span className="cue-line" aria-hidden="true" />
          </a>
        </section>

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
                <p className="card-meta mono">Grades 5–8 · 90-min sessions · Cohorts of 6</p>
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
                <p>A training camp modeled on national team preparation: daily problem seminars,
                  mock olympiads, and individual review with former IMO medalists.</p>
                <p className="card-meta mono">By invitation · Year-round · 1:2 coaching</p>
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
                <p className="eyebrow" data-reveal>§ 02 · The Axiom Method</p>
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
                    combinatorics, and number theory from the axioms up — so nothing is
                    memorized that can instead be derived.</p>
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
                  This is how every Axiom lesson works — questions, not answers,
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
                  <p className="answer mono">Answer&nbsp;=&nbsp;105&ensp;∎</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COACHES */}
        <section className="section" id="coaches">
          <div className="container">
            <header className="section-head">
              <p className="eyebrow" data-reveal>§ 04 · The Coaches</p>
              <h2 data-reveal>Learn from those<br />who have been there.</h2>
              <p className="section-sub" data-reveal>
                Every Axiom coach has stood on the olympiad stage, published research,
                or trained national teams — most, more than one of the three.
              </p>
            </header>

            <div className="coach-grid">
              <article className="card glass coach-card" data-reveal>
                <div className="monogram" aria-hidden="true"><span>IN</span></div>
                <h3>Dr.&nbsp;Ilya Novak</h3>
                <p className="coach-cred mono">IMO Gold ×2 · PhD, Analytic Number Theory</p>
                <p>Leads the USAMO and IMO seminars. Known for reducing terrifying problems
                  to three quiet observations.</p>
                <p className="coach-focus">Number theory · Algebra</p>
              </article>
              <article className="card glass coach-card" data-reveal>
                <div className="monogram" aria-hidden="true"><span>SR</span></div>
                <h3>Dr.&nbsp;Sofia Reyes-Almeida</h3>
                <p className="coach-cred mono">EGMO Gold · Putnam Fellow · MIT PhD</p>
                <p>Runs the combinatorics track. Insists every counting argument be
                  provable two different ways before it counts.</p>
                <p className="coach-focus">Combinatorics · Probability</p>
              </article>
              <article className="card glass coach-card" data-reveal>
                <div className="monogram" aria-hidden="true"><span>DC</span></div>
                <h3>Prof.&nbsp;Daniel Cho</h3>
                <p className="coach-cred mono">National Team Deputy Leader · 15 yrs coaching</p>
                <p>Olympiad geometry specialist. Students describe his sessions as
                  &ldquo;watching a diagram confess.&rdquo;</p>
                <p className="coach-focus">Geometry · Transformations</p>
              </article>
              <article className="card glass coach-card" data-reveal>
                <div className="monogram" aria-hidden="true"><span>AO</span></div>
                <h3>Dr.&nbsp;Amara Osei</h3>
                <p className="coach-cred mono">IMO Silver · DPhil Oxford, Graph Theory</p>
                <p>Directs the AIME intensive. Builds each student a personal map of
                  exactly which fifteen skills stand between them and qualification.</p>
                <p className="coach-focus">Combinatorics · Inequalities</p>
              </article>
            </div>
          </div>
        </section>

        {/* RESULTS */}
        <section className="section" id="results">
          <div className="container">
            <header className="section-head">
              <p className="eyebrow" data-reveal>§ 05 · Student Success</p>
              <h2 data-reveal>The results are<br />a theorem, not a claim.</h2>
              <p className="section-sub" data-reveal>Outcomes across the last five competition cycles.</p>
            </header>

            <div className="stats-band glass" data-reveal>
              <div className="stat">
                <p className="stat-value"><span data-count="1200">0</span><span className="stat-suffix">+</span></p>
                <p className="stat-label mono">Students trained</p>
              </div>
              <div className="stat">
                <p className="stat-value"><span data-count="312">0</span></p>
                <p className="stat-label mono">AIME qualifiers</p>
              </div>
              <div className="stat">
                <p className="stat-value"><span data-count="87">0</span></p>
                <p className="stat-label mono">USAMO / JMO qualifiers</p>
              </div>
              <div className="stat">
                <p className="stat-value"><span data-count="24">0</span></p>
                <p className="stat-label mono">International medals</p>
              </div>
              <div className="stat">
                <p className="stat-value"><span className="stat-prefix">+</span><span data-count="21.5" data-decimals="1">0</span></p>
                <p className="stat-label mono">Avg. AMC score gain</p>
              </div>
            </div>
          </div>
        </section>

        {/* CURRICULUM */}
        <section className="section" id="curriculum">
          <div className="container">
            <header className="section-head">
              <p className="eyebrow" data-reveal>§ 06 · Curriculum</p>
              <h2 data-reveal>From axioms<br />to the IMO.</h2>
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
                ["Stage 5 · IMO", "Mastery", "National-camp-level training: daily seminars, mock olympiads, and coaching from those who have medaled."],
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

        {/* TESTIMONIALS */}
        <section className="section" id="testimonials">
          <div className="container">
            <header className="section-head">
              <p className="eyebrow" data-reveal>§ 07 · Testimonials</p>
              <h2 data-reveal>Proof by example.</h2>
            </header>
            <div className="quote-grid">
              <figure className="card glass quote" data-reveal>
                <blockquote>
                  &ldquo;I went from missing AIME by two points to USAMO qualification in fourteen
                  months. The difference was finally learning <em>why</em> techniques work,
                  not just when to use them.&rdquo;
                </blockquote>
                <figcaption className="mono">Maya L. — USAMO qualifier, ’25</figcaption>
              </figure>
              <figure className="card glass quote" data-reveal>
                <blockquote>
                  &ldquo;The proof-writing seminar changed how my son thinks — in mathematics,
                  and everywhere else. He argues carefully now. We are still deciding
                  whether to be grateful.&rdquo;
                </blockquote>
                <figcaption className="mono">Parent of an AIME qualifier, ’24</figcaption>
              </figure>
              <figure className="card glass quote" data-reveal>
                <blockquote>
                  &ldquo;Axiom’s mock olympiads were harder than the real one. Walking into the
                  IMO, I felt something I had never felt at a competition: calm.&rdquo;
                </blockquote>
                <figcaption className="mono">Jonas K. — IMO Bronze, ’24</figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section className="section" id="pricing">
          <div className="container">
            <header className="section-head">
              <p className="eyebrow" data-reveal>§ 08 · Pricing</p>
              <h2 data-reveal>Choose your intensity.</h2>
              <p className="section-sub" data-reveal>
                Every tier includes the full curriculum platform, problem bank,
                mock contests, and the AI coach.
              </p>
            </header>

            <div className="pricing-grid">
              <article className="card glass price-card" data-reveal>
                <p className="mono price-tier">Cohort</p>
                <p className="price"><span className="price-num">$290</span><span className="price-per">/month</span></p>
                <ul role="list">
                  <li>Weekly 2-hour cohort session (6 students)</li>
                  <li>Full platform: lessons, bank, contests</li>
                  <li>Monthly mock competition, scored</li>
                  <li>Written solutions to every problem</li>
                </ul>
                <Link className="btn btn-ghost btn-block" href="/learn">Start free, then apply</Link>
              </article>

              <article className="card glass price-card featured" data-reveal>
                <p className="featured-flag mono">Most chosen</p>
                <p className="mono price-tier">Intensive</p>
                <p className="price"><span className="price-num">$640</span><span className="price-per">/month</span></p>
                <ul role="list">
                  <li>Two sessions weekly, cohort of 4</li>
                  <li>Graded proof feedback, line by line</li>
                  <li>Personal curriculum roadmap + mentor</li>
                  <li>Priority coach office hours</li>
                  <li>Competition-day strategy coaching</li>
                </ul>
                <Link className="btn btn-solid btn-block" href="/learn">Start free, then apply</Link>
              </article>

              <article className="card glass price-card" data-reveal>
                <p className="mono price-tier">Private</p>
                <p className="price"><span className="price-num">$190</span><span className="price-per">/hour</span></p>
                <ul role="list">
                  <li>1-on-1 with an olympiad medalist</li>
                  <li>Fully custom curriculum &amp; pace</li>
                  <li>Unlimited written proof review</li>
                  <li>Direct coach messaging between sessions</li>
                </ul>
                <Link className="btn btn-ghost btn-block" href="/learn">Request a coach</Link>
              </article>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section" id="faq">
          <div className="container container-narrow">
            <header className="section-head">
              <p className="eyebrow" data-reveal>§ 09 · FAQ</p>
              <h2 data-reveal>Open questions.</h2>
            </header>

            <div className="faq-list">
              <FaqItem q="Who is Axiom for?">
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
              <FaqItem q="Are the cohort sessions online or in person?">
                <p>Live online, with a shared mathematical workspace built for real-time
                  collaboration on diagrams and proofs. Intensive and IMO-track students
                  gather in person twice a year for week-long camps.</p>
              </FaqItem>
              <FaqItem q="How much independent work is expected?">
                <p>Four to eight hours weekly, depending on tier. Competition mathematics is
                  learned by struggling with problems, not by watching solutions — the
                  platform exists to sharpen that struggle, not replace it.</p>
              </FaqItem>
              <FaqItem q="What results should we expect?">
                <p>We make no score guarantees — anyone who does is selling something else.
                  What we can show is the distribution: students who complete a full stage
                  of the roadmap improve their AMC score by 21.5 points on average, and
                  roughly one in four of our AIME qualifiers reaches a USAMO or JMO.</p>
              </FaqItem>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="cta" id="apply">
          <div className="container">
            <p className="eyebrow" data-reveal>§ 10 · Q.E.D.</p>
            <h2 className="cta-title" data-reveal>
              Start your journey to<br />mathematical excellence<span className="accent">.</span>
            </h2>
            <p className="section-sub cta-sub" data-reveal>
              The full curriculum, problem bank, and AI coach are open.
              Your mastery map begins with the first problem.
            </p>
            <div className="hero-actions cta-actions" data-reveal>
              <Link className="btn btn-solid btn-large" href="/learn">Enter the Academy</Link>
              <a className="btn btn-ghost btn-large" href="#programs">Review the Programs</a>
            </div>
            <p className="qed mono" data-reveal>∎</p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <a className="brand" href="#top" aria-label="Axiom Institute — home">
            <BrandMark />
            <span className="brand-name">AXIOM</span>
          </a>
          <p className="footer-note mono">Institute of Competition Mathematics · Est. on first principles</p>
          <p className="footer-copy mono">© <span suppressHydrationWarning>{new Date().getFullYear()}</span> Axiom Institute</p>
        </div>
      </footer>
    </div>
  );
}
