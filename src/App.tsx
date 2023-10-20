import { useState } from "react";
import "App.css";

import { ClueContext } from "context/clue";
import { Clue } from "types/types";

import countries from "data/country_data.json";

import { DataContext } from "context/data";
import clueNameMapping from "data/clue_name_mapping.json";
import characters from "data/characters.json";

function App({ children }) {
  const [selectedClues, setSelectedClues] = useState<Clue[]>([]);

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

  return (
    <DataContext.Provider value={{ countries, characters, clueNameMapping }}>
      <ClueContext.Provider value={{ selectedClues, toggleClue, resetClues }}>
        {children}
      </ClueContext.Provider>
    </DataContext.Provider>
  );
}

export default App;
