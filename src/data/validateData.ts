import countries from "data/country_data.json";

const requiredFields = [
  "name",
  "region",
  "alphabet",
  "scenery",
  "driving",
  "flagColor",
  "flagPattern",
  "roadLine",
  "language",
  "coverage",
];

export const validateCountryData = () => {
  let valide = true;
  const countryCodes = Object.keys(countries);
  console.debug(`Validating ${countryCodes.length} countries...`);

  countryCodes.forEach((countryCode) => {
    const countryData = countries[countryCode];
    requiredFields.forEach((field) => {
      if (!(field in countryData)) {
        console.error(`Missing ${field} for ${countryCode}`);
        valide = false;
      }
      if (
        Array.isArray(countryData[field]) &&
        countryData[field].length === 0
      ) {
        console.warn(`Empty ${field} for ${countryCode}`);
      }
    });
  });

  console.debug(`Validation complete.`);

  return valide;
};
