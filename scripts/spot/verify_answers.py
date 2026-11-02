"""Independent answer checks for the Spot the Concept bank.

Every problem in content/spot/problems/*.json needs an entry in CHECKS that
computes its answer from scratch (by brute force where feasible, rather than
by retracing the written solution). Run:

    scripts/spot/.venv/bin/python scripts/spot/verify_answers.py

Exits non-zero if any answer disagrees or any problem has no check.
"""

import json
import sys
from fractions import Fraction
from itertools import product
from pathlib import Path

import sympy as sp

ROOT = Path(__file__).resolve().parents[2]
CHECKS = {}


def check(pid):
    def register(fn):
        CHECKS[pid] = fn
        return fn
    return register


# ── Algebra ─────────────────────────────────────────────────────

@check("alg-0001")
def _():
    x = sp.symbols("x")
    poly = x**3 - 7 * x**2 + 5 * x + 2
    roots = sp.Poly(poly).nroots(n=50)
    assert all(abs(sp.im(r)) < 1e-30 for r in roots), "roots should be real"
    assert len({sp.N(r, 20) for r in roots}) == 3, "roots should be distinct"
    assert not any(poly.subs(x, q) == 0 for q in (1, -1, 2, -2)), "no rational roots"
    return int(round(sum(sp.re(r) ** 2 for r in roots)))


@check("alg-0002")
def _():
    sols = set()
    x = sp.symbols("x", real=True)
    for n in range(-50, 51):
        for s in sp.solve(sp.Eq(x**2 - 5 * n + 4, 0), x):
            if s.is_real and sp.floor(s) == n:
                sols.add(sp.nsimplify(s))
    return len(sols)


@check("alg-0003")
def _():
    prod = Fraction(1)
    for k in range(2, 41):
        prod *= Fraction(k**3 - 1, k**3 + 1)
    return prod.numerator + prod.denominator


# ── Geometry ────────────────────────────────────────────────────

@check("geo-0001")
def _():
    # Real circle through A(-6,0) and B(4,0), with E at the origin. Turn a line
    # through E until the two pieces of chord CD differ by 5, then measure CD.
    k = sp.Rational(5, 2)  # any center (-1, k) works; power of a point says so
    r2 = 25 + k**2
    t = sp.symbols("t", real=True)
    s = sp.symbols("s")
    s1, s2 = sp.solve((s * sp.cos(t) + 1) ** 2 + (s * sp.sin(t) - k) ** 2 - r2, s)
    gap = sp.Abs(s1) - sp.Abs(s2)
    for guess in (0.3, 1.0, 2.0, 2.8):
        try:
            tt = sp.nsolve(sp.Abs(gap) - 5, t, guess)
        except (ValueError, ZeroDivisionError):
            continue
        cd = sp.N(sp.Abs(s1.subs(t, tt)) + sp.Abs(s2.subs(t, tt)))
        return int(round(cd))
    raise AssertionError("no chord with CE - ED = 5")


@check("geo-0002")
def _():
    a, b, c = 6, 8, 10
    # Volume of the corner tetrahedron by the determinant formula.
    m = sp.Matrix([[a, 0, 0], [0, b, 0], [0, 0, c]])
    tetra = abs(m.det()) / 6
    return int(a * b * c - tetra)


@check("geo-0003")
def _():
    # Unknowns: circumradius R and the position th of P. Vertices at 90°, 210°,
    # 330°; minor arc BC runs from 210° to 330°. Impose PA = 13, PB = 5.
    R, th = sp.symbols("R th", real=True)
    pt = lambda ang: (R * sp.cos(ang), R * sp.sin(ang))
    A, B, C, P = pt(sp.pi / 2), pt(7 * sp.pi / 6), pt(11 * sp.pi / 6), pt(th)
    d2 = lambda U, V: (U[0] - V[0]) ** 2 + (U[1] - V[1]) ** 2
    sol = sp.nsolve([d2(P, A) - 169, d2(P, B) - 25], [R, th], [7, 4.0])
    r, t = float(sol[0]), float(sol[1]) % (2 * float(sp.pi))
    assert r > 0 and 7 * float(sp.pi) / 6 < t < 11 * float(sp.pi) / 6, (r, t)
    pc = sp.sqrt(d2(P, C)).subs({R: r, th: t})
    return int(round(float(pc)))


# ── Combinatorics ───────────────────────────────────────────────

@check("comb-0001")
def _():
    rolls = list(product(range(6), repeat=5))
    hits = sum(1 for r in rolls if len(set(r)) < 5)
    f = Fraction(hits, len(rolls))
    return f"{f.numerator}/{f.denominator}"


@check("comb-0002")
def _():
    # Solve the Markov chain exactly via its fundamental matrix.
    Q = sp.Matrix([
        [sp.Rational(1, 2), sp.Rational(1, 2), 0],
        [sp.Rational(1, 2), 0, sp.Rational(1, 2)],
        [sp.Rational(1, 2), 0, 0],
    ])
    N = (sp.eye(3) - Q).inv()
    return int((N * sp.ones(3, 1))[0])


@check("comb-0003")
def _():
    count = 0
    for cols in product(range(3), repeat=6):
        if all(cols[i] != cols[(i + 1) % 6] for i in range(6)):
            count += 1
    return count


# ── Number theory ───────────────────────────────────────────────

@check("nt-0001")
def _():
    hits = [n for n in range(10, 100)
            if n - int(str(n)[::-1]) == 27 and sum(map(int, str(n))) == 9]
    assert len(hits) == 1, hits
    return hits[0]


@check("nt-0002")
def _():
    n = sp.factorial(12)
    return sum(1 for d in sp.divisors(n) if sp.sqrt(d).is_integer)


@check("nt-0003")
def _():
    count = 0
    for x in range(1, 10_000):
        # 1/y = 1/12 - 1/x
        rest = Fraction(1, 12) - Fraction(1, x)
        if rest > 0 and rest.numerator == 1:
            count += 1
    return count


def main():
    problems = []
    for f in sorted((ROOT / "content/spot/problems").glob("*.json")):
        problems += json.loads(f.read_text())
    failures = 0
    for p in problems:
        fn = CHECKS.get(p["id"])
        if fn is None:
            print(f"✗ {p['id']}: no check in verify_answers.py")
            failures += 1
            continue
        try:
            got = str(fn())
        except Exception as e:  # noqa: BLE001 - report every failure
            print(f"✗ {p['id']}: check raised {e!r}")
            failures += 1
            continue
        if got != p["answer"]:
            print(f"✗ {p['id']}: bank says {p['answer']}, check computed {got}")
            failures += 1
        else:
            print(f"✓ {p['id']}: {got}")
    stale = set(CHECKS) - {p["id"] for p in problems}
    for pid in sorted(stale):
        print(f"! {pid}: check exists but problem is not in the bank")
    print(f"\n{len(problems) - failures}/{len(problems)} answers verified")
    sys.exit(1 if failures else 0)


if __name__ == "__main__":
    main()
