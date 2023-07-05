import { db } from "@/lib/drizzle";
import { blogs, comments, likes, users } from "@/lib/drizzle/schema";
import { auth } from "@clerk/nextjs";
import { and, desc, eq } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";
import { HTMLAttributes } from "react";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";
import { Mdx } from "../md/mdx-components";
import remarkGfm from "remark-gfm";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { formatDate, shortenNumber } from "@/lib/utils";
import BlogViewOperations from "./blog-view-operations";

interface PageProps extends HTMLAttributes<HTMLElement> {
    params: {
        blogId: string;
    }
}

async function BlogViewPage({ className, params }: PageProps) {
    const { userId } = auth();

    const blog = await db.query.blogs.findFirst({
        where: eq(blogs.id, Number(params.blogId)),
    });
    if (!blog) notFound();

    const postedComments = await db.query.comments.findMany({
        where: eq(comments.blogId, Number(params.blogId)),
        orderBy: [desc(comments.createdAt)]
    });

    const blogLikes = await db.query.likes.findMany({
        where: eq(blogs.id, Number(params.blogId))
    });

    const user = await db.query.users.findFirst({ where: eq(users.id, userId!) });
    if (!user) redirect("/");

    const commentedUsers = await db.query.users.findMany({
        with: {
            comments: true
        }
    });

    const blogLiked = await db.query.likes.findFirst({
        where: and(eq(likes.blogId, Number(params.blogId)), eq(likes.userId, user.id))
    });

    return (
        <>
            <div className="space-y-3">
                <div className="flex gap-4 flex-col w-full">
                    <p className="text-2xl md:text-5xl font-bold md:leading-tight">{blog.title}</p>
                    <Separator className="w-full" />
                    <div className="flex gap-3 text-xs items-center md:text-sm">
                        <Avatar>
                            <AvatarImage src={user.profile_image_url!} alt={user.username ?? "User"} />
                            <AvatarFallback>{(user.username ?? "User").charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p>@{user.username ?? "User"}</p>
                            <p className="text-gray-400">Published on {formatDate(Date.now())}</p>
                        </div>
                    </div>
                    <Image src={blog.thumbnailUrl!} alt="thumbnail" width={2000} height={2000} className="rounded w-full h-full" />
                    <Mdx
                        className="prose prose-lg max-w-full text-white text-sm md:text-base"
                        remarkPlugins={[remarkGfm, remarkMath]}
                        rehypePlugins={[
                            rehypeKatex, rehypeSlug,
                            [
                                rehypePrettyCode,
                                {
                                    theme: "github-dark",
                                    onVisitLine(node: any) {
                                        if (node.children.length === 0) {
                                            node.children = [{ type: "text", value: " " }];
                                        }
                                    },
                                    onVisitHighlightedLine(node: any) {
                                        node.properties.className.push("line--highlighted");
                                    },
                                    onVisitHighlightedWord(node: any) {
                                        node.properties.className = ["word--highlighted"];
                                    },
                                },
                            ],
                            [
                                rehypeAutolinkHeadings,
                                {
                                    properties: {
                                        className: ["subheading-anchor"],
                                        ariaLabel: "Link to section",
                                    },
                                },
                            ],
                        ]}
                    >
                        {blog.content!}
                    </Mdx>
                </div>

                {/* <Separator className="w-full" /> */}
                <div className="w-full flex justify-between items-center cursor-default text-sm p-5 py-3 rounded-md bg-zinc-900">
                    <div>
                        <p>{shortenNumber(blog.likes)} Likes</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <p>{shortenNumber(blog.commentsCount)} Comments</p>
                        <p>{shortenNumber(blog.views)} Views</p>
                    </div>
                </div>
                <Separator className="w-full" />

                <BlogViewOperations
                    params={params}
                    blog={blog}
                    comments={postedComments}
                    likes={blogLikes}
                    user={user}
                    users={commentedUsers}
                    like={blogLiked}
                    className="space-y-3"
                />
            </div>
        </>
    );
}

export default BlogViewPage;