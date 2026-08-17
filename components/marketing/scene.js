// ─────────────────────────────────────────────────────────────────
// AXIOM — cinematic mathematical environment
// A single continuous scene. The camera travels along -Z through
// staged constructions, each fading into focus as its section
// scrolls into view: axioms → solids → surfaces → theorem →
// networks → primes → the ascent → convergence. ∎
// ─────────────────────────────────────────────────────────────────

import * as THREE from "three";

const BG = 0x0b0e14;
const SILVER = 0x9fb0c6;
const ACCENT = 0x4d7fff;
const ACCENT_BRIGHT = 0x7ea4ff;

const PHI = (1 + Math.sqrt(5)) / 2;
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

// ── material helpers ─────────────────────────────────────────────

function lineMat(color, opacity, additive = false) {
  const m = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity,
    blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
    depthWrite: false,
  });
  m.userData.baseOpacity = opacity;
  return m;
}

function pointsMat(color, size, opacity, additive = false) {
  const m = new THREE.PointsMaterial({
    color,
    size,
    transparent: true,
    opacity,
    sizeAttenuation: true,
    blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
    depthWrite: false,
  });
  m.userData.baseOpacity = opacity;
  return m;
}

function circlePoints(radius, segments = 128, z = 0) {
  const pts = [];
  for (let i = 0; i <= segments; i++) {
    const a = (i / segments) * Math.PI * 2;
    pts.push(new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius, z));
  }
  return pts;
}

function lineFromPoints(pts, mat) {
  return new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat);
}

// ── stage builders ───────────────────────────────────────────────
// Each returns { group, mats, onFrame(t, focus) }

// 1 · Genesis construction: icosahedron + dual + golden spiral
function buildGenesis() {
  const group = new THREE.Group();
  const mats = [];

  const icoMat = lineMat(SILVER, 0.5);
  const ico = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(5.4)), icoMat);
  mats.push(icoMat);

  const dodMat = lineMat(ACCENT, 0.45);
  const dod = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.DodecahedronGeometry(3.1)), dodMat);
  mats.push(dodMat);

  // Golden-ratio spiral, tilted into the construction plane
  const spiralPts = [];
  for (let th = 0; th <= Math.PI * 6; th += 0.04) {
    const r = 0.22 * Math.pow(PHI, th / (Math.PI / 2)) * 0.32;
    spiralPts.push(new THREE.Vector3(Math.cos(th) * r, Math.sin(th) * r, 0));
  }
  const spiralMat = lineMat(ACCENT_BRIGHT, 0.7, true);
  const spiral = lineFromPoints(spiralPts, spiralMat);
  spiral.rotation.x = -0.4;
  mats.push(spiralMat);

  // Faint circumscribed circles — compass-and-straightedge motif
  const c1Mat = lineMat(SILVER, 0.16);
  const c1 = lineFromPoints(circlePoints(6.6), c1Mat);
  c1.rotation.x = Math.PI / 2;
  mats.push(c1Mat);

  group.add(ico, dod, spiral, c1);
  return {
    group, mats,
    onFrame(t) {
      ico.rotation.y = t * 0.1;
      ico.rotation.x = Math.sin(t * 0.07) * 0.25;
      dod.rotation.y = -t * 0.16;
      dod.rotation.z = t * 0.05;
      spiral.rotation.z = t * 0.06;
    },
  };
}

// 2 · The five Platonic solids on an orbital ring
function buildPlatonic() {
  const group = new THREE.Group();
  const mats = [];
  const R = 8.5;

  const geoms = [
    new THREE.TetrahedronGeometry(1.7),
    new THREE.BoxGeometry(2.4, 2.4, 2.4),
    new THREE.OctahedronGeometry(1.9),
    new THREE.DodecahedronGeometry(1.8),
    new THREE.IcosahedronGeometry(1.9),
  ];

  const solids = geoms.map((g, i) => {
    const mat = lineMat(i === 4 ? ACCENT : SILVER, i === 4 ? 0.75 : 0.45);
    mats.push(mat);
    const solid = new THREE.LineSegments(new THREE.EdgesGeometry(g), mat);
    const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
    solid.position.set(Math.cos(a) * R, Math.sin(a) * R * 0.55, 0);
    group.add(solid);
    return solid;
  });

  const ringMat = lineMat(SILVER, 0.15);
  const ring = lineFromPoints(circlePoints(R).map(p =>
    new THREE.Vector3(p.x, p.y * 0.55, 0)), ringMat);
  mats.push(ringMat);
  group.add(ring);

  group.rotation.x = -0.18;
  return {
    group, mats,
    onFrame(t) {
      solids.forEach((s, i) => {
        s.rotation.x = t * (0.18 + i * 0.04);
        s.rotation.y = t * (0.22 - i * 0.03);
      });
      group.rotation.z = Math.sin(t * 0.05) * 0.06;
    },
  };
}

