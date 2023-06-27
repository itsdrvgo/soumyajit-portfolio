import { InferModel } from "drizzle-orm";
import { int, mysqlEnum, mysqlTable, timestamp, uniqueIndex, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";

export const users = mysqlTable("users", {
    index: int("id").autoincrement().primaryKey(),
    id: varchar("userId", { length: 255 }).notNull(),
    username: varchar("username", { length: 255 }),
    email: varchar("email", { length: 255 }).notNull(),
    profile_image_url: varchar("imageUrl", { length: 255 }),
    created_at: timestamp("createdAt", { mode: "string" }).notNull().defaultNow(),
    role: mysqlEnum("role", ["user", "admin", "owner"]).default("user")
}, (table) => {
    return {
        userIdIdx: uniqueIndex("userId_Idx").on(table.id),
        emailIdx: uniqueIndex("email_Idx").on(table.email)
    };
});

export type User = InferModel<typeof users>;
export type NewUser = InferModel<typeof users, "insert">

export const insertUserSchema = createInsertSchema(users);