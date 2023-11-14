import { getCharacters, getCountries } from 'data';
import { ClueType, Country, CountryData, SelectedClue } from 'types/types';

export const validateCountryData = () => {
  const countries = getCountries();
  const countryCodes = Object.keys(countries);
  const errors = [];
  const requiredFields = [
    'name',
    'region',
    'alphabet',
    'scenery',
    'driving',
    'flagColor',
    'flagPattern',
    'roadLine',
    'cameraGen',
  ];

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

export const getDataFromClueType = (clueType: ClueType) => {
  const countries = getCountries();
  console.debug('countries', countries);

  const characters = getCharacters();
  if (clueType === ClueType.Character) {
    return Object.keys(characters);
  }

  return Object.keys(countries)
    .reduce((acc, country) => {
      return [...new Set([...acc, ...countries[country][clueType]])];
    }, [])
    .sort();
};

export const getCountriesWithCoverage = () => {
  const countries = getCountries();
  const countriesWithCoverage: CountryData = {};

  Object.keys(countries).forEach((country) => {
    const currentCountry = countries[country];
    if (currentCountry.cameraGen?.length > 0) {
      countriesWithCoverage[country] = currentCountry;
    }
  });

  return countriesWithCoverage;
};

// probably the worst piece of code i've ever written, but it works
export const getPossibleCountries = (clues: SelectedClue[]): string[] => {
  const characters = getCharacters();
  const countriesWithCoverage = getCountriesWithCoverage();
  if (clues.length === 0) {
    return Object.keys(countriesWithCoverage).sort();
  }

  const regionClues = clues.filter((clue) => clue.type === ClueType.Region);
  const otherClues = clues.filter((clue) => clue.type !== ClueType.Region);

  const countriesThatMatchRegionClues = [
    ...new Set(
      regionClues.reduce((result, clue) => {
        const matchingCountries = Object.keys(countriesWithCoverage).filter((country) =>
          countriesWithCoverage[country].region.includes(clue.value),
        );
        return [...result, ...matchingCountries];
      }, []),
    ),
  ];

  let possibleCountries = [];
  otherClues.forEach((clue, i) => {
    let matchingCountries = [];
    switch (clue.type) {
      case ClueType.Character:
        matchingCountries = characters[clue.value].filter((country) =>
          Object.keys(countriesWithCoverage).includes(country),
        );
        break;
      default:
        matchingCountries = Object.keys(countriesWithCoverage).filter((country) =>
          countriesWithCoverage[country][clue.type].includes(clue.value),
        );
        break;
    }

    if (i === 0) {
      possibleCountries.push(...matchingCountries);
    } else {
      possibleCountries = possibleCountries.filter((country) =>
        matchingCountries.includes(country),
      );
    }
  });

  if (regionClues.length > 0) {
    possibleCountries = possibleCountries.filter((country) =>
      countriesThatMatchRegionClues.includes(country),
    );
  }
  if (otherClues.length === 0) {
    possibleCountries = countriesThatMatchRegionClues;
  }

  return possibleCountries.sort();
};

export const getRandomCountryCode = () => {
  const countries = getCountries();
  const countryCodes = Object.keys(countries);
  return countryCodes[Math.floor(Math.random() * countryCodes.length)];
};

export const getCluesForCountry = (countryCode: string) => {
  const countries = getCountries();
  const characters = getCharacters();
  const countryData = countries[countryCode];

  const clues: SelectedClue[] = [];

  const cluesToUse = ['region', 'alphabet', 'driving', 'roadLine', 'flagColor', 'flagPattern'];

  cluesToUse.forEach((key) => {
    const values = countryData[key];
    values.forEach((value) => {
      clues.push({
        type: key as ClueType,
        value: value,
      });
    });
  });

  const countryCharacters = Object.keys(characters).filter((character) =>
    characters[character].includes(countryCode),
  );

  countryCharacters.forEach((character) => {
    const clue = {
      type: 'characters' as ClueType,
      value: character,
    };
    clues.push(clue);
  });

  // randomly shuffle the clues
  for (let i = clues.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [clues[i], clues[j]] = [clues[j], clues[i]];
  }
  return clues;
};

export const getCountryName = (countryCode: string) => {
  const countries = getCountries();
  return countries[countryCode].name;
};

export const getCountry = (countryCode: string) => {
  const countries = getCountries();
  return countries[countryCode] as Country;
};

export const getCountryUniqueCharacters = (firstCountry: string, secondCountry: string) => {
  const characters = getCharacters();
  const firstCountryCharacters = Object.keys(characters).filter((character) =>
    characters[character].includes(firstCountry),
  );
  const secondCountryCharacters = Object.keys(characters).filter((character) =>
    characters[character].includes(secondCountry),
  );

  const firstCountryUniqueCharacters = firstCountryCharacters?.filter(
    (character) => !secondCountryCharacters.includes(character),
  );
  const secondCountryUniqueCharacters = secondCountryCharacters?.filter(
    (character) => !firstCountryCharacters.includes(character),
  );

  return { firstCountryUniqueCharacters, secondCountryUniqueCharacters };
};

export const getCountryUniqueClue = (
  firstCountry: string,
  secondCountry: string,
  clueType: ClueType,
) => {
  const countries = getCountries();
  const firstCountryValues = countries[firstCountry]?.[clueType];
  const secondCountryValues = countries[secondCountry]?.[clueType];

  if (!firstCountryValues || !secondCountryValues) {
    return {
      firstCountryValues: [],
      secondCountryValues: [],
    };
  }
  const firstCountryUniqueValues = firstCountryValues?.filter(
    (line) => !secondCountryValues.includes(line),
  );
  const secondCountryUniqueValues = secondCountryValues?.filter(
    (line) => !firstCountryValues.includes(line),
  );
  return { firstCountryUniqueValues, secondCountryUniqueValues };
};
