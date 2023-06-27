import { z } from "zod";

export const responseValidator = z.object({
    code: z.number(),
    message: z.string(),
    data: z.any().optional()
});

export type ResponseData = z.infer<typeof responseValidator>;