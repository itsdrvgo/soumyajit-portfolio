import { ZodError } from "zod";
import { currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/drizzle";
import { blogs } from "@/lib/drizzle/schema";
import { eq } from "drizzle-orm";
import { blogCreateSchema } from "@/lib/validation/blogs";

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
        return NextResponse.json({
            code: 500,
            message: "Internal Server Error"
        });
    }
}

export async function POST(req: NextRequest) {
    try {
        const user = await currentUser();
        if (!user) return NextResponse.json({
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