import { useEffect, useState } from 'react';

interface ApiResponse {
  capital: string;
  currency: {
    code: string;
    name: string;
  };
  imports: number;
  exports: number;
  fertility: number;
  gdp: number;
  gdp_growth: number;
  gdp_per_capita: number;
  homicide_rate: number;
  infant_mortality: number;
  pop_density: number;
  region: string;
  pop_growth: number;
  population: number;
  sex_ratio: number;
  unemployment: number;
  tourists: number;
}

interface CountryResponse {
  capital: string;
  currency: {
    code: string;
    name: string;
  };
  imports: number;
  exports: number;
  fertility: number;
  gdp: string;
  gdpGrowth: number;
  gdpPerCapita: string;
  homicideRate: number;
  infantMortality: number;
  popDensity: number;
  region: string;
  popGrowth: number;
  population: string;
  sexRatio: number;
  unemployment: number;
  tourists: string;
}

function formatData(data: ApiResponse): CountryResponse {
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
    currency: {
      code: data.currency.code,
      name: data.currency.name,
    },
    imports: data.imports,
    exports: data.exports,
    fertility: data.fertility,
    gdp: USDollar.format(data.gdp * 1000 * 1000),
    gdpGrowth: data.gdp_growth,
    gdpPerCapita: USDollar.format(data.gdp_per_capita),
    homicideRate: data.homicide_rate,
    infantMortality: data.infant_mortality,
    popDensity: data.pop_density,
    region: data.region,
    popGrowth: data.pop_growth,
    population: NumberFormat.format(data.population * 1000),
    sexRatio: data.sex_ratio,
    unemployment: data.unemployment,
    tourists: USDollar.format(data.tourists * 1000 * 1000),
  };
}

const useCountryData = (countryCode?: string) => {
  const [ninjaData, setNinjaData] = useState<CountryResponse | null>(null);

  useEffect(() => {
    if (!countryCode) {
      return;
    }
    const fetchCountryData = async () => {
      const response = await fetch(`https://api.api-ninjas.com/v1/country?name=${countryCode}`, {
        headers: {
          'X-Api-Key': import.meta.env.VITE_NINJA_API_KEY,
        },
      });
      const data = await response.json();
      setNinjaData(formatData(data[0]));
    };

    fetchCountryData();
  }, [countryCode]);

  return ninjaData;
};

export default useCountryData;
