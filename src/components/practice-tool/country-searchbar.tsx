import countries from 'data/countries.json';
import usePracticeTool from 'hooks/usePracticeTool';
import { Colors } from 'lib/color';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { State } from 'types/practice-tool';

const getCountrySearchableStrings = () => {
  return Object.keys(countries).map((country, index) => ({
    id: index,
    name: `${country} ${countries[country].name}`,
    value: country,
  }));
};

function CountrySearchbar() {
  const items = getCountrySearchableStrings();
  const { submitAnswer, gameState } = usePracticeTool();

  const handleOnSelect = (item) => {
    submitAnswer(item.value);
    // clear the dom input that has the data-test="search-input" tag of its value
    /* const input = document.querySelector('[data-test="search-input"]');
    input.value = ''; */
  };

  const formatResult = (item) => {
    return <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>;
  };

  if (gameState.state !== State.STARTED) return null;

  return (
    <div className="w-max">
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
    </div>
  );
}

export default CountrySearchbar;
