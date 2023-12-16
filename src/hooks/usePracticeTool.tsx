import { getCluesForCountry, getRandomCountryCode } from 'helpers/geoguessrDataHelper';
import { createContext, useContext, useState } from 'react';
import { GameState, State } from 'types/practice-tool';

interface PracticeToolContextType {
  gameState: GameState;
  startGame: () => void;
  resetGame: () => void;
  submitAnswer: (guessedCountry: string) => void;
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
  submitAnswer: () => {},
});

export const PracticeToolProvider = ({ children }: React.PropsWithChildren) => {
  const [gameState, setGameState] = useState<GameState>(initialState);
  console.debug(gameState);
  const resetGame = () => {
    const randomCountry = getRandomCountryCode();
    console.debug(randomCountry);

    setGameState({
      ...initialState,
      state: State.STARTED,
      country: randomCountry,
      clues: getCluesForCountry(randomCountry),
    });
  };

  const handleNextRound = (win: boolean) => {
    if (gameState.round === 5) {
      setGameState({
        ...gameState,
        state: State.FINISHED,
        gameScore: win ? gameState.gameScore + gameState.roundScore : gameState.gameScore,
      });
      return;
    }

    const randomCountry = getRandomCountryCode();
    console.debug(randomCountry);
    const newClues = getCluesForCountry(randomCountry);

    setGameState({
      ...gameState,
      round: gameState.round + 1,
      gameScore: win ? gameState.gameScore + gameState.roundScore : gameState.gameScore,
      roundScore: 5000,
      cluesQuantity: STARTING_CLUE_COUNT,
      country: randomCountry,
      clues: newClues,
    });
  };

  const startGame = () => {
    console.debug('start game');
    const randomCountry = getRandomCountryCode();
    console.debug(randomCountry);

    setGameState({
      ...gameState,
      state: State.STARTED,
      country: randomCountry,
      clues: getCluesForCountry(randomCountry),
    });
  };

  const submitAnswer = (guessedCountry: string) => {
    if (guessedCountry === gameState.country) {
      handleNextRound(true);
    } else {
      if (gameState.cluesQuantity === gameState.clues.length) {
        handleNextRound(false);
      } else {
        setGameState({
          ...gameState,
          cluesQuantity: gameState.cluesQuantity + 1,
          roundScore: gameState.roundScore - 200,
        });
      }
    }
  };

  return (
    <PracticeToolContext.Provider
      value={{
        gameState,
        startGame,
        resetGame,
        submitAnswer,
      }}
    >
      {children}
    </PracticeToolContext.Provider>
  );
};

const usePracticeTool = () => useContext(PracticeToolContext);
export default usePracticeTool;
