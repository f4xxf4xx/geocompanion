import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Colors } from 'theme/theme';

export const StyledButton = styled.button<{ $isSelected?: boolean }>`
  display: flex;
  min-width: 50px;
  height: 40px;
  color: ${({ $isSelected }) => ($isSelected ? Colors.secondary : Colors.primary)};
  background-color: ${({ $isSelected }) => ($isSelected ? Colors.primary : Colors.secondary)};
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 1px solid ${Colors.gray};
  cursor: ${(props) => (props.onClick ? 'pointer' : 'default')};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
  text-transform: capitalize;
`;

export const StyledLink = styled(Link)<{ $isSelected?: boolean }>`
  display: flex;
  width: fit-content;
  height: 40px;
  padding: 0 8px;
  color: ${({ $isSelected }) => ($isSelected ? Colors.secondary : Colors.primary)};
  background-color: ${({ $isSelected }) => ($isSelected ? Colors.primary : Colors.secondary)};
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 1px solid ${Colors.gray};
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
  text-transform: capitalize;
  text-decoration: none;
`;
