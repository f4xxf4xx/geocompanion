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

const StyledColor = styled.div<{ color: string }>`
  width: 8px;
  height: 8px;
  background-color: ${({ color }) => color};
`;

const sceneryIconMapping = {
  desert: faSun,
  mountains: faMountain,
  woods: faTree,
  flat: faMinus,
  tropical: faDroplet,
};

const roadLineColorMapping = {
  "yellow-white": ["yellow", "white", "yellow"],
  "white-white": ["white", "white", "white"],
  "yellow-yellow": ["yellow", "yellow", "yellow"],
  "white-yellow": ["white", "yellow", "white"],
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

  const getRoadLineColor = () => {
    if (clue.type !== ClueType.RoadLine) {
      return null;
    }
    return roadLineColorMapping[clue.value].map((color) => (
      <div className="clueFlagColor" style={{ backgroundColor: color }} />
    ));
  };

  return (
    <StyledClueButton
      key={clue.value}
      onClick={() => toggleClue(clue)}
      isSelected={isSelected}
    >
      <StyledTitle>
        {clue.type === ClueType.FlagColor && <StyledColor color={clue.value} />}
        {clue.type === ClueType.Scenery && sceneryIconMapping?.[clue.value] && (
          <FontAwesomeIcon icon={sceneryIconMapping[clue.value]} />
        )}
        {getRoadLineColor()}
        {displayedName}
      </StyledTitle>
    </StyledClueButton>
  );
};

export default ClueTile;
