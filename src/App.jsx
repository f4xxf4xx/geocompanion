import { useState } from "react";
import "./App.css";
import Solver from "./components/solver";
import characters from "./data/characters.json";
import SmallClueTile from "./components/clue-tile";
import countries from "./data/countries_mapping.json";
import Flag from "./components/flags";
import { Link } from "react-router-dom";

const ClueSection = ({ name, children }) => {
  return (
    <div className="cluesContainer">
      <h2>{name}</h2>
      {children}
    </div>
  );
};

function App() {
  const [clues, setClues] = useState([]);

  const toggleClue = (clue) => {
    if (clues.filter((c) => c.value === clue.value).length > 0) {
      setClues((clues) => clues.filter((c) => c.value !== clue.value));
      return;
    }
    setClues((clues) => [...clues, clue]);
  };

  const resetClues = () => {
    setClues([]);
  };

  const regions = Object.keys(countries)
    .reduce((acc, country) => {
      return [...new Set([...acc, ...countries[country].regions])];
    }, [])
    .sort();

  const alphabets = Object.keys(countries)
    .reduce((acc, country) => {
      return [...new Set([...acc, ...countries[country].alphabets])];
    }, [])
    .sort();

  const colors = Object.keys(countries).reduce((acc, country) => {
    return [...new Set([...acc, ...countries[country].flag.colors])];
  }, []);

  const patterns = Object.keys(countries).reduce((acc, country) => {
    return [...new Set([...acc, ...countries[country].flag.patterns])];
  }, []);

  const renderClueTile = (value, type) => {
    return (
      <SmallClueTile
        value={value}
        type={type}
        onPress={toggleClue}
        clues={clues}
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
          {regions.map((region) => renderClueTile(region, "region"))}
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
          {alphabets.map((alphabet) => renderClueTile(alphabet, "alphabets"))}
        </ClueSection>
        <ClueSection name="Characters">
          {Object.keys(characters).map((character) =>
            renderClueTile(character, "characters")
          )}
        </ClueSection>

        <ClueSection name="Flag color">
          {colors.map((color) => renderClueTile(color, "color"))}
        </ClueSection>
        <ClueSection name="Flag patterns">
          {patterns.map((pattern) => renderClueTile(pattern, "pattern"))}
        </ClueSection>
        <Solver resetClues={resetClues} clues={clues} />
      </div>
    </div>
  );
}

export default App;
