import codeMapping from "../data/code_mapping.json";

const ClueTile = ({ value, onPress, type, clues }) => {
  let displayedName = value;
  if (type === "lines") {
    displayedName = codeMapping[value];
  }
  return (
    <button
      key={value}
      className={`clueTileContainer ${
        clues?.filter((clue) => clue.value === value).length > 0
          ? "clueSelected"
          : ""
      } ${onPress ? "clickable" : ""}`}
      onClick={
        onPress
          ? () =>
              onPress({
                type,
                value,
              })
          : null
      }
    >
      <h3>
        {type === "color" && (
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
