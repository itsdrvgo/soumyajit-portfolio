import { db } from "@/lib/drizzle";
import { blogs, likes, users } from "@/lib/drizzle/schema";
import { handleError } from "@/lib/utils";
import { likeUpdateSchema } from "@/lib/validation/blogs";
import { currentUser } from "@clerk/nextjs";
import { and, eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();

    try {
        const data = likeUpdateSchema.parse(body);

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

        if (data.isLiked) {
            await db.delete(likes).where(eq(likes.blogId, data.blogId));

            await db.update(blogs).set({
                likes: sql`${blogs.likes} - 1`,
            }).where(eq(blogs.id, data.blogId));

            return NextResponse.json({
                code: 200,
                message: "OK"
            });
        } else {
            const newLike = await db.insert(likes).values({
                userId: data.userId,
                blogId: data.blogId,
            });

            await db.update(blogs).set({
                likes: sql`${blogs.likes} + 1`,
            }).where(eq(blogs.id, Number(data.blogId)));

            return NextResponse.json({
                code: 200,
                message: "OK",
                data: JSON.stringify(newLike.insertId)
            });
        }
    } catch (err) {
        handleError(err);
    }
}