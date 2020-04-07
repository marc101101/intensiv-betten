import * as rm from "typed-rest-client/RestClient";
import { logger } from "../helpers";
import AWS from "aws-sdk";

export class CollectIntensivBettenClient {
  /**
   * Collects intensiv betten register
   * @param url
   * @returns intensiv betten register
   */
  public async collectIntensivBettenRegister(url): Promise<Array<any>> {
    let rest: rm.RestClient = new rm.RestClient("collectionDIVI", url);
    return (await rest.get<any>("")).result.data;
  }

  /**
   * Aggregates intensiv betten
   * @param currentRegister
   * @param bucket
   */
  public async aggregateIntensivBetten(currentRegister, bucket) {
    // alten aggregated json holen
    let old_aggregation: any = await this.getS3BucketFile(
      "www.intensiv-betten.de",
      "aggregated_v2.json"
    );
    // migration der neuen Daten in alte struktur
    // wenns noch nicht vorhanden ist neu hinzufügen
    currentRegister.forEach((element) => {
      // wenns schon vorhanden checken ob update neuer ist als bereits existierende
      let i = old_aggregation.data.findIndex(
        (hospital) => hospital.id == element.id
      );

      if (i != -1) {
        element.history = old_aggregation.data[i].history;

        let current_object = old_aggregation.data[i];
        let current_time = Date.parse(element.meldezeitpunkt);
        let old_time = Date.parse(current_object.meldezeitpunkt);

        if (current_time != old_time) {
          let j = old_aggregation.data[i].history.findIndex(
            (hospital) => hospital.meldezeitpunkt == element.meldezeitpunkt
          );
          if (j == -1) {
            let history_object = {
              meldezeitpunkt: current_object.meldezeitpunkt,
              statusLowCare: current_object.bettenStatus.statusLowCare,
              statusHighCare: current_object.bettenStatus.statusHighCare,
              statusECMO: current_object.bettenStatus.statusECMO,
              faelleCovidAktuell: current_object.faelleCovidAktuell,
            };

            element.history.push(history_object);
          }
        }
      }
    });
    return await { last_updated: Date.now(), data: currentRegister };
  }

  /**
   * Gets s3 bucket file
   * @param bucket
   * @param file
   */
  private getS3BucketFile(bucket, file) {
    var s3 = new AWS.S3();
    var self = this;

    return new Promise(function (resolve, reject) {
      s3.getObject({ Bucket: bucket, Key: file }, function (error, data) {
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
}
