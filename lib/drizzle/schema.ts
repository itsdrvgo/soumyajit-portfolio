import { int, mysqlTable, primaryKey, timestamp, varchar } from "drizzle-orm/mysql-core";

export const products = mysqlTable("products", {
    id: int("id").autoincrement().primaryKey()
});