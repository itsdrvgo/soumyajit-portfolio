import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        CLERK_SECRET_KEY: z.string(),
        DEV_DATABASE_URL: z.string().url(),
        PROD_DATABASE_URL: z.string().url(),
        REDIS_URL: z.string().url(),
        UPSTASH_REDIS_REST_URL: z.string().url(),
        UPSTASH_REDIS_REST_TOKEN: z.string(),
        API_SECRET: z.string(),
        WEBHOOK_CREATE_SECRET: z.string(),
        WEBHOOK_UPDATE_SECRET: z.string(),
        WEBHOOK_DELETE_SECRET: z.string(),

        NODE_ENV: z.enum(["development", "test", "production"])
    },
    client: {
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
        NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string(),
        NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string(),
        NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: z.string(),
        NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: z.string(),
    },
    runtimeEnv: {
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
        NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
        NEXT_PUBLIC_CLERK_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
        NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL,
        NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL,

        CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
        DEV_DATABASE_URL: process.env.DEV_DATABASE_URL,
        PROD_DATABASE_URL: process.env.PROD_DATABASE_URL,
        REDIS_URL: process.env.REDIS_URL,
        UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
        UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
        API_SECRET: process.env.API_SECRET,
        WEBHOOK_CREATE_SECRET: process.env.WEBHOOK_CREATE_SECRET,
        WEBHOOK_UPDATE_SECRET: process.env.WEBHOOK_UPDATE_SECRET,
        WEBHOOK_DELETE_SECRET: process.env.WEBHOOK_DELETE_SECRET,

        NODE_ENV: process.env.NODE_ENV
    }
});