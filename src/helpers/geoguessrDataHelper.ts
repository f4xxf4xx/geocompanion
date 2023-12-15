import { getCharacters, getClues } from 'data';
import { ClueData, ClueType, CountryClues, SelectedClue } from 'types/clue';

export const validateClueData = () => {
  const countryClues = getClues();
  const countryCodes = Object.keys(countryClues);
  const errors: string[] = [];
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
    const currentCountryClues = countryClues[countryCode];
    requiredFields.forEach((field) => {
      if (
        !(
          field in currentCountryClues &&
          currentCountryClues[field as keyof CountryClues] !== undefined
        )
      ) {
        errors.push(`Missing ${field} for ${countryCode}`);
      }
    });
  });
  return errors;
};

export const getDataFromClueType = (clueType: ClueType) => {
  const countryClues = getClues();

  const characters = getCharacters();
  if (clueType === ClueType.Character) {
    return Object.keys(characters);
  }

  return Object.keys(countryClues)
    .reduce<string[]>((acc, country) => {
      return [...new Set([...acc, ...countryClues[country][clueType]])];
    }, [])
    .sort();
};

export const getCountriesWithCoverage = () => {
  const countryClues = getClues();
  const countriesWithCoverage: ClueData = {};

  Object.keys(countryClues).forEach((country) => {
    const currentCountry = countryClues[country];
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
      regionClues.reduce<string[]>((result, clue) => {
        const matchingCountries = Object.keys(countriesWithCoverage).filter((country) =>
          countriesWithCoverage[country].region.includes(clue.value),
        );
        return [...result, ...matchingCountries];
      }, []),
    ),
  ];

  let potentialCountries: string[] = [];
  otherClues.forEach((clue, i) => {
    let matchingCountries: string[] = [];
    switch (clue.type) {
      case ClueType.Character:
        matchingCountries = characters[clue.value].filter((country) =>
          Object.keys(countriesWithCoverage).includes(country),
        );
        break;
      default:
        matchingCountries = Object.keys(countriesWithCoverage).filter((country) =>
          countriesWithCoverage[country][clue.type as keyof CountryClues].includes(clue.value),
        );
        break;
    }

    if (i === 0) {
      potentialCountries.push(...matchingCountries);
    } else {
      potentialCountries = potentialCountries.filter((country) =>
        matchingCountries.includes(country),
      );
    }
  });

  if (regionClues.length > 0) {
    potentialCountries = potentialCountries.filter((country) =>
      countriesThatMatchRegionClues.includes(country),
    );
  }
  if (otherClues.length === 0) {
    potentialCountries = countriesThatMatchRegionClues;
  }

  return potentialCountries.sort();
};

export const getRandomCountryCode = () => {
  const countryClues = getClues();
  const countryCodes = Object.keys(countryClues);
  return countryCodes[Math.floor(Math.random() * countryCodes.length)];
};

export const getCluesForCountry = (countryCode: string) => {
  const countryClues = getClues();
  const characters = getCharacters();
  const countryData: any = countryClues[countryCode];

  const clues: SelectedClue[] = [];

  const cluesToUse = ['region', 'alphabet', 'driving', 'roadLine', 'flagColor', 'flagPattern'];

  cluesToUse.forEach((key) => {
    const values = countryData[key];
    values.forEach((value: any) => {
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
  const countryClues = getClues();
  return countryClues[countryCode].name;
};

export const getCountry = (countryCode: string) => {
  const countryClues = getClues();
  return countryClues[countryCode] as CountryClues;
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
  const countryClues = getClues();
  const firstCountryData: any = countryClues[firstCountry];
  const secondCountryData: any = countryClues[secondCountry];
  const firstCountryValues = firstCountryData?.[clueType];
  const secondCountryValues = secondCountryData?.[clueType];

  if (!firstCountryValues || !secondCountryValues) {
    return {
      firstCountryValues: [],
      secondCountryValues: [],
    };
  }
  const firstCountryUniqueValues = firstCountryValues?.filter(
    (line: any) => !secondCountryValues.includes(line),
  );
  const secondCountryUniqueValues = secondCountryValues?.filter(
    (line: any) => !firstCountryValues.includes(line),
  );
  return { firstCountryUniqueValues, secondCountryUniqueValues };
};
