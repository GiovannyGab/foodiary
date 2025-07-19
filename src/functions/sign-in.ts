import { APIGatewayProxyEventV2 } from "aws-lambda";
import { SignInController } from "../controllers/SigninController";
import { parseEvent } from "../utils/parseEvent";
import { HttpResponse } from "../types/Http";
import { parseResponse } from "../utils/parseResponse";
import {z} from 'zod'

const schema = z.object({
  email: z.email(),
  password: z.string().min(8)
})
export async function handler(event: APIGatewayProxyEventV2) {
  const request = parseEvent(event);
  const response = await SignInController.handle(request);
  return parseResponse(response);
}
