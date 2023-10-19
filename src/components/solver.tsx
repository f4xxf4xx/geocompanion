import { useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import characters from "data/characters.json";
import countries from "data/countries_mapping.json";
import Flag from "components/flag";
import { ClueContext } from "context/clue";
import { Clue, ClueType } from "types/types";

const Solver = () => {
  const { selectedClues, resetClues } = useContext(ClueContext);

  const getPossibleCountries = useCallback(() => {
    let possibleCountries = [];

    selectedClues.forEach((clue, i) => {
      let matchingCountries = [];

      switch (clue.type) {
        case ClueType.Character:
          matchingCountries = characters[clue.value];
          break;
        default:
          matchingCountries = Object.keys(countries).filter((country) =>
            countries[country][clue.type].includes(clue.value)
          );
          break;
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
  }, [selectedClues]);

  const possibleCountries = getPossibleCountries();

  return (
    <div className="solverContainer">
      <h3 className="solverTitle">Solver</h3>
      <h4 className="solverHeader">Clues:</h4>
      <ul className="solverUl">
        {selectedClues?.map((clue) => (
          <li key={clue.value}>{clue.value}</li>
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
      {selectedClues?.length >= 1 && (
        <button className="resetButton" onClick={() => resetClues()}>
          Reset
        </button>
      )}
    </div>
  );
};

export default Solver;
