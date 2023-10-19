import { Clue, ClueType } from "types/types";
import characters from "data/characters.json";
import countries from "data/country_data.json";

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

export const validateCountryData = (countries) => {
  const countryCodes = Object.keys(countries);
  const errors = [];
  console.debug(`Validating ${countryCodes.length} countries...`);

  countryCodes.forEach((countryCode) => {
    const countryData = countries[countryCode];
    requiredFields.forEach((field) => {
      if (!(field in countryData)) {
        errors.push(`Missing ${field} for ${countryCode}`);
      }
    });
  });

  console.debug("Validation complete.");
  return errors;
};

export const getDataFromClueType = (clueType: ClueType) => {
  if (clueType === ClueType.Character) {
    return Object.keys(characters);
  }
  return Object.keys(countries)
    .reduce((acc, country) => {
      return [...new Set([...acc, ...countries[country][clueType]])];
    }, [])
    .sort();
};

export const getPossibleCountries = (selectedClues: Clue[]) => {
  let possibleCountries = [];

  selectedClues.forEach((clue, i) => {
    let matchingCountries = [];

    switch (clue.type) {
      case ClueType.Character:
        matchingCountries = characters[clue.value];
        break;
      default:
        matchingCountries = Object.keys(countries).filter((country) =>
          countries[country][clue.type].includes(clue.value)
        );
        break;
    }

    if (i === 0) {
      possibleCountries.push(...matchingCountries);
    } else {
      possibleCountries = possibleCountries.filter((country) =>
        matchingCountries.includes(country)
      );
    }
  });

  return possibleCountries;
};
