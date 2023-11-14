import * as jsonCharacters from 'data/characters.json';
import * as jsonCountries from 'data/countries.json';
import { CharacterData, CountryData } from 'types/types';

export const getCountries = () => jsonCountries.default as CountryData;
export const getCharacters = () => jsonCharacters.default as CharacterData;
