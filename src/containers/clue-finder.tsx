import ClueSearchbar from 'components/clue-finder/clue-searchbar';
import ClueSection from 'components/clue-finder/clue-section';
import Map from 'components/clue-finder/map';
import Solver from 'components/clue-finder/solver';
import { ClueContext } from 'context/clue';
import { DataContext } from 'context/data';
import { getPossibleCountries } from 'data/dataHelper';
import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { ClueType } from 'types/types';
import { SelectedClue } from 'types/types';

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 16px;
  gap: 16px;
  flex-direction: row;
  @media (max-width: 640px) {
    display: flex;
    flex-direction: column;
  }
`;

const ClueFinder = () => {
  const [selectedClues, setSelectedClues] = useState<SelectedClue[]>([]);
  const [hoveredCountry, setHoveredCountry] = useState<string>('');

  const toggleClue = (clue: SelectedClue) => {
    if (selectedClues.filter((c) => c.value === clue.value).length > 0) {
      setSelectedClues((clues) => clues.filter((c) => c.value !== clue.value));
      return;
    }
    setSelectedClues((clues) => [...clues, clue]);
  };

  const resetClues = () => {
    setSelectedClues([]);
  };

  useEffect(() => {
    window.addEventListener('keydown', (e) => {
      if (e.key === '1') {
        resetClues();
      }
    });
    return () => {
      window.removeEventListener('keydown', () => {});
    };
  }, []);

  const possibleCountries = useMemo(() => getPossibleCountries(selectedClues), [selectedClues]);

  return (
    <DataContext.Provider
      value={{
        possibleCountries,
      }}
    >
      <ClueContext.Provider
        value={{ selectedClues, toggleClue, resetClues, hoveredCountry, setHoveredCountry }}
      >
        <StyledContainer>
          <div>
            <Map />
            <Solver />
          </div>
          <div>
            <h2>Filters</h2>
            <p>Press 1 to reset clues</p>
            <ClueSearchbar />
            <ClueSection clueType={ClueType.Character} />
            <ClueSection clueType={ClueType.Driving} />
            <ClueSection clueType={ClueType.RoadLine} />
            <ClueSection clueType={ClueType.Scenery} />
            <ClueSection clueType={ClueType.FlagColor} />
            <ClueSection clueType={ClueType.FlagPattern} />
            <ClueSection clueType={ClueType.Region} />
            <ClueSection clueType={ClueType.Alphabet} />
            <ClueSection clueType={ClueType.CameraGen} />
          </div>
        </StyledContainer>
      </ClueContext.Provider>
    </DataContext.Provider>
  );
};

export default ClueFinder;
