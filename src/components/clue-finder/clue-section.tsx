import ClueTile from 'components/clue-tile';
import clues from 'data/clues.json';
import { getDataFromClueType } from 'data/dataHelper';
import useClues from 'hooks/useClues';
import { ClueType } from 'types/types';

const ClueSection = ({ clueType }: { clueType: ClueType }) => {
  const data = getDataFromClueType(clueType);
  const { toggleClue } = useClues();

  return (
    <div className="my-2">
      <h3 className="text-2xl">{clues[clueType].displayName}</h3>
      <div className="flex flex-wrap gap-1">
        {data.map((value, index) => (
          <ClueTile onClick={toggleClue} key={index} clue={{ type: clueType, value }} />
        ))}
      </div>
    </div>
  );
};

export default ClueSection;
