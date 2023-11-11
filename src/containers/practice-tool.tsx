import CountrySearchbar from 'components/country-searchbar';
import CurrentClues from 'components/practice-tool/current-clues';
import PracticeToolMenu from 'components/practice-tool/menu';
import Scoreboard from 'components/practice-tool/scoreboard';
import { PracticeToolContext } from 'context/practice-tool';
import { getCluesForCountry, getRandomCountryCode } from 'data/dataHelper';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { State } from 'types/practice-tool';
import { SelectedClue } from 'types/types';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
`;

const STARTING_CLUE_COUNT = 5;

const PracticeTool = () => {
  const [state, setState] = useState(State.NOT_STARTED);
  const [clues, setClues] = useState<SelectedClue[]>([]);
  const [country, setCountry] = useState(null);
  const [cluesQuantity, setCluesQuantity] = useState(STARTING_CLUE_COUNT);
  const [, setGuessedCountry] = useState('');
  const [round, setRound] = useState(1);
  const [roundScore, setRoundScore] = useState(5000);
  const [gameScore, setGameScore] = useState(0);

  const resetGame = () => {
    setState(State.NOT_STARTED);
    setClues([]);
    setCountry(null);
    setCluesQuantity(STARTING_CLUE_COUNT);
    setGuessedCountry('');
    setRound(1);
    setRoundScore(5000);
    setGameScore(0);
    startGame();
  };

  const handleNextRound = (score) => {
    setRound(round + 1);
    setGameScore(gameScore + score);
    setRoundScore(5000);
    setCluesQuantity(STARTING_CLUE_COUNT);
    const randomCountry = getRandomCountryCode();
    console.debug(randomCountry);
    setCountry(randomCountry);
    generateClues(randomCountry);
  };

  const generateClues = (randomCountry: string) => {
    setClues(getCluesForCountry(randomCountry));
  };

  const startGame = () => {
    setState(State.STARTED);

    const randomCountry = getRandomCountryCode();
    console.debug(randomCountry);
    setCountry(randomCountry);
    generateClues(randomCountry);
  };

  const addClue = () => {
    if (cluesQuantity === clues.length) return;
    setCluesQuantity(cluesQuantity + 1);
  };

  const handleGoodAnswer = () => {
    handleNextRound();
  };

  const handleEndGame = () => {};

  const handleBadAnswer = () => {
    console.debug(cluesQuantity, clues.length);
    if (cluesQuantity === clues.length) {
      handleNextRound(0);
    } else {
      setRoundScore(roundScore - 200);
      addClue();
    }
  };

  const submitAnswer = (guessedCountry) => {
    if (guessedCountry === country) {
      handleGoodAnswer();
    } else {
      handleBadAnswer();
    }
  };

  return (
    <PracticeToolContext.Provider
      value={{
        state,
        startGame,
        resetGame,
        clues,
        cluesQuantity,
        roundScore,
        round,
        gameScore,
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
