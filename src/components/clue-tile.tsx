import { ClueContext } from "context/clue";
import clueNameMapping from "data/clue_name_mapping.json";
import { useContext } from "react";
import { Clue, ClueType } from "types/types";

const ClueTile = ({ clue }: { clue: Clue }) => {
  const { selectedClues, toggleClue } = useContext(ClueContext);
  const isSelected = selectedClues.find(
    (selectedClue) => selectedClue.value === clue.value
  );

  let displayedName = clue.value;
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
        {displayedName}
      </h3>
    </button>
  );
};

export default ClueTile;
