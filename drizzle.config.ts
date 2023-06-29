import * as dotenv from "dotenv";
import type { Config } from "drizzle-kit";

dotenv.config();

export default {
    schema: "./lib/drizzle/schema.ts",
    driver: "mysql2",
    out: "./drizzle",
    dbCredentials: {
        connectionString: process.env.NODE_ENV === "development" ? process.env.DEV_DATABASE_URL! : process.env.PROD_DATABASE_URL!,
    }
} satisfies Config;