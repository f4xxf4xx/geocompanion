import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledHeader = styled.header`
  padding: 8px;
`;

const StyledSpan = styled.span`
  font-weight: normal;
`;

const Header = () => (
  <StyledHeader>
    <h1>
      Geo<StyledSpan>Companion</StyledSpan>
    </h1>
    <Link to="/practice-tool">Practice Tool</Link>
  </StyledHeader>
);

export default Header;
