import { env } from "@/env.mjs";
import { db } from "@/lib/drizzle";
import { users } from "@/lib/drizzle/schema";
import { handleError } from "@/lib/utils";
import { userDeleteWebhookSchema } from "@/lib/validation/users";
import { WebhookData, webhookSchema } from "@/lib/validation/webhook";
import { SvixHeaders } from "@/types";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";

export async function POST(req: NextRequest) {
    const payload = await req.json();

    const headers: SvixHeaders = {
        "svix-id": req.headers.get("svix-id")!,
        "svix-timestamp": req.headers.get("svix-timestamp")!,
        "svix-signature": req.headers.get("svix-signature")!,
    };

    const wh = new Webhook(env.WEBHOOK_DELETE_SECRET);
    let body: WebhookData;

    try {
        body = wh.verify(JSON.stringify(payload), headers) as WebhookData;
    } catch (err) {
        return NextResponse.json({
            code: 400,
            message: "Bad Request"
        });
    }

    const { type, data } = webhookSchema.parse(body);
    if (type !== "user.deleted") return;

    try {
        const { id } = userDeleteWebhookSchema.parse(data);
        await db.delete(users).where(eq(users.id, id));

        return NextResponse.json({
            code: 200,
            message: "Ok"
        });
    } catch (err) {
        handleError(err);
    }
}