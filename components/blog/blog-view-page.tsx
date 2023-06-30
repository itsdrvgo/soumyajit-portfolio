import { db } from "@/lib/drizzle";
import { Blog, User, blogs, users } from "@/lib/drizzle/schema";
import { auth } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
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
import { formatDate } from "@/lib/utils";

export async function getBlogForUser(blogId: Blog["id"], userId: User["id"]) {
    return await db.query.blogs.findFirst({
        where: and(eq(blogs.authorId, userId), eq(blogs.id, Number(blogId))),
    });
}

interface PageProps extends HTMLAttributes<HTMLElement> {
    params: {
        blogId: string;
    }
}

async function BlogViewPage({ className, params }: PageProps) {
    const { userId } = auth();

    const blog = await getBlogForUser(Number(params.blogId), userId!);
    if (!blog) notFound();

    const user = await db.query.users.findFirst({ where: eq(users.id, userId!) });
    if (!user) redirect("/");

    return (
        <>
            <div className="flex gap-4 flex-col w-full">
                <p className="text-2xl md:text-5xl font-bold">{blog.title}</p>
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
                <Separator className="w-full" />
            </div>
        </>
    );
}

export default BlogViewPage;