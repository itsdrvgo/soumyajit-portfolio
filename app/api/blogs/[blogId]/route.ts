import { z } from "zod";
import { db } from "@/lib/drizzle";
import { blogs } from "@/lib/drizzle/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";
import { postPatchSchema, publishSchema } from "@/lib/validation/blogs";
import { handleError } from "@/lib/utils";

const routeContextSchema = z.object({
    params: z.object({
        blogId: z.string()
    })
});

export async function DELETE(req: NextRequest, context: z.infer<typeof routeContextSchema>) {
    try {
        const { params } = routeContextSchema.parse(context);

        if (!(await verifyCurrentUserHasAccessToBlog(params.blogId))) return NextResponse.json({
            code: 403,
            message: "Forbidden"
        });

        await db.delete(blogs).where(eq(blogs.id, Number(params.blogId)));
        return NextResponse.json({
            code: 204,
            message: "OK"
        });
    } catch (err) {
        handleError(err);
    }
}

export async function PATCH(req: NextRequest, context: z.infer<typeof routeContextSchema>) {
    try {
        const { params } = routeContextSchema.parse(context);

        if (!(await verifyCurrentUserHasAccessToBlog(params.blogId))) return NextResponse.json({
            code: 403,
            message: "Forbidden"
        });

        const json = await req.json();
        const body = postPatchSchema.parse(json);

        switch (body.action) {
            case "edit": {
                await db.update(blogs).set({
                    title: body.title,
                    content: body.content,
                    thumbnailUrl: body.thumbnailUrl
                }).where(eq(blogs.id, Number(params.blogId)));
            }
                break;

            case "publish": {
                const publishBody = publishSchema.parse(body);

                await db.update(blogs).set({
                    title: publishBody.title,
                    content: publishBody.content,
                    thumbnailUrl: publishBody.thumbnailUrl,
                    published: publishBody.published
                }).where(eq(blogs.id, Number(params.blogId)));
            }
                break;
        }

        return NextResponse.json({
            code: 200,
            message: "OK"
        });
    } catch (err) {
        handleError(err);
    }
}

async function verifyCurrentUserHasAccessToBlog(blogId: string) {
    const user = await currentUser();
    if (!user) return false;

    const data = await db.query.blogs.findMany({
        where: and(eq(blogs.authorId, user.id), eq(blogs.id, Number(blogId)))
    });

    return data.length > 0;
}
