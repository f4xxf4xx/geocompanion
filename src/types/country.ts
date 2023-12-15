export interface CountryData {
  [key: string]: Country;
}

export interface Country {
  capital?: string;
  currencyCode?: string;
  currencyName?: string;
  employment_agriculture?: number;
  employment_industry?: number;
  employment_services?: number;
  exports?: number;
  fertility?: number;
  forested_area?: number;
  gdp?: number;
  gdp_growth?: number;
  gdp_per_capita?: number;
  homicide_rate?: number;
  infant_mortality?: number;
  internet_users?: number;
  imports?: number;
  iso2?: string;
  life_expectancy_female?: number;
  life_expectancy_male?: number;
  name?: string;
  pop_density?: number;
  pop_growth?: number;
  population?: number;
  post_secondary_enrollment_female?: number;
  post_secondary_enrollment_male?: number;
  primary_school_enrollment_female?: number;
  primary_school_enrollment_male?: number;
  region?: string;
  refugees?: number;
  secondary_school_enrollment_female?: number;
  secondary_school_enrollment_male?: number;
  sex_ratio?: number;
  surface_area?: number;
  threatened_species?: number;
  unemployment?: number;
  urban_population?: number;
  urban_population_growth?: number;
}
