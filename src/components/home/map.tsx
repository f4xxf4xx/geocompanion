import getCountryISO2 from 'country-iso-3-to-2';
import { getCountries } from 'data';
import { getCountryAttributeRank, getCountryDisplayValue } from 'helpers/countryHelper';
import useCountries from 'hooks/useCountry';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { Geo } from 'types/map';

const reversedAttributes = ['infant_mortality', 'homicide_rate'];
const CountryMap = ({ geo }: { geo: Geo }) => {
  const navigate = useNavigate();
  const countries = getCountries();
  const { selectedAttribute } = useCountries();
  const countryCode = String(getCountryISO2(geo.id));
  const country = countries[countryCode];

  const rank = useMemo(() => {
    if (!selectedAttribute) return null;
    const reversed = reversedAttributes.includes(selectedAttribute);
    return getCountryAttributeRank(countryCode, selectedAttribute, reversed);
  }, [selectedAttribute, countryCode]);

  const fillColor = useMemo(() => {
    if (!selectedAttribute) return '#1a247f';
    if (!rank) return '#868686';

    return rank.indexColor;
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
