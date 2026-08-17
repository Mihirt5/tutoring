"use client";

// Interactive lesson diagrams — Brilliant-style manipulables.
// Each is a small SVG driven by one or two sliders. Silver ink,
// single accent, direct labels: instruments, not illustrations.

import { useState } from "react";
import type { DiagramKind } from "@/lib/types";

const ACCENT = "#4d7fff";
const INK = "#aeb8c7";
const FAINT = "rgba(255,255,255,0.14)";

function Slider({
  label, min, max, step = 1, value, onChange,
}: {
  label: string; min: number; max: number; step?: number;
  value: number; onChange: (v: number) => void;
}) {
  return (
    <label className="dg-slider">
      <span className="mono">{label}: {value}</span>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
      />
    </label>
  );
}

function NumberLine() {
  const [n, setN] = useState(50);
  const lo = Math.floor(Math.sqrt(n));
  const x = (v: number) => 40 + ((v - lo) / 1) * 320;
  const s = Math.sqrt(n);
  return (
    <div>
      <svg viewBox="0 0 400 90" className="dg-svg" role="img" aria-label={`√${n} sits between ${lo} and ${lo + 1}`}>
        <line x1="20" y1="55" x2="380" y2="55" stroke={FAINT} strokeWidth="2" />
        {[lo, lo + 1].map(v => (
          <g key={v}>
            <line x1={x(v)} y1="47" x2={x(v)} y2="63" stroke={INK} strokeWidth="2" />
            <text x={x(v)} y="82" fill={INK} fontSize="12" textAnchor="middle">{v}</text>
            <text x={x(v)} y="36" fill={INK} fontSize="10" textAnchor="middle">{v * v}</text>
          </g>
        ))}
        <circle cx={x(s)} cy="55" r="6" fill={ACCENT} />
        <text x={x(s)} y="20" fill={ACCENT} fontSize="12" textAnchor="middle">√{n} ≈ {s.toFixed(2)}</text>
      </svg>
      <Slider label="n" min={2} max={120} value={n} onChange={setN} />
    </div>
  );
}

function RatioBars() {
  const [a, setA] = useState(3);
  const [b, setB] = useState(5);
  const total = 96;
  const part = total / (a + b);
  const W = 340;
  return (
    <div>
      <svg viewBox="0 0 400 96" className="dg-svg" role="img" aria-label={`Ratio ${a}:${b} of ${total}`}>
        <rect x="30" y="18" width={(W * a) / (a + b) - 2} height="24" rx="4" fill={ACCENT} opacity="0.85" />
        <rect x={30 + (W * a) / (a + b) + 2} y="18" width={(W * b) / (a + b) - 2} height="24" rx="4" fill={INK} opacity="0.5" />
        <text x={30 + (W * a) / (a + b) / 2} y="34" fill="#fff" fontSize="12" textAnchor="middle">{(a * part).toFixed(0)}</text>
        <text x={30 + (W * a) / (a + b) + 2 + (W * b) / (a + b) / 2} y="34" fill="#fff" fontSize="12" textAnchor="middle">{(b * part).toFixed(0)}</text>
        <text x="30" y="70" fill={INK} fontSize="11">
          {a + b} parts · one part = {total}/{a + b} = {part.toFixed(1)}
        </text>
      </svg>
      <div className="dg-row">
        <Slider label="a" min={1} max={9} value={a} onChange={setA} />
        <Slider label="b" min={1} max={9} value={b} onChange={setB} />
      </div>
    </div>
  );
}

function AngleChase() {
  const [t, setT] = useState(62);
  const rad = (t * Math.PI) / 180;
  const dx = 70 * Math.cos(rad);
  const dy = 70 * Math.sin(rad);
  return (
    <div>
      <svg viewBox="0 0 400 170" className="dg-svg" role="img" aria-label={`Transversal at ${t} degrees across parallel lines`}>
        <line x1="30" y1="45" x2="370" y2="45" stroke={INK} strokeWidth="2" />
        <line x1="30" y1="125" x2="370" y2="125" stroke={INK} strokeWidth="2" />
        <line x1={200 - dx * 1.4} y1={125 + dy * 0.62} x2={200 + dx * 1.4} y2={45 - dy * 0.62} stroke={ACCENT} strokeWidth="2" />
        <text x="52" y="38" fill={INK} fontSize="10">ℓ</text>
        <text x="52" y="119" fill={INK} fontSize="10">m</text>
        <text x={215} y={38} fill={ACCENT} fontSize="12">{t}°</text>
        <text x={150} y={142} fill={ACCENT} fontSize="12">{t}° (alternate)</text>
        <text x={252} y={118} fill={INK} fontSize="12">{180 - t}° (co-interior)</text>
      </svg>
      <Slider label="angle" min={25} max={155} value={t} onChange={setT} />
    </div>
  );
}

