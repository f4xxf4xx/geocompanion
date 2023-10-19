import { useState } from "react";
import characters from "data/characters.json";
import countries from "data/country_data.json";
import { Link, useSearchParams } from "react-router-dom";
import clueNameMapping from "data/clue_name_mapping.json";

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
      <div className="comparatorContainer">
        <h3 className="cell">{countries[firstCountry]?.name}</h3>
        <h3 className="cell">{countries[secondCountry]?.name}</h3>
        <div className="cell">
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
        </div>
        <div className="cell">
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
        </div>
        <div className="cell">
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
        </div>
        <div className="cell">
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
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="comparatorHeader">
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
              <label for={country}>{countries[country]?.name}</label>
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
