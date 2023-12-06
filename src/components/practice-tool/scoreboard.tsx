import { PracticeToolContext } from 'context/practice-tool';
import { useContext } from 'react';
import { State } from 'types/practice-tool';

const Scoreboard = () => {
  const { gameState } = useContext(PracticeToolContext);

  if (gameState.state === State.NOT_STARTED) return null;

  return (
    <div>
      <div>Round: {gameState.round} / 5</div>
      <div>Round score: {gameState.roundScore}</div>
      <div>Game score: {gameState.gameScore}</div>
    </div>
  );
};

export default Scoreboard;
