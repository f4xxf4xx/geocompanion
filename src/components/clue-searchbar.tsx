import { ClueContext } from 'context/clue';
import clues from 'data/clues.json';
import { getDataFromClueType } from 'data/dataHelper';
import { useContext } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { Colors } from 'theme/theme';
import { ClueType } from 'types/types';

const getSearchItems = () => {
  const items = [];
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
  const { toggleClue } = useContext(ClueContext);

  const items = getSearchItems();

  const handleOnSelect = (item) => {
    toggleClue({ type: item.clueType, value: item.value });
  };

  const formatResult = (item) => {
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
