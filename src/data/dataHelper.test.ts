import { describe, expect, test, vi } from "vitest";
import { validateCountryData } from "./dataHelper";

describe("validateData", () => {
  test("with valid data", () => {
    expect(
      validateCountryData({
        ca: {
          name: "Canada",
          region: "North America",
          alphabet: "Latin",
          scenery: ["Mountains", "Forests", "Lakes"],
          driving: "Right",
          flagColor: ["Red", "White"],
          flagPattern: "Maple Leaf",
          roadLine: "Yellow",
          language: ["English", "French"],
          coverage: ["Full"],
        },
      })
    ).toStrictEqual([]);
  });
  test("with missing field", () => {
    expect(
      validateCountryData({
        ca: {
          region: "North America",
          alphabet: "Latin",
          scenery: ["Mountains", "Forests", "Lakes"],
          driving: "Right",
          flagColor: ["Red", "White"],
          flagPattern: "Maple Leaf",
          roadLine: "Yellow",
          language: ["English", "French"],
          coverage: ["Full"],
        },
      })
    ).toStrictEqual(["Missing name for ca"]);
  });
  test("logged the right number of countries", () => {
    const consoleDebugSpy = vi.spyOn(console, "debug");
    validateCountryData({
      ca: { name: "Canada" },
    });
    expect(consoleDebugSpy).toHaveBeenCalledWith("Validating 1 countries...");
  });
});
