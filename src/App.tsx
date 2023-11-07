import { useEffect, useMemo, useState } from "react";
import "App.css";

import { ClueContext } from "context/clue";
import { SelectedClue } from "types/types";

import countries from "data/countries.json";
import clues from "data/clues.json";
import characters from "data/characters.json";

import { DataContext } from "context/data";
import { getPossibleCountries } from "data/dataHelper";
import { Tooltip } from "react-tooltip";

function App({ children }) {
  const [selectedClues, setSelectedClues] = useState<SelectedClue[]>([]);

  const toggleClue = (clue: SelectedClue) => {
    if (selectedClues.filter((c) => c.value === clue.value).length > 0) {
      setSelectedClues((clues) => clues.filter((c) => c.value !== clue.value));
      return;
    }
    setSelectedClues((clues) => [...clues, clue]);
  };

  const resetClues = () => {
    setSelectedClues([]);
  };

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "1") {
        resetClues();
      }
    });
    return () => {
      window.removeEventListener("keydown", () => {});
    };
  }, []);

  const possibleCountries = useMemo(
    () => getPossibleCountries(countries, characters, selectedClues),
    [selectedClues]
  );

  return (
    <DataContext.Provider
      value={{
        countries,
        characters,
        clues,
        possibleCountries,
      }}
    >
      <ClueContext.Provider value={{ selectedClues, toggleClue, resetClues }}>
        <Tooltip id="tooltip-country" place="bottom" />
        {children}
      </ClueContext.Provider>
    </DataContext.Provider>
  );
}

export default App;
