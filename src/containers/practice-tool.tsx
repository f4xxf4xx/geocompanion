import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import SmallClueTile from "components/clue-tile";
import styled from "styled-components";
import { DataContext } from "context/data";

const StyledButton = styled.button`
  margin: 8px;
  padding: 8px;
  border-radius: 4px;
  background-color: lightblue;
  cursor: pointer;
`;

const Comparator = () => {
  const { countries, characters } = useContext(DataContext);
  const [state, setState] = useState("NOT_STARTED");
  const [clues, setClues] = useState([]);
  const [country, setCountry] = useState(null);
  const [cluesQuantity, setCluesQuantity] = useState(3);

  const [guessedCountry, setGuessedCountry] = useState("");

  const reset = () => {
    setState("NOT_STARTED");
    setClues([]);
    setCountry(null);
    setCluesQuantity(3);
    setGuessedCountry("");
    start();
  };

  const generateClues = (randomCountry) => {
    const countryData = countries[randomCountry];
    const clues = [];

    const keysToUse = [
      "regions",
      "alphabets",
      "driving",
      "lines",
      "flag.colors",
      "flag.patterns",
    ];

    keysToUse.forEach((key) => {
      const values = key.split(".").reduce((o, i) => o[i], countryData);
      values.forEach((value) => {
        const clue = {
          type: key,
          value: value,
        };
        clues.push(clue);
      });
    });

    const countryCharacters = Object.keys(characters).filter((character) =>
      characters[character].includes(randomCountry)
    );

    countryCharacters.forEach((character) => {
      const clue = {
        type: "characters",
        value: character,
      };
      clues.push(clue);
    });

    // randomly shuffle the clues
    for (let i = clues.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [clues[i], clues[j]] = [clues[j], clues[i]];
    }

    setClues(clues);
    console.log(clues);
  };

  const start = () => {
    setState("STARTED");

    const randomCountry =
      Object.keys(countries)[
        Math.floor(Math.random() * Object.keys(countries).length)
      ];

    setCountry(randomCountry);
    console.log(randomCountry);
    generateClues(randomCountry);
  };

  const addClue = () => {
    if (cluesQuantity === clues.length) return;
    setCluesQuantity(cluesQuantity + 1);
  };

  const renderClues = () => {
    if (!clues) return null;
    const displayedClues = clues.slice(0, cluesQuantity);
    return (
      <div className="clues">
        {displayedClues.map((clue, index) => {
          return (
            <div>
              <h3>{clue.type}</h3>
              {/* <SmallClueTile
                value={clue.value}
                type={clue.type}
                name={clue.name}
              /> */}
            </div>
          );
        })}
      </div>
    );
  };

  const onChangeInput = (e) => {
    setGuessedCountry(e.target.value);
  };

  const submitAnswer = () => {
    if (
      guessedCountry.toLowerCase() === country ||
      guessedCountry.toLowerCase() === countries[country].name.toLowerCase()
    ) {
      alert("Correct!");
      reset();
    } else {
      alert("Incorrect!");
    }
  };

  return (
    <div>
      <div className="comparatorHeader">
        <Link to="/">Back</Link>
        <h3>Practice Tool</h3>
        {state === "NOT_STARTED" && (
          <StyledButton onClick={start}>Start</StyledButton>
        )}
        {state === "STARTED" && (
          <StyledButton onClick={reset}>Restart</StyledButton>
        )}
        {state === "STARTED" && (
          <StyledButton onClick={addClue}>Add a clue</StyledButton>
        )}
        {renderClues()}
      </div>
    </div>
  );
};

export default Comparator;
