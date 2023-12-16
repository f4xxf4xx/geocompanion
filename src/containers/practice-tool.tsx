import Header from 'components/layout/header';
import CountrySearchbar from 'components/practice-tool/country-searchbar';
import CurrentClues from 'components/practice-tool/current-clues';
import PracticeToolMenu from 'components/practice-tool/menu';
import Scoreboard from 'components/practice-tool/scoreboard';
import { PracticeToolProvider } from 'hooks/usePracticeTool';

const PracticeTool = () => {
  return (
    <PracticeToolProvider>
      <Header />
      <div className="flex flex-col gap-1 p-2">
        <h3 className="text-2xl">Practice Tool</h3>
        <PracticeToolMenu />
        <Scoreboard />
        <CountrySearchbar />
        <CurrentClues />
      </div>
    </PracticeToolProvider>
  );
};

export default PracticeTool;
