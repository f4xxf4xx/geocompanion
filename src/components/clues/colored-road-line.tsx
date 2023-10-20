import { StyledColorSquare } from "components/colored-square";
import styled from "styled-components";

const roadLineColorMapping = {
  "yellow-white": ["yellow", "white", "yellow"],
  "white-white": ["white", "white", "white"],
  "yellow-yellow": ["yellow", "yellow", "yellow"],
  "white-yellow": ["white", "yellow", "white"],
};

const StyledRoadLineContaier = styled.div`
  display: flex;
  gap: 4px;
`;

const ColoredRoadLine = ({ value }: { value: string }) => {
  return (
    <StyledRoadLineContaier>
      {roadLineColorMapping[value]?.map((color) => (
        <StyledColorSquare color={color} />
      ))}
    </StyledRoadLineContaier>
  );
};

export default ColoredRoadLine;
