import ClueFinder from 'components/clue-finder';
import Header from 'components/layout/header';
import { validateCountryData } from 'data/dataHelper';

const Home = () => {
  const validData = validateCountryData();

  return (
    <div className="p-4">
      <Header />
      {validData ? <ClueFinder /> : <div>Invalid data</div>}
    </div>
  );
};

export default Home;
