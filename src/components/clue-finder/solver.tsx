import { useWindowWidth } from '@react-hook/window-size';
import { getCountryName } from 'data/dataHelper';
import useClues from 'hooks/useClues';
import { useState } from 'react';
import styled from 'styled-components';

import FlagCountry from '../flag-country';
import { StyledButton, StyledLink } from '../layout/button';

const StyledItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
`;

const StyledHeader = styled.h3`
  margin-bottom: 8px;
`;

const StyledText = styled.p`
  margin: 0;
`;

const StyledShowAllButton = styled(StyledButton)`
  height: 30px;
`;

const Solver = () => {
  const { possibleCountries } = useClues();
  const [showAll, setShowAll] = useState(false);
  const width = useWindowWidth();

  const handleShowAll = () => {
    setShowAll(true);
  };

  const bigScreen = width > 900;

  const displayedCountries =
    showAll || bigScreen ? possibleCountries : possibleCountries.slice(0, 27);

  return (
    <div>
      <StyledHeader>Possible countries ({possibleCountries.length}):</StyledHeader>
      <StyledItemContainer>
        {displayedCountries?.map((countryCode) => (
          <FlagCountry
            key={countryCode}
            data-tooltip-id="tooltip-country"
            data-tooltip-content={getCountryName(countryCode)}
            countryCode={countryCode}
          />
        ))}
        {!showAll && !bigScreen && possibleCountries.length > 30 && (
          <>
            <StyledText>...</StyledText>
            <StyledShowAllButton onClick={handleShowAll}>Show all</StyledShowAllButton>
          </>
        )}
      </StyledItemContainer>
      <StyledLink to={`/compare?countries=${possibleCountries.join(',')}`}>Compare</StyledLink>
    </div>
  );
};

export default Solver;
