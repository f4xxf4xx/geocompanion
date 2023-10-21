import styled from "styled-components";
import Flag from "./flag";
import { useContext } from "react";
import { DataContext } from "context/data";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-items: center;
  gap: 4px;
  text-decoration: none;
  color: black;
`;

const FlagCountry = ({ countryCode }: { countryCode: string }) => {
  const { countries } = useContext(DataContext);

  return (
    <StyledLink to={`/${countryCode}`}>
      <Flag code={countryCode} />
      {countries?.[countryCode]?.name}
    </StyledLink>
  );
};

export default FlagCountry;
