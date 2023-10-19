import { createContext } from "react";
import { Clue } from "types/types";

interface ClueContextType {
  selectedClues: Clue[];
  toggleClue: (clue: Clue) => void;
  resetClues: () => void;
}

export const ClueContext = createContext<ClueContextType>({
  selectedClues: [],
  toggleClue: () => {},
  resetClues: () => {},
});
