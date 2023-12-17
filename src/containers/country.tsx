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
import Flag from 'components/layout/flag';
import Header from 'components/layout/header';
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

  if (!countryCode) {
    return null;
  }
  const bgImage = countryImageMapping[countryCode];

  return (
    <div>
      <Header />
      <div className="p-2">
        <div
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
            <Item title="Capital" countryCode={countryCode} attribute="capital" />
            <Item title="Region" countryCode={countryCode} attribute="region" />
          </SecondaryCard>
          <Card title="Geography" icon={faMountain}>
            <Item title="Area" countryCode={countryCode} attribute="surface_area" showRank />
            <Item
              title="Forested area"
              countryCode={countryCode}
              attribute="forested_area"
              showRank
            />
          </Card>

          <Card title="Demography" icon={faUsers}>
            <Item title="Population" countryCode={countryCode} attribute="population" showRank />
            <Item
              title="Population growth"
              countryCode={countryCode}
              attribute="pop_growth"
              showRank
            />
            <Item
              title="Population density"
              countryCode={countryCode}
              attribute="pop_density"
              showRank
            />
            <Item
              title="Infant mortality"
              countryCode={countryCode}
              attribute="infant_mortality"
              showRank
              reversed
            />
            <Item
              title="Life expectancy (male)"
              countryCode={countryCode}
              attribute="life_expectancy_male"
              showRank
            />
            <Item
              title="Life expectancy (female)"
              countryCode={countryCode}
              attribute="life_expectancy_female"
              showRank
            />
            <Item title="Sex ratio" countryCode={countryCode} attribute="sex_ratio" />
          </Card>
          <Card title="Economy" icon={faSackDollar}>
            <Item title="Currency" countryCode={countryCode} attribute="currencyName" />
            <Item title="GDP" countryCode={countryCode} attribute="gdp" showRank />
            <Item
              title="GDP per capita"
              countryCode={countryCode}
              attribute="gdp_per_capita"
              showRank
            />
            <Item title="GDP growth" countryCode={countryCode} attribute="gdp_growth" showRank />
            <Item
              title="Unemployment"
              countryCode={countryCode}
              attribute="unemployment"
              showRank
              reversed
            />
            <Item title="Imports" countryCode={countryCode} attribute="imports" showRank />
            <Item title="Exports" countryCode={countryCode} attribute="exports" showRank />
          </Card>
          <Card title="Crime" icon={faGun}>
            <Item
              title="Homicide rate"
              countryCode={countryCode}
              attribute="homicide_rate"
              showRank
              reversed
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Country;
