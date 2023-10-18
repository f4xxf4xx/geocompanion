import { createContext } from "react";

export const ClueContext = createContext({
  selectedClues: [],
  toggleClue: (clue) => {},
});
