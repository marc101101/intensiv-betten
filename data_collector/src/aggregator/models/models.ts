export interface Value {
  icu_low_care: string;
  icu_high_care: string;
  ecmo: string;
  covid: number;
}

export interface History {
  date: string;
  value: Value;
}

export interface Datum {
  hospital: string;
  contact: string;
  fed: string;
  icu_low_care: string;
  icu_high_care: string;
  ecmo: string;
  lat: number;
  lon: number;
  covid_current: number;
  history: History[];
}

export interface Aggregation {
  last_update: string;
  data: Datum[];
}
