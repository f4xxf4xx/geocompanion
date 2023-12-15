import { useWindowWidth } from '@react-hook/window-size';
import { Button, Link } from 'components/layout/button';
import { getCountryName } from 'helpers/geoguessrDataHelper';
import useClues from 'hooks/useClues';
import { useState } from 'react';

import PotientialCountry from '../potential-country';

const Solver = () => {
  const { potentialCountries } = useClues();
  const [showAll, setShowAll] = useState(false);
  const width = useWindowWidth();

  const handleShowAll = () => {
    setShowAll(true);
  };

  const bigScreen = width > 900;

  const displayedCountries =
    showAll || bigScreen ? potentialCountries : potentialCountries.slice(0, 30);

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-lg">Potential countries ({potentialCountries.length}):</h3>
      <div className="flex flex-wrap gap-2">
        {displayedCountries?.map((countryCode) => (
          <PotientialCountry
            key={countryCode}
            data-tooltip-id="tooltip-country"
            data-tooltip-content={getCountryName(countryCode)}
            countryCode={countryCode}
          />
        ))}
        {!showAll && !bigScreen && potentialCountries.length > 30 && (
          <>
            <p>...</p>
            <Button onClick={handleShowAll}>Show all</Button>
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
