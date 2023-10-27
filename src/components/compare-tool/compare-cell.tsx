import { useContext } from "react";
import { DataContext } from "context/data";
import styled from "styled-components";
import ColoredRoadLine from "components/clues/colored-road-line";
import { ClueType } from "types/types";

const StyledCell = styled.div`
  background-color: linen;
  margin: 0px;
  padding: 8px;
`;

const StyledUniqueElementContainer = styled.div`
  margin-top: 4px;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

const StyledUniqueElement = styled.div`
  background-color: lightblue;
  display: flex;
  min-width: 50px;
  padding: 4px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.4);
`;

const StyledItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const CompareCell = ({
  title,
  items,
  clueType,
}: {
  title: string;
  items: string[];
  clueType: ClueType;
}) => {
  const renderItem = (item: string) => {
    if (clueType === ClueType.RoadLine) {
      return (
        <StyledItem>
          <ColoredRoadLine value={item} />
        </StyledItem>
      );
    }
    return item;
  };

  return (
    <StyledCell>
      {items?.length > 0 && (
        <>
          <h4>{title}</h4>
          <StyledUniqueElementContainer>
            {items.map((item) => (
              <StyledUniqueElement>{renderItem(item)}</StyledUniqueElement>
            ))}
          </StyledUniqueElementContainer>
        </>
      )}
    </StyledCell>
  );
};

export default CompareCell;
