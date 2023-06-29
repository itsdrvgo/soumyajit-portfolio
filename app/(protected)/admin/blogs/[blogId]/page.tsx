import { Suspense } from "react";
import { Metadata } from "next";
import { db } from "@/lib/drizzle";
import { Blog, User, blogs } from "@/lib/drizzle/schema";
import { and, eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";
import Maintenance from "@/components/global/maintenance";

export const metadata: Metadata = {
    title: "New Blog",
    description: "Create a new blog"
};

async function getBlogForUser(blogId: Blog["id"], userId: User["id"]) {
    return await db.query.blogs.findFirst({
        where: and(eq(blogs.authorId, userId), eq(blogs.id, Number(blogId))),
    });
}

interface EditorPageProps {
    params: { blogId: string }
}

async function Page({ params }: EditorPageProps) {
    const { userId } = auth();
    if (!userId) redirect("/signin");

    const blog = await getBlogForUser(Number(params.blogId), userId);
    if (!blog) notFound();

    return (
        <>
            {/* <section className={"space-y-24 pb-8 pt-0 md:pt-16 mb-10 md:mb-20 container max-w-[75rem]"}>
                <div>
                    <Editor
                        blog={{
                            id: blog.id,
                            title: blog.title,
                            content: blog.content,
                            published: blog.published,
                        }}
                    />
                </div>
            </section> */}
            <Maintenance />
        </>
    );
}

export default Page;