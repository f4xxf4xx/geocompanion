import { ClueContext } from 'context/clue';
import { useHover } from 'hooks';
import { useContext, useEffect } from 'react';

import Flag from './flag';

const FlagCountry = ({ countryCode, ...rest }: { countryCode: string }) => {
  const { hovered, eventHandlers } = useHover();
  const { setHoveredCountry } = useContext(ClueContext);

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
