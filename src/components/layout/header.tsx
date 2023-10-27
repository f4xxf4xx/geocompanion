import styled from "styled-components";

const StyledHeader = styled.header`
  color: white;
  background-color: #24292e;
  padding: 2px 4px;
`;

const Header = () => (
  <StyledHeader>
    <h1>Geo Companion</h1>
    {/*  <Link to="/practice-tool">Practice Tool</Link> */}
  </StyledHeader>
);

export default Header;
