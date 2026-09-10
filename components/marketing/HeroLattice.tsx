// Restrained hero backdrop — a pale coordinate lattice with a single
// locus curve that draws in once, then rests. Replaces the WebGL scene.
// Renders at a fixed size, right-aligned and vertically centred; the
// container crops and fades it. Motion is CSS and stops under
// prefers-reduced-motion (see globals.css).

const W = 560;
const H = 780;
const STEP = 70;

export function HeroLattice() {
  const xs = Array.from({ length: Math.floor(W / STEP) + 1 }, (_, i) => i * STEP);
  const ys = Array.from({ length: Math.floor(H / STEP) + 1 }, (_, i) => i * STEP);

  return (
    <div className="hero-lattice" aria-hidden="true">
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none">
        <g className="lat-grid">
          {xs.map((x) => (
            <line key={`x${x}`} x1={x} y1="0" x2={x} y2={H} />
          ))}
          {ys.map((y) => (
            <line key={`y${y}`} x1="0" y1={y} x2={W} y2={y} />
          ))}
        </g>
        <path
          className="lat-curve"
          d="M40 560 C 150 560, 210 240, 320 230 S 470 390, 540 340"
        />
        <circle className="lat-node" cx="130" cy="492" r="4" />
        <circle className="lat-node" cx="320" cy="230" r="4" />
        <circle className="lat-node" cx="470" cy="348" r="4" />
      </svg>
    </div>
  );
}
