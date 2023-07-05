import { db } from "@/lib/drizzle";
import { blogs, comments, insertCommentSchema, users } from "@/lib/drizzle/schema";
import { handleError } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs";
import { eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();

    try {
        const data = insertCommentSchema.parse(body);

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

        const newComment = await db.insert(comments).values({
            authorId: data.authorId,
            blogId: data.blogId,
            content: data.content
        });

        await db.update(blogs).set({
            commentsCount: sql`${blogs.commentsCount} + 1`,
        }).where(eq(blogs.id, Number(data.blogId)));

        return NextResponse.json({
            code: 200,
            message: "OK",
            data: JSON.stringify(newComment.insertId)
        });
    } catch (err) {
        handleError(err);
    }
}