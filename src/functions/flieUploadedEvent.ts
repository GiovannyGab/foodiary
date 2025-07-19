import { APIGatewayProxyEventV2, S3Event } from "aws-lambda";

import { parseEvent } from "../utils/parseEvent";

import { parseResponse } from "../utils/parseResponse";

import { MeController } from "../controllers/MeController";
import { parseProtectedEvent } from "../utils/parseProtectedEvent";
import { unautorizhed } from "../utils/http";
import { CreateMealController } from "../controllers/CreateMealController";
import { ListMealsController } from "../controllers/ListMealsController";
import { GetMealByIdController } from "../controllers/GetMealById";

export async function handler(event: S3Event) {
  await Promise.all(
    event.Records.map((record) => {
      record.s3.object.key;
    })
  );
  
}
