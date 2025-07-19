import { access } from "fs";
import { HttpRequest, HttpResponse } from "../types/Http";
import { badRequest, conflict, created } from "../utils/http";
import { z } from "zod";
import { db } from "../db";
import { usersTable } from "../db/schema";
import { and, eq } from "drizzle-orm";
import { hash } from "bcryptjs";
import { calculateGoals } from "../lib/calculateGoals";

const schema = z.object({
  goal: z.enum(["lose", "maintain", "gain"]),
  gender: z.enum(["male", "female"]),
  birthDate: z.iso.date(),
  height: z.number(),
  weight: z.number(),
  activityLevel: z.number().min(1).max(5),
  account: z.object({
    name: z.string().min(1),
    email: z.email(),
    password: z.string().min(8),
  }),
});
export class SignUpController {
  static async handle({ body }: HttpRequest): Promise<HttpResponse> {
    const { success, error, data } = schema.safeParse(body);

    if (!success) {
      return badRequest({ errors: error.issues });
    }
    const userAlredyExists = await db.query.usersTable.findFirst(
      {
        columns:{
          email:true,
        },
        where: eq(usersTable.email, data.account.email)
      }
    )
    if(userAlredyExists){
      return conflict({error:'This email is alredy in use'})
    }

   
    const {account,...rest} = data
    const hashedPassword = await hash(account.password,12)

       const goals = calculateGoals({
          activityLevel: rest.activityLevel,
          birthDate: new Date(rest.birthDate),
          gender: rest.gender,
          weight: rest.weight,
          height: rest.height,
          goal: rest.goal,
        })
   const [user] =  await db.insert(usersTable).values({
      ...rest,
      ...account,
      password: hashedPassword,
      ...goals
    })
    .returning({id:usersTable.id})
    return created({ userId:user.id });
  }
}
