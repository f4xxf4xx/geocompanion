import "App.css";

import Header from "components/layout/header";

import { validateCountryData } from "data/dataHelper";
import ClueFinder from "containers/clue-finder";
import { useContext } from "react";
import { DataContext } from "context/data";

const Home = () => {
  const { countries } = useContext(DataContext);
  const validData = validateCountryData(countries);

  return (
    <div>
      <Header />
      {validData ? <ClueFinder /> : <div>Invalid data</div>}
    </div>
  );
};

export default Home;
