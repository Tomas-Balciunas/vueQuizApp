import { validateParams } from "../composables/helpers";
import { describe, expect, it } from "vitest";

describe("validate params", () => {
  it("passes validation", () => {
    expect(validateParams({
        difficulty: "easy",
        amount: "5",
      })).toBe(true);
  });

  it("doesnt pass required param validation", () => {
    expect(validateParams({
        incorrect: "easy",
        amount: "5",
      } as any)).toBe(false);
  });

  it("doesnt pass difficulty validation", () => {
    expect(validateParams({
        difficulty: "incorrect",
        amount: "5",
      })).toBe(false);
  });

  it("doesnt pass min amount validation", () => {
    expect(validateParams({
        difficulty: "easy",
        amount: "4",
      })).toBe(false);
  });

  it("doesnt pass max amount validation", () => {
    expect(validateParams({
        difficulty: "easy",
        amount: "51",
      })).toBe(false);
  });
});
