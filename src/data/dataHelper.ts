import { Clue, ClueType, CountryData } from "types/types";
import characters from "data/characters.json";

const requiredFields = [
  "name",
  "region",
  "alphabet",
  "scenery",
  "driving",
  "flagColor",
  "flagPattern",
  "roadLine",
  "language",
  "coverage",
];

export const validateCountryData = (countries: CountryData) => {
  const countryCodes = Object.keys(countries);
  const errors = [];

  countryCodes.forEach((countryCode) => {
    const countryData = countries[countryCode];
    requiredFields.forEach((field) => {
      if (!(field in countryData && countryData[field] !== undefined)) {
        errors.push(`Missing ${field} for ${countryCode}`);
      }
    });
  });
  return errors;
};

export const getDataFromClueType = (
  countries: CountryData,
  clueType: ClueType
) => {
  if (clueType === ClueType.Coverage) {
    return;
  }
  if (clueType === ClueType.Character) {
    return Object.keys(characters);
  }
  return Object.keys(countries)
    .reduce((acc, country) => {
      return [...new Set([...acc, ...countries[country][clueType]])];
    }, [])
    .sort();
};

export const getPossibleCountries = (
  countries: CountryData,
  selectedClues: Clue[]
) => {
  let possibleCountries = [];

  selectedClues.forEach((clue, i) => {
    let matchingCountries = [];

    switch (clue.type) {
      case ClueType.Character:
        matchingCountries = characters[clue.value].filter((country) =>
          Object.keys(countries).includes(country)
        );
        break;
      default:
        matchingCountries = Object.keys(countries).filter((country) =>
          countries[country][clue.type].includes(clue.value)
        );
        break;
    }

    if (i === 0 || clue.type === ClueType.Region) {
      possibleCountries.push(...matchingCountries);
    } else {
      possibleCountries = possibleCountries.filter((country) =>
        matchingCountries.includes(country)
      );
    }
  });

  return possibleCountries.sort();
};
