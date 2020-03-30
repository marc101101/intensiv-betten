import { logger } from "../helpers";
import AWS from "aws-sdk";
import { userInfo } from "os";

export class AggregatorIntensivBettenClient {
  private aggregated_last;

  public async aggregateIntensivBetten(): Promise<Array<any>> {
    this.aggregated_last = await this.getS3BucketFile(
      "www.intensiv-betten.de",
      "aggregated.json"
    );

    let register = await this.aggregateIntensivBettenRegister();
    let capacity = await this.aggregateIntensivBettenCapacity();

    return ["test"];
  }
  /**
   * Aggregates intensiv betten register
   * @returns intensiv betten register
   */
  public async aggregateIntensivBettenRegister(): Promise<Array<any>> {
    // Schau nach wann der letzte update auf den aggregated.json war
    let aggregated_last_timestamp = await this.aggregated_last.last_update;

    // Lass dir eine Liste an allen dateien geben
    let bucket_list: Array<any> = this.getS3BucketList(
      "intensiv-betten-prod/data_storage/register"
    );

    // Beschränke die Liste auf Dateien die jünger sind als aggregated.json
    bucket_list = bucket_list.map(element => {
      logger.info(element);
    });
    // hol dir alle daten in einem array und geb das Zurück

    return ["test"];
  }

  /**
   * Aggregates intensiv betten capacity
   * @returns intensiv betten capacity
   */
  public async aggregateIntensivBettenCapacity(): Promise<Array<any>> {
    return ["test"];
  }

  /**
   * Gets s3 bucket file
   * @param bucket
   * @param file
   */
  public getS3BucketFile(bucket, file) {
    var s3 = new AWS.S3();
    s3.getObject({ Bucket: bucket, Key: file }, function(error, data) {
      if (error != null) {
        logger.info("Failed to retrieve an object: " + error);
      } else {
        logger.info("Loaded " + data.ContentLength + " bytes");
        return data.Body;
      }
    });
  }

  private getS3BucketList(bucket): any {
    var s3 = new AWS.S3();
    s3.listObjects({ Bucket: bucket }, function(error, data) {
      if (error != null) {
        logger.info("Failed to retrieve an object: " + error);
      } else {
        logger.info("Loaded list");
        return data;
      }
    });
  }
}
