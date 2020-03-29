import { diviEntry } from "./models/models";
import { CollectIntensivBettenClient } from "./class/collectionClient";
import { logger } from "./helpers";
import { StoreIntensivBettenClient } from "./helpers/s3Store";
import { Lambda } from "aws-sdk";

export const collectIntensivBetten = async () => {
  const client = new CollectIntensivBettenClient();

  const register: Array<diviEntry> = await client.collectIntensivBettenRegister(
    "https://www.divi.de/register/intensivregister?view=items",
    "POST"
  );
  const capacity: Array<diviEntry> = await client.collectIntensivBettenCapacity(
    "https://diviexchange.z6.web.core.windows.net/report.html",
    "GET"
  );

  const s3Store = new StoreIntensivBettenClient(process.env.BUCKET_NAME);
  await s3Store.storeCollectionToS3(register, "register");
  logger.info("Job completed successfully - beds: " + register.length);
  await s3Store.storeCollectionToS3(capacity, "capacity");
  logger.info("Job completed successfully - capacity: " + capacity.length);

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
