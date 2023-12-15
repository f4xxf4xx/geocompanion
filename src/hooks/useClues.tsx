import { getPossibleCountries } from 'helpers/geoguessrDataHelper';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { SelectedClue } from 'types/clue';

interface ClueContextType {
  selectedClues: SelectedClue[];
  toggleClue: (clue: SelectedClue) => void;
  resetClues: () => void;
  hoveredCountry: string;
  setHoveredCountry: (country: string) => void;
  potentialCountries: string[];
}

export const ClueContext = createContext<ClueContextType>({
  selectedClues: [],
  toggleClue: () => {},
  resetClues: () => {},
  hoveredCountry: '',
  setHoveredCountry: () => {},
  potentialCountries: [],
});

export const ClueProvider = ({ children }: React.PropsWithChildren) => {
  const [selectedClues, setSelectedClues] = useState<SelectedClue[]>([]);
  const [hoveredCountry, setHoveredCountry] = useState<string>('');

  const potentialCountries = useMemo(() => getPossibleCountries(selectedClues), [selectedClues]);

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
        potentialCountries,
      }}
    >
      {children}
    </ClueContext.Provider>
  );
};

const useClues = () => useContext(ClueContext);
export default useClues;
