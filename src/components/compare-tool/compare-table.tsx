import { getCountryName, getCountryUniqueCharacters, getCountryUniqueClue } from 'data/dataHelper';
import styled from 'styled-components';
import { ClueType } from 'types/types';

import CompareCell from './compare-cell';

const StyledContainer = styled.div`
  margin: 8px;
  display: grid;
  grid-template-columns: repeat(2, 200px);
  gap: 4px;
`;

const StyledCell = styled.div`
  background-color: linen;
  margin: 0px;
  padding: 8px;
`;

const CompareTable = ({ selectedCountries }: { selectedCountries: string[] }) => {
  const firstCountry = selectedCountries[0];
  const secondCountry = selectedCountries[1];

  const { firstCountryUniqueCharacters, secondCountryUniqueCharacters } =
    getCountryUniqueCharacters(firstCountry, secondCountry);

  const {
    firstCountryUniqueValues: firstCountryUniqueRoadlines,
    secondCountryUniqueValues: secondCountryUniqueRoadlines,
  } = getCountryUniqueClue(firstCountry, secondCountry, ClueType.RoadLine);

  return (
    <StyledContainer>
      <StyledCell>
        <h4>{firstCountry && getCountryName(firstCountry)}</h4>
      </StyledCell>
      <StyledCell>
        <h4>{secondCountry && getCountryName(secondCountry)}</h4>
      </StyledCell>
      <CompareCell
        title="Unique letters"
        items={firstCountryUniqueCharacters}
        clueType={ClueType.Character}
      />
      <CompareCell
        title="Unique letters"
        items={secondCountryUniqueCharacters}
        clueType={ClueType.Character}
      />
      <CompareCell
        title="Unique road lines"
        items={firstCountryUniqueRoadlines}
        clueType={ClueType.RoadLine}
      />
      <CompareCell
        title="Unique road lines"
        items={secondCountryUniqueRoadlines}
        clueType={ClueType.RoadLine}
      />
    </StyledContainer>
  );
};

export default CompareTable;
