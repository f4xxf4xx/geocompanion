import styled from "styled-components";
import Flag from "./flag";
import { useContext } from "react";
import { DataContext } from "context/data";

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  gap: 4px;
`;

const FlagCountry = ({ country }) => {
  const { countries } = useContext(DataContext);
  <StyledContainer>
    <Flag code={country} />
    {countries?.[country]?.name}
  </StyledContainer>;
};

export default FlagCountry;
