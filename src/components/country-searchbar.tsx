import { PracticeToolContext } from 'context/practice-tool';
import countries from 'data/countries.json';
import { useContext } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import styled from 'styled-components';
import { Colors } from 'theme/theme';
import { State } from 'types/practice-tool';

const StyledContainer = styled.div`
  width: 300px;
`;

const getCountrySearchableStrings = () => {
  return Object.keys(countries).map((country, index) => ({
    id: index,
    name: `${country} ${countries[country].name}`,
    value: country,
  }));
};

function CountrySearchbar({ submitAnswer }) {
  const items = getCountrySearchableStrings();
  const { state } = useContext(PracticeToolContext);

  const handleOnSelect = (item) => {
    submitAnswer(item.value);
    // clear the dom input that has the data-test="search-input" tag of its value
    /* const input = document.querySelector('[data-test="search-input"]');
    input.value = ''; */
  };

  const formatResult = (item) => {
    return <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>;
  };

  if (state === State.NOT_STARTED) return null;

  return (
    <StyledContainer>
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
    </StyledContainer>
  );
}

export default CountrySearchbar;
