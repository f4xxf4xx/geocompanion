import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import {
  faGun,
  faMagnifyingGlass,
  faMountain,
  faSackDollar,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
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
        </SecondaryCard>
        <Card title="Geography" icon={faMountain}>
          <Item title="Area" country={country} attribute="surface_area" showRank />
          <Item title="Forested area" country={country} attribute="forested_area" showRank />
        </Card>

        <Card title="Demography" icon={faUsers}>
          <Item title="Population" country={country} attribute="population" showRank />
          <Item title="Population growth" country={country} attribute="pop_growth" showRank />
          <Item title="Population density" country={country} attribute="pop_density" showRank />
          <Item
            title="Infant mortality"
            country={country}
            attribute="infant_mortality"
            showRank
            reversed
          />
          <Item
            title="Life expectancy (male)"
            country={country}
            attribute="life_expectancy_male"
            showRank
          />
          <Item
            title="Life expectancy (female)"
            country={country}
            attribute="life_expectancy_female"
            showRank
          />
          <Item title="Sex ratio" country={country} attribute="sex_ratio" />
        </Card>
        <Card title="Economy" icon={faSackDollar}>
          <Item title="Currency" country={country} attribute="currencyName" />
          <Item title="GDP" country={country} attribute="gdp" showRank />
          <Item title="GDP per capita" country={country} attribute="gdp_per_capita" showRank />
          <Item title="GDP growth" country={country} attribute="gdp_growth" showRank />
          <Item title="Unemployment" country={country} attribute="unemployment" showRank reversed />
          <Item title="Imports" country={country} attribute="imports" showRank />
          <Item title="Exports" country={country} attribute="exports" showRank />
        </Card>
        <Card title="Crime" icon={faGun}>
          <Item
            title="Homicide rate"
            country={country}
            attribute="homicide_rate"
            showRank
            reversed
          />
        </Card>
      </div>
    </div>
  );
};

export default Country;
