import { createContext } from 'react';
import { State } from 'types/practice-tool';
import { SelectedClue } from 'types/types';

interface PracticeToolContextType {
  state: State;
  startGame: () => void;
  resetGame: () => void;
  clues: SelectedClue[];
  cluesQuantity: number;
  roundScore: number;
  round: number;
  gameScore: number;
}

export const PracticeToolContext = createContext<PracticeToolContextType>({
  state: State.NOT_STARTED,
  startGame: () => {},
  resetGame: () => {},
  clues: [],
  cluesQuantity: 0,
  roundScore: 5000,
  round: 1,
  gameScore: 0,
});
