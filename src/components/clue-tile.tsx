import { ClueContext } from "context/clue";
import { useContext } from "react";
import { ClueType, SelectedClue } from "types/types";

import styled from "styled-components";
import ColoredRoadLine from "./clues/colored-road-line";
import ClueIcon from "./clues/clue-icon";

const StyledClueButton = styled.button<{ $isSelected: boolean }>`
  display: flex;
  min-width: 50px;
  height: 40px;
  color: ${({ $isSelected }) => ($isSelected ? "#eef2f6" : "#1a247f;")};
  background-color: ${({ $isSelected }) =>
    $isSelected ? "#1a247f;" : "#eef2f6"};
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 1px solid lightgray;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
  text-transform: capitalize;
`;

const StyledFlagColorButton = styled(StyledClueButton)<{
  color: string;
  $isSelected: boolean;
}>`
  background-color: ${({ color }) => color};
  border: ${({ $isSelected }) => ($isSelected ? "4px" : "1px")} solid
    ${({ $isSelected }) => ($isSelected ? "#1a247f;" : "lightgray")};
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
    <StyledClueButton
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
    </StyledClueButton>
  );
};

export default ClueTile;
