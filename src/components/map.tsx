import { DataContext } from "context/data";
import { useCallback, useContext } from "react";
import WorldMap, { CountryContext } from "react-svg-worldmap";

const Map = () => {
  const { countries, possibleCountries } = useContext(DataContext);

  const stylingFunction = ({ countryValue, color }: CountryContext) => {
    const opacityLevel =
      countryValue == undefined ? 0 : countryValue === 1 ? 0.8 : 0.2;

    return {
      fill: color,
      fillOpacity: opacityLevel,
      stroke: "grey",
      strokeWidth: 1,
      strokeOpacity: 0.5,
    };
  };

  const getData = useCallback(() => {
    return Object.keys(countries).map((key) => ({
      country: key,
      value: possibleCountries.includes(key) ? 1 : 0,
    }));
  }, [possibleCountries]);

  return (
    <WorldMap
      color="purple"
      size="responsive"
      data={getData()}
      styleFunction={stylingFunction}
      tooltipTextFunction={({ countryName }) => countryName}
      backgroundColor="#eef2f6"
    />
  );
};

export default Map;