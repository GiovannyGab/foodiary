import { access } from "fs";
import { HttpRequest, HttpResponse } from "../types/Http";
import { badRequest, ok, unautorizhed } from "../utils/http";
import {z} from 'zod'
import { usersTable } from "../db/schema";
import { eq } from "drizzle-orm";
import { db } from "../db";
import {compare} from 'bcryptjs'


const schema = z.object({
  email: z.email(),
  password: z.string().min(8)
})
export class SignInController{
  static async  handle({body}:HttpRequest): Promise<HttpResponse> {
    const {success,error,data} = schema.safeParse(body);
    if(!success){
      return badRequest({errors:error.issues})
    }

     const user = await db.query.usersTable.findFirst(
          {
            columns:{
              id:true,
              email:true,
              password:true,
            },
            where: eq(usersTable.email, data.email)
          }
        )
       if(!user){
        return unautorizhed({error:'Invalid Credentials'})
       }

       const isPasswordValid = await compare(data.password,user.password)
if(!user || !isPasswordValid){
        return unautorizhed({error:'Invalid Credentials'})
       }
   return ok({user})
  }
}