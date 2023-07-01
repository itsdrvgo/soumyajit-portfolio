import { db } from "@/lib/drizzle";
import { blogs, users } from "@/lib/drizzle/schema";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";
import { HTMLAttributes } from "react";
import BlogWriteUp from "./blog-edit-writeup";

interface PageProps extends HTMLAttributes<HTMLElement> {
    params: {
        blogId: string;
    }
}

async function BlogEditPage({ className, params }: PageProps) {
    const { userId } = auth();

    const blog = await db.query.blogs.findFirst({
        where: eq(blogs.id, Number(params.blogId)),
    });
    if (!blog) notFound();

    const user = await db.query.users.findFirst({ where: eq(users.id, userId!) });
    if (!user) redirect("/");

    return (
        <BlogWriteUp params={params} data={blog} user={user} />
    );
}

export default BlogEditPage;