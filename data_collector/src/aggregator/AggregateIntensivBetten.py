# handler.py

import numpy as np

import class.aggregationClient as aggregationClient
import helpers.s3Store as storeIntensivBettenClient


def aggregateIntensivBetten(event, context):
    client = aggregationClient()
    aggregation = client.aggregateIntensivBetten()

    s3Store = storeIntensivBettenClient("BUCKET_NAME")
    s3Store.storeCollectionToS3(betten)


if __name__ == "__main__":
    aggregateIntensivBetten('', '')
