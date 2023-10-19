import { useContext } from "react";
import { Link } from "react-router-dom";
import countries from "data/country_data.json";
import Flag from "components/flag";
import { ClueContext } from "context/clue";
import { getPossibleCountries } from "data/dataHelper";

const Solver = () => {
  const { selectedClues, resetClues } = useContext(ClueContext);
  const possibleCountries = getPossibleCountries(selectedClues);

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
