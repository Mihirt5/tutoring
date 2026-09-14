/** Exact rational comparison for authored numeric answers. Never evaluates input. */
export function parseRational(
  input: string,
): { numerator: bigint; denominator: bigint } | null {
  const value = input.trim();
  if (!value || value.length > 120) return null;
  let numerator: bigint;
  let denominator: bigint;
  if (/^[+-]?\d+\s*\/\s*[+-]?\d+$/.test(value)) {
    const [top, bottom] = value.split("/");
    numerator = BigInt(top.trim());
    denominator = BigInt(bottom.trim());
  } else if (/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(value)) {
    const sign = value.startsWith("-") ? -1n : 1n;
    const unsigned = value.replace(/^[+-]/, "");
    const [whole, fraction = ""] = unsigned.split(".");
    denominator = 10n ** BigInt(fraction.length);
    numerator = sign * BigInt((whole || "0") + fraction);
  } else return null;
  if (denominator === 0n) return null;
  if (denominator < 0n) {
    numerator = -numerator;
    denominator = -denominator;
  }
  return { numerator, denominator };
}

export function numericAnswerMatches(input: string, answer: string) {
  const left = parseRational(input);
  const right = parseRational(answer);
  return (
    !!left &&
    !!right &&
    left.numerator * right.denominator === right.numerator * left.denominator
  );
}
