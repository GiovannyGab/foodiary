import { access } from "fs";
import { HttpRequest, HttpResponse, ProtectedHttpRequest } from "../types/Http";
import { badRequest, ok, unautorizhed } from "../utils/http";
import { z } from "zod";
import { usersTable } from "../db/schema";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { signAccessToken } from "../lib/jwt";
import { calculateGoals } from "../lib/calculateGoals";

const schema = z.object({
  email: z.email(),
  password: z.string().min(8),
});
export class MeController {
  static async handle({ userId }: ProtectedHttpRequest): Promise<HttpResponse> {
    const user = await db.query.usersTable.findFirst({
      columns: {
        id: true,
        name: true,
        email: true,
        calories: true,
        carbohydrates: true,
        fats: true,
        proteins: true,
      },
      where: eq(usersTable.id, userId),
    });
    return ok({ user });
  }
}
