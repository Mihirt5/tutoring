"use client";

// Dashboard charts — hand-rolled, single-hue sequential encodings,
// direct labels, recessive grid. Light surface, blue-monochrome ramp.
//   accent #2563eb · good #12855a · neutral #6c9cf2 · serious #d23f3f

export const CHART = {
  accent: "#2563eb",
  good: "#12855a",
  neutral: "#6c9cf2",
  serious: "#d23f3f",
  ink: "#8393a8",
  track: "#eef3f9",
};

/** Horizontal magnitude bar with direct label. */
export function BarRow({
  label, value, max, sublabel, color = CHART.accent,
}: {
  label: string; value: number; max: number; sublabel?: string; color?: string;
}) {
  const pct = Math.max(2, Math.min(100, (value / max) * 100));
  return (
    <div className="ch-barrow" title={`${label}: ${Math.round(value)} / ${max}`}>
      <span className="ch-bar-label">{label}</span>
      <span className="ch-bar-track">
        <span className="ch-bar-fill" style={{ width: `${pct}%`, background: color }} />
      </span>
      <span className="ch-bar-value mono">{Math.round(value)}{sublabel ? ` ${sublabel}` : ""}</span>
    </div>
  );
}

/** Sequential heatmap cell color: one hue, pale→saturated by magnitude. */
export function heatColor(v: number): string {
  // v ∈ [0,1] → tint of the accent on the light surface (kept pale enough
  // that --ink text stays readable on every step)
  const alpha = 0.06 + Math.max(0, Math.min(1, v)) * 0.5;
  return `rgba(37, 99, 235, ${alpha.toFixed(2)})`;
}

/** Activity bars: minutes per day, last `days` days. */
export function ActivityBars({
  minutesByDay, days = 28,
}: {
  minutesByDay: Record<string, number>; days?: number;
}) {
  const today = new Date();
  const cells: { key: string; label: string; v: number }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today.getTime() - i * 86400000);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    cells.push({
      key,
      label: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      v: minutesByDay[key] ?? 0,
    });
  }
  const max = Math.max(30, ...cells.map(c => c.v));
  return (
    <div className="ch-activity" role="img" aria-label={`Study minutes per day, last ${days} days`}>
      {cells.map(c => (
        <div className="ch-act-col" key={c.key} title={`${c.label}: ${Math.round(c.v)} min`}>
          <div className="ch-act-track">
            <div
              className="ch-act-fill"
              style={{ height: `${Math.max(c.v > 0 ? 6 : 0, (c.v / max) * 100)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/** Ring gauge for readiness / probability. */
export function Ring({ value, label, size = 92 }: { value: number; label: string; size?: number }) {
  const r = (size - 10) / 2;
  const C = 2 * Math.PI * r;
  const v = Math.max(0, Math.min(1, value));
  return (
    <div className="ch-ring" style={{ width: size }}>
      <svg width={size} height={size} role="img" aria-label={`${label}: ${Math.round(v * 100)}%`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={CHART.track} strokeWidth="6" />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={CHART.accent} strokeWidth="6" strokeLinecap="round"
          strokeDasharray={`${C * v} ${C}`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        <text x="50%" y="50%" dy="0.35em" textAnchor="middle" fill="#0f1b2d"
          fontSize={size / 4.6} fontWeight="600" fontFamily="var(--font-display)">
          {Math.round(v * 100)}%
        </text>
      </svg>
      <p className="ch-ring-label mono">{label}</p>
    </div>
  );
}
