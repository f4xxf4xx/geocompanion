import ClueTile from 'components/clue-tile';
import CountrySearchbar from 'components/country-searchbar';
import { StyledButton } from 'components/layout/button';
import { getCluesForCountry, getCountryName, getRandomCountryCode } from 'data/dataHelper';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Colors } from 'theme/theme';
import { SelectedClue } from 'types/types';

enum State {
  NOT_STARTED = 'NOT_STARTED',
  STARTED = 'STARTED',
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
`;

const StyledGivenClueWrapper = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const StyledGivenClue = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100px;
  border-radius: 8px;
  padding: 16px;
  border: 1px solid ${Colors.primary};

  justify-content: center;
  justify-items: center;
`;

const STARTING_CLUE_COUNT = 999;

const PracticeTool = () => {
  const [state, setState] = useState(State.NOT_STARTED);
  const [clues, setClues] = useState<SelectedClue[]>([]);
  const [country, setCountry] = useState(null);
  const [cluesQuantity, setCluesQuantity] = useState(STARTING_CLUE_COUNT);
  const [, setGuessedCountry] = useState('');

  const reset = () => {
    setState(State.NOT_STARTED);
    setClues([]);
    setCountry(null);
    setCluesQuantity(STARTING_CLUE_COUNT);
    setGuessedCountry('');
    start();
  };

  const generateClues = (randomCountry) => {
    setClues(getCluesForCountry(randomCountry));
  };

  const start = () => {
    setState(State.STARTED);

    const randomCountry = 'cl';
    setCountry(randomCountry);
    generateClues(randomCountry);
  };

  /* const addClue = () => {
    if (cluesQuantity === clues.length) return;
    setCluesQuantity(cluesQuantity + 1);
  }; */

  const renderClues = () => {
    if (!clues) return null;
    const displayedClues = clues.slice(0, cluesQuantity);
    return (
      <StyledGivenClueWrapper>
        {displayedClues.map((clue) => {
          return (
            <StyledGivenClue key={clue.value}>
              <h3>{clue.type}</h3>
              <ClueTile clue={clue} />
            </StyledGivenClue>
          );
        })}
      </StyledGivenClueWrapper>
    );
  };

  const submitAnswer = (guessedCountry) => {
    if (
      guessedCountry.toLowerCase() === country ||
      guessedCountry.toLowerCase() === getCountryName(country).toLowerCase()
    ) {
      alert('Correct!');
      reset();
    } else {
      alert('Incorrect!');
    }
  };

  return (
    <StyledContainer>
      <Link to="/">Back</Link>
      <h3>Practice Tool</h3>
      {state === State.NOT_STARTED && <StyledButton onClick={start}>Start</StyledButton>}
      {state === State.STARTED && <StyledButton onClick={reset}>Restart</StyledButton>}
      {/* {state === State.STARTED && clues && (
        <StyledButton onClick={addClue}>Add a clue</StyledButton>
      )} */}
      <CountrySearchbar submitAnswer={submitAnswer} />
      {renderClues()}
    </StyledContainer>
  );
};

export default PracticeTool;
