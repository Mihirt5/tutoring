// Restrained hero backdrop — a pale coordinate lattice with a single
// locus curve that draws in once, then rests. Replaces the WebGL scene.
// All motion is CSS and stops under prefers-reduced-motion (see globals.css).

export function HeroLattice() {
  const xs = [60, 140, 220, 300, 380, 460, 540, 620, 700];
  const ys = [60, 140, 220, 300, 380, 460, 540, 620, 700, 780, 860];

  return (
    <div className="hero-lattice" aria-hidden="true">
      <svg viewBox="0 0 720 900" fill="none" preserveAspectRatio="xMidYMid slice">
        <g className="lat-grid">
          {xs.map((x) => (
            <line key={`x${x}`} x1={x} y1="0" x2={x} y2="900" />
          ))}
          {ys.map((y) => (
            <line key={`y${y}`} x1="0" y1={y} x2="720" y2={y} />
          ))}
        </g>
        <path className="lat-curve" d="M60 640 C 200 640, 240 200, 380 200 S 560 560, 700 320" />
        <circle className="lat-node" cx="140" cy="560" r="5" />
        <circle className="lat-node" cx="380" cy="200" r="5" />
        <circle className="lat-node" cx="620" cy="400" r="5" />
      </svg>
    </div>
  );
}
