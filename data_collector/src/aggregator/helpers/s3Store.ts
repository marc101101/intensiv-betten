import { logger } from ".";
import AWS from "aws-sdk";
const fs = require("fs");

export class StoreIntensivBettenClient {
  private bucket: AWS.S3;
  private bucket_name: string;

  constructor(bucket_name: string) {
    this.bucket = new AWS.S3();
    this.bucket_name = bucket_name;
  }

  public async storeLocal(data) {
    fs.writeFileSync("aggregated.json", JSON.stringify(data));
  }

  public async storeCollectionToS3(data) {
    logger.info(typeof data);
    let params = {
      Bucket: this.bucket_name,
      Key: "aggregated.json",
      Body: JSON.stringify(data)
    };
    await this.storeToS3(params, "collection");
  }

  public async storeToS3(params, type) {
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
