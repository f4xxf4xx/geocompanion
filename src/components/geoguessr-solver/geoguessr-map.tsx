import getCountryISO2 from 'country-iso-3-to-2';
import useClues from 'hooks/useClues';
import { useNavigate } from 'react-router-dom';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { Geo } from 'types/map';

const CountryMap = ({ geo }: { geo: Geo }) => {
  const { potentialCountries } = useClues();
  const navigate = useNavigate();
  const fill = '#1a247f';
  const countryCode = getCountryISO2(geo.id)?.toLowerCase();
  const fillOpacity = potentialCountries.includes(countryCode) ? 1 : 0;
  return (
    <Geography
      //data-tooltip
      key={geo.rsmKey}
      onClick={() => {
        navigate(`/${getCountryISO2(geo.id).toLowerCase()}`);
      }}
      geography={geo}
      fill={fill}
      fillOpacity={fillOpacity}
      stroke="#dedede"
    />
  );
};

const Map = () => {
  return (
    <ComposableMap className="h-[calc(100vh-160px)]">
      <Geographies geography={'/map.json'}>
        {({ geographies }) =>
          geographies.map((geo: Geo) => <CountryMap key={geo.rsmKey} geo={geo} />)
        }
      </Geographies>
    </ComposableMap>
  );
};

export default Map;