// 3 · Breathing parametric surface — functions become landscapes
function buildSurface() {
  const group = new THREE.Group();
  const mats = [];

  const geo = new THREE.PlaneGeometry(34, 22, 64, 40);
  const mat = new THREE.MeshBasicMaterial({
    color: SILVER,
    wireframe: true,
    transparent: true,
    opacity: 0.22,
    depthWrite: false,
  });
  mat.userData.baseOpacity = 0.22;
  mats.push(mat);

  const mesh = new THREE.Mesh(geo, mat);
  mesh.rotation.x = -1.15;
  mesh.position.y = -3;

  const pos = geo.attributes.position;
  const base = new Float32Array(pos.array);

  // A traced level curve riding the surface
  const curveMat = lineMat(ACCENT_BRIGHT, 0.8, true);
  mats.push(curveMat);
  const curveGeo = new THREE.BufferGeometry();
  const CURVE_N = 220;
  curveGeo.setAttribute("position",
    new THREE.BufferAttribute(new Float32Array(CURVE_N * 3), 3));
  const curve = new THREE.Line(curveGeo, curveMat);
  curve.rotation.copy(mesh.rotation);
  curve.position.copy(mesh.position);

  group.add(mesh, curve);

  const f = (x, y, t) =>
    Math.sin(x * 0.42 + t) * Math.cos(y * 0.5 + t * 0.7) * 1.5 +
    Math.sin((x + y) * 0.18 - t * 0.5) * 0.8;

  return {
    group, mats,
    onFrame(t) {
      const tt = t * 0.7;
      for (let i = 0; i < pos.count; i++) {
        const x = base[i * 3], y = base[i * 3 + 1];
        pos.setZ(i, f(x, y, tt));
      }
      pos.needsUpdate = true;

      const cp = curveGeo.attributes.position;
      for (let i = 0; i < CURVE_N; i++) {
        const u = (i / (CURVE_N - 1)) * 2 - 1;
        const x = u * 16;
        const y = Math.sin(u * Math.PI * 1.5 + tt * 0.4) * 8;
        cp.setXYZ(i, x, y, f(x, y, tt) + 0.05);
      }
      cp.needsUpdate = true;
    },
  };
}

// 4 · Theorem diagram: Euler line + nine-point circle, constructed live
function buildEuler() {
  const group = new THREE.Group();
  const mats = [];

  const A = new THREE.Vector2(-6.4, -3.4);
  const B = new THREE.Vector2(7.2, -4.2);
  const C = new THREE.Vector2(1.6, 6.4);

  // circumcenter via perpendicular bisector intersection
  const d = 2 * (A.x * (B.y - C.y) + B.x * (C.y - A.y) + C.x * (A.y - B.y));
  const ux = ((A.x ** 2 + A.y ** 2) * (B.y - C.y) + (B.x ** 2 + B.y ** 2) * (C.y - A.y) + (C.x ** 2 + C.y ** 2) * (A.y - B.y)) / d;
  const uy = ((A.x ** 2 + A.y ** 2) * (C.x - B.x) + (B.x ** 2 + B.y ** 2) * (A.x - C.x) + (C.x ** 2 + C.y ** 2) * (B.x - A.x)) / d;
  const O = new THREE.Vector2(ux, uy);
  const R = O.distanceTo(A);
  const G = new THREE.Vector2((A.x + B.x + C.x) / 3, (A.y + B.y + C.y) / 3);
  const H = new THREE.Vector2(3 * G.x - 2 * O.x, 3 * G.y - 2 * O.y);
  const N = new THREE.Vector2((O.x + H.x) / 2, (O.y + H.y) / 2);

  const v3 = (p, z = 0) => new THREE.Vector3(p.x, p.y, z);

  const triMat = lineMat(SILVER, 0.6);
  mats.push(triMat);
  group.add(lineFromPoints([v3(A), v3(B), v3(C), v3(A)], triMat));

  const circumMat = lineMat(SILVER, 0.3);
  mats.push(circumMat);
  const circum = lineFromPoints(circlePoints(R), circumMat);
  circum.position.set(O.x, O.y, 0);
  group.add(circum);

  const nineMat = lineMat(ACCENT, 0.65);
  mats.push(nineMat);
  const nine = lineFromPoints(circlePoints(R / 2), nineMat);
  nine.position.set(N.x, N.y, 0);
  group.add(nine);

  // Euler line, extended through O · G · N · H
  const dir = new THREE.Vector2().subVectors(H, O).normalize();
  const e1 = new THREE.Vector2().addVectors(O, dir.clone().multiplyScalar(-4));
  const e2 = new THREE.Vector2().addVectors(H, dir.clone().multiplyScalar(4));
  const eulerMat = lineMat(ACCENT_BRIGHT, 0.85, true);
  mats.push(eulerMat);
  group.add(lineFromPoints([v3(e1, 0.02), v3(e2, 0.02)], eulerMat));

  // Medians, whispering in the background
  const medMat = lineMat(SILVER, 0.14);
  mats.push(medMat);
  const mid = (p, q) => new THREE.Vector2((p.x + q.x) / 2, (p.y + q.y) / 2);
  [[A, mid(B, C)], [B, mid(A, C)], [C, mid(A, B)]].forEach(([p, q]) =>
    group.add(lineFromPoints([v3(p), v3(q)], medMat)));

  // Centers as luminous points
  const centers = [O, G, N, H, A, B, C];
  const cGeo = new THREE.BufferGeometry().setFromPoints(centers.map(p => v3(p, 0.04)));
  const cMat = pointsMat(ACCENT_BRIGHT, 0.42, 0.95, true);
  mats.push(cMat);
  group.add(new THREE.Points(cGeo, cMat));

  group.scale.setScalar(0.92);
  return {
    group, mats,
    onFrame(t) {
      group.rotation.y = Math.sin(t * 0.12) * 0.22;
      group.rotation.x = Math.cos(t * 0.09) * 0.1;
    },
  };
}

