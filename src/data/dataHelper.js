import countries from "./countries_mapping.json";

export const allRegions = Object.keys(countries)
  .reduce((acc, country) => {
    return [...new Set([...acc, ...countries[country].regions])];
  }, [])
  .sort();

export const allAlphabets = Object.keys(countries)
  .reduce((acc, country) => {
    return [...new Set([...acc, ...countries[country].alphabets])];
  }, [])
  .sort();

export const allColors = Object.keys(countries).reduce((acc, country) => {
  return [...new Set([...acc, ...countries[country].flag.colors])];
}, []);

export const allPatterns = Object.keys(countries).reduce((acc, country) => {
  return [...new Set([...acc, ...countries[country].flag.patterns])];
}, []);
