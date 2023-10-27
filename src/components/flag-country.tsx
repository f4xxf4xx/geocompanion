import Flag from "./flag";
import { Link } from "react-router-dom";

const FlagCountry = ({ countryCode }: { countryCode: string }) => {
  //TODO add tooltip with country name

  return (
    <Link to={`/${countryCode}`}>
      <Flag code={countryCode} />
    </Link>
  );
};

export default FlagCountry;
