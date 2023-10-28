import { useContext } from "react";
import ClueTile from "components/clue-tile";
import { getDataFromClueType } from "data/dataHelper";
import { ClueType } from "types/types";
import styled from "styled-components";
import { DataContext } from "context/data";

const StyledClueSection = styled.div`
  margin-top: 8px;
  margin-bottom: 8px;
  border-radius: 16px;
`;

const StyledClueContainer = styled.div`
  margin-top: 4px;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

const ClueSection = ({ clueType }: { clueType: ClueType }) => {
  const { countries, characters, clues } = useContext(DataContext);
  const data = getDataFromClueType(countries, characters, clueType);

  return (
    <StyledClueSection>
      <h3>{clues[clueType].displayName}</h3>
      <StyledClueContainer>
        {data.map((value, index) => (
          <ClueTile key={index} clue={{ type: clueType, value }} />
        ))}
      </StyledClueContainer>
    </StyledClueSection>
  );
};

export default ClueSection;
