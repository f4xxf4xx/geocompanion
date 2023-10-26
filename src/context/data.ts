import { createContext } from "react";
import { CharacterData, ClueData, CountryData } from "types/types";

interface DataContextType {
  countries: CountryData;
  characters: CharacterData;
  clues: ClueData;
  possibleCountries: string[];
}

export const DataContext = createContext<DataContextType>({
  countries: {},
  characters: {},
  clues: {},
  possibleCountries: [],
});
