import { getWeighted } from "../composables/helpers"; // Replace with the actual module path
import { describe, expect, it } from "vitest";

describe("getWeighted", () => {
  const choices = ["A", "B", "C", "D"];
  const correctChoice = "D";
  const result = getWeighted(choices, correctChoice);

  it("correct answer is favored (may fail if unlucky)", () => {
    console.log(result);
    const maxObject = result.reduce((max, current) =>
      current.score > max.score ? current : max
    );
    expect(maxObject.name).toBe(correctChoice);
  });

  it("cumulative value increases", () => {
    let cumulativeValue = 0;
    result.forEach((vote) => {
      expect(vote.from).toBe(cumulativeValue);
      cumulativeValue = vote.to + 1;
    });
  });

  it("result contains all original items", () => {
    expect(result.every((c) => choices.includes(c.name))).toBe(true);
  });

  it("sum of scores equals iterations(audience)", () => {
    const totalScore = result.reduce((total, vote) => total + vote.score, 0);
    expect(totalScore).toBe(70);
  });
});
