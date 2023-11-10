import ClueTile from 'components/clue-tile';
import clues from 'data/clues.json';
import { getDataFromClueType } from 'data/dataHelper';
import styled from 'styled-components';
import { ClueType } from 'types/types';

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
  const data = getDataFromClueType(clueType);

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
