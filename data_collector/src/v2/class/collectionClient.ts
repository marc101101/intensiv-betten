import * as rm from "typed-rest-client/RestClient";
import { logger } from "../../v1/aggregator/helpers";
import AWS from "aws-sdk";

export class CollectIntensivBettenClient {
  /**
   * 
   * {
    "id": "772842",
    "krankenhausStandort": {
    "id": "772842",
    "bezeichnung": "Städtisches Klinikum Dresden, Städtisches Klinikum Dresden - Standort Friedrichstadt",
    "strasse": "Friedrichstraße",
    "hausnummer": "41",
    "plz": "01067",
    "ort": "Dresden",
    "bundesland": "SACHSEN",
    "ikNummer": "261400949",
    "position": {
    "latitude": 51.059519822296,
    "longitude": 13.718164444035
    }
    },
    "meldezeitpunkt": "2020-04-03T16:19:04Z",
    "bettenStatus": {
    "statusLowCare": "BEGRENZT",
    "statusHighCare": "BEGRENZT",
    "statusECMO": "NICHT_VERFUEGBAR"
    },
    "faelleCovidAktuell": 4
    },
   */

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
      "aggregated.json"
    );
    // migration der neuen Daten in alte struktur
    // wenns noch nicht vorhanden ist neu hinzufügen
    currentRegister.forEach((element) => {
      // wenns schon vorhanden checken ob update neuer ist als bereits existierende
      let i = old_aggregation.data.findIndex(
        (hospital) => hospital.id == element.id
      );

      if (i != -1) {
        let current_time = Date.parse(element.meldezeitpunkt);
        let old_time = Date.parse(old_aggregation[i].meldezeitpunkt);

        if (current_time != old_time) {
          let history_object = {
            meldezeitpunk: old_aggregation[i].meldezeitpunkt,
            statusLowCare: old_aggregation[i].statusLowCare,
            statusHighCare: old_aggregation[i].statusHighCare,
            statusECMO: old_aggregation[i].statusECMO,
            faelleCovidAktuell: old_aggregation[i].faelleCovidAktuell,
          };

          currentRegister.history.push(history_object);
        }
      }
    });
    return { last_updated: Date.now(), data: currentRegister };
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
