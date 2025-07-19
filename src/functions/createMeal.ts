import { APIGatewayProxyEventV2 } from "aws-lambda";

import { parseEvent } from "../utils/parseEvent";

import { parseResponse } from "../utils/parseResponse";

import { MeController } from "../controllers/MeController";
import { parseProtectedEvent } from "../utils/parseProtectedEvent";
import { unautorizhed } from "../utils/http";
import { CreateMealController } from "../controllers/CreateMealController";

export async function handler(event: APIGatewayProxyEventV2) {
  try {
    const request = parseProtectedEvent(event);
    const response = await CreateMealController.handle(request);
    return parseResponse(response);
  } catch {
    return parseResponse(unautorizhed({ error: "Invalid Access Token!" }));
  }
}
