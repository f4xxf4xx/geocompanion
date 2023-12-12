import { getPossibleCountries } from 'data/dataHelper';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { SelectedClue } from 'types/types';

interface ClueContextType {
  selectedClues: SelectedClue[];
  toggleClue: (clue: SelectedClue) => void;
  resetClues: () => void;
  hoveredCountry: string;
  setHoveredCountry: (country: string) => void;
  possibleCountries: string[];
}

export const ClueContext = createContext<ClueContextType>({
  selectedClues: [],
  toggleClue: () => {},
  resetClues: () => {},
  hoveredCountry: '',
  setHoveredCountry: () => {},
  possibleCountries: [],
});

export const ClueProvider = ({ children }: React.PropsWithChildren) => {
  const [selectedClues, setSelectedClues] = useState<SelectedClue[]>([]);
  const [hoveredCountry, setHoveredCountry] = useState<string>('');

  const possibleCountries = useMemo(() => getPossibleCountries(selectedClues), [selectedClues]);

  const toggleClue = (clue: SelectedClue) => {
    if (selectedClues.filter((c) => c.value === clue.value).length > 0) {
      setSelectedClues((clues) => clues.filter((c) => c.value !== clue.value));
      return;
    }
    setSelectedClues((clues) => [...clues, clue]);
  };

  useEffect(() => {
    window.addEventListener('keydown', (e) => {
      if (e.key === '1') {
        resetClues();
      }
    });
    return () => {
      window.removeEventListener('keydown', () => {});
    };
  }, []);

  const resetClues = () => {
    setSelectedClues([]);
  };

  return (
    <ClueContext.Provider
      value={{
        selectedClues,
        toggleClue,
        resetClues,
        hoveredCountry,
        setHoveredCountry,
        possibleCountries,
      }}
    >
      {children}
    </ClueContext.Provider>
  );
};

const useClues = () => useContext(ClueContext);
export default useClues;
