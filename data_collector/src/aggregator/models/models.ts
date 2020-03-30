export interface History {
  date: string;
  updated_capacity: number;
  icu_low_care: string;
  icu_high_care: string;
  ecmo: string;
  covid: number;
}

export interface Data {
  hospital_long: string;
  hospital_short: string;
  contact: string;
  fed: string;
  icu_low_care: string;
  icu_high_care: string;
  ecmo: string;
  updated: string;
  updated_capacity: number;
  lat: number;
  lon: number;
  covid_current: number;
  history: History[];
}

export interface Aggregation {
  last_update: string;
  data: Data[];
}
