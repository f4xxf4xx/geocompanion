import { useContext } from "react";
import { DataContext } from "context/data";
import styled from "styled-components";
import { ClueType } from "types/types";
import CompareCell from "./compare-cell";

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

const CompareTable = ({
  selectedCountries,
}: {
  selectedCountries: string[];
}) => {
  const { countries, characters } = useContext(DataContext);
  const firstCountry = selectedCountries[0];
  const secondCountry = selectedCountries[1];

  const getUniqueCharacters = (
    mainCountry: string,
    comparedCountry: string
  ) => {
    const mainCountryCharacters = Object.keys(characters).filter((character) =>
      characters[character].includes(mainCountry)
    );
    const comparedCountryCharacters = Object.keys(characters).filter(
      (character) => characters[character].includes(comparedCountry)
    );

    const firstCountryUniqueCharacters = mainCountryCharacters?.filter(
      (character) => !comparedCountryCharacters.includes(character)
    );
    const secondCountryUniqueCharacters = comparedCountryCharacters?.filter(
      (character) => !mainCountryCharacters.includes(character)
    );

    return { firstCountryUniqueCharacters, secondCountryUniqueCharacters };
  };

  const getUniqueRoadLines = (
    mainCountry: string,
    comparedToCountry: string
  ) => {
    const mainCountryLines = countries[mainCountry]?.roadLine;
    const comparedToCountryLines = countries[comparedToCountry]?.roadLine;

    if (!mainCountryLines || !comparedToCountryLines) {
      return {
        firstCountryUniqueRoadLines: [],
        secondCountryUniqueRoadLines: [],
      };
    }
    const firstCountryUniqueRoadLines = mainCountryLines?.filter(
      (line) => !comparedToCountryLines.includes(line)
    );
    const secondCountryUniqueRoadLines = comparedToCountryLines?.filter(
      (line) => !mainCountryLines.includes(line)
    );
    return { firstCountryUniqueRoadLines, secondCountryUniqueRoadLines };
  };

  const { firstCountryUniqueCharacters, secondCountryUniqueCharacters } =
    getUniqueCharacters(firstCountry, secondCountry);

  const { firstCountryUniqueRoadLines, secondCountryUniqueRoadLines } =
    getUniqueRoadLines(firstCountry, secondCountry);

  return (
    <StyledContainer>
      <StyledCell>
        <h4>{countries[firstCountry]?.name}</h4>
      </StyledCell>
      <StyledCell>
        <h4>{countries[secondCountry]?.name}</h4>
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
        items={firstCountryUniqueRoadLines}
        clueType={ClueType.RoadLine}
      />
      <CompareCell
        title="Unique road lines"
        items={secondCountryUniqueRoadLines}
        clueType={ClueType.RoadLine}
      />
    </StyledContainer>
  );
};

export default CompareTable;
