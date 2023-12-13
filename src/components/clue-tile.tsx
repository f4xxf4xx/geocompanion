import useClues from 'hooks/useClues';
import { ClueType, SelectedClue } from 'types/types';

import ClueIcon from './clues/clue-icon';
import ColoredRoadLine from './clues/colored-road-line';
import { Button, FlagButton } from './layout/button';

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
      {clue.type === ClueType.RoadLine && <ColoredRoadLine value={clue.value} />}
      <ClueIcon clue={clue} />
      {displayedName}
    </Button>
  );
};

export default ClueTile;
