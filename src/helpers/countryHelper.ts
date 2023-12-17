import { scaleLinear } from 'd3-scale';
import { getCountries } from 'data';
import { Country } from 'types/country';

const dollarAttributes = ['gdp', 'imports', 'exports'];
const adjustedNumberAttributes = ['population'];
const squaredAreaAttributes = ['pop_density'];
const areaAttributes = ['surface_area'];
const ratePer100kAttributes = ['homicide_rate'];
const ratePer10kAttributes = ['infant_mortality'];
const percentAttributes = [
  'pop_growth',
  'gdp_growth',
  'fertility',
  'unemployment',
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

  if (squaredAreaAttributes.includes(attribute)) {
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

  if (ratePer100kAttributes.includes(attribute)) {
    return `${NumberFormat.format(value)} per 100,000`;
  }

  if (ratePer10kAttributes.includes(attribute)) {
    return `${NumberFormat.format(value)} per 10,000`;
  }

  return NumberFormat.format(value);
}

function isStringField(country: Country, field: keyof Country): field is keyof Country & string {
  return typeof country[field] === 'string';
}

// todo move
const Primary = '#1a247f';
const Red = '#ff0000';
const Green = '#00ff00';
const White = '#ffffff';

export const getCountryAttributeRank = (
  countryCode: string,
  attribute: keyof Country,
  reversed?: boolean,
) => {
  const countries = getCountries();
  const country = countries[countryCode.toUpperCase()];
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

  const value = country[attribute];

  const indexColorScale = scaleLinear()
    .domain([1, filteredAttributes.length])
    // @ts-ignore
    .range(reversed ? [Red, Green] : [Green, Red]);

  const index = filteredAttributes.indexOf(value) + 1;
  const minValue = filteredAttributes[filteredAttributes.length - 1];
  const maxValue = filteredAttributes[0];
  // @ts-ignore
  const valueColorScale = scaleLinear().domain([minValue, maxValue]).range([White, Primary]);

  return {
    value,
    index: reversed ? filteredAttributes.length - index + 1 : index,
    indexColor: String(indexColorScale(index)),
    valueColor: String(valueColorScale(value)),
  };
};
