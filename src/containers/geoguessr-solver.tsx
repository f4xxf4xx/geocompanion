import ClueSearchbar from 'components/geoguessr-solver/clue-searchbar';
import ClueSection from 'components/geoguessr-solver/clue-section';
import GeoguessrMap from 'components/geoguessr-solver/geoguessr-map';
import Solver from 'components/geoguessr-solver/solver';
import Header from 'components/layout/header';
import { ClueProvider } from 'hooks/useClues';
import { ClueType } from 'types/clue';

const GeoguessrSolver = () => {
  return (
    <ClueProvider>
      <div className="p-1">
        <Header />
        <div className="flex gap-4">
          <div className="flex-[2]">
            <Solver />
            <GeoguessrMap />
          </div>
          <div className="overflow-y-scroll flex flex-1 flex-col h-[calc(100vh-60px)]">
            <div className="gap-4">
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
      </div>
    </ClueProvider>
  );
};

export default GeoguessrSolver;
