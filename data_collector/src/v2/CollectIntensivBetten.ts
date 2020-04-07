import { CollectIntensivBettenClient } from "./class/collectionClient";
import { logger } from "./helpers";
import { StoreIntensivBettenClient } from "./helpers/s3Store";
import { Lambda } from "aws-sdk";

export const collectAndAggregateIntensivBetten = async () => {
  const client = new CollectIntensivBettenClient();

  const register: Array<any> = await client.collectIntensivBettenRegister(
    "https://www.intensivregister.de/api/public/intensivregister?page=0&size=9999"
  );

  const aggreagte: any = await client.aggregateIntensivBetten(
    register,
    process.env.BUCKET_NAME_APP
  );

  const s3Store_raw = new StoreIntensivBettenClient(process.env.BUCKET_NAME);
  await s3Store_raw.storeToS3(
    register,
    "data_storage/register_api/" + new Date().toUTCString() + ".json",
    "raw"
  );

  const s3Store_agg = new StoreIntensivBettenClient(
    process.env.BUCKET_NAME_APP
  );
  await s3Store_agg.storeToS3(aggreagte, "aggregated_v2.json", "aggreagted");

  logger.info("Job completed successfully - beds: " + register.length);
};
