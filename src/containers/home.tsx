import ClueSearchbar from 'components/clue-finder/clue-searchbar';
import ClueSection from 'components/clue-finder/clue-section';
import Map from 'components/clue-finder/map';
import Solver from 'components/clue-finder/solver';
import Header from 'components/layout/header';
import { validateCountryData } from 'data/dataHelper';
import { ClueProvider } from 'hooks/useClues';
import { ClueType } from 'types/types';

const Home = () => {
  const validData = validateCountryData();

  return (
    <div className="p-4">
      <Header />
      {validData ? (
        <ClueProvider>
          <div className="grid grid-cols-1 md:grid-cols-[1fr,1fr] gap-4 p-4">
            <div>
              <Map />
              <Solver />
            </div>
            <div>
              <h2>Filters</h2>
              <p>Press 1 to reset clues</p>
              <ClueSearchbar />
              <ClueSection clueType={ClueType.Character} />
              <ClueSection clueType={ClueType.Driving} />
              <ClueSection clueType={ClueType.RoadLine} />
              <ClueSection clueType={ClueType.CameraGen} />
              <ClueSection clueType={ClueType.FlagColor} />
              <ClueSection clueType={ClueType.FlagPattern} />
              <ClueSection clueType={ClueType.Region} />
              <ClueSection clueType={ClueType.Alphabet} />
              <ClueSection clueType={ClueType.Scenery} />
            </div>
          </div>
        </ClueProvider>
      ) : (
        <div>Invalid data</div>
      )}
    </div>
  );
};

export default Home;
