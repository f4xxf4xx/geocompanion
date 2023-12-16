import getCountryISO2 from 'country-iso-3-to-2';
import { scaleLinear } from 'd3-scale';
import { getCountries } from 'data';
import { getCountryAttributeRank, getCountryDisplayValue } from 'helpers/countryHelper';
import useCountries from 'hooks/useCountry';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { Geo } from 'types/map';

const CountryMap = ({ geo }: { geo: Geo }) => {
  const navigate = useNavigate();
  const countries = getCountries();
  const { selectedAttribute } = useCountries();
  const countryCode = getCountryISO2(geo.id);
  const country = countries[countryCode];

  const rank = useMemo(() => {
    return selectedAttribute && getCountryAttributeRank(country, selectedAttribute);
  }, [selectedAttribute, country]);

  const fillColor = useMemo(() => {
    if (!selectedAttribute) return '#1a247f';
    if (!rank) return '#868686';

    // @ts-ignore
    const colorScale = scaleLinear().domain([0, rank.maxRange]).range(['#1a247f', '#ffffff']);
    return String(colorScale(rank.index));
  }, [selectedAttribute, rank]);

  const tooltipContent = useMemo(() => {
    if (!selectedAttribute) return geo.properties.name;
    return getCountryDisplayValue(country, selectedAttribute);
  }, [selectedAttribute, country, geo]);

  return (
    <Geography
      data-tooltip-id="tooltip-country"
      data-tooltip-content={tooltipContent}
      key={geo.rsmKey}
      onClick={() => {
        navigate(`/${getCountryISO2(geo.id).toLowerCase()}`);
      }}
      geography={geo}
      fill={fillColor}
      stroke="#dedede"
    />
  );
};

const Map = () => {
  return (
    <ComposableMap>
      <Geographies geography={'/map.json'}>
        {({ geographies }) =>
          geographies.map((geo: Geo) => <CountryMap key={geo.rsmKey} geo={geo} />)
        }
      </Geographies>
    </ComposableMap>
  );
};

export default Map;
