import { ClueContext } from "context/clue";
import { useContext } from "react";
import { ClueType, SelectedClue } from "types/types";

import styled from "styled-components";
import ColoredRoadLine from "./clues/colored-road-line";
import ClueIcon from "./clues/clue-icon";
import { StyledButton } from "./layout/button";
import { Colors } from "theme/theme";

const StyledFlagColorButton = styled(StyledButton)<{
  color: string;
  $isSelected: boolean;
}>`
  background-color: ${({ color }) => color};
  border: ${({ $isSelected }) => ($isSelected ? "4px" : "1px")} solid
    ${({ $isSelected }) => ($isSelected ? Colors.primary : Colors.gray)};
`;

const StyledTitle = styled.h3`
  align-items: center;
  display: flex;
  gap: 4px;
`;

const ClueTile = ({ clue }: { clue: SelectedClue }) => {
  const { selectedClues, toggleClue } = useContext(ClueContext);
  const isSelected = Boolean(
    selectedClues.find((selectedClue) => selectedClue.value === clue.value)
  );

  let displayedName: string = clue.value;
  if (clue.type === ClueType.RoadLine) {
    displayedName = "";
  }

  if (clue.type === ClueType.FlagColor) {
    return (
      <StyledFlagColorButton
        color={clue.value}
        $isSelected={isSelected}
        onClick={() => toggleClue(clue)}
      />
    );
  }

  return (
    <StyledButton
      key={clue.value}
      onClick={() => toggleClue(clue)}
      $isSelected={isSelected}
    >
      <StyledTitle>
        {clue.type === ClueType.RoadLine && (
          <ColoredRoadLine value={clue.value} />
        )}
        <ClueIcon clue={clue} />
        {displayedName}
      </StyledTitle>
    </StyledButton>
  );
};

export default ClueTile;
