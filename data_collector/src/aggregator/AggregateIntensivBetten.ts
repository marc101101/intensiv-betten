import { logger } from "./helpers";
import { StoreIntensivBettenClient } from "./helpers/s3Store";
import { Lambda } from "aws-sdk";
import { AggregatorIntensivBettenClient } from "./class/aggregatorClient";
import { Aggregation } from "./models";

export const aggregateIntensivBetten = async () => {
  const client = new AggregatorIntensivBettenClient();

  const aggregate: any = await client.aggregateIntensivBetten();

  const s3Store = new StoreIntensivBettenClient(process.env.BUCKET_NAME_APP);
  await s3Store.storeLocal(aggregate);
  logger.info("Job completed successfully aggregated: ");

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
