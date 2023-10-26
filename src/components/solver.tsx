import { useContext } from "react";

import { ClueContext } from "context/clue";
import styled from "styled-components";
import { DataContext } from "context/data";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import FlagCountry from "./flag-country";

const StyledItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const StyledItem = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-items: center;
  gap: 4px;
  padding: 2px;
  width: 170px;
`;

const Solver = () => {
  const { possibleCountries } = useContext(DataContext);
  const { selectedClues, resetClues } = useContext(ClueContext);

  return (
    <div>
      <div>
        <h4 className="solverHeader">Possible countries:</h4>
        <StyledItemContainer>
          <AnimatePresence initial={false}>
            {possibleCountries?.map((countryCode) => (
              <StyledItem
                /*  initial={{ opacity: 1 }}
                exit={{ opacity: 0, backgroundColor: "#ff5555" }}
                transition={{ duration: 1 }} */
                key={countryCode}
              >
                <FlagCountry countryCode={countryCode} />
              </StyledItem>
            ))}
          </AnimatePresence>
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
