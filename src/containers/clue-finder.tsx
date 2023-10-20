import "App.css";
import Solver from "components/solver";

import ClueSection from "components/clue-section";
import { ClueType } from "types/types";
import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
`;

const ClueFinder = () => {
  return (
    <StyledContainer>
      <div>
        <ClueSection name="Character" clueType={ClueType.Character} />
        <ClueSection name="Road Line" clueType={ClueType.RoadLine} />
        <ClueSection name="Flag color" clueType={ClueType.FlagColor} />
        <ClueSection name="Flag pattern" clueType={ClueType.FlagPattern} />
        <ClueSection name="Region (union)" clueType={ClueType.Region} />
        <ClueSection name="Driving" clueType={ClueType.Driving} />
        <ClueSection name="Scenery" clueType={ClueType.Scenery} />
        <ClueSection name="Alphabet" clueType={ClueType.Alphabet} />
      </div>
      <Solver />
    </StyledContainer>
  );
};

export default ClueFinder;
