import { useState } from "react";
import "App.css";

import { ClueContext } from "context/clue";
import { Clue } from "types/types";
import Header from "components/layout/header";

import countries from "data/country_data.json";
import { validateCountryData } from "data/dataHelper";
import ClueFinder from "containers/clue-finder";

function App() {
  const [selectedClues, setSelectedClues] = useState<Clue[]>([]);
  const validData = validateCountryData(countries);

  const toggleClue = (clue: Clue) => {
    if (selectedClues.filter((c) => c.value === clue.value).length > 0) {
      setSelectedClues((clues) => clues.filter((c) => c.value !== clue.value));
      return;
    }
    setSelectedClues((clues) => [...clues, clue]);
  };

  const resetClues = () => {
    setSelectedClues([]);
  };

  console.debug("Selected clues", selectedClues);

  return (
    <div>
      <Header />
      {validData ? (
        <ClueContext.Provider value={{ selectedClues, toggleClue, resetClues }}>
          <ClueFinder />
        </ClueContext.Provider>
      ) : (
        <div>Invalid data</div>
      )}
    </div>
  );
}

export default App;
