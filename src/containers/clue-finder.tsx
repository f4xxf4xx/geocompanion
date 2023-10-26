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
`;

const ClueFinder = () => {
  return (
    <StyledContainer>
      <div>
        <Map />
        <Solver />
      </div>
      <div>
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
      </div>
    </StyledContainer>
  );
};

export default ClueFinder;
