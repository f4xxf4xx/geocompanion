import ClueSearchbar from 'components/clue-finder/clue-searchbar';
import ClueSection from 'components/clue-finder/clue-section';
import Map from 'components/clue-finder/map';
import Solver from 'components/clue-finder/solver';
import { ClueProvider } from 'hooks/useClues';
import { ClueType } from 'types/types';

const ClueFinder = () => {
  return (
    <ClueProvider>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
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
  );
};

export default ClueFinder;
