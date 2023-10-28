import { useContext, useState } from "react";

import styled from "styled-components";
import { DataContext } from "context/data";
import FlagCountry from "./flag-country";
import { StyledButton } from "./layout/button";
import { Link } from "react-router-dom";
import { useWindowWidth } from "@react-hook/window-size";

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
  height: auto;
`;

const Solver = () => {
  const { possibleCountries } = useContext(DataContext);
  const [showAll, setShowAll] = useState(false);
  const width = useWindowWidth();

  const handleShowAll = () => {
    setShowAll(true);
  };

  const bigScreen = width > 800;

  const displayedCountries =
    showAll || bigScreen ? possibleCountries : possibleCountries.slice(0, 27);

  return (
    <div>
      <StyledHeader>
        Possible countries ({possibleCountries.length}):
      </StyledHeader>
      <StyledItemContainer>
        {displayedCountries?.map((countryCode) => (
          <FlagCountry key={countryCode} countryCode={countryCode} />
        ))}
        {!showAll && !bigScreen && possibleCountries.length > 30 && (
          <>
            <StyledText>...</StyledText>
            <StyledShowAllButton onClick={handleShowAll}>
              Show all
            </StyledShowAllButton>
          </>
        )}
      </StyledItemContainer>
      <Link to={`/compare?countries=${possibleCountries.join(",")}`}>
        Compare
      </Link>
    </div>
  );
};

export default Solver;
