import { access } from "fs";
import { HttpRequest, HttpResponse, ProtectedHttpRequest } from "../types/Http";
import { badRequest, created, ok, unautorizhed } from "../utils/http";
import { z } from "zod";
import { mealsTable, usersTable } from "../db/schema";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { signAccessToken } from "../lib/jwt";
import { calculateGoals } from "../lib/calculateGoals";

const schema = z.object({
  fileType: z.enum(["audio/m4a", "image/jpeg"]),
});
export class CreateMealController {
  static async handle({
    userId,
    body,
  }: ProtectedHttpRequest): Promise<HttpResponse> {
    const { success, error, data } = schema.safeParse(body);
    if (!success) {
      return badRequest({ errors: error.issues });
    }
    const [meal] = await db
      .insert(mealsTable)
      .values({
        userId,
        icon: "",
        inputFileKey: "input_file_key",
        inputType: data.fileType === "audio/m4a" ? "audio" : "picture",
        status: "uploading",
        name: "",
        foods: [],
      })
      .returning({ id: mealsTable.id });
    return created({ mealId: meal.id });
  }
}
