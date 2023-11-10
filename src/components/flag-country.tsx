import { Link } from 'react-router-dom';

import Flag from './flag';

const FlagCountry = ({ countryCode, ...rest }: { countryCode: string }) => {
  //TODO add tooltip with country name

  return (
    <Link to={`/${countryCode}`} {...rest}>
      <Flag code={countryCode} />
    </Link>
  );
};

export default FlagCountry;
