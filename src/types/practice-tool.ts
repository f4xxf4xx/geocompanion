import { SelectedClue } from './types';

export enum State {
  NOT_STARTED = 'NOT_STARTED',
  STARTED = 'STARTED',
  FINISHED = 'FINISHED',
}

export interface GameState {
  state: State;
  clues: SelectedClue[];
  country: string | null;
  cluesQuantity: number;
  guessedCountry: string;
  round: number;
  roundScore: number;
  gameScore: number;
}
