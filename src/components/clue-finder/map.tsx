import { getCountriesWithCoverage } from 'data/dataHelper';
import useClues from 'hooks/useClues';
import { Colors } from 'lib/color';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import WorldMap, { CountryContext } from 'react-svg-worldmap';

const getCountriesMapData = (potentialCountries: string[]) => {
  return Object.keys(getCountriesWithCoverage()).map((key) => ({
    country: key,
    value: potentialCountries.includes(key) ? 1 : 0,
  }));
};

const Map = () => {
  const { potentialCountries, hoveredCountry } = useClues();
  const navigate = useNavigate();

  const getData = useCallback(() => {
    return getCountriesMapData(potentialCountries);
  }, [potentialCountries]);

  const stylingFunction = useCallback(
    ({ countryValue, color, countryCode }: CountryContext) => {
      const opacityLevel = countryValue == undefined ? 0 : countryValue === 1 ? 0.8 : 0.2;

      return {
        fill: hoveredCountry === countryCode.toLowerCase() ? Colors.warning : color,
        fillOpacity: opacityLevel,
        stroke: 'grey',
        strokeWidth: 1,
        strokeOpacity: 0.5,
        cursor: countryValue === 1 ? 'pointer' : 'default',
      };
    },
    [hoveredCountry],
  );

  const clickAction = useCallback(({ countryCode, countryValue }: CountryContext) => {
    if (countryValue === 0) return;
    navigate(`/${countryCode.toLowerCase()}`);
  }, []);

  return (
    <WorldMap
      color={Colors.primary}
      size="responsive"
      data={getData()}
      styleFunction={stylingFunction}
      tooltipTextFunction={({ countryName }) => countryName}
      backgroundColor={Colors.secondary}
      onClickFunction={clickAction}
    />
  );
};

export default Map;
