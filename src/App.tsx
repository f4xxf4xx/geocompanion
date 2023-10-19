import { useState } from "react";
import "App.css";
import Solver from "components/solver";

import { ClueContext } from "context/clue";
import ClueSection from "components/clue-section";
import { Clue, ClueType } from "types/types";
import Header from "components/layout/header";
import { validateCountryData } from "data/validateData";

function App() {
  const [selectedClues, setSelectedClues] = useState<Clue[]>([]);

  // TODO move to a command `npm run validate`
  const valideData = validateCountryData();

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
    <div className="App">
      <Header />
      {valideData ? (
        <ClueContext.Provider value={{ selectedClues, toggleClue, resetClues }}>
          <ClueSection name="Region" clueType={ClueType.Region} />
          <ClueSection name="Driving" clueType={ClueType.Driving} />
          <ClueSection name="Road Line" clueType={ClueType.RoadLine} />
          <ClueSection name="Alphabet" clueType={ClueType.Alphabet} />
          <ClueSection name="Character" clueType={ClueType.Character} />
          <ClueSection name="Flag color" clueType={ClueType.FlagColor} />
          <ClueSection name="Flag pattern" clueType={ClueType.FlagPattern} />
          <Solver />
        </ClueContext.Provider>
      ) : (
        <div>Invalid data</div>
      )}
    </div>
  );
}

export default App;
