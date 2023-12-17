import { describe, expect, test, vi } from 'vitest';

import { getCountryAttributeRank, getCountryDisplayValue } from './countryHelper';

describe('getCountryDisplayValue', () => {
  test('no value', () => {
    const country = {
      name: 'Canada',
      capital: '',
    };
    expect(getCountryDisplayValue(country, 'capital')).toEqual('N/A');
  });
  test('string value', () => {
    const country = {
      name: 'Canada',
      capital: 'Ottawa',
    };
    expect(getCountryDisplayValue(country, 'capital')).toEqual('Ottawa');
  });
  test('dollar value', () => {
    const country = {
      name: 'Canada',
      gdp: 1700000,
    };
    expect(getCountryDisplayValue(country, 'gdp')).toEqual('$1.70T');
  });
  test('percent value', () => {
    const country = {
      name: 'Canada',
      pop_growth: 0.8,
    };
    expect(getCountryDisplayValue(country, 'pop_growth')).toEqual('0.8%');
  });
  test('squaredArea attribute', () => {
    const country = {
      name: 'Canada',
      pop_density: 4,
    };
    expect(getCountryDisplayValue(country, 'pop_density')).toEqual('4.00 / km²');
  });
  test('area attribute', () => {
    const country = {
      name: 'Canada',
      surface_area: 100000,
    };
    expect(getCountryDisplayValue(country, 'surface_area')).toEqual('100.00K km²');
  });
  test('gdp_per_capita value', () => {
    const country = {
      name: 'Canada',
      gdp_per_capita: 50000,
    };
    expect(getCountryDisplayValue(country, 'gdp_per_capita')).toEqual('$50.00K');
  });
  test('adjustedNumber value', () => {
    const country = {
      name: 'Canada',
      population: 1700,
    };
    expect(getCountryDisplayValue(country, 'population')).toEqual('1.70M');
  });
  test('life_expectancy_male', () => {
    const country = {
      name: 'Canada',
      life_expectancy_male: 80,
    };
    expect(getCountryDisplayValue(country, 'life_expectancy_male')).toEqual('80 years');
  });
  test('ratePer100k attribute', () => {
    const country = {
      name: 'Canada',
      homicide_rate: 2,
    };
    expect(getCountryDisplayValue(country, 'homicide_rate')).toEqual('2.00 per 100,000');
  });
  test('default', () => {
    const country = {
      name: 'Canada',
      region: 'North America',
    };
    expect(getCountryDisplayValue(country, 'region')).toEqual('North America');
  });
});

const mocks = vi.hoisted(() => {
  return {
    getCountries: vi.fn(),
    countries: {
      CA: {
        name: 'Canada',
        gdp: 200,
      },
      US: {
        name: 'United States',
        gdp: 300,
      },
      MX: {
        name: 'Mexico',
        gdp: 100,
      },
      FR: {
        name: 'France',
        gdp: 150,
      },
      ES: {
        name: 'Spain',
        gdp: 150,
      },
    },
  };
});

vi.mock('data/index', () => {
  return {
    getCountries: mocks.getCountries,
  };
});

describe('getCountryAttributeRank', () => {
  test('no value for attribute', () => {
    mocks.getCountries.mockReturnValueOnce({ CA: { name: 'Canada' } });
    expect(getCountryAttributeRank('CA', 'gdp')).toEqual(null);
  });
  test('string attribute', () => {
    mocks.getCountries.mockReturnValueOnce({ CA: { name: 'Canada', capital: 'Ottawa' } });
    expect(getCountryAttributeRank('CA', 'capital')).toEqual(null);
  });
  test('first rank', () => {
    mocks.getCountries.mockReturnValueOnce(mocks.countries);

    const rank = getCountryAttributeRank('US', 'gdp');
    expect(rank?.index).toEqual(1);
    expect(rank?.indexColor).toEqual('rgb(0, 255, 255)');
    expect(rank?.value).toEqual(300);
    expect(rank?.valueColor).toEqual('rgb(26, 36, 127)');
  });
  test.only('last rank', () => {
    mocks.getCountries.mockReturnValueOnce(mocks.countries);

    const rank = getCountryAttributeRank('MX', 'gdp');
    expect(rank?.index).toEqual(5);
    expect(rank?.indexColor).toEqual('rgb(255, 0, 0)');
    expect(rank?.value).toEqual(100);
    expect(rank?.valueColor).toEqual('rgb(255, 255, 255)');
  });
});
