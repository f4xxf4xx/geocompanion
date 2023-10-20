import { CharacterData, Clue, ClueType, CountryData } from "types/types";

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
  characters: CharacterData,
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

// probably the worst piece of code i've ever written, but it works
export const getPossibleCountries = (
  countries: CountryData,
  characters: CharacterData,
  clues: Clue[]
) => {
  const regionClues = clues.filter((clue) => clue.type === ClueType.Region);
  const otherClues = clues.filter((clue) => clue.type !== ClueType.Region);

  const countriesThatMatchRegionClues = [
    ...new Set(
      regionClues.reduce((result, clue) => {
        const matchingCountries = Object.keys(countries).filter((country) =>
          countries[country].region.includes(clue.value)
        );
        return [...result, ...matchingCountries];
      }, [])
    ),
  ];

  let possibleCountries = [];
  otherClues.forEach((clue, i) => {
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

    if (i === 0) {
      possibleCountries.push(...matchingCountries);
    } else {
      possibleCountries = possibleCountries.filter((country) =>
        matchingCountries.includes(country)
      );
    }
  });

  if (regionClues.length > 0) {
    possibleCountries = possibleCountries.filter((country) =>
      countriesThatMatchRegionClues.includes(country)
    );
  }
  if (otherClues.length === 0) {
    possibleCountries = countriesThatMatchRegionClues;
  }

  return possibleCountries.sort();
};
