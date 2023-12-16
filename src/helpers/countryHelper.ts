import { getCountries } from 'data';
import { Country } from 'types/country';

const dollarAttributes = ['gdp', 'imports', 'exports'];
const adjustedNumberAttributes = ['population'];
const areaAttributes = ['surface_area'];
const percentAttributes = [
  'pop_growth',
  'gdp_growth',
  'fertility',
  'unemployment',
  'infant_mortality',
  'sex_ratio',
  'forested_area',
];

const NumberFormat = new Intl.NumberFormat('en-US', {
  style: 'decimal',
  notation: 'compact',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  notation: 'compact',
  maximumFractionDigits: 2,
});

export function getCountryDisplayValue(country: Country, attribute: keyof Country) {
  const value = country?.[attribute];
  if (!value) return 'N/A';
  if (typeof value === 'string') return value;

  if (dollarAttributes.includes(attribute)) {
    return USDollar.format(value * 1000 * 1000);
  }

  if (percentAttributes.includes(attribute)) {
    return `${value}%`;
  }

  if (attribute === ('pop_density' as keyof Country)) {
    return `${NumberFormat.format(value)} / km²`;
  }

  if (areaAttributes.includes(attribute)) {
    return `${NumberFormat.format(value)} km²`;
  }

  if (attribute === ('gdp_per_capita' as keyof Country)) {
    return USDollar.format(value);
  }

  if (adjustedNumberAttributes.includes(attribute)) {
    return NumberFormat.format(value * 1000);
  }

  if (
    attribute === ('life_expectancy_male' as keyof Country) ||
    attribute === ('life_expectancy_female' as keyof Country)
  ) {
    return `${value} years`;
  }

  if (attribute === ('homicide_rate' as keyof Country)) {
    return `${NumberFormat.format(value)} per 100,000`;
  }

  if (attribute) return NumberFormat.format(value);
}

function isStringField(country: Country, field: keyof Country): field is keyof Country & string {
  return typeof country[field] === 'string';
}

const reversedAttributes = ['infant_mortality', 'unemployment', 'homicide_rate'];

export const getCountryAttributeRank = (
  country: Country,
  attribute: keyof Country,
): {
  maxRange: number;
  index: number;
} | null => {
  const countries = getCountries();
  if (!country?.[attribute]) {
    return null;
  }

  if (isStringField(country, attribute)) {
    return null;
  }

  const allAttributes = Object.keys(countries).map((country) => countries[country][attribute]);
  const filteredAttributes: number[] = allAttributes.filter((value) => typeof value === 'number');

  filteredAttributes.sort(function (a, b) {
    return b - a;
  });

  const index = filteredAttributes.indexOf(country[attribute]);
  return {
    maxRange: filteredAttributes.length,
    index: reversedAttributes.includes(attribute) ? filteredAttributes.length - index : index + 1,
  };
};
