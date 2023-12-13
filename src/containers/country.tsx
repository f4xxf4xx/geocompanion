import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cx from 'classnames';
import DemographyInfoCard from 'components/country/demography';
import EconomyInfoCard from 'components/country/economy';
import Flag from 'components/flag';
import { getCountry } from 'data/dataHelper';
import { Link, useParams } from 'react-router-dom';

const Country = () => {
  const { countryCode } = useParams();
  const country = countryCode && getCountry(countryCode);

  if (!country) {
    return null;
  }

  const bgImage = `url('./assets/${countryCode}.jpg')`;

  return (
    <>
      <div
        className={cx(
          `relative bg-[${bgImage}] bg-cover h-[50vh]`,
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
      <div>
        <div className="flex ">
          <DemographyInfoCard />
          <EconomyInfoCard />
        </div>
      </div>
    </>
  );
};

export default Country;
