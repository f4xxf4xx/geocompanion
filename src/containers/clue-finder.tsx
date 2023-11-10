import ClueSearchbar from 'components/clue-searchbar';
import ClueSection from 'components/clue-section';
import Map from 'components/map';
import Solver from 'components/solver';
import styled from 'styled-components';
import { ClueType } from 'types/types';

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
  return (
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
      </div>
    </StyledContainer>
  );
};

export default ClueFinder;
