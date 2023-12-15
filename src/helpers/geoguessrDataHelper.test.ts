import { ClueType } from 'types/clue';
import { describe, expect, test, vi } from 'vitest';

import {
  getCluesForCountry,
  getCountriesWithCoverage,
  getCountry,
  getCountryName,
  getCountryUniqueCharacters,
  getCountryUniqueClue,
  getDataFromClueType,
  getPossibleCountries,
  getRandomCountryCode,
  validateClueData,
} from './geoguessrDataHelper';

const mocks = vi.hoisted(() => {
  return {
    getClues: vi.fn(),
    getCharacters: vi.fn(),
    countries: {
      ca: {
        name: 'Canada',
        region: ['north america'],
        alphabet: ['latin'],
        scenery: ['mountains', 'woods', 'flat'],
        driving: ['right'],
        flagColor: ['red', 'white'],
        flagPattern: ['vertical-stripes'],
        roadLine: ['white-yellow'],
        cameraGen: [1, 2, 3, 4],
      },
      us: {
        name: 'United States',
        region: ['north america'],
        alphabet: ['latin'],
        scenery: ['mountains', 'woods', 'flat', 'desert'],
        driving: ['right'],
        flagColor: ['red', 'white', 'blue'],
        flagPattern: ['stripes'],
        roadLine: ['white-yellow'],
        cameraGen: [1, 2, 3, 4],
      },
      fr: {
        name: 'France',
        region: ['europe'],
        alphabet: ['latin'],
        scenery: ['mountains', 'woods', 'flat'],
        driving: ['right'],
        flagColor: ['red', 'white', 'blue'],
        flagPattern: ['vertical-stripes'],
        roadLine: ['white-white'],
        cameraGen: [1, 2, 3, 4],
      },
      jp: {
        name: 'Japan',
        region: ['asia'],
        alphabet: ['japanese'],
        scenery: ['mountains', 'woods', 'flat'],
        driving: ['left'],
        flagColor: ['red', 'white'],
        flagPattern: ['circle'],
        roadLine: ['white-white', 'white-yellow'],
        cameraGen: [1, 2, 3, 4],
      },
    },
    characters: {
      Éé: ['fr', 'ca'],
      の: ['jp'],
    },
  };
});

vi.mock('data/index', () => {
  return {
    getClues: mocks.getClues,
    getCharacters: mocks.getCharacters,
  };
});

describe('validateClueData', () => {
  test('with valid data', () => {
    mocks.getClues.mockReturnValueOnce(mocks.countries);
    expect(validateClueData()).toStrictEqual([]);
  });
  test('with missing field', () => {
    mocks.getClues.mockReturnValueOnce({
      ca: {
        ...mocks.countries.ca,
        name: undefined,
      },
    });
    expect(validateClueData()).toStrictEqual(['Missing name for ca']);
  });
});

describe('getPossibleCountries', () => {
  test('with character clue', () => {
    mocks.getClues.mockReturnValueOnce(mocks.countries);
    mocks.getCharacters.mockReturnValueOnce(mocks.characters);
    expect(getPossibleCountries([{ type: ClueType.Character, value: 'Éé' }])).toStrictEqual([
      'ca',
      'fr',
    ]);
  });
  test('with region clue union', () => {
    mocks.getClues.mockReturnValueOnce(mocks.countries);
    expect(
      getPossibleCountries([
        { type: ClueType.Region, value: 'north america' },
        { type: ClueType.Region, value: 'europe' },
      ]),
    ).toStrictEqual(['ca', 'fr', 'us']);
  });
  test('with one region clue and one other', () => {
    mocks.getClues.mockReturnValueOnce(mocks.countries);
    mocks.getCharacters.mockReturnValueOnce(mocks.characters);
    expect(
      getPossibleCountries([
        { type: ClueType.Character, value: 'Éé' },
        { type: ClueType.Region, value: 'north america' },
      ]),
    ).toStrictEqual(['ca']);
  });
  test('with two regions and one other clue', () => {
    mocks.getClues.mockReturnValueOnce(mocks.countries);
    mocks.getCharacters.mockReturnValueOnce(mocks.characters);
    expect(
      getPossibleCountries([
        { type: ClueType.Region, value: 'north america' },
        { type: ClueType.Region, value: 'europe' },
        { type: ClueType.Character, value: 'Éé' },
      ]),
    ).toStrictEqual(['ca', 'fr']);
  });
  test('with flagColor clue', () => {
    mocks.getClues.mockReturnValueOnce(mocks.countries);
    mocks.getCharacters.mockReturnValueOnce(mocks.characters);
    expect(getPossibleCountries([{ type: ClueType.FlagColor, value: 'blue' }])).toStrictEqual([
      'fr',
      'us',
    ]);
  });
  test('with character and flagColor clue', () => {
    mocks.getClues.mockReturnValueOnce(mocks.countries);
    mocks.getCharacters.mockReturnValueOnce(mocks.characters);
    expect(
      getPossibleCountries([
        { type: ClueType.FlagColor, value: 'blue' },
        { type: ClueType.Character, value: 'Éé' },
      ]),
    ).toStrictEqual(['fr']);
  });
});

