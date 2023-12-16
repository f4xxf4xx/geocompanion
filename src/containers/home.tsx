import Map from 'components/home/map';
import MetricList from 'components/home/metric-list';
import Header from 'components/layout/header';
import { CountryProvider } from 'hooks/useCountry';

const Home = () => {
  return (
    <CountryProvider>
      <Header />
      <div className="flex flex-wrap">
        <MetricList />
        <div className="flex-1 mt-[-100px]">
          <Map />
        </div>
      </div>
    </CountryProvider>
  );
};

export default Home;
