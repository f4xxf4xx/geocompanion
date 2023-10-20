import { useState } from "react";
import characters from "data/characters.json";
import countries from "data/country_data.json";
import { Link, useSearchParams } from "react-router-dom";
import clueNameMapping from "data/clue_name_mapping.json";
import styled from "styled-components";

const StyledContainer = styled.div`
  margin: 8px;
  display: grid;
  grid-template-columns: repeat(2, 200px);
  gap: 8px;
`;

const StyledCell = styled.div`
  background-color: bisque;
  margin: 0px;
  padding: 8px;
  border-radius: 4px;
`;

const Comparator = () => {
  let [searchParams] = useSearchParams();
  const queryParamCountries = searchParams.get("countries")?.split(",");
  const [selectedCountries, setSelectedCountries] = useState([]);
  const firstCountry = selectedCountries?.[0];
  const secondCountry = selectedCountries?.[1];

  const onCheck = (e) => {
    const country = e.target.value;
    const countryIsChecked = selectedCountries.includes(country);

    if (!countryIsChecked && selectedCountries.length >= 2) {
      return;
    }
    if (countryIsChecked) {
      setSelectedCountries(selectedCountries.filter((c) => c !== country));
    } else {
      setSelectedCountries([...selectedCountries, country]);
    }
  };

  const getUniqueCharacters = (mainCountry, comparedToCountry) => {
    const mainCountryCharacters = Object.keys(characters).filter((character) =>
      characters[character].includes(mainCountry)
    );
    const comparedToCountryCharacters = Object.keys(characters).filter(
      (character) => characters[character].includes(comparedToCountry)
    );

    const uniqueCharacters = mainCountryCharacters?.filter(
      (character) => !comparedToCountryCharacters.includes(character)
    );

    return uniqueCharacters;
  };

  const getUniqueLines = (mainCountry, comparedToCountry) => {
    const mainCountryLines = countries[mainCountry]?.lines;
    const comparedToCountryLines = countries[comparedToCountry]?.lines;
    const uniqueCharacters = mainCountryLines?.filter(
      (line) => !comparedToCountryLines.includes(line)
    );
    return uniqueCharacters;
  };

  const renderUniqueCountryInformation = () => {
    const firstCountry = selectedCountries[0];
    const secondCountry = selectedCountries[1];

    const firstUniqueCharacters = getUniqueCharacters(
      firstCountry,
      secondCountry
    );

    const secondUniqueCharacters = getUniqueCharacters(
      secondCountry,
      firstCountry
    );

    const firstUniqueLines = getUniqueLines(firstCountry, secondCountry);
    const secondUniqueLines = getUniqueLines(secondCountry, firstCountry);

    return (
      <StyledContainer>
        <StyledCell>{countries[firstCountry]?.name}</StyledCell>
        <StyledCell>{countries[secondCountry]?.name}</StyledCell>
        <StyledCell>
          {firstUniqueCharacters?.length > 0 && (
            <>
              <h4>Unique letters: </h4>
              <ul>
                {firstUniqueCharacters.map((character) => (
                  <li>{character}</li>
                ))}
              </ul>
            </>
          )}
        </StyledCell>
        <StyledCell>
          {secondUniqueCharacters?.length > 0 && (
            <>
              <h4>Unique letters: </h4>
              <ul>
                {secondUniqueCharacters.map((character) => (
                  <li>{character}</li>
                ))}
              </ul>
            </>
          )}
        </StyledCell>
        <StyledCell>
          {firstUniqueLines?.length > 0 && (
            <>
              <h4>Unique lines: </h4>
              <ul>
                {firstUniqueLines.map((line) => (
                  <li>{line}</li>
                ))}
              </ul>
            </>
          )}
        </StyledCell>
        <StyledCell>
          {secondUniqueLines?.length > 0 && (
            <>
              <h4>Unique lines: </h4>
              <ul>
                {secondUniqueLines.map((line) => (
                  <li>{clueNameMapping["lines"][line]}</li>
                ))}
              </ul>
            </>
          )}
        </StyledCell>
      </StyledContainer>
    );
  };

  return (
    <div>
      <div>
        <Link to="/">Back</Link>
        <h3>Comparing countries: </h3>
        <ul>
          {queryParamCountries?.map((country) => (
            <li>
              <input
                id={country}
                type="checkbox"
                value={country}
                checked={selectedCountries.includes(country)}
                onChange={onCheck}
              />
              <label htmlFor={country}>{countries[country]?.name}</label>
            </li>
          ))}
        </ul>
        <p>Only 2 countries at a time can be compared</p>
      </div>
      {firstCountry && secondCountry && renderUniqueCountryInformation()}
    </div>
  );
};

export default Comparator;
