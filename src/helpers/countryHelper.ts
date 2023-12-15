import { getCountries } from 'data';
import { Country } from 'types/country';

/* export function formatData(data: Country): Country {
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
  return {
    capital: data.capital,
    currencyCode: data?.code,
    currencyName: data?.name,
    imports: data.imports,
    exports: data.exports,
    fertility: data.fertility,
    gdp: data.gdp ? USDollar.format(data.gdp * 1000 * 1000) : undefined,
    gdpGrowth: data.gdp_growth,
    gdpPerCapita: data.gdp_per_capita ? USDollar.format(data.gdp_per_capita) : undefined,
    homicideRate: data.homicide_rate,
    infantMortality: data.infant_mortality,
    name: data.name,
    popDensity: data.pop_density,
    region: data.region,
    popGrowth: data.pop_growth,
    population: data.population ? NumberFormat.format(data.population * 1000) : undefined,
    sexRatio: data.sex_ratio,
    surfaceArea: data.surface_area ? `${NumberFormat.format(data.surface_area)} km²` : undefined,
    unemployment: data.unemployment,
  };
} */

export const getCountryAttributeRank = (
  country: Country,
  attribute: keyof Country,
): number | null => {
  const countries = getCountries();
  const currentCountryValue = country[attribute];

  if (typeof currentCountryValue !== 'number') return null;

  const allAttributes = Object.keys(countries)
    .filter((country) => countries[country]?.[attribute] !== undefined)
    .map((country) => {
      const cc = countries[country];
      return cc[attribute];
    });

  if (typeof allAttributes[0] === 'number') {
    allAttributes.sort(function (a, b) {
      return b - a;
    });
  }

  return allAttributes.indexOf(currentCountryValue) + 1;
};
