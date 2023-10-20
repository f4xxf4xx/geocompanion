import { useContext } from "react";
import { Link } from "react-router-dom";
import Flag from "components/flag";
import { ClueContext } from "context/clue";
import { getPossibleCountries } from "data/dataHelper";
import styled from "styled-components";
import { DataContext } from "context/data";

const StyledContainer = styled.div`
  min-width: 240px;
`;

const StyledItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const StyledItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

const Solver = () => {
  const { countries, characters } = useContext(DataContext);
  const { selectedClues, resetClues } = useContext(ClueContext);
  const possibleCountries = getPossibleCountries(
    countries,
    characters,
    selectedClues
  );

  return (
    <StyledContainer>
      <h3>Solver</h3>
      <h4>Clues:</h4>
      <StyledItemContainer>
        {selectedClues?.map((clue) => (
          <div key={clue.value}>{clue.value}</div>
        ))}
      </StyledItemContainer>
      {possibleCountries?.length >= 1 && (
        <div>
          <h4 className="solverHeader">Possible countries:</h4>
          <StyledItemContainer>
            {possibleCountries?.map((country) => (
              <StyledItem key={country}>
                <Flag code={country} />
                {countries?.[country]?.name}
              </StyledItem>
            ))}
          </StyledItemContainer>
          <Link to={`/compare?countries=${possibleCountries.join(",")}`}>
            Compare these countries
          </Link>
          <br />
        </div>
      )}
      {selectedClues?.length >= 1 && (
        <button className="resetButton" onClick={() => resetClues()}>
          Reset
        </button>
      )}
    </StyledContainer>
  );
};

export default Solver;
