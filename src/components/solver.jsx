import { useCallback } from "react";
import { Link } from "react-router-dom";
import characters from "../data/characters.json";
import countries from "../data/countries_mapping.json";
import Flag from "./flags";

const Solver = ({ clues, resetClues }) => {
  const getPossibleCountries = useCallback(() => {
    let possibleCountries = [];

    clues.forEach((clue, i) => {
      let matchingCountries = [];

      if (clue.type === "alphabets") {
        matchingCountries = Object.keys(countries).filter((country) =>
          countries[country].alphabets.includes(clue.value)
        );
      }
      if (clue.type === "region") {
        matchingCountries = Object.keys(countries).filter((country) =>
          countries[country].regions.includes(clue.value)
        );
      }
      if (clue.type === "driving") {
        matchingCountries = Object.keys(countries).filter((country) =>
          countries[country].driving.includes(clue.value)
        );
      }
      if (clue.type === "characters") {
        const character = clue.value;
        matchingCountries = characters[character];
      }
      if (clue.type === "lines") {
        const lines = clue.value;
        matchingCountries = Object.keys(countries).filter((country) =>
          countries[country].lines.includes(lines)
        );
      }
      if (clue.type === "color") {
        const color = clue.value;
        matchingCountries = Object.keys(countries).filter((country) =>
          countries[country].flag.colors.includes(color)
        );
      }

      if (clue.type === "pattern") {
        const pattern = clue.value;
        matchingCountries = Object.keys(countries).filter((country) =>
          countries[country].flag.patterns.includes(pattern)
        );
      }

      if (i === 0) {
        possibleCountries.push(...matchingCountries);
      } else {
        possibleCountries = possibleCountries.filter((country) =>
          matchingCountries.includes(country)
        );
      }
    });

    return possibleCountries;
  }, [clues]);

  const possibleCountries = getPossibleCountries();

  return (
    <div className="solverContainer">
      <h3 className="solverTitle">Solver</h3>
      <h4 className="solverHeader">Clues:</h4>
      <ul className="solverUl">
        {clues?.map((clue) => (
          <li key={clue.value}>{clue.name ? clue.name : clue.value}</li>
        ))}
      </ul>
      {possibleCountries?.length >= 1 && (
        <div>
          <h4 className="solverHeader">Possible countries:</h4>
          <ul className="solverUl">
            {possibleCountries?.map((country) => (
              <li key={country}>
                {countries?.[country]?.name} <Flag code={country} />
              </li>
            ))}
          </ul>
          <Link to={`/compare?countries=${possibleCountries.join(",")}`}>
            Compare these countries
          </Link>
          <br />
        </div>
      )}
      {clues?.length >= 1 && (
        <button className="resetButton" onClick={() => resetClues()}>
          Reset
        </button>
      )}
    </div>
  );
};

export default Solver;
