import { Link } from 'components/layout/button';
import { getCountryName } from 'helpers/geoguessrDataHelper';
import useClues from 'hooks/useClues';
import { useState } from 'react';

import PotientialCountry from './potential-country';

const MAX_COUNTRIES = 12;

const Solver = () => {
  const { potentialCountries } = useClues();
  const [showAll, setShowAll] = useState(false);

  const handleShowAll = () => {
    setShowAll(true);
  };

  const displayedCountries = showAll
    ? potentialCountries
    : potentialCountries.slice(0, MAX_COUNTRIES);

  return (
    <div className="flex flex-col gap-3 max-w-6xl">
      <h3 className="text-lg">Potential countries ({potentialCountries.length}):</h3>
      <div className="flex flex-wrap gap-2 min-h-[24px]">
        {displayedCountries?.map((countryCode) => (
          <PotientialCountry
            key={countryCode}
            data-tooltip-id="tooltip-country"
            data-tooltip-content={getCountryName(countryCode)}
            countryCode={countryCode}
          />
        ))}
        {!showAll && potentialCountries.length > MAX_COUNTRIES && (
          <>
            <p>...</p>
            <button
              className="min-w-[50px] h-6 flex gap-1 items-center justify-center border border-gray rounded-md capitalize shadow p-1 font-bold hover:animate-pulse text-primary bg-secondary"
              onClick={handleShowAll}
            >
              Show all
            </button>
          </>
        )}
      </div>
      <div>
        <Link to={`/compare?countries=${potentialCountries.join(',')}`}>Compare</Link>
      </div>
    </div>
  );
};

export default Solver;
