import ClueTile from "components/clue-tile";
import { getDataFromClueType } from "data/dataHelper";
import { ClueType } from "types/types";
import countries from "data/country_data.json";
import styled from "styled-components";

const StyledClueContainer = styled.div`
  margin-top: 4px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 4px;
`;

const ClueSection = ({
  name,
  clueType,
}: {
  name: string;
  clueType: ClueType;
}) => {
  const data = getDataFromClueType(countries, clueType);

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
