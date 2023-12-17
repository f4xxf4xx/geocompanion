import characters from 'data/characters.json';
import clueLabels from 'data/clueLabels.json';
import clues from 'data/clues.json';
import countries from 'data/countries.json';
import { CharacterData } from 'types/character';
import { ClueData } from 'types/clue';
import { Country, CountryData, CountryRaw } from 'types/country';

// Split the currency property into currencyCode and currencyName
const formattedCountries = {} as Record<keyof typeof countries, Country>;
Object.keys(countries).forEach((key) => {
  const country = countries[key as keyof typeof countries] as CountryRaw;
  if (!country) return;

  formattedCountries[key as keyof typeof countries] = {
    ...country,
    currencyCode: country?.currency?.code,
    currencyName: country?.currency?.name,
  };
});

export const getCountries = () => formattedCountries as CountryData;
export const getCharacters = () => characters as CharacterData;
export const getClues = () => clues as ClueData;
export const getClueLabels = () => clueLabels;
