import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cx from 'classnames';
import { Card, Item } from 'components/country/card';
import DemographyInfoCard from 'components/country/demography';
import EconomyInfoCard from 'components/country/economy';
import Flag from 'components/flag';
import { getCountry } from 'data/dataHelper';
import { Link, useParams } from 'react-router-dom';

const countryImageMapping: { [key: string]: string } = {
  ca: "bg-[url('./assets/ca.jpg')]",
};

const Country = () => {
  const { countryCode } = useParams();
  const country = countryCode && getCountry(countryCode);

  if (!country) {
    return null;
  }

  const bgImage = countryImageMapping[countryCode];
  console.log(bgImage);

  return (
    <div className="p-4">
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
          'before:backdrop-blur',
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
      <div className="my-2 gap-2 flex flex-wrap">
        <Card title="Demography">
          <Item title="Population" rank={38} value={38781291} />
          <Item title="Density" rank={228} value={4.04} />
          <Item title="Median age" rank={36} value={41.4} />
          <Item title="Growth" rank={157} value={0.89} />
        </Card>
        <Card title="Economy">
          <Item title="GDP" rank={9} value={1988336} />
          <Item title="GDP per capita" rank={16} value={52112} />
          <Item title="GDP growth" rank={10} value={2.3} />
        </Card>
      </div>
    </div>
  );
};

export default Country;
