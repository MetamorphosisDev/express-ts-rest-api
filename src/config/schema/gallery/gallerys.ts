import { pgTable, serial, integer, varchar } from "drizzle-orm/pg-core";
import { usersTable } from "../role/users";

export const galleriesTable = pgTable("galleries", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => usersTable.id),
  title: varchar("title", { length: 100 }).notNull(),
});