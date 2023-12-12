import { Colors } from 'lib/color';
import styled from 'styled-components';

export const StyledColorSquare = styled.div<{ color: string }>`
  width: 8px;
  height: 8px;
  background-color: ${({ color }) => color};
  border: 1px solid ${Colors.gray};
`;