describe('getDataFromClueType', () => {
  test('get characters', () => {
    mocks.getCharacters.mockReturnValueOnce(mocks.characters);
    expect(getDataFromClueType(ClueType.Character)).toStrictEqual(['Éé', 'の']);
  });
  test('get regions', () => {
    mocks.getClues.mockReturnValueOnce(mocks.countries);
    expect(getDataFromClueType(ClueType.Region)).toStrictEqual(['asia', 'europe', 'north america']);
  });
});

describe('getCountriesWithCoverage', () => {
  test('with not covered japan', () => {
    mocks.getClues.mockReturnValueOnce({
      ...mocks.countries,
      jp: { ...mocks.countries.jp, cameraGen: [] },
    });
    expect(getCountriesWithCoverage()).toStrictEqual({
      ca: mocks.countries.ca,
      us: mocks.countries.us,
      fr: mocks.countries.fr,
    });
  });
});

describe('getRandomCountryCode', () => {
  test('random country code', () => {
    mocks.getClues.mockReturnValueOnce(mocks.countries);
    expect(Object.keys(mocks.countries).includes(getRandomCountryCode()));
  });
});

describe('getCluesForCountry', () => {
  test('get all clues for country', () => {
    mocks.getClues.mockReturnValueOnce(mocks.countries);
    mocks.getCharacters.mockReturnValueOnce(mocks.characters);
    const clues = getCluesForCountry('ca');

    const expectedClues = [
      { type: 'region', value: 'north america' },
      { type: 'flagColor', value: 'red' },
      { type: 'flagColor', value: 'white' },
      { type: 'characters', value: 'Éé' },
      { type: 'flagPattern', value: 'vertical-stripes' },
      { type: 'roadLine', value: 'white-yellow' },
      { type: 'alphabet', value: 'latin' },
      { type: 'driving', value: 'right' },
    ];

    clues.forEach((clue) => {
      expect(
        expectedClues.find((c) => c.type === clue.type && c.value === clue.value),
      ).toBeTruthy();
    });
  });
});

describe('getCountryName', () => {
  test('get country name', () => {
    mocks.getClues.mockReturnValueOnce(mocks.countries);
    expect(getCountryName('ca')).toBe('Canada');
  });
});

describe('getCountry', () => {
  test('get country', () => {
    mocks.getClues.mockReturnValueOnce(mocks.countries);
    expect(getCountry('ca')).toBe(mocks.countries.ca);
  });
});

describe('getCountryUniqueCharacters', () => {
  test('same characters', () => {
    mocks.getCharacters.mockReturnValueOnce(mocks.characters);
    expect(getCountryUniqueCharacters('ca', 'fr')).toStrictEqual({
      firstCountryUniqueCharacters: [],
      secondCountryUniqueCharacters: [],
    });
  });
  test('different characters', () => {
    mocks.getCharacters.mockReturnValueOnce(mocks.characters);
    expect(getCountryUniqueCharacters('ca', 'jp')).toStrictEqual({
      firstCountryUniqueCharacters: ['Éé'],
      secondCountryUniqueCharacters: ['の'],
    });
  });
});

describe('getCountryUniqueClues', () => {
  test('region', () => {
    mocks.getClues.mockReturnValueOnce(mocks.countries);
    expect(getCountryUniqueClue('ca', 'fr', ClueType.Region)).toStrictEqual({
      firstCountryUniqueValues: ['north america'],
      secondCountryUniqueValues: ['europe'],
    });
  });
  test('different clues', () => {
    mocks.getClues.mockReturnValueOnce(mocks.countries);
    expect(getCountryUniqueClue('ca', 'jp', ClueType.FlagPattern)).toStrictEqual({
      firstCountryUniqueValues: ['vertical-stripes'],
      secondCountryUniqueValues: ['circle'],
    });
  });
});
