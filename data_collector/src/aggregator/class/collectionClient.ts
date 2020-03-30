import { logger } from "../helpers";
import AWS from "aws-sdk";
import { userInfo } from "os";
import { Aggregation } from "../models";

export class AggregatorIntensivBettenClient {
  private aggregated_last;

  public async aggregateIntensivBetten(): Promise<Array<any>> {
    this.aggregated_last = await this.getS3BucketFile(
      "www.intensiv-betten.de",
      "aggregated.json"
    );

    let register = await this.aggregateIntensivBettenAWS("register");
    let capacity = await this.aggregateIntensivBettenAWS("capacity");

    return await this.mergeData(register, capacity);
  }

  /**
   * Aggregates intensiv betten register
   * @returns intensiv betten register
   */
  private async aggregateIntensivBettenAWS(type: string): Promise<Array<any>> {
    // Schau nach wann der letzte update auf den aggregated.json war
    let aggregated_last_timestamp = Date.parse(
      await this.aggregated_last.last_update
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
          data: await this.getS3BucketFile("intensiv-betten-prod", element.Key)
        });
      })
    );

    return files;
  }

  /**
   * Aggregates intensiv betten capacity
   * @returns intensiv betten capacity
   */
  private async aggregateIntensivBettenCapacity(): Promise<Array<any>> {
    return ["test"];
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
          logger.info("Loaded " + data.ContentLength + " bytes");
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

  private mergeData(register, capacity): Aggregation {
    let aggregation: Aggregation;
    return aggregation;
  }
}
