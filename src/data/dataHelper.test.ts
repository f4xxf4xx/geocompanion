import { describe, expect, test } from "vitest";
import { getPossibleCountries, validateCountryData } from "./dataHelper";
import { ClueType, Country, CountryData } from "types/types";

const canadaData: Country = {
  name: "Canada",
  region: ["north america"],
  alphabet: ["latin"],
  scenery: ["mountains", "woods", "flat"],
  driving: ["right"],
  flagColor: ["red", "white"],
  flagPattern: ["vertical-stripes"],
  roadLine: ["white-yellow"],
  language: ["english", "french"],
  coverage: true,
};

const usData: Country = {
  name: "United States",
  region: ["north america"],
  alphabet: ["latin"],
  scenery: ["mountains", "woods", "flat", "desert"],
  driving: ["right"],
  flagColor: ["red", "white", "blue"],
  flagPattern: ["stripes"],
  roadLine: ["white-yellow"],
  language: ["english"],
  coverage: true,
};

const franceData: Country = {
  name: "France",
  region: ["europe"],
  alphabet: ["latin"],
  scenery: ["mountains", "woods", "flat"],
  driving: ["right"],
  flagColor: ["red", "white", "blue"],
  flagPattern: ["vertical-stripes"],
  roadLine: ["white-white"],
  language: ["french"],
  coverage: true,
};

const japanData: Country = {
  name: "Japan",
  region: ["asia"],
  alphabet: ["japanese"],
  scenery: ["mountains", "woods", "flat"],
  driving: ["left"],
  flagColor: ["red", "white"],
  flagPattern: ["circle"],
  roadLine: ["white-white", "white-yellow"],
  language: ["japanese"],
  coverage: false,
};

const countries: CountryData = {
  ca: canadaData,
  us: usData,
  fr: franceData,
  jp: japanData,
};

// TODO type
const characters = {
  Éé: ["fr", "ca"],
};

describe("validateData", () => {
  test("with valid data", () => {
    expect(validateCountryData({ ca: canadaData })).toStrictEqual([]);
  });
  test("with missing field", () => {
    expect(
      validateCountryData({ ca: { ...canadaData, name: undefined } })
    ).toStrictEqual(["Missing name for ca"]);
  });
});

describe("getPossibleCountries", () => {
  test("with character clue", () => {
    expect(
      getPossibleCountries(countries, characters, [
        { type: ClueType.Character, value: "Éé" },
      ])
    ).toStrictEqual(["ca", "fr"]);
  });
  test("with region clue union", () => {
    expect(
      getPossibleCountries(countries, characters, [
        { type: ClueType.Region, value: "north america" },
        { type: ClueType.Region, value: "europe" },
      ])
    ).toStrictEqual(["ca", "fr", "us"]);
  });
  test("with one region clue and one other", () => {
    expect(
      getPossibleCountries(countries, characters, [
        { type: ClueType.Character, value: "Éé" },
        { type: ClueType.Region, value: "north america" },
      ])
    ).toStrictEqual(["ca"]);
  });
  test("with two regions and one other clue", () => {
    expect(
      getPossibleCountries(countries, characters, [
        { type: ClueType.Region, value: "north america" },
        { type: ClueType.Region, value: "europe" },
        { type: ClueType.Character, value: "Éé" },
      ])
    ).toStrictEqual(["ca", "fr"]);
  });
  test("with flagColor clue", () => {
    expect(
      getPossibleCountries(countries, characters, [
        { type: ClueType.FlagColor, value: "blue" },
      ])
    ).toStrictEqual(["fr", "us"]);
  });
  test("with character and flagColor clue", () => {
    expect(
      getPossibleCountries(countries, characters, [
        { type: ClueType.FlagColor, value: "blue" },
        { type: ClueType.Character, value: "Éé" },
      ])
    ).toStrictEqual(["fr"]);
  });
});
