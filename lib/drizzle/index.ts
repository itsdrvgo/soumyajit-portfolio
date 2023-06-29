import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import { env } from "@/env.mjs";
import * as schema from "./schema";

const connection = connect({ url: env.NODE_ENV === "development" ? env.DEV_DATABASE_URL : env.PROD_DATABASE_URL });
export const db = drizzle(connection, { schema });
export type DbClient = typeof db;