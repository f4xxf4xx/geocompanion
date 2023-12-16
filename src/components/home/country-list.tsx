import { Link } from 'components/layout/button';
import { getCountries } from 'data';

const CountryList = () => {
  const countries = getCountries();

  return (
    <div className="flex flex-col max-w-[176px] text-ellipsis overflow-hidden">
      {Object.keys(countries).map((key) => (
        <Link to={`/${key.toLowerCase()}`} key={key}>
          {countries[key].name}
        </Link>
      ))}
    </div>
  );
};

export default CountryList;
