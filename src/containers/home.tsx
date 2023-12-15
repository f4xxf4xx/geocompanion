import ClueSearchbar from 'components/clue-finder/clue-searchbar';
import ClueSection from 'components/clue-finder/clue-section';
import Map from 'components/clue-finder/map';
import Solver from 'components/clue-finder/solver';
import Header from 'components/layout/header';
import { validateClueData } from 'helpers/geoguessrDataHelper';
import { ClueProvider } from 'hooks/useClues';
import { ClueType } from 'types/clue';

const Home = () => {
  const validData = validateClueData();

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
            <div className="">
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold">Filters</h2>
                <p>Press 1 to reset clues</p>
                <ClueSearchbar />
              </div>
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
