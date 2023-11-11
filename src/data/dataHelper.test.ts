import { ClueType, Country, CountryData } from 'types/types';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { getPossibleCountries, validateCountryData } from './dataHelper';

const usData: Country = {
  name: 'United States',
  region: ['north america'],
  alphabet: ['latin'],
  scenery: ['mountains', 'woods', 'flat', 'desert'],
  driving: ['right'],
  flagColor: ['red', 'white', 'blue'],
  flagPattern: ['stripes'],
  roadLine: ['white-yellow'],
  language: ['english'],
  coverage: true,
};

const canadaData: Country = {
  name: 'Canada',
  region: ['north america'],
  alphabet: ['latin'],
  scenery: ['mountains', 'woods', 'flat'],
  driving: ['right'],
  flagColor: ['red', 'white'],
  flagPattern: ['vertical-stripes'],
  roadLine: ['white-yellow'],
  language: ['english', 'french'],
  coverage: true,
};

const franceData: Country = {
  name: 'France',
  region: ['europe'],
  alphabet: ['latin'],
  scenery: ['mountains', 'woods', 'flat'],
  driving: ['right'],
  flagColor: ['red', 'white', 'blue'],
  flagPattern: ['vertical-stripes'],
  roadLine: ['white-white'],
  language: ['french'],
  coverage: true,
};

const japanData: Country = {
  name: 'Japan',
  region: ['asia'],
  alphabet: ['japanese'],
  scenery: ['mountains', 'woods', 'flat'],
  driving: ['left'],
  flagColor: ['red', 'white'],
  flagPattern: ['circle'],
  roadLine: ['white-white', 'white-yellow'],
  language: ['japanese'],
  coverage: false,
};

const countries: CountryData = {
  ca: canadaData,
  us: usData,
  fr: franceData,
  jp: japanData,
};

const mocks = vi.hoisted(() => {
  return {
    default: vi.fn(),
  };
});

vi.mock('src/data/countries.json', () => {
  return {
    default: mocks.default,
  };
});

describe('validateData', () => {
  test('with valid data', () => {
    mocks.default.mockReturnValue({ ca: canadaData });
    expect(validateCountryData()).toStrictEqual([]);
  });
  test('with missing field', () => {
    mocks.default.mockReturnValue({ ca: { ...canadaData, name: undefined } });
    expect(validateCountryData()).toStrictEqual(['Missing name for ca']);
  });
});

/* // TODO type
const characters = {
  Éé: ['fr', 'ca'],
}; */

/* describe('getPossibleCountries', () => {
  test.skip('with character clue', () => {
    expect(
      getPossibleCountries(countries, characters, [{ type: ClueType.Character, value: 'Éé' }]),
    ).toStrictEqual(['ca', 'fr']);
  });
  test.skip('with region clue union', () => {
    expect(
      getPossibleCountries(countries, characters, [
        { type: ClueType.Region, value: 'north america' },
        { type: ClueType.Region, value: 'europe' },
      ]),
    ).toStrictEqual(['ca', 'fr', 'us']);
  });
  test.skip('with one region clue and one other', () => {
    expect(
      getPossibleCountries(countries, characters, [
        { type: ClueType.Character, value: 'Éé' },
        { type: ClueType.Region, value: 'north america' },
      ]),
    ).toStrictEqual(['ca']);
  });
  test.skip('with two regions and one other clue', () => {
    expect(
      getPossibleCountries(countries, characters, [
        { type: ClueType.Region, value: 'north america' },
        { type: ClueType.Region, value: 'europe' },
        { type: ClueType.Character, value: 'Éé' },
      ]),
    ).toStrictEqual(['ca', 'fr']);
  });
  test.skip('with flagColor clue', () => {
    expect(
      getPossibleCountries(countries, characters, [{ type: ClueType.FlagColor, value: 'blue' }]),
    ).toStrictEqual(['fr', 'us']);
  });
  test.skip('with character and flagColor clue', () => {
    expect(
      getPossibleCountries(countries, characters, [
        { type: ClueType.FlagColor, value: 'blue' },
        { type: ClueType.Character, value: 'Éé' },
      ]),
    ).toStrictEqual(['fr']);
  });
});
 */
