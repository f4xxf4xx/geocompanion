import ClueTile from 'components/geoguessr-solver/clue-tile';
import { getClueLabels } from 'data';
import usePracticeTool from 'hooks/usePracticeTool';
import { State } from 'types/practice-tool';

const CurrentClues = () => {
  const { gameState } = usePracticeTool();
  const clueLabels = getClueLabels();

  if (!gameState.clues || gameState.state !== State.STARTED) return null;
  const displayedClues = gameState.clues.slice(0, gameState.cluesQuantity);

  return (
    <div className="flex flex-wrap gap-2">
      {displayedClues.map((clue) => {
        return (
          <div
            className="flex flex-col gap-2 width-100 font-bold rounded p-4 border border-primary items-center"
            key={clue.value}
          >
            <h3>{clueLabels[clue.type].displayName}</h3>
            <ClueTile clue={clue} />
          </div>
        );
      })}
    </div>
  );
};

export default CurrentClues;