// 5 · Network graph — collaboration, mentorship, connected minds
function buildNetwork() {
  const group = new THREE.Group();
  const mats = [];
  const N = 46;
  const nodes = [];
  const rand = mulberry32(42);

  for (let i = 0; i < N; i++) {
    const th = rand() * Math.PI * 2;
    const ph = Math.acos(rand() * 2 - 1);
    const r = 0.45 + rand() * 0.55;
    nodes.push(new THREE.Vector3(
      Math.sin(ph) * Math.cos(th) * 11 * r,
      Math.sin(ph) * Math.sin(th) * 6 * r,
      Math.cos(ph) * 3.2 * r,
    ));
  }

  // connect each node to its 2 nearest neighbours
  const edges = new Set();
  nodes.forEach((p, i) => {
    const near = nodes
      .map((q, j) => ({ j, d: p.distanceTo(q) }))
      .filter(o => o.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, 2);
    near.forEach(o => edges.add(i < o.j ? `${i}-${o.j}` : `${o.j}-${i}`));
  });

  const edgePts = [];
  edges.forEach(key => {
    const [i, j] = key.split("-").map(Number);
    edgePts.push(nodes[i], nodes[j]);
  });

  const edgeMat = lineMat(SILVER, 0.24);
  mats.push(edgeMat);
  group.add(new THREE.LineSegments(
    new THREE.BufferGeometry().setFromPoints(edgePts), edgeMat));

  const nodeMat = pointsMat(SILVER, 0.22, 0.85);
  mats.push(nodeMat);
  group.add(new THREE.Points(
    new THREE.BufferGeometry().setFromPoints(nodes), nodeMat));

  // hub nodes glow in accent
  const hubs = nodes.filter((_, i) => i % 8 === 0);
  const hubMat = pointsMat(ACCENT_BRIGHT, 0.5, 0.95, true);
  mats.push(hubMat);
  group.add(new THREE.Points(
    new THREE.BufferGeometry().setFromPoints(hubs), hubMat));

  return {
    group, mats,
    onFrame(t) {
      group.rotation.y = t * 0.07;
      group.rotation.z = Math.sin(t * 0.05) * 0.05;
    },
  };
}

