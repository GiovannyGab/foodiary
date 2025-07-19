import { APIGatewayProxyEventV2 } from "aws-lambda";
import { SignInController } from "../controllers/SigninController";
import { SignUpController } from "../controllers/SignupController";
import { parseEvent } from "../utils/parseEvent";

export async function handler(event: APIGatewayProxyEventV2){
 const request = parseEvent(event)
 const{statusCode,body}=await SignUpController.handle(request)

 return{statusCode,body:JSON.stringify(body)}
}