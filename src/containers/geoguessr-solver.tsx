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
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-[1fr,1fr] gap-4">
        <div>
          <GeoguessrMap />
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
  );
};

export default GeoguessrSolver;
