import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass, faSackDollar, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cx from 'classnames';
import { Card, Item, SecondaryCard } from 'components/country/card';
import Flag from 'components/flag';
import { getCountries } from 'data';
import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';

const countryImageMapping: { [key: string]: string } = {
  ca: "bg-[url('./assets/ca.jpg')]",
  us: "bg-[url('./assets/us.jpg')]",
};

const Country = () => {
  const { countryCode } = useParams();

  const country = useMemo(
    () => (countryCode ? getCountries()[countryCode.toUpperCase()] : null),
    [countryCode],
  );

  if (!country || !countryCode) {
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
          <Flag className="w-24 rounded-xl drop-shadow-xl" code={countryCode} />
          <h1 className="text-6xl text-white font-extrabold drop-shadow-xl">{country?.name}</h1>
        </div>
      </div>
      <div className="my-2 gap-2 flex flex-wrap">
        <SecondaryCard title="At a glance" icon={faMagnifyingGlass}>
          <Item title="Capital" country={country} attribute="capital" />
          <Item title="Region" country={country} attribute="region" />
          <Item title="Area" country={country} attribute="surface_area" showRank />
        </SecondaryCard>
        <Card title="Demography" icon={faUsers}>
          <Item title="Population" country={country} attribute="population" showRank />
          <Item title="Population growth" country={country} attribute="pop_growth" showRank />
          <Item title="Population density" country={country} attribute="pop_density" showRank />
          <Item title="Fertility" country={country} attribute="fertility" showRank />
          <Item title="Infant mortality" country={country} attribute="infant_mortality" showRank />
          <Item title="Sex ratio" country={country} attribute="sex_ratio" />
        </Card>
        <Card title="Economy" icon={faSackDollar}>
          {/* <Item title="Currency" value={`${country?.currencyCode} ${country?.currencyName}`} />
          <Item title="GDP" attribute="gdp} />
          <Item title="GDP per capita" attribute="gdpPerCapita} />
          <Item title="GDP growth" attribute="gdpGrowth} />
          <Item title="Unemployment" attribute="unemployment} />
          <Item title="Imports" attribute="imports} />
          <Item title="Exports" attribute="exports} /> */}
        </Card>
      </div>
    </div>
  );
};

export default Country;
