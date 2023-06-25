import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        DATABASE_URL: z.string().url(),
        REDIS_URL: z.string().url(),
        NODE_ENV: z.enum(["development", "test", "production"])
    },
    runtimeEnv: {
        DATABASE_URL: process.env.DATABASE_URL,
        REDIS_URL: process.env.REDIS_URL,
        NODE_ENV: process.env.NODE_ENV
    }
});