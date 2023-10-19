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
    <div className="cluesContainer">
      <h2>{name}</h2>
      {data.map((value, index) => (
        <ClueTile key={index} clue={{ type: clueType, value }} />
      ))}
    </div>
  );
};

export default ClueSection;
