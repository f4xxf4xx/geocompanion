import { createContext } from 'react';
import { GameState, State } from 'types/practice-tool';

interface PracticeToolContextType {
  gameState: GameState;
  startGame: () => void;
  resetGame: () => void;
}

export const STARTING_CLUE_COUNT = 5;

export const initialState: GameState = {
  state: State.NOT_STARTED,
  clues: [],
  country: null,
  cluesQuantity: STARTING_CLUE_COUNT,
  guessedCountry: '',
  round: 1,
  roundScore: 5000,
  gameScore: 0,
};

export const PracticeToolContext = createContext<PracticeToolContextType>({
  gameState: initialState,
  startGame: () => {},
  resetGame: () => {},
});
