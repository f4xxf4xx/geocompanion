import { createContext, useContext, useState } from 'react';
import { Country } from 'types/country';

interface CountryContextType {
  attributes: string[];
  selectedAttribute: keyof Country | null;
  setSelectedAttribute: (attribute: keyof Country | null) => void;
}

const attributes = [
  'surface_area',
  'forested_area',
  'population',
  'pop_growth',
  'pop_density',
  'infant_mortality',
  'life_expectancy_male',
  'life_expectancy_female',
  'sex_ratio',
  'gdp',
  'gdp_per_capita',
  'gdp_growth',
  'unemployment',
  'imports',
  'exports',
  'homicide_rate',
];

export const CountryContext = createContext<CountryContextType>({
  attributes: [],
  selectedAttribute: null,
  setSelectedAttribute: () => {},
});

export const CountryProvider = ({ children }: React.PropsWithChildren) => {
  const [selectedAttribute, setSelectedAttribute] = useState<keyof Country | null>(null);

  const toggleAttribute = (attribute: keyof Country | null) => {
    setSelectedAttribute((prev) => (prev === attribute ? null : attribute));
  };

  return (
    <CountryContext.Provider
      value={{
        attributes,
        selectedAttribute,
        setSelectedAttribute: toggleAttribute,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
};

const useCountries = () => useContext(CountryContext);
export default useCountries;
