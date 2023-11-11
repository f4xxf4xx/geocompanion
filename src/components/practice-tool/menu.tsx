import { StyledButton } from 'components/layout/button';
import { PracticeToolContext } from 'context/practice-tool';
import { useContext } from 'react';
import styled from 'styled-components';
import { State } from 'types/practice-tool';

const StyledButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const PracticeToolMenu = () => {
  const { state, startGame, resetGame } = useContext(PracticeToolContext);

  return (
    <StyledButtonWrapper>
      {state === State.NOT_STARTED && <StyledButton onClick={startGame}>Start</StyledButton>}
      {state === State.STARTED && <StyledButton onClick={resetGame}>Restart</StyledButton>}
    </StyledButtonWrapper>
  );
};

export default PracticeToolMenu;
