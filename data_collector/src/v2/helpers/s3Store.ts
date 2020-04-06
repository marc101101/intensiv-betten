import { logger } from ".";
import AWS from "aws-sdk";

export class StoreIntensivBettenClient {
  private bucket: AWS.S3;
  private bucket_name: string;

  constructor(bucket_name: string) {
    this.bucket = new AWS.S3();
    this.bucket_name = bucket_name;
  }

  public async storeToS3(data, path, type) {
    let params = {
      Bucket: this.bucket_name,
      Key: path,
      Body: JSON.stringify(data),
    };

    try {
      await this.bucket.putObject(params).promise();

      logger.info("File - " + type + " - uploaded successfully");
      return JSON.stringify(params);
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
}
