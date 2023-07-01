import { InferModel, relations } from "drizzle-orm";
import { boolean, int, json, longtext, mysqlEnum, mysqlTable, timestamp, uniqueIndex, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";

export const users = mysqlTable("users", {
    index: int("id").autoincrement().primaryKey(),
    id: varchar("userId", { length: 255 }).notNull(),
    username: varchar("username", { length: 255 }),
    email: varchar("email", { length: 255 }).notNull(),
    profile_image_url: varchar("imageUrl", { length: 255 }),
    created_at: timestamp("createdAt", { mode: "string" }).notNull().defaultNow(),
    role: mysqlEnum("role", ["user", "moderator", "admin", "owner"]).default("user").notNull()
}, (table) => {
    return {
        userIdIdx: uniqueIndex("userId_Idx").on(table.id),
        emailIdx: uniqueIndex("email_Idx").on(table.email)
    };
});

export const usersRelations = relations(users, ({ many }) => ({
	blogs: many(blogs),
}));

export type User = InferModel<typeof users>;
export type NewUser = InferModel<typeof users, "insert">

export const insertUserSchema = createInsertSchema(users);

export const blogs = mysqlTable("blogs", {
    id: int("id").autoincrement().primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    thumbnailUrl: varchar("thumbnailUrl", { length: 255 }),
    content: longtext("content"),
    published: boolean("published").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    authorId: varchar("authorId", { length: 255 }).notNull()
});

export const blogsRelations = relations(blogs, ({ one }) => ({
	author: one(users, {
		fields: [blogs.authorId],
		references: [users.id],
	}),
}));

export type Blog = InferModel<typeof blogs>;
export type NewBlog = InferModel<typeof blogs, "insert">

export const insertBlogSchema = createInsertSchema(blogs);