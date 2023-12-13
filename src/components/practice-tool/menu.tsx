import { Button } from 'components/layout/button';
import usePracticeTool from 'hooks/usePracticeTool';
import { State } from 'types/practice-tool';

const PracticeToolMenu = () => {
  const { gameState, startGame, resetGame } = usePracticeTool();

  return (
    <div className="flex gap-1">
      {gameState.state === State.NOT_STARTED && <Button onClick={startGame}>Start</Button>}
      {gameState.state !== State.NOT_STARTED && <Button onClick={resetGame}>Restart</Button>}
    </div>
  );
};

export default PracticeToolMenu;
