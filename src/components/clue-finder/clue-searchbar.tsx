import clues from 'data/clues.json';
import { getDataFromClueType } from 'data/dataHelper';
import useClues from 'hooks/useClues';
import { Colors } from 'lib/color';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { ClueType } from 'types/types';

interface Item {
  id: number;
  name: string;
  clueType: ClueType;
  value: string;
}

const getSearchItems = () => {
  const items: Item[] = [];
  let i = 0;

  const addClues = (clueType: ClueType) => {
    getDataFromClueType(clueType).forEach((clue) => {
      items.push({
        id: i,
        name: `${clues[clueType].clueName} ${clue}`,
        clueType: clueType,
        value: clue,
      });
      i++;
    });
  };

  addClues(ClueType.Driving);
  addClues(ClueType.FlagColor);
  addClues(ClueType.Character);

  return items;
};

function ClueSearchbar() {
  const { toggleClue } = useClues();

  const items = getSearchItems();

  const handleOnSelect = (item: Item) => {
    toggleClue({ type: item.clueType, value: item.value });
  };

  const formatResult = (item: Item) => {
    return <span style={{ display: 'block', textAlign: 'left' }}>name: {item.name}</span>;
  };

  return (
    <ReactSearchAutocomplete
      items={items}
      onSelect={handleOnSelect}
      autoFocus
      formatResult={formatResult}
      styling={{
        border: `1px solid ${Colors.primary}`,
        color: Colors.primary,
      }}
    />
  );
}

export default ClueSearchbar;
