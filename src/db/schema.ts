import { integer, pgTable, varchar,uuid,date,real } from "drizzle-orm/pg-core";
export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),

  email: varchar({length:255}).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  goal: varchar({ length: 10 }).notNull(),
  birthDate: date('birth_date').notNull(),
  height: real().notNull(),
  weight: real().notNull(),
  activityLevel:integer('activity_level').notNull(),

  //Goals

  calories:integer().notNull(),
  proteins:integer().notNull(),
  carbohydrates:integer().notNull(),
  fats:integer().notNull(),
});