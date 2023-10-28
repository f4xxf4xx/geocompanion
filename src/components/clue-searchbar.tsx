import { useContext } from "react";
import { getSearchItems } from "data/dataHelper";
import { DataContext } from "context/data";

import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { ClueContext } from "context/clue";
import { Colors } from "theme/theme";

function ClueSearchbar() {
  const { countries, characters, clues } = useContext(DataContext);
  const { toggleClue } = useContext(ClueContext);

  const items = getSearchItems(countries, characters, clues);

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.debug(string, results);
  };

  const handleOnHover = (result) => {
    // the item hovered
    console.debug(result);
  };

  const handleOnSelect = (item) => {
    toggleClue({ type: item.clueType, value: item.value });
  };

  const handleOnFocus = () => {
    //console.debug("Focused");
  };

  const formatResult = (item) => {
    return (
      <span style={{ display: "block", textAlign: "left" }}>
        name: {item.name}
      </span>
    );
  };

  return (
    <ReactSearchAutocomplete
      items={items}
      onSearch={handleOnSearch}
      onHover={handleOnHover}
      onSelect={handleOnSelect}
      onFocus={handleOnFocus}
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
