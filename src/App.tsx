import { useState } from "react";
import "App.css";
import Solver from "components/solver";
import characters from "data/characters.json";
import SmallClueTile from "components/clue-tile";
import { Link } from "react-router-dom";
import {
  allAlphabets,
  allColors,
  allPatterns,
  allRegions,
} from "./data/dataHelper";

const ClueSection = ({ name, children }) => {
  return (
    <div className="cluesContainer">
      <h2>{name}</h2>
      {children}
    </div>
  );
};

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

  const renderClueTile = (value, type) => {
    return (
      <SmallClueTile
        value={value}
        type={type}
        onPress={toggleClue}
        clues={selectedClues}
      />
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Geo Companion</h1>
        <Link to="/practice-tool">Practice Tool</Link>
      </header>
      <div>
        <ClueSection name="Region">
          {allRegions.map((region) => renderClueTile(region, "region"))}
        </ClueSection>
        <ClueSection name="Driving">
          {renderClueTile("left", "driving")}
          {renderClueTile("right", "driving")}
        </ClueSection>
        <ClueSection name="Lines">
          {renderClueTile("yellow-white", "lines")}
          {renderClueTile("white-white", "lines")}
          {renderClueTile("white-yellow", "lines")}
          {renderClueTile("yellow-yellow", "lines")}
        </ClueSection>
        <ClueSection name="Alphabets">
          {allAlphabets.map((alphabet) =>
            renderClueTile(alphabet, "alphabets")
          )}
        </ClueSection>
        <ClueSection name="Characters">
          {Object.keys(characters).map((character) =>
            renderClueTile(character, "characters")
          )}
        </ClueSection>

        <ClueSection name="Flag color">
          {allColors.map((color) => renderClueTile(color, "color"))}
        </ClueSection>
        <ClueSection name="Flag patterns">
          {allPatterns.map((pattern) => renderClueTile(pattern, "pattern"))}
        </ClueSection>
        <Solver resetClues={resetClues} clues={selectedClues} />
      </div>
    </div>
  );
}

export default App;