// 6 · Prime constellation — a Vogel spiral where primes ignite
function buildPrimes() {
  const group = new THREE.Group();
  const mats = [];
  const MAX = 620;

  const sieve = new Uint8Array(MAX + 1).fill(1);
  sieve[0] = sieve[1] = 0;
  for (let i = 2; i * i <= MAX; i++)
    if (sieve[i]) for (let j = i * i; j <= MAX; j += i) sieve[j] = 0;

  const primes = [], composites = [];
  for (let n = 1; n <= MAX; n++) {
    const r = 0.52 * Math.sqrt(n);
    const th = n * GOLDEN_ANGLE;
    const p = new THREE.Vector3(Math.cos(th) * r, Math.sin(th) * r, 0);
    (sieve[n] ? primes : composites).push(p);
  }

  const compMat = pointsMat(SILVER, 0.11, 0.4);
  mats.push(compMat);
  group.add(new THREE.Points(
    new THREE.BufferGeometry().setFromPoints(composites), compMat));

  const primeMat = pointsMat(ACCENT_BRIGHT, 0.3, 0.95, true);
  mats.push(primeMat);
  group.add(new THREE.Points(
    new THREE.BufferGeometry().setFromPoints(primes), primeMat));

  return {
    group, mats,
    onFrame(t) {
      group.rotation.z = t * 0.02;
      primeMat.opacity = primeMat.userData.currentFocus *
        primeMat.userData.baseOpacity * (0.8 + Math.sin(t * 1.4) * 0.2);
    },
  };
}

// 7 · The ascent — a helical proof pathway that illuminates with scroll
function buildHelix() {
  const group = new THREE.Group();
  const mats = [];
  const N = 640;
  const TURNS = 4.25;

  const pathPts = [];
  for (let i = 0; i < N; i++) {
    const u = i / (N - 1);
    const a = u * Math.PI * 2 * TURNS - Math.PI / 2;
    const r = 6.2 - u * 1.8;
    pathPts.push(new THREE.Vector3(
      Math.cos(a) * r, -7.5 + u * 16.5, Math.sin(a) * r));
  }

  const ghostMat = lineMat(SILVER, 0.14);
  mats.push(ghostMat);
  group.add(lineFromPoints(pathPts, ghostMat));

  const litMat = lineMat(ACCENT_BRIGHT, 0.9, true);
  mats.push(litMat);
  const litGeo = new THREE.BufferGeometry().setFromPoints(pathPts);
  const lit = new THREE.Line(litGeo, litMat);
  lit.geometry.setDrawRange(0, 0);
  group.add(lit);

  // Six milestones on the way up — the curriculum stages
  const stops = [0.02, 0.2, 0.38, 0.56, 0.74, 0.96].map(u =>
    pathPts[Math.floor(u * (N - 1))]);
  const stopMat = pointsMat(ACCENT_BRIGHT, 0.55, 0.95, true);
  mats.push(stopMat);
  group.add(new THREE.Points(
    new THREE.BufferGeometry().setFromPoints(stops), stopMat));

  let progress = 0;
  return {
    group, mats,
    setProgress(p) { progress = p; },
    onFrame(t) {
      group.rotation.y = t * 0.05;
      lit.geometry.setDrawRange(0, Math.floor(progress * N));
    },
  };
}

