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

const iconMapping = {
  desert: faSun,
  mountains: faMountain,
  woods: faTree,
  flat: faMinus,
  tropical: faDroplet,
};

const ClueTile = ({ clue }: { clue: Clue }) => {
  const { selectedClues, toggleClue } = useContext(ClueContext);
  const isSelected = selectedClues.find(
    (selectedClue) => selectedClue.value === clue.value
  );

  let displayedName: string | JSX.Element = clue.value;
  if (clue.type === ClueType.RoadLine) {
    displayedName = clueNameMapping[ClueType.RoadLine][clue.value];
  }

  return (
    <button
      key={clue.value}
      className={`clueTileContainer clickable ${
        isSelected ? "clueSelected" : ""
      }`}
      onClick={() => toggleClue(clue)}
    >
      <h3 className="clueTileTitle">
        {clue.type === ClueType.FlagColor && (
          <div
            className="clueFlagColor"
            style={{ backgroundColor: clue.value }}
          />
        )}
        {clue.type === ClueType.Scenery && iconMapping?.[clue.value] && (
          <FontAwesomeIcon icon={iconMapping[clue.value]} />
        )}
        {displayedName}
      </h3>
    </button>
  );
};

export default ClueTile;
