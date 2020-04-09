"use strict";

const fs = require("fs");
const moment = require("moment");

let rawdata = fs.readFileSync("./src/migration/aggregated.json");
let old_json = JSON.parse(rawdata);
old_json = old_json.data;

function parseDate(date) {
  return moment(date, "DD.MM.YYYY, HH:mm").toDate().toISOString();
}

function parseParameter(status) {
  if (status == undefined) {
    return null;
  }
  if (status == "green") {
    return "VERFUEGBAR";
  }
  if (status == "red") {
    return "NICHT_VERFUEGBAR";
  }
  if (status == "yellow") {
    return "BEGRENZT";
  }
}

function parseHospital(history) {
  return history.map((e) => {
    return {
      meldezeitpunkt: parseDate(e.date),
      statusLowCare: parseParameter(e.icu_low_care),
      statusHighCare: parseParameter(e.icu_high_care),
      statusECMO: parseParameter(e.ecmo),
      faelleCovidAktuell: e.covid,
    };
  });
}

let history_list_old = [];

old_json.forEach((hospital) => {
  let history = parseHospital(hospital.history);
  history.unshift({
    meldezeitpunkt: parseDate(hospital.updated),
    statusLowCare: hospital.icu_low_care,
    statusHighCare: hospital.icu_high_care,
    statusECMO: hospital.ecmo,
    faelleCovidAktuell: hospital.covid,
  });
  history_list_old.push({
    name: hospital.hospital_short,
    lat: hospital.lat,
    lng: hospital.lon,
    history: history,
  });
});

let rawdata_new = fs.readFileSync("./src/migration/aggregated_v2.json");
let new_json = JSON.parse(rawdata_new);
let new_json_data = new_json.data;

new_json_data.forEach((hospital_new) => {
  history_list_old.forEach((hospital_old) => {
    if (
      hospital_new.krankenhausStandort.bezeichnung.includes(hospital_old.name)
    ) {
      hospital_new.history = hospital_new.history.concat(hospital_old.history);
      hospital_old.found = true;
    }
  });
});

let left_overs = history_list_old.filter((e) => e.found != true);
left_overs = left_overs.filter((e) => e.name != undefined);

console.log(left_overs.length);

/*function findComplex(newH, oldH) {
  oldH = oldH.split(/,| /);
  let match = true;
  oldH.forEach((e) => {
    if (!newH.includes(e)) {
      match = false;
    }
  });

  if (match) {
  }

  return match;
}*/

function findComplex(lat_new, lng_new, lat_old, lng_old) {
  if (lat_new == lat_old && lng_new == lng_old) {
    return true;
  }

  return false;
}

new_json_data.forEach((hospital_new) => {
  left_overs.forEach((hospital_old) => {
    if (
      findComplex(
        hospital_new.krankenhausStandort.position.latitude,
        hospital_new.krankenhausStandort.position.longitude,
        hospital_old.lat,
        hospital_old.lng
      )
    ) {
      hospital_new.history = hospital_new.history.concat(hospital_old.history);
      hospital_old.found = true;
    }
  });
});

let left_overs_2 = left_overs.filter((e) => e.found != true);

new_json.data = new_json_data;

fs.writeFile(
  "./src/migration/aggregated_v2.json",
  JSON.stringify(new_json),
  (err) => {
    if (err) throw err;
    console.log("Data written to file");
  }
);
