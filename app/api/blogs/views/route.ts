import { db } from "@/lib/drizzle";
import { blogs, users } from "@/lib/drizzle/schema";
import { handleError } from "@/lib/utils";
import { viewUpdateSchema } from "@/lib/validation/blogs";
import { currentUser } from "@clerk/nextjs";
import { eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();

    try {
        const data = viewUpdateSchema.parse(body);

        const user = await currentUser();
        if (!user) return NextResponse.json({
            code: 403,
            message: "Unauthorized"
        });

        const dbUser = await db.query.users.findFirst({ where: eq(users.id, user.id) });
        if (!dbUser) return NextResponse.json({
            code: 403,
            message: "Unauthorized"
        });

        await db.update(blogs).set({
            views: sql`${blogs.views} + 1`,
        }).where(eq(blogs.id, Number(data.blogId)));

        return NextResponse.json({
            code: 200,
            message: "OK"
        });
    } catch (err) {
        handleError(err);
    }
}