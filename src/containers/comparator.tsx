import CompareTable from 'components/compare-tool/compare-table';
import Flag from 'components/flag';
import { getCountryName } from 'helpers/geoguessrDataHelper';
import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const Comparator = () => {
  const [searchParams] = useSearchParams();
  const queryParamCountries = searchParams.get('countries')?.split(',');
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

  const onCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const country = e.target.value;
    const countryIsChecked = selectedCountries.includes(country);

    if (!countryIsChecked && selectedCountries.length >= 2) {
      return;
    }
    if (countryIsChecked) {
      setSelectedCountries(selectedCountries.filter((c) => c !== country));
    } else {
      setSelectedCountries([...selectedCountries, country]);
    }
  };

  return (
    <div>
      <div>
        <Link to="/">Back</Link>
        <h3>Comparing countries: </h3>
        <div>
          {queryParamCountries?.map((country) => (
            <div>
              <input
                id={country}
                type="checkbox"
                value={country}
                checked={selectedCountries.includes(country)}
                onChange={onCheck}
              />
              <label htmlFor={country}>
                <Flag code={country} />
                {getCountryName(country)}
              </label>
            </div>
          ))}
        </div>
        <p>Only 2 countries at a time can be compared</p>
      </div>
      <CompareTable selectedCountries={selectedCountries} />
    </div>
  );
};

export default Comparator;
