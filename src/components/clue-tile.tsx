import { ClueContext } from 'context/clue';
import { useContext } from 'react';
import styled from 'styled-components';
import { Colors } from 'theme/theme';
import { ClueType, SelectedClue } from 'types/types';

import ClueIcon from './clues/clue-icon';
import ColoredRoadLine from './clues/colored-road-line';
import { StyledButton } from './layout/button';

const StyledFlagColorButton = styled(StyledButton)<{
  color: string;
  $isSelected: boolean;
  onClick?: (clue: SelectedClue) => void;
}>`
  background-color: ${({ color }) => color};
  border: ${({ $isSelected }) => ($isSelected ? '4px' : '1px')} solid
    ${({ $isSelected }) => ($isSelected ? Colors.primary : Colors.gray)};
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};
`;

const StyledTitle = styled.h3`
  align-items: center;
  display: flex;
  gap: 4px;
`;

const ClueTile = ({
  clue,
  onClick,
}: {
  clue: SelectedClue;
  onClick?: (clue: SelectedClue) => void;
}) => {
  const { selectedClues } = useContext(ClueContext);
  const isSelected = Boolean(
    selectedClues.find((selectedClue) => selectedClue.value === clue.value),
  );

  let displayedName: string = clue.value;
  if (clue.type === ClueType.RoadLine) {
    displayedName = '';
  }

  if (clue.type === ClueType.FlagColor) {
    return (
      <StyledFlagColorButton
        color={clue.value}
        $isSelected={isSelected}
        onClick={() => onClick(clue)}
      />
    );
  }

  return (
    <StyledButton
      key={clue.value}
      onClick={onClick ? () => onClick(clue) : undefined}
      $isSelected={isSelected}
    >
      <StyledTitle>
        {clue.type === ClueType.RoadLine && <ColoredRoadLine value={clue.value} />}
        <ClueIcon clue={clue} />
        {displayedName}
      </StyledTitle>
    </StyledButton>
  );
};

export default ClueTile;
