import characters from 'data/characters.json';
import clueLabels from 'data/clueLabels.json';
import clues from 'data/clues.json';
import countries from 'data/countries.json';
import { CharacterData } from 'types/character';
import { ClueData } from 'types/clue';
import { CountryData } from 'types/country';

// split the currency property into currencyCode and currencyName
const formattedCountries: CountryData = {};
Object.keys(countries).forEach((key) => {
  const country = countries[key];
  if (!country) return;
  const { currency, data } = country;
  if (!currency) return { ...data };

  formattedCountries[key] = {
    ...data,
    currencyCode: currency.code,
    currencyName: currency.name,
  };
});

export const getCountries = () => countries as CountryData;
export const getCharacters = () => characters as CharacterData;
export const getClues = () => clues as ClueData;
export const getClueLabels = () => clueLabels;
