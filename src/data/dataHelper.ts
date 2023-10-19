import { ClueType } from "types/types";
import characters from "data/characters.json";

import countries from "./countries_mapping.json";

export const getDataFromClueType = (clueType: ClueType) => {
  if (clueType === ClueType.Character) {
    return Object.keys(characters);
  }
  return Object.keys(countries)
    .reduce((acc, country) => {
      return [...new Set([...acc, ...countries[country][clueType]])];
    }, [])
    .sort();
};
