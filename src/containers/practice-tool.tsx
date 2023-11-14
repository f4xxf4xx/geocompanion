import CountrySearchbar from 'components/practice-tool/country-searchbar';
import CurrentClues from 'components/practice-tool/current-clues';
import PracticeToolMenu from 'components/practice-tool/menu';
import Scoreboard from 'components/practice-tool/scoreboard';
import { PracticeToolContext, STARTING_CLUE_COUNT, initialState } from 'context/practice-tool';
import { getCluesForCountry, getRandomCountryCode } from 'data/dataHelper';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { GameState, State } from 'types/practice-tool';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
`;

const PracticeTool = () => {
  const [gameState, setGameState] = useState<GameState>(initialState);

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

  const handleNextRound = (win) => {
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
    const randomCountry = getRandomCountryCode();
    console.debug(randomCountry);

    setGameState({
      ...gameState,
      state: State.STARTED,
      country: randomCountry,
      clues: getCluesForCountry(randomCountry),
    });
  };

  const submitAnswer = (guessedCountry) => {
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
      }}
    >
      <StyledContainer>
        <Link to="/">Back</Link>
        <h3>Practice Tool</h3>
        <PracticeToolMenu />
        <Scoreboard />
        <CountrySearchbar submitAnswer={submitAnswer} />
        <CurrentClues />
      </StyledContainer>
    </PracticeToolContext.Provider>
  );
};

export default PracticeTool;
