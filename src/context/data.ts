import { createContext } from "react";

interface DataContextType {
  possibleCountries: string[];
}

export const DataContext = createContext<DataContextType>({
  possibleCountries: [],
});
