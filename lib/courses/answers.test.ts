import { describe, expect, it } from "vitest";
import { numericAnswerMatches, parseRational } from "./answers";

describe("exact course answer grading", () => {
  it.each([
    ["0.75", "3/4"],
    [" 6 / 8 ", "3/4"],
    ["-.5", "-1/2"],
    ["1/-2", "-0.50"],
    ["+12.0", "12"],
    ["0/7", "0"],
    ["9007199254740993", "9007199254740993"],
  ])("accepts equivalent %s and %s", (given, answer) =>
    expect(numericAnswerMatches(given, answer)).toBe(true),
  );
  it.each([
    "",
    " ",
    "1/0",
    "1+2",
    "NaN",
    "Infinity",
    "0x10",
    "1e3",
    "2/3/4",
    "1,000",
    "<script>",
    "1".repeat(121),
  ])("rejects invalid input %s", (input) =>
    expect(parseRational(input)).toBeNull(),
  );
  it("does not round unequal fractions into equality", () => {
    expect(numericAnswerMatches("0.333333", "1/3")).toBe(false);
    expect(numericAnswerMatches("9007199254740992", "9007199254740993")).toBe(
      false,
    );
  });
});
