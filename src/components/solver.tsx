import { useContext } from "react";

import { ClueContext } from "context/clue";
import styled from "styled-components";
import { DataContext } from "context/data";
import { Link } from "react-router-dom";
import FlagCountry from "./flag-country";

const StyledItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
`;

const StyledHeader = styled.h3`
  margin-bottom: 8px;
`;

const Solver = () => {
  const { possibleCountries } = useContext(DataContext);
  const { selectedClues, resetClues } = useContext(ClueContext);

  return (
    <div>
      <div>
        <StyledHeader>Possible countries:</StyledHeader>
        <StyledItemContainer>
          {possibleCountries?.map((countryCode) => (
            <FlagCountry key={countryCode} countryCode={countryCode} />
          ))}
        </StyledItemContainer>
        <Link to={`/compare?countries=${possibleCountries.join(",")}`}>
          Compare
        </Link>
      </div>
      {selectedClues?.length >= 1 && (
        <button onClick={() => resetClues()}>Reset</button>
      )}
    </div>
  );
};

export default Solver;
