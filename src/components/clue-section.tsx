import { useContext } from "react";

import ClueTile from "components/clue-tile";
import { ClueContext } from "context/clue";

const ClueSection = ({ name, data, clueType }) => {
  const { selectedClues, toggleClue } = useContext(ClueContext);

  return (
    <div className="cluesContainer">
      <h2>{name}</h2>
      {data.map((item) => (
        <ClueTile
          key={item}
          clueType={clueType}
          value={item}
          onPress={toggleClue}
          clues={selectedClues}
        />
      ))}
    </div>
  );
};

export default ClueSection;
