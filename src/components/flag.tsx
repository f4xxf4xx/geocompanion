import * as Flags from "country-flag-icons/react/3x2";

const Flag = ({
  code,
  small,
  big,
}: {
  code: string;
  small?: boolean;
  big?: boolean;
}) => {
  const upperCaseCode = code.toUpperCase();
  const Component = Flags[upperCaseCode];
  if (!Component) return <p>ERROR FLAG</p>;
  return (
    <Component
      className={`flagIcon ${small && "flagIconSmall"} ${big && "flagIconBig"}`}
    />
  );
};

export default Flag;