function SimilarTriangles() {
  const [k, setK] = useState(2);
  const base = 60;
  const h = 44;
  const tri = (x: number, y: number, s: number, fill: string) =>
    `${x},${y} ${x + base * s},${y} ${x + base * s * 0.7},${y - h * s}`;
  return (
    <div>
      <svg viewBox="0 0 400 150" className="dg-svg" role="img" aria-label={`Similar triangles with scale ${k}`}>
        <polygon points={tri(30, 130, 1, "")} fill="none" stroke={INK} strokeWidth="2" />
        <polygon points={tri(140, 130, k, "")} fill="none" stroke={ACCENT} strokeWidth="2" />
        <text x="45" y="145" fill={INK} fontSize="11">area 1</text>
        <text x={150 + (base * k) / 2} y="145" fill={ACCENT} fontSize="11">
          sides ×{k} → area ×{(k * k).toFixed(2).replace(/\.00$/, "")}
        </text>
      </svg>
      <Slider label="scale k" min={1} max={3} step={0.25} value={k} onChange={setK} />
    </div>
  );
}

function GridPaths() {
  const [n, setN] = useState(4);
  const cell = Math.min(34, 150 / n);
  const C = (r: number, c: number): number => {
    // binomial C(r+c, r)
    let res = 1;
    for (let i = 1; i <= r; i++) res = (res * (c + i)) / i;
    return Math.round(res);
  };
  return (
    <div>
      <svg viewBox="0 0 400 190" className="dg-svg" role="img" aria-label={`Lattice path counts on a ${n}×${n} grid`}>
        {Array.from({ length: n + 1 }, (_, r) =>
          Array.from({ length: n + 1 }, (_, c) => (
            <g key={`${r}-${c}`}>
              <rect
                x={40 + c * cell} y={160 - (r + 1) * cell} width={cell - 3} height={cell - 3}
                rx="4" fill={r === n && c === n ? ACCENT : "rgba(255,255,255,0.05)"}
              />
              <text
                x={40 + c * cell + (cell - 3) / 2} y={160 - (r + 1) * cell + (cell - 3) / 2 + 4}
                fill={r === n && c === n ? "#fff" : INK} fontSize={cell > 26 ? 11 : 9} textAnchor="middle"
              >
                {C(r, c)}
              </text>
            </g>
          )),
        )}
      </svg>
      <Slider label="grid n" min={2} max={6} value={n} onChange={setN} />
    </div>
  );
}

function ModClock() {
  const [mod, setMod] = useState(7);
  const [stride, setStride] = useState(3);
  const cx = 200, cy = 88, R = 62;
  const pos = (i: number) => {
    const a = (i / mod) * Math.PI * 2 - Math.PI / 2;
    return [cx + R * Math.cos(a), cy + R * Math.sin(a)] as const;
  };
  const orbit: number[] = [];
  let cur = 0;
  do { orbit.push(cur); cur = (cur + stride) % mod; } while (cur !== 0 && orbit.length <= mod);
  return (
    <div>
      <svg viewBox="0 0 400 180" className="dg-svg" role="img" aria-label={`Stride ${stride} orbit mod ${mod}`}>
        <circle cx={cx} cy={cy} r={R} fill="none" stroke={FAINT} strokeWidth="1.5" />
        {orbit.map((v, i) => {
          const [x1, y1] = pos(v);
          const [x2, y2] = pos(orbit[(i + 1) % orbit.length]);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={ACCENT} strokeWidth="1.5" opacity="0.7" />;
        })}
        {Array.from({ length: mod }, (_, i) => {
          const [x, y] = pos(i);
          const hit = orbit.includes(i);
          return (
            <g key={i}>
              <circle cx={x} cy={y} r="10" fill={hit ? ACCENT : "rgba(255,255,255,0.07)"} />
              <text x={x} y={y + 4} fill={hit ? "#fff" : INK} fontSize="11" textAnchor="middle">{i}</text>
            </g>
          );
        })}
        <text x="200" y="172" fill={INK} fontSize="11" textAnchor="middle">
          0 → +{stride} → … visits {orbit.length} of {mod} positions
        </text>
      </svg>
      <div className="dg-row">
        <Slider label="mod n" min={5} max={12} value={mod} onChange={setMod} />
        <Slider label="stride" min={1} max={9} value={stride} onChange={setStride} />
      </div>
    </div>
  );
}

