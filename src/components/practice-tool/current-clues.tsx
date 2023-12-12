import ClueTile from 'components/clue-tile';
import usePracticeTool from 'hooks/usePracticeTool';
import { Colors } from 'lib/color';
import styled from 'styled-components';
import { State } from 'types/practice-tool';

const StyledGivenClueWrapper = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const StyledGivenClue = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100px;
  border-radius: 8px;
  padding: 16px;
  border: 1px solid ${Colors.primary};

  justify-content: center;
  justify-items: center;
`;

const CurrentClues = () => {
  const { gameState } = usePracticeTool();

  if (!gameState.clues || gameState.state !== State.STARTED) return null;
  const displayedClues = gameState.clues.slice(0, gameState.cluesQuantity);

  return (
    <StyledGivenClueWrapper>
      {displayedClues.map((clue) => {
        return (
          <StyledGivenClue key={clue.value}>
            <h3>{clue.type}</h3>
            <ClueTile clue={clue} />
          </StyledGivenClue>
        );
      })}
    </StyledGivenClueWrapper>
  );
};

export default CurrentClues;
