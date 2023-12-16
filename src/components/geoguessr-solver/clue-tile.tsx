import useClues from 'hooks/useClues';
import { ClueType, SelectedClue } from 'types/clue';

import { Button, FlagButton } from '../layout/button';
import ClueIcon from './clue-icon';
import ColoredRoadLine, { roadLineColorMapping } from './colored-road-line';

const ClueTile = ({
  clue,
  onClick,
}: {
  clue: SelectedClue;
  onClick?: (clue: SelectedClue) => void;
}) => {
  const { selectedClues } = useClues();
  const isSelected = Boolean(
    selectedClues.find((selectedClue) => selectedClue.value === clue.value),
  );

  let displayedName: string = clue.value;
  if (clue.type === ClueType.RoadLine) {
    displayedName = '';
  }

  if (clue.type === ClueType.FlagColor) {
    return (
      <FlagButton
        color={clue.value}
        isSelected={isSelected}
        onClick={onClick && (() => onClick(clue))}
      />
    );
  }

  return (
    <Button
      key={clue.value}
      onClick={onClick ? () => onClick(clue) : undefined}
      isSelected={isSelected}
    >
      {clue.type === ClueType.RoadLine && (
        <ColoredRoadLine value={clue.value as keyof typeof roadLineColorMapping} />
      )}
      <ClueIcon clue={clue} />
      {displayedName}
    </Button>
  );
};

export default ClueTile;
