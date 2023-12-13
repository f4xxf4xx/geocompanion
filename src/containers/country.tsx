import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cx from 'classnames';
import { Card, Item } from 'components/country/card';
import Flag from 'components/flag';
import { getCountry } from 'data/dataHelper';
import useCountryData from 'hooks/useCountryData';
import { Link, useParams } from 'react-router-dom';

const countryImageMapping: { [key: string]: string } = {
  ca: "bg-[url('./assets/ca.jpg')]",
  us: "bg-[url('./assets/us.jpg')]",
};

const Country = () => {
  const { countryCode } = useParams();
  const country = countryCode && getCountry(countryCode);
  const countryData = useCountryData(countryCode);

  if (!country) {
    return null;
  }
  const bgImage = countryImageMapping[countryCode];

  return (
    <div className="p-4">
      <div
        //style={{ backgroundImage: `url('src/assets/${countryCode}.jpg')` }}
        className={cx(
          'relative bg-cover h-[33vh]',
          `${bgImage}`,
          'flex items-center justify-center',
          'before:content-[""]',
          'before:absolute',
          'before:top-0',
          'before:left-0',
          'before:h-full',
          'before:w-full',
          'before:bg-gray/30',
          'before:backdrop-blur-sm',
          'shadow-xl',
          'rounded-3xl before:rounded-3xl',
        )}
      >
        <Link
          className="absolute left-4 top-4 w-10 h-10 rounded-3xl bg-secondary flex items-center drop-shadow-lg justify-center"
          to="/"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <div className="relative flex items-center gap-4">
          <Flag className={cx('w-24 rounded-xl drop-shadow-xl')} code={countryCode} />
          <h1 className="text-6xl text-white font-extrabold drop-shadow-xl">{country.name}</h1>
        </div>
      </div>
      <div className="my-2">
        <Card title="At a glance" variant="secondary">
          <Item title="Capital" value={countryData?.capital} />
          <Item title="Region" value={countryData?.region} />
        </Card>
      </div>
      <div className="my-2 gap-2 flex flex-wrap">
        <Card title="Demography">
          <Item title="Population" value={countryData?.population} />
          <Item title="Population growth" value={countryData?.popGrowth} />
          <Item title="Population density" value={countryData?.popDensity} />
          <Item title="Fertility" value={countryData?.fertility} />
          <Item title="Infant mortality" value={countryData?.infantMortality} />
          <Item title="Sex ratio" value={countryData?.sexRatio} />
        </Card>
        <Card title="Economy">
          <Item title="Currency" value={countryData?.currency.code} />
          <Item title="GDP" value={countryData?.gdp} />
          <Item title="GDP per capita" value={countryData?.gdpPerCapita} />
          <Item title="GDP growth" value={countryData?.gdpGrowth} />
          <Item title="Unemployment" value={countryData?.unemployment} />
          <Item title="Imports" value={countryData?.imports} />
          <Item title="Exports" value={countryData?.exports} />
          <Item title="Tourist spending" value={countryData?.tourists} />
        </Card>
      </div>
    </div>
  );
};

export default Country;
