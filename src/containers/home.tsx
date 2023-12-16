import Map from 'components/home/map';
import MetricList from 'components/home/metric-list';
import Header from 'components/layout/header';
import { CountryProvider } from 'hooks/useCountry';

const Home = () => {
  return (
    <CountryProvider>
      <Header />
      <div className="flex">
        <MetricList />
        <Map />
      </div>
    </CountryProvider>
  );
};

export default Home;
