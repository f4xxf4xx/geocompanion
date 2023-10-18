import { useState } from "react";
import "App.css";
import Solver from "components/solver";
import characters from "data/characters.json";
import ClueTile from "components/clue-tile";
import { Link } from "react-router-dom";
import {
  allAlphabets,
  allColors,
  allDriving,
  allLines,
  allPatterns,
  allRegions,
} from "./data/dataHelper";

const ClueSection = ({ name, data, clueType, toggle, selectedClues }) => {
  return (
    <div className="cluesContainer">
      <h2>{name}</h2>
      {data.map((item) => (
        <ClueTile
          clueType={clueType}
          value={item}
          onPress={toggle}
          clues={selectedClues}
        />
      ))}
    </div>
  );
};

function App() {
  const [selectedClues, setSelectedClues] = useState([]);

  console.debug("selectedClues", selectedClues);

  const toggleClue = (clue) => {
    if (selectedClues.filter((c) => c.value === clue.value).length > 0) {
      setSelectedClues((clues) => clues.filter((c) => c.value !== clue.value));
      return;
    }
    setSelectedClues((clues) => [...clues, clue]);
  };

  const resetClues = () => {
    setSelectedClues([]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Geo Companion</h1>
        <Link to="/practice-tool">Practice Tool</Link>
      </header>
      <div>
        <ClueSection
          name="Region"
          data={allRegions}
          clueType="region"
          toggle={toggleClue}
          selectedClues={selectedClues}
        />
        <ClueSection
          name="Driving"
          data={allRegions}
          clueType="driving"
          toggle={toggleClue}
          selectedClues={selectedClues}
        />
        <ClueSection
          name="Lines"
          data={allLines}
          clueType="lines"
          toggle={toggleClue}
          selectedClues={selectedClues}
        />
        <ClueSection
          name="Alphabets"
          data={allAlphabets}
          clueType="alphabets"
          toggle={toggleClue}
          selectedClues={selectedClues}
        />
        <ClueSection
          name="Characters"
          data={Object.keys(characters)}
          clueType="characters"
          toggle={toggleClue}
          selectedClues={selectedClues}
        />
        <ClueSection
          name="Flag color"
          data={allColors}
          clueType="color"
          toggle={toggleClue}
          selectedClues={selectedClues}
        />
        <ClueSection
          name="Flag patterns"
          data={allPatterns}
          clueType="pattern"
          toggle={toggleClue}
          selectedClues={selectedClues}
        />
        <Solver resetClues={resetClues} clues={selectedClues} />
      </div>
    </div>
  );
}

export default App;
