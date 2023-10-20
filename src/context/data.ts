import { createContext } from "react";
import { CharacterData, Clue, ClueNameMapping, CountryData } from "types/types";

interface DataContextType {
  countries: CountryData;
  characters: CharacterData;
  clueNameMapping: ClueNameMapping;
}

export const DataContext = createContext<DataContextType>({
  countries: {},
  characters: {},
  clueNameMapping: {},
});
