import { db } from "@/lib/drizzle";
import { Blog, User, blogs, users } from "@/lib/drizzle/schema";
import { auth } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";
import { HTMLAttributes } from "react";
import BlogWriteUp from "./blog-edit-writeup";

async function getBlogForUser(blogId: Blog["id"], userId: User["id"]) {
    return await db.query.blogs.findFirst({
        where: and(eq(blogs.authorId, userId), eq(blogs.id, Number(blogId))),
    });
}

interface PageProps extends HTMLAttributes<HTMLElement> {
    params: {
        blogId: string;
    }
}

async function BlogEditPage({ className, params }: PageProps) {
    const { userId } = auth();

    const blog = await getBlogForUser(Number(params.blogId), userId!);
    if (!blog) notFound();

    const user = await db.query.users.findFirst({ where: eq(users.id, userId!) });
    if (!user) redirect("/");

    return (
        <BlogWriteUp params={params} data={blog} user={user} />
    );
}

export default BlogEditPage;