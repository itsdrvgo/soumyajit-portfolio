import { z } from "zod";

export const userWebhookSchema = z.object({
    id: z.string(),
    username: z.string().nullable(),
    first_name: z.string().nullable(),
    last_name: z.string().nullable(),
    profile_image_url: z.string().nullable(),
    created_at: z.number(),
    email_addresses: z.array(z.object({
        email_address: z.string().email()
    }))
});

export const userDeleteWebhookSchema = z.object({
    id: z.string(),
    delete: z.boolean().optional(),
    object: z.string(),
});

export const roleUpdateSchema = z.object({
    role: z.enum(["user", "moderator", "admin", "owner"]),
    userId: z.string(),
    action: z.enum(["promote", "demote"]).optional()
});

export const userDeleteSchema = z.object({
    userId: z.string()
});

export type UserWebhookData = z.infer<typeof userWebhookSchema>;
export type UserDeleteWebhookData = z.infer<typeof userDeleteWebhookSchema>;
export type UserRoleUpdateData = z.infer<typeof roleUpdateSchema>;
export type UserDeleteData = z.infer<typeof userDeleteSchema>;