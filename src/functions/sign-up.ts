import { APIGatewayProxyEventV2 } from "aws-lambda";
import { SignInController } from "../controllers/SigninController";
import { SignUpController } from "../controllers/SignupController";
import { parseEvent } from "../utils/parseEvent";
import { parseResponse } from "../utils/parseResponse";
import {z} from 'zod'
const schema = z.object({
  goal: z.email(),
  password: z.string().min(8)
})
export async function handler(event: APIGatewayProxyEventV2){
 const request = parseEvent(event)
 const response=await SignUpController.handle(request)

return parseResponse(response)
}