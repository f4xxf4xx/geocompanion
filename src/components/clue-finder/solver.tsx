import { useWindowWidth } from '@react-hook/window-size';
import { Button, Link } from 'components/layout/button';
import { getCountryName } from 'data/dataHelper';
import useClues from 'hooks/useClues';
import { useState } from 'react';

import FlagCountry from '../flag-country';

const Solver = () => {
  const { possibleCountries } = useClues();
  const [showAll, setShowAll] = useState(false);
  const width = useWindowWidth();

  const handleShowAll = () => {
    setShowAll(true);
  };

  const bigScreen = width > 900;

  const displayedCountries =
    showAll || bigScreen ? possibleCountries : possibleCountries.slice(0, 30);

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-lg">Possible countries ({possibleCountries.length}):</h3>
      <div className="flex flex-wrap gap-2">
        {displayedCountries?.map((countryCode) => (
          <FlagCountry
            key={countryCode}
            data-tooltip-id="tooltip-country"
            data-tooltip-content={getCountryName(countryCode)}
            countryCode={countryCode}
          />
        ))}
        {!showAll && !bigScreen && possibleCountries.length > 30 && (
          <>
            <p>...</p>
            <Button onClick={handleShowAll}>Show all</Button>
          </>
        )}
      </div>
      <div>
        <Link to={`/compare?countries=${possibleCountries.join(',')}`}>Compare</Link>
      </div>
    </div>
  );
};

export default Solver;
