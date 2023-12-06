import characters from 'data/characters.json';
import countries from 'data/countries.json';
import { CharacterData, CountryData } from 'types/types';

export const getCountries = () => countries as CountryData;
export const getCharacters = () => characters as CharacterData;
