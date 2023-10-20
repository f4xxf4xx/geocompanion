import "App.css";

import Header from "components/layout/header";

import countries from "data/country_data.json";
import { validateCountryData } from "data/dataHelper";
import ClueFinder from "containers/clue-finder";

const Home = () => {
  const validData = validateCountryData(countries);

  return (
    <div>
      <Header />
      {validData ? <ClueFinder /> : <div>Invalid data</div>}
    </div>
  );
};

export default Home;