// 8 · Convergence — all paths arrive at a single luminous ring. ∎
function buildFinale() {
  const group = new THREE.Group();
  const mats = [];

  const torusMat = new THREE.MeshBasicMaterial({
    color: ACCENT_BRIGHT,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  torusMat.userData.baseOpacity = 0.85;
  mats.push(torusMat);
  const torus = new THREE.Mesh(
    new THREE.TorusGeometry(4.1, 0.025, 8, 160), torusMat);
  group.add(torus);

  const haloMat = lineMat(ACCENT, 0.3, true);
  mats.push(haloMat);
  const halo = lineFromPoints(circlePoints(5.1), haloMat);
  group.add(halo);

  // radial lines converging toward the ring
  const radials = [];
  for (let i = 0; i < 44; i++) {
    const a = (i / 44) * Math.PI * 2;
    radials.push(
      new THREE.Vector3(Math.cos(a) * 15, Math.sin(a) * 15, 0),
      new THREE.Vector3(Math.cos(a) * 5.6, Math.sin(a) * 5.6, 0));
  }
  const radMat = lineMat(SILVER, 0.16);
  mats.push(radMat);
  group.add(new THREE.LineSegments(
    new THREE.BufferGeometry().setFromPoints(radials), radMat));

  const coreMat = pointsMat(0xffffff, 0.9, 0.95, true);
  mats.push(coreMat);
  group.add(new THREE.Points(
    new THREE.BufferGeometry().setFromPoints([new THREE.Vector3()]), coreMat));

  return {
    group, mats,
    onFrame(t) {
      torus.rotation.x = Math.sin(t * 0.2) * 0.35;
      torus.rotation.y = t * 0.12;
      halo.rotation.z = -t * 0.06;
      group.rotation.z = t * 0.015;
      coreMat.size = 0.75 + Math.sin(t * 1.2) * 0.2;
    },
  };
}

// deterministic PRNG so the network is identical every visit
function mulberry32(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ── ambient field: silver constellation spanning the whole journey ──

function buildAmbient(zMin, zMax) {
  const rand = mulberry32(7);
  const pts = [];
  for (let i = 0; i < 520; i++) {
    pts.push(new THREE.Vector3(
      (rand() * 2 - 1) * 46,
      (rand() * 2 - 1) * 26,
      zMax + rand() * (zMin - zMax),
    ));
  }
  const mat = pointsMat(SILVER, 0.09, 0.45);
  return { points: new THREE.Points(new THREE.BufferGeometry().setFromPoints(pts), mat) };
}

// coordinate ground plane, running the full length of the journey
function buildGrid(zMin, zMax) {
  const pts = [];
  const Y = -10;
  for (let x = -40; x <= 40; x += 4) {
    pts.push(new THREE.Vector3(x, Y, zMax), new THREE.Vector3(x, Y, zMin));
  }
  for (let z = zMax; z >= zMin; z -= 8) {
    pts.push(new THREE.Vector3(-40, Y, z), new THREE.Vector3(40, Y, z));
  }
  const mat = lineMat(SILVER, 0.06);
  return new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(pts), mat);
}

// ── scene orchestration ──────────────────────────────────────────

export const CAM_START = 12;
export const TRAVEL = 270;
const FOCUS_RANGE = 34;

export function initScene(canvas) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
    powerPreference: "high-performance",
  });
  renderer.setClearColor(BG, 1);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(BG, 0.014);

  const camera = new THREE.PerspectiveCamera(
    55, window.innerWidth / window.innerHeight, 0.1, 140);
  camera.position.set(0, 0, CAM_START);

  const zMin = CAM_START - TRAVEL - 30;
  scene.add(buildGrid(zMin, CAM_START + 10));
  scene.add(buildAmbient(zMin, CAM_START + 10).points);

  const stages = {
    genesis: buildGenesis(),
    platonic: buildPlatonic(),
    surface: buildSurface(),
    euler: buildEuler(),
    network: buildNetwork(),
    primes: buildPrimes(),
    helix: buildHelix(),
    finale: buildFinale(),
  };

  // provisional depths — main.js re-places these from real section layout
  const provisional = [-2, -40, -78, -116, -154, -192, -228, -258];
  Object.values(stages).forEach((s, i) => {
    s.group.position.z = provisional[i];
    scene.add(s.group);
  });

  let targetP = 0;   // scroll progress 0..1
  let smoothP = 0;
  let pointerX = 0, pointerY = 0;
  let smoothPX = 0, smoothPY = 0;
  let reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const clock = new THREE.Clock();

  function resize() {
    const w = window.innerWidth, h = window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener("resize", resize);

  const smoothstep = x => {
    const t = Math.min(Math.max(x, 0), 1);
    return t * t * (3 - 2 * t);
  };

  function tick() {
    const t = clock.getElapsedTime();
    const damp = reduced ? 1 : 0.075;
    smoothP += (targetP - smoothP) * damp;
    smoothPX += (pointerX - smoothPX) * 0.06;
    smoothPY += (pointerY - smoothPY) * 0.06;

    const camZ = CAM_START - smoothP * TRAVEL;
    const sway = reduced ? 0 : 1;
    camera.position.set(
      Math.sin(smoothP * Math.PI * 2.2) * 2.6 * sway + smoothPX * 1.1,
      Math.cos(smoothP * Math.PI * 1.7) * 1.4 * sway - smoothPY * 0.8,
      camZ,
    );
    camera.lookAt(
      camera.position.x * 0.35,
      camera.position.y * 0.35,
      camZ - 30,
    );

    for (const s of Object.values(stages)) {
      const dist = Math.abs(camZ - (s.group.position.z + 13));
      const focus = smoothstep(1 - dist / FOCUS_RANGE);
      s.group.visible = focus > 0.004;
      if (!s.group.visible) continue;

      for (const m of s.mats) {
        m.userData.currentFocus = focus;
        m.opacity = m.userData.baseOpacity * focus;
      }
      const sc = 0.86 + 0.14 * focus;
      s.group.scale.setScalar(sc);
      if (!reduced) s.onFrame(t, focus);
    }

    renderer.render(scene, camera);
  }

  return {
    tick,
    setProgress: p => { targetP = p; },
    setPointer: (x, y) => { pointerX = x; pointerY = y; },
    setRoadmap: p => stages.helix.setProgress(p),
    placeStage: (name, z) => { stages[name].group.position.z = z; },
    stageNames: Object.keys(stages),
    setReduced: v => { reduced = v; },
    dispose: () => {
      window.removeEventListener("resize", resize);
      renderer.dispose();
    },
  };
}
