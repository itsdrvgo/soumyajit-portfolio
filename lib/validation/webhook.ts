import { z } from "zod";

export const webhookSchema = z.object({
    data: z.any(),
    object: z.literal("event"),
    type: z.enum(["user.created", "user.updated", "user.deleted"])
});

export type WebhookData = z.infer<typeof webhookSchema>;