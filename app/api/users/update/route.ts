import { env } from "@/env.mjs";
import { db } from "@/lib/drizzle";
import { users } from "@/lib/drizzle/schema";
import { userWebhookSchema } from "@/lib/validation/users";
import { WebhookData, webhookSchema } from "@/lib/validation/webhook";
import { SvixHeaders } from "@/types";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
    const payload = await req.json();

    const headers: SvixHeaders = {
        "svix-id": req.headers.get("svix-id")!,
        "svix-timestamp": req.headers.get("svix-timestamp")!,
        "svix-signature": req.headers.get("svix-signature")!,
    };

    const wh = new Webhook(env.WEBHOOK_UPDATE_SECRET);
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
    if (type !== "user.updated") return;

    try {
        const { email_addresses, profile_image_url, username, id } = userWebhookSchema.parse(data);

        await db.update(users).set({
            profile_image_url, username,
            email: email_addresses[0].email_address
        }).where(eq(users.id, id));

        return NextResponse.json({
            code: 200,
            message: "Ok"
        });
    } catch (err) {
        console.log(err);
        if (err instanceof ZodError) return NextResponse.json({
            code: 422,
            message: err.issues.map((x) => x.message).join(", ")
        });
        return NextResponse.json({
            code: 500,
            message: "Internal Server Error"
        });
    }
}