import Header from 'components/layout/header';
import ClueFinder from 'containers/clue-finder';
import { validateCountryData } from 'data/dataHelper';

const Home = () => {
  const validData = validateCountryData();

  return (
    <div>
      <Header />
      {validData ? <ClueFinder /> : <div>Invalid data</div>}
    </div>
  );
};

export default Home;
