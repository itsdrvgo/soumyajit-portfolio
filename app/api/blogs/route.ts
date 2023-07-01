import { currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/drizzle";
import { blogs, users } from "@/lib/drizzle/schema";
import { eq } from "drizzle-orm";
import { blogCreateSchema } from "@/lib/validation/blogs";
import { handleError } from "@/lib/utils";

export async function GET() {
    try {
        const user = await currentUser();
        if (!user) return NextResponse.json({
            code: 403,
            message: "Unauthorized!"
        });

        const filteredBlogs = await db.query.blogs.findMany({
            columns: {
                id: true,
                title: true,
                published: true,
                createdAt: true
            },
            where: eq(blogs.authorId, user.id)
        });

        return NextResponse.json({
            code: 200,
            message: "OK",
            data: JSON.stringify(filteredBlogs)
        });
    } catch (err) {
        handleError(err);
    }
}

export async function POST(req: NextRequest) {
    try {
        const user = await currentUser();
        if (!user) return NextResponse.json({
            code: 403,
            message: "Unauthorized"
        });

        const dbUser = await db.query.users.findFirst({ where: eq(users.id, user.id) });
        if (!dbUser || ["user", "moderator"].includes(dbUser.role)) return NextResponse.json({
            code: 403,
            message: "Unauthorized"
        });

        const json = await req.json();
        const body = blogCreateSchema.parse(json);

        const newBlog = await db.insert(blogs).values({
            title: body.title,
            content: body.content,
            thumbnailUrl: body.thumbnailUrl,
            authorId: user.id
        });

        return NextResponse.json({
            code: 200,
            message: "OK",
            data: JSON.stringify(newBlog.insertId)
        });
    } catch (err) {
        handleError(err);
    }
}