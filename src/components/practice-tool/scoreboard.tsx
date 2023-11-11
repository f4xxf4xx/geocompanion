import { PracticeToolContext } from 'context/practice-tool';
import { useContext } from 'react';
import { State } from 'types/practice-tool';

const Scoreboard = () => {
  const { roundScore, round, gameScore, state } = useContext(PracticeToolContext);

  if (state === State.NOT_STARTED) return null;

  return (
    <div>
      <div>Round: {round} / 5</div>
      <div>Round score: {roundScore}</div>
      <div>Game score: {gameScore}</div>
    </div>
  );
};

export default Scoreboard;
