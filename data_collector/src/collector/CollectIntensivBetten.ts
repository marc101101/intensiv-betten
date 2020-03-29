import { diviEntry } from "./models/models";
import { CollectIntensivBettenClient } from "./class/collectionClient";
import { logger } from "./helpers";
import { StoreIntensivBettenClient } from "./helpers/s3Store";
import { Lambda } from "aws-sdk";

export const collectIntensivBetten = async () => {
  const client = new CollectIntensivBettenClient();

  const betten: Array<diviEntry> = await client.collectIntensivBetten();

  const s3Store = new StoreIntensivBettenClient(process.env.BUCKET_NAME);
  await s3Store.storeCollectionToS3(betten);

  logger.info("Job completed successfully - beds: " + betten.length);

  var params = {
    ClientContext: "CollectIntensivBetten",
    FunctionName:
      "arn:aws:lambda:eu-central-1:873778873518:function:intensivBetten-prod-aggregationIntensivBetten",
    InvocationType: "Event",
    region: "eu-central-1"
  };

  let lambda = new Lambda();

  lambda.invoke(params);
};
