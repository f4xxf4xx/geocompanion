import ClueTile from 'components/geoguessr-solver/clue-tile';
import { getClueLabels } from 'data';
import { getDataFromClueType } from 'helpers/geoguessrDataHelper';
import useClues from 'hooks/useClues';
import { ClueType } from 'types/clue';

const ClueSection = ({ clueType }: { clueType: ClueType }) => {
  const data = getDataFromClueType(clueType);
  const clueLabels = getClueLabels();
  const { toggleClue } = useClues();

  return (
    <div className="my-4">
      <h3 className="text-xl font-bold mb-2">{clueLabels[clueType].displayName}</h3>
      <div className="flex flex-wrap gap-1">
        {data.map((value, index) => (
          <ClueTile onClick={toggleClue} key={index} clue={{ type: clueType, value }} />
        ))}
      </div>
    </div>
  );
};

export default ClueSection;
