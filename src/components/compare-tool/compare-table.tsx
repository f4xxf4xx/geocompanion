import { getCountryName, getCountryUniqueCharacters, getCountryUniqueClue } from 'data/dataHelper';
import { ClueType } from 'types/types';

import CompareCell from './compare-cell';

const CompareTable = ({ selectedCountries }: { selectedCountries: string[] }) => {
  const firstCountry = selectedCountries[0];
  const secondCountry = selectedCountries[1];

  const { firstCountryUniqueCharacters, secondCountryUniqueCharacters } =
    getCountryUniqueCharacters(firstCountry, secondCountry);

  const {
    firstCountryUniqueValues: firstCountryUniqueRoadlines,
    secondCountryUniqueValues: secondCountryUniqueRoadlines,
  } = getCountryUniqueClue(firstCountry, secondCountry, ClueType.RoadLine);

  return (
    <div className="m-1 grid grid-cols-2 gap-2">
      <div className="bg-secondary p-1">
        <h4>{firstCountry && getCountryName(firstCountry)}</h4>
      </div>
      <div className="bg-secondary p-1">
        <h4>{secondCountry && getCountryName(secondCountry)}</h4>
      </div>
      <CompareCell
        title="Unique letters"
        items={firstCountryUniqueCharacters}
        clueType={ClueType.Character}
      />
      <CompareCell
        title="Unique letters"
        items={secondCountryUniqueCharacters}
        clueType={ClueType.Character}
      />
      <CompareCell
        title="Unique road lines"
        items={firstCountryUniqueRoadlines}
        clueType={ClueType.RoadLine}
      />
      <CompareCell
        title="Unique road lines"
        items={secondCountryUniqueRoadlines}
        clueType={ClueType.RoadLine}
      />
    </div>
  );
};

export default CompareTable;
