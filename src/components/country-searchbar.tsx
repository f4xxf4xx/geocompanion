import countries from 'data/countries.json';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { Colors } from 'theme/theme';

const getCountrySearchableStrings = () => {
  return Object.keys(countries).map((country, index) => ({
    id: index,
    name: `${country} ${countries[country].name}`,
    value: country,
  }));
};

function CountrySearchbar({ submitAnswer }) {
  const items = getCountrySearchableStrings();

  const handleOnSelect = (item) => {
    submitAnswer(item.value);
  };

  const formatResult = (item) => {
    return <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>;
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

export default CountrySearchbar;
