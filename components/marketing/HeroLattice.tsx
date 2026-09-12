// Restrained hero backdrop — a 1:1 port of the design canvas: a pale
// 80px coordinate lattice occupying the right 720px, with one locus
// curve that draws in once then rests, and a white gradient that fades
// the grid into the page on its left. Motion is CSS and stops under
// prefers-reduced-motion (see globals.css).

const GW = 720;
const GH = 900;
const STEP = 80;

export function HeroLattice() {
  const xs = Array.from({ length: Math.floor((GW - 60) / STEP) + 1 }, (_, i) => 60 + i * STEP);
  const ys = Array.from({ length: Math.floor((GH - 60) / STEP) + 1 }, (_, i) => 60 + i * STEP);

  return (
    <div className="hero-lattice" aria-hidden="true">
      <svg width={GW} height={GH} viewBox={`0 0 ${GW} ${GH}`} fill="none">
        <defs>
          <linearGradient id="hero-lattice-fade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="0.42" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g className="lat-grid">
          {xs.map((x) => (
            <line key={`x${x}`} x1={x} y1="0" x2={x} y2={GH} />
          ))}
          {ys.map((y) => (
            <line key={`y${y}`} x1="0" y1={y} x2={GW} y2={y} />
          ))}
        </g>
        <path className="lat-curve" d="M60 640 C 200 640, 240 200, 380 200 S 640 560, 900 280" />
        <circle className="lat-node" cx="140" cy="560" r="5" />
        <circle className="lat-node" cx="380" cy="200" r="5" />
        <circle className="lat-node" cx="620" cy="400" r="5" />
        <rect x="0" y="0" width={GW} height={GH} fill="url(#hero-lattice-fade)" />
      </svg>
    </div>
  );
}
