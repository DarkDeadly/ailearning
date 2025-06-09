import { json } from "drizzle-orm/gel-core";
import { boolean, integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  subcriptionId : varchar()
});

export const coursesTable = pgTable("courses" , {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  cid: varchar().notNull().unique(),
  name :varchar(),
  description : varchar(),
  noOfChapters : integer().notNull(),
  includeVideo: boolean().default(false),
  level : varchar().notNull(),
  courseJson : json() ,
  courseInfo :json().default({}),
  userEmail : varchar('userEmail').references(() => usersTable.email).notNull(),
  bannerImage : varchar().default('')
})

export const enrollCourseTable = pgTable("enrollcourse" , {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    cid : varchar("cid").references(() => coursesTable.cid),
    userEmail : varchar('userEmail').references(() => usersTable.email).notNull(),
    completedChapters : json() ,
})
