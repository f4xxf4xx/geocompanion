import ClueTile from 'components/clue-tile';
import usePracticeTool from 'hooks/usePracticeTool';
import { State } from 'types/practice-tool';

const CurrentClues = () => {
  const { gameState } = usePracticeTool();

  if (!gameState.clues || gameState.state !== State.STARTED) return null;
  const displayedClues = gameState.clues.slice(0, gameState.cluesQuantity);

  return (
    <div className="flex flex-wrap gap-2">
      {displayedClues.map((clue) => {
        return (
          <div
            className="flex flex-col gap-2 width-100 rounded p-4 border border-primary items-center"
            key={clue.value}
          >
            <h3>{clue.type}</h3>
            <ClueTile clue={clue} />
          </div>
        );
      })}
    </div>
  );
};

export default CurrentClues;
