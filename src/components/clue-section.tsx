import { useContext } from "react";
import ClueTile from "components/clue-tile";
import { getDataFromClueType } from "data/dataHelper";
import { ClueType } from "types/types";
import styled from "styled-components";
import { DataContext } from "context/data";

const StyledClueContainer = styled.div`
  margin-top: 4px;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

const ClueSection = ({
  name,
  clueType,
}: {
  name: string;
  clueType: ClueType;
}) => {
  const { countries, characters } = useContext(DataContext);
  const data = getDataFromClueType(countries, characters, clueType);

  return (
    <div>
      <h2>{name}</h2>
      <StyledClueContainer>
        {data.map((value, index) => (
          <ClueTile key={index} clue={{ type: clueType, value }} />
        ))}
      </StyledClueContainer>
    </div>
  );
};

export default ClueSection;
