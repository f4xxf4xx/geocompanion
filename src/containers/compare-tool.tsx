import CompareTable from 'components/compare-tool/table';
import Flag from 'components/layout/flag';
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
      <div className="flex flex-col gap-2">
        <Link to="/geoguessr">Back</Link>
        <h3>Comparing countries: </h3>
        <div className="flex flex-col gap-2">
          {queryParamCountries?.map((country) => (
            <div className="flex flex-row gap-2">
              <input
                id={country}
                type="checkbox"
                value={country}
                checked={selectedCountries.includes(country)}
                onChange={onCheck}
              />
              <label htmlFor={country} className="flex flex-row gap-2">
                <Flag className="w-8 rounded border border-primary shadow-md" code={country} />
                <p>{getCountryName(country)}</p>
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
