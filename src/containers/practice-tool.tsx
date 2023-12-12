import CountrySearchbar from 'components/practice-tool/country-searchbar';
import CurrentClues from 'components/practice-tool/current-clues';
import PracticeToolMenu from 'components/practice-tool/menu';
import Scoreboard from 'components/practice-tool/scoreboard';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
`;

const PracticeTool = () => {
  return (
    <StyledContainer>
      <Link to="/">Back</Link>
      <h3>Practice Tool</h3>
      <PracticeToolMenu />
      <Scoreboard />
      <CountrySearchbar />
      <CurrentClues />
    </StyledContainer>
  );
};

export default PracticeTool;
