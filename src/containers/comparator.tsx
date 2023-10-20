import { useContext } from "react";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import CompareTable from "components/compare-tool/compare-table";
import Flag from "components/flag";
import { DataContext } from "context/data";

const Comparator = () => {
  let [searchParams] = useSearchParams();
  const { countries } = useContext(DataContext);
  const queryParamCountries = searchParams.get("countries")?.split(",");
  const [selectedCountries, setSelectedCountries] = useState([]);

  const onCheck = (e) => {
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
                {countries[country]?.name}
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
