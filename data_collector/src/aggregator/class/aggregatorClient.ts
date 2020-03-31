import { logger } from "../helpers";
import AWS from "aws-sdk";
import { Aggregation, Data } from "../models";
var moment = require("moment");

export class AggregatorIntensivBettenClient {
  private old_aggregation;

  public async aggregateIntensivBetten(): Promise<Aggregation> {
    this.old_aggregation = await this.getS3BucketFile(
      "www.intensiv-betten.de",
      "aggregated.json"
    );

    let register = await this.aggregateIntensivBettenAWS("register");
    let capacity = await this.aggregateIntensivBettenAWS("capacity");

    logger.info("Number of loaded - register entries: " + register.length);
    logger.info("Number of loaded - capacity entries: " + capacity.length);

    let data = await this.mergeData(register, capacity);
    return data;
  }

  /**
   * Aggregates intensiv betten register
   * @returns intensiv betten register
   */
  private async aggregateIntensivBettenAWS(type: string): Promise<Array<any>> {
    // Schau nach wann der letzte update auf den aggregated.json war
    let aggregated_last_timestamp = Date.parse(
      this.old_aggregation.last_update
    );

    // Lass dir eine Liste an allen dateien geben
    let bucket_list = await this.getS3BucketList("intensiv-betten-prod", type);

    // Beschränke die Liste auf Dateien die jünger sind als aggregated.json
    bucket_list = bucket_list.filter(element => {
      let current_timestamp = Date.parse(
        element.Key.substring(22, element.Key.length - 5)
      );
      if (current_timestamp <= aggregated_last_timestamp) {
        return false;
      }
      return true;
    });
    // hol dir alle daten in einem array und geb das Zurück

    let files = [];

    await Promise.all(
      bucket_list.map(async element => {
        files.push({
          time: Date.parse(element.Key.substring(22, element.Key.length - 5)),
          data: this.sortedList(
            await this.getS3BucketFile("intensiv-betten-prod", element.Key),
            "updated"
          )
        });
      })
    );

    return this.sortedList(files, "time");
  }

  /**
   * Sortes list by timestamp
   * @param files
   */
  private sortedList(files, value) {
    return files.sort(function(a, b) {
      var keyA = a[value],
        keyB = b[value];
      // Compare the 2 dates
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });
  }

  /**
   * Gets s3 bucket file
   * @param bucket
   * @param file
   */
  private getS3BucketFile(bucket, file) {
    var s3 = new AWS.S3();
    var self = this;

    return new Promise(function(resolve, reject) {
      s3.getObject({ Bucket: bucket, Key: file }, function(error, data) {
        if (error != null) {
          logger.info("Failed to retrieve an object: " + error);
          reject(error);
        } else {
          //logger.info("Loaded " + data.ContentLength + " bytes");
          resolve(JSON.parse(data.Body.toString()));
        }
      });
    });
  }

  /**
   * Gets s3 bucket list
   * @param bucket
   * @param type
   * @returns s3 bucket list
   */
  private getS3BucketList(bucket, type): any {
    var s3 = new AWS.S3();
    var self = this;
    var params = {
      Bucket: bucket,
      Prefix: "data_storage/" + type
    };

    return new Promise(function(resolve, reject) {
      s3.listObjectsV2(params, function(error, data) {
        if (error != null) {
          logger.info("Failed to retrieve an object: " + error);
          reject(error);
        } else {
          logger.info("Loaded list");
          resolve(data.Contents);
        }
      });
    });
  }

  /**
   * Merges data
   * @param register
   * @param capacity
   * @returns data
   */
  private async mergeData(register, capacity): Promise<any> {
    let new_aggregation = this.old_aggregation;

    register.forEach(file => {
      file.data.forEach(element => {
        //Ältester zuerst; ist im new_aggregation schon das krankenhaus drinnen
        let ag_index = new_aggregation.data.findIndex(
          hospital => hospital.hospital_long == element.hospital
        );
        //NEIN: Neu hinzufügen
        //JA: nimm das element und schau wann es zuletzt upgedatet wurde
        if (ag_index == -1) {
          let new_hospital: Data = {
            hospital_long: element.hospital,
            hospital_short: undefined,
            contact: element.contact,
            fed: element.fed,
            icu_low_care: element.icu_low_care,
            icu_high_care: element.icu_high_care,
            ecmo: element.ecmo,
            updated: element.updated,
            updated_capacity: file.time,
            lat: undefined,
            lon: undefined,
            covid_current: undefined,
            history: []
          };
          new_aggregation.data.push(new_hospital);
        } else {
          let last_update = moment(
            new_aggregation.data[ag_index].updated,
            "DD.MM.YYYY, HH:mm"
          ).toDate();

          let current_update = moment(
            element.updated,
            "DD.MM.YYYY, HH:mm"
          ).toDate();

          if (last_update < current_update) {
            new_aggregation.data[ag_index].history = [
              {
                date: new_aggregation.data[ag_index].updated,
                updated_capacity: file.time,
                icu_low_care: new_aggregation.data[ag_index].icu_low_care,
                icu_high_care: new_aggregation.data[ag_index].icu_high_care,
                ecmo: new_aggregation.data[ag_index].ecmo,
                covid: new_aggregation.data[ag_index].covid_current
              },
              ...new_aggregation.data[ag_index].history
            ];

            new_aggregation.data[ag_index].icu_low_care = element.icu_low_care;
            new_aggregation.data[ag_index].icu_high_care =
              element.icu_high_care;
            new_aggregation.data[ag_index].updated_capacity =
              element.updated_capacity;
            new_aggregation.data[ag_index].ecmo = element.ecmo;
            new_aggregation.data[ag_index].updated = element.updated;
          } else {
          }
        }
        //UPDATE ÄLTER: Update Date Object + neuer History Eintrag an erster Stelle
        //UPDATE NEUER: EEGGAAAL
      });
    });

    capacity.forEach(file => {
      file.data.forEach(element => {
        //suche nach krankenhaus in liste das passt
        let ag_index = new_aggregation.data.findIndex(hospital =>
          hospital.hospital_long.includes(element.Klinikname)
        );
        if (ag_index != -1) {
          new_aggregation.data[ag_index].hospital_short = element.Klinikname;
          let current_file_time = file.time;
          let last_update = new_aggregation.data[ag_index].updated_capacity;
          new_aggregation.data[ag_index].lat = element.lat;
          new_aggregation.data[ag_index].lon = element.lon;

          if (last_update == current_file_time) {
            new_aggregation.data[ag_index].covid = element["COVID-19 aktuell"];
          }
          new_aggregation.data[ag_index].history.forEach(
            (history_element, i) => {
              let last_update =
                new_aggregation.data[ag_index].history[i].updated_capacity;
              if (last_update == current_file_time) {
                new_aggregation.data[ag_index].history[i].covid =
                  element["COVID-19 aktuell"];
              }
            }
          );
          //search in history
        }
        //wann wurde die capacity zuletzt upgedated

        //Update ÄLTER: Update alle relvanten sachen + NEUER HISOTRY EINTRAG

        //UPDATE NEUER: EEGGAAAAL
      });
    });

    new_aggregation.last_update = new Date(
      register[register.length - 1].time
    ).toUTCString();

    return new_aggregation;
  }
}
