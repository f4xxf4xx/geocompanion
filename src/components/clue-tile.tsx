import codeMapping from "data/code_mapping.json";

const ClueTile = ({ value, onPress, clueType, clues }) => {
  let displayedName = value;

  if (clueType === "lines") {
    displayedName = codeMapping["lines"][value];
  }

  return (
    <button
      key={value}
      className={`clueTileContainer ${
        clues?.filter((clue) => clue.value === value).length > 0
          ? "clueSelected"
          : ""
      } clickable`}
      onClick={
        onPress
          ? () =>
              onPress({
                clueType,
                value,
              })
          : null
      }
    >
      <h3>
        {clueType === "color" && (
          <div
            style={{
              width: "8px",
              height: "8px",
              backgroundColor: value,
            }}
          />
        )}
        {displayedName}
      </h3>
    </button>
  );
};

export default ClueTile;
