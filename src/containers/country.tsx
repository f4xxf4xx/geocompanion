import FlagCountry from 'components/flag-country';
import { getCountry } from 'data/dataHelper';
import { Link, useParams } from 'react-router-dom';

const Country = () => {
  const { countryCode } = useParams();
  const country = getCountry(countryCode);

  if (!country) {
    return null;
  }

  return (
    <div>
      <div>
        <Link to="/">Back</Link>
        <h1>
          <FlagCountry countryCode={countryCode} />
        </h1>
        <h4>Region(s)</h4>
        {country.region?.map((region) => (
          <div key={region}>{region}</div>
        ))}
        <h4>Alphabet(s)</h4>
        {country.alphabet?.map((alphabet) => (
          <div key={alphabet}>{alphabet}</div>
        ))}
        <h4>Language(s)</h4>
        {country.language?.map((language) => (
          <div key={language}>{language}</div>
        ))}
        <h4>Driving side</h4>
        {country.driving?.map((driving) => (
          <div key={driving}>{driving}</div>
        ))}
      </div>
    </div>
  );
};

export default Country;
