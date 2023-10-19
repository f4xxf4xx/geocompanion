import "App.css";
import Solver from "components/solver";

import ClueSection from "components/clue-section";
import { ClueType } from "types/types";

const ClueFinder = () => {
  return (
    <div className="clueFinderContainer">
      <div>
        <ClueSection name="Region" clueType={ClueType.Region} />
        <ClueSection name="Driving" clueType={ClueType.Driving} />
        <ClueSection name="Road Line" clueType={ClueType.RoadLine} />
        <ClueSection name="Alphabet" clueType={ClueType.Alphabet} />
        <ClueSection name="Character" clueType={ClueType.Character} />
        <ClueSection name="Flag color" clueType={ClueType.FlagColor} />
        <ClueSection name="Flag pattern" clueType={ClueType.FlagPattern} />
      </div>
      <Solver />
    </div>
  );
};

export default ClueFinder;
