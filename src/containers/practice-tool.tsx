import CountrySearchbar from 'components/practice-tool/country-searchbar';
import CurrentClues from 'components/practice-tool/current-clues';
import PracticeToolMenu from 'components/practice-tool/menu';
import Scoreboard from 'components/practice-tool/scoreboard';
import { Link } from 'react-router-dom';

const PracticeTool = () => {
  return (
    <div className="flex flex-col gap-1 p-1">
      <Link to="/">Back</Link>
      <h3>Practice Tool</h3>
      <PracticeToolMenu />
      <Scoreboard />
      <CountrySearchbar />
      <CurrentClues />
    </div>
  );
};

export default PracticeTool;
