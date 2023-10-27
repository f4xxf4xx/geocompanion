import "App.css";
import Solver from "components/solver";

import ClueSection from "components/clue-section";
import { ClueType } from "types/types";
import styled from "styled-components";
import Map from "components/map";
import ClueSearchbar from "components/clue-searchbar";

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 800px 1fr;
  padding: 16px;
`;

const StyledLeftContainer = styled.div`
  background-color: #eef2f6;
`;

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
        <ClueSection clueType={ClueType.FlagColor} />
        <ClueSection clueType={ClueType.FlagPattern} />
        <ClueSection clueType={ClueType.RoadLine} />
        <ClueSection clueType={ClueType.Region} />
        <ClueSection clueType={ClueType.Scenery} />
        <ClueSection clueType={ClueType.Alphabet} />
      </StyledRightContainer>
    </StyledContainer>
  );
};

export default ClueFinder;
