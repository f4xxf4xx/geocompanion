import { ClueContext } from 'context/clue';
import { DataContext } from 'context/data';
import { getCountriesWithCoverage } from 'data/dataHelper';
import { useCallback, useContext } from 'react';
import WorldMap, { CountryContext } from 'react-svg-worldmap';
import { Colors } from 'theme/theme';

const getCountriesMapData = (possibleCountries: string[]) => {
  return Object.keys(getCountriesWithCoverage()).map((key) => ({
    country: key,
    value: possibleCountries.includes(key) ? 1 : 0,
  }));
};

const Map = () => {
  const { possibleCountries } = useContext(DataContext);
  const { hoveredCountry } = useContext(ClueContext);

  const getData = useCallback(() => {
    return getCountriesMapData(possibleCountries);
  }, [possibleCountries]);

  const stylingFunction = useCallback(
    ({ countryValue, color, countryCode }: CountryContext) => {
      const opacityLevel = countryValue == undefined ? 0 : countryValue === 1 ? 0.8 : 0.2;

      return {
        fill: hoveredCountry === countryCode.toLowerCase() ? Colors.warning : color,
        fillOpacity: opacityLevel,
        stroke: 'grey',
        strokeWidth: 1,
        strokeOpacity: 0.5,
      };
    },
    [hoveredCountry],
  );

  return (
    <WorldMap
      color={Colors.primary}
      size="responsive"
      data={getData()}
      styleFunction={stylingFunction}
      tooltipTextFunction={({ countryName }) => countryName}
      backgroundColor={Colors.secondary}
    />
  );
};

export default Map;
