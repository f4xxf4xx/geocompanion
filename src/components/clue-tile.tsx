import { ClueContext } from "context/clue";
import clueNameMapping from "data/clue_name_mapping.json";
import { useContext } from "react";
import { Clue, ClueType } from "types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTree,
  faSun,
  faMountain,
  faMinus,
  faDroplet,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import ColoredRoadLine from "./clues/colored-road-line";
import { StyledColorSquare } from "./colored-square";

const StyledClueButton = styled.button<{ isSelected: boolean }>`
  display: flex;
  min-width: 50px;
  height: 40px;
  background-color: ${({ isSelected }) =>
    isSelected ? "rgb(232, 252, 211)" : "lightgray"};
  border: none;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.4);
  cursor: pointer;
`;

const StyledTitle = styled.h3`
  align-items: center;
  display: flex;
  gap: 4px;
`;

const sceneryIconMapping = {
  desert: faSun,
  mountains: faMountain,
  woods: faTree,
  flat: faMinus,
  tropical: faDroplet,
};

const ClueTile = ({ clue }: { clue: Clue }) => {
  const { selectedClues, toggleClue } = useContext(ClueContext);
  const isSelected = Boolean(
    selectedClues.find((selectedClue) => selectedClue.value === clue.value)
  );

  let displayedName: string = clue.value;
  if (clue.type === ClueType.RoadLine) {
    displayedName = clueNameMapping[ClueType.RoadLine][clue.value];
  }

  return (
    <StyledClueButton
      key={clue.value}
      onClick={() => toggleClue(clue)}
      isSelected={isSelected}
    >
      <StyledTitle>
        {clue.type === ClueType.FlagColor && (
          <StyledColorSquare color={clue.value} />
        )}
        {clue.type === ClueType.Scenery && sceneryIconMapping?.[clue.value] && (
          <FontAwesomeIcon icon={sceneryIconMapping[clue.value]} />
        )}
        {clue.type === ClueType.RoadLine && (
          <ColoredRoadLine value={clue.value} />
        )}
        {displayedName}
      </StyledTitle>
    </StyledClueButton>
  );
};

export default ClueTile;