function ParabolaVieta() {
  const [r, setR] = useState(-2);
  const [s, setS] = useState(3);
  const sum = r + s;
  const prod = r * s;
  const X = (v: number) => 200 + v * 28;
  const Y = (v: number) => 100 - v * 7;
  const pts: string[] = [];
  for (let x = -6; x <= 6; x += 0.2) {
    const y = (x - r) * (x - s);
    if (Math.abs(y) < 15) pts.push(`${X(x)},${Y(y)}`);
  }
  return (
    <div>
      <svg viewBox="0 0 400 180" className="dg-svg" role="img" aria-label={`Parabola with roots ${r} and ${s}`}>
        <line x1="20" y1={Y(0)} x2="380" y2={Y(0)} stroke={FAINT} strokeWidth="1.5" />
        <line x1={X(0)} y1="10" x2={X(0)} y2="170" stroke={FAINT} strokeWidth="1.5" />
        <polyline points={pts.join(" ")} fill="none" stroke={ACCENT} strokeWidth="2" />
        {[r, s].map((v, i) => (
          <g key={i}>
            <circle cx={X(v)} cy={Y(0)} r="5" fill={ACCENT} />
            <text x={X(v)} y={Y(0) + 18} fill={INK} fontSize="11" textAnchor="middle">{v}</text>
          </g>
        ))}
        <text x="24" y="24" fill={INK} fontSize="12">
          x² − ({sum})x + ({prod})  ·  sum {sum}, product {prod}
        </text>
      </svg>
      <div className="dg-row">
        <Slider label="root r" min={-5} max={5} value={r} onChange={setR} />
        <Slider label="root s" min={-5} max={5} value={s} onChange={setS} />
      </div>
    </div>
  );
}

function EvSpinner() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(4);
  const [c, setC] = useState(10);
  const ev = (a + b + c) / 3;
  const seg = (i: number, val: number, color: string, op: number) => {
    const a0 = (i / 3) * Math.PI * 2 - Math.PI / 2;
    const a1 = ((i + 1) / 3) * Math.PI * 2 - Math.PI / 2;
    const cx = 110, cy = 90, R = 58;
    const p0 = [cx + R * Math.cos(a0), cy + R * Math.sin(a0)];
    const p1 = [cx + R * Math.cos(a1), cy + R * Math.sin(a1)];
    const mid = (a0 + a1) / 2;
    return (
      <g key={i}>
        <path
          d={`M ${cx} ${cy} L ${p0[0]} ${p0[1]} A ${R} ${R} 0 0 1 ${p1[0]} ${p1[1]} Z`}
          fill={color} opacity={op} stroke="#0b0e14" strokeWidth="2"
        />
        <text x={cx + R * 0.6 * Math.cos(mid)} y={cy + R * 0.6 * Math.sin(mid) + 4}
          fill="#fff" fontSize="13" textAnchor="middle">{val}</text>
      </g>
    );
  };
  const X = (v: number) => 210 + (v / 12) * 165;
  return (
    <div>
      <svg viewBox="0 0 400 180" className="dg-svg" role="img" aria-label={`Spinner with payoffs ${a}, ${b}, ${c}; expected value ${ev.toFixed(2)}`}>
        {seg(0, a, "#4d7fff", 0.9)}
        {seg(1, b, "#4d7fff", 0.55)}
        {seg(2, c, "#4d7fff", 0.3)}
        <line x1={X(0)} y1="120" x2={X(12)} y2="120" stroke={FAINT} strokeWidth="2" />
        {[a, b, c].map((v, i) => (
          <circle key={i} cx={X(v)} cy="120" r="4" fill={INK} />
        ))}
        <line x1={X(ev)} y1="104" x2={X(ev)} y2="136" stroke={ACCENT} strokeWidth="2" />
        <text x={X(ev)} y="96" fill={ACCENT} fontSize="12" textAnchor="middle">E = {ev.toFixed(2)}</text>
        <text x="292" y="150" fill={INK} fontSize="10" textAnchor="middle">equally likely payoffs → E is their mean</text>
      </svg>
      <div className="dg-row">
        <Slider label="payoff A" min={0} max={12} value={a} onChange={setA} />
        <Slider label="payoff B" min={0} max={12} value={b} onChange={setB} />
        <Slider label="payoff C" min={0} max={12} value={c} onChange={setC} />
      </div>
    </div>
  );
}

export function Diagram({ kind }: { kind: DiagramKind }) {
  switch (kind) {
    case "number-line": return <NumberLine />;
    case "ratio-bars": return <RatioBars />;
    case "angle-chase": return <AngleChase />;
    case "similar-triangles": return <SimilarTriangles />;
    case "grid-paths": return <GridPaths />;
    case "mod-clock": return <ModClock />;
    case "parabola-vieta": return <ParabolaVieta />;
    case "ev-spinner": return <EvSpinner />;
  }
}
