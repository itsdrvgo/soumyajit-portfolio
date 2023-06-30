import { z } from "zod";

export const blogCreateSchema = z.object({
    title: z.string(),
    content: z.string().optional(),
    thumbnailUrl: z.string().optional()
});

export const postPatchSchema = z.object({
    title: z.string().min(3).max(128).optional(),
    content: z.string().optional(),
    thumbnailUrl: z.string().nullable(),
    published: z.boolean().default(false)
});

export type BlogCreateData = z.infer<typeof blogCreateSchema>;
export type BlogPatchData = z.infer<typeof postPatchSchema>;