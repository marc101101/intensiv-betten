import { diviEntry } from "./models";
import { logger } from "../helpers";
const HTMLParser = require("node-html-parser");
const FormData = require("form-data");
const request = require("request");

export class AggregateIntensivBettenClient {
  public async aggregateIntensivBetten(): Promise<any> {
    return { test: "aggregation" };
  }
}
