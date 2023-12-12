import useClues from 'hooks/useClues';
import useHover from 'hooks/useHover';
import { useEffect } from 'react';

import Flag from './flag';

const FlagCountry = ({ countryCode, ...rest }: { countryCode: string }) => {
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
    <div {...rest} {...eventHandlers}>
      <Flag code={countryCode} />
    </div>
  );
};

export default FlagCountry;
