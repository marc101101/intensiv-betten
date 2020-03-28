import { diviEntry } from "./models";
import { AggregateIntensivBettenClient } from "./aggregationClient";
import { logger } from "../helpers";
import { StoreIntensivBettenClient } from "./s3Store";

export const aggregateIntensivBetten = async () => {
  const client = new AggregateIntensivBettenClient();

  const aggregation = await client.aggregateIntensivBetten();

  const s3Store = new StoreIntensivBettenClient(process.env.BUCKET_NAME);
  await s3Store.storeAggregationToS3(aggregation);

  logger.info("Job completed successfully - aggregation done");
};
