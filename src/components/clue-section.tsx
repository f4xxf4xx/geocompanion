import ClueTile from "components/clue-tile";
import { getDataFromClueType } from "data/dataHelper";
import { ClueType } from "types/types";

const ClueSection = ({
  name,
  clueType,
}: {
  name: string;
  clueType: ClueType;
}) => {
  const data = getDataFromClueType(clueType);

  return (
    <div>
      <h2>{name}</h2>
      <div className="clueTilesContainer">
        {data.map((value, index) => (
          <ClueTile key={index} clue={{ type: clueType, value }} />
        ))}
      </div>
    </div>
  );
};

export default ClueSection;
