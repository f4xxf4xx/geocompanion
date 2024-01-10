import useClues from 'hooks/useClues';
import useHover from 'hooks/useHover';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import Flag from '../layout/flag';

const PotentialCountry = ({ countryCode, ...rest }: { countryCode: string }) => {
  const { hovered, eventHandlers } = useHover();
  const { setHoveredCountry } = useClues();

  useEffect(() => {
    if (hovered) {
      setHoveredCountry(countryCode);
    } else {
      setHoveredCountry('');
    }
  }, [hovered, setHoveredCountry, countryCode]);

  return (
    <Link to={`/${countryCode}`} {...rest} {...eventHandlers}>
      <Flag className="w-8 rounded border border-primary shadow-md" code={countryCode} />
    </Link>
  );
};

export default PotentialCountry;
