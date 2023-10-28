import "App.css";
import Solver from "components/solver";

import ClueSection from "components/clue-section";
import { ClueType } from "types/types";
import styled from "styled-components";
import Map from "components/map";
import ClueSearchbar from "components/clue-searchbar";

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 640px 1fr;
  padding: 16px;
  gap: 16px;
  flex-direction: row;
  @media (max-width: 900px) {
    grid-template-columns: 480px 1fr;
  }
  @media (max-width: 640px) {
    display: flex;
    flex-direction: column;
  }
`;

const StyledLeftContainer = styled.div``;

const StyledRightContainer = styled.div``;

const ClueFinder = () => {
  return (
    <StyledContainer>
      <StyledLeftContainer>
        <Map />
        <Solver />
      </StyledLeftContainer>
      <StyledRightContainer>
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
      </StyledRightContainer>
    </StyledContainer>
  );
};

export default ClueFinder;
