import { createContext, useContext, useState } from "react";
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
import { ClueContext } from "context/clue";
import ClueSection from "components/clue-section";

function App() {
  const [selectedClues, setSelectedClues] = useState([]);

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
      <ClueContext.Provider value={{ selectedClues, toggleClue }}>
        <ClueSection name="Region" data={allRegions} clueType="region" />
        <ClueSection name="Driving" data={allDriving} clueType="driving" />
        <ClueSection name="Lines" data={allLines} clueType="lines" />
        <ClueSection
          name="Alphabets"
          data={allAlphabets}
          clueType="alphabets"
        />
        <ClueSection
          name="Characters"
          data={Object.keys(characters)}
          clueType="characters"
        />
        <ClueSection name="Flag color" data={allColors} clueType="color" />
        <ClueSection
          name="Flag patterns"
          data={allPatterns}
          clueType="pattern"
        />
        <Solver resetClues={resetClues} clues={selectedClues} />
      </ClueContext.Provider>
    </div>
  );
}

export default App;
