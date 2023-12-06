import { createContext } from 'react';
import { SelectedClue } from 'types/types';

interface ClueContextType {
  selectedClues: SelectedClue[];
  toggleClue: (clue: SelectedClue) => void;
  resetClues: () => void;
  hoveredCountry: string;
  setHoveredCountry: (country: string) => void;
}

export const ClueContext = createContext<ClueContextType>({
  selectedClues: [],
  toggleClue: () => {},
  resetClues: () => {},
  hoveredCountry: '',
  setHoveredCountry: () => {},
});
