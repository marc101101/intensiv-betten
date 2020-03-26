import { diviEntry } from "./models";
import { CollectIntensivBettenClient } from "./client";
import { logger } from "../helpers";
import { StoreIntensivBettenClient } from "./s3Store";

export const collectIntensivBetten = async () => {
  const client = new CollectIntensivBettenClient();

  const betten: Array<diviEntry> = await client.collectIntensivBetten();

  const s3Store = new StoreIntensivBettenClient(process.env.BUCKET_NAME);
  await s3Store.storeToS3(betten);

  logger.info("Job completed successfully - beds: " + betten.length);
};
