import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { Blog } from "@/lib/drizzle/schema";
import { BlogOperations } from "./blog-operations";
import { HTMLAttributes } from "react";
import Image from "next/image";

interface BlogItemProps extends HTMLAttributes<HTMLElement> {
    blog: Pick<Blog, "id" | "title" | "published" | "createdAt" | "thumbnailUrl" | "content">
}

export function BlogItem({ blog, className }: BlogItemProps) {
    return (
        <div className={className}>
            <Image src={blog.thumbnailUrl ?? "https://cdn.discordapp.com/attachments/1091399104480944158/1124287608990736476/pexels-photo-2426085.webp"} alt={blog.id.toString()} width={500} height={500} className="aspect-video object-cover" />
            <div className="flex justify-between items-center w-full h-full p-5">
                <div className="flex flex-col justify-between h-full basis-5/6">
                    <Link
                        href={`/admin/blogs/${blog.id}`}
                        className="font-semibold hover:underline"
                    >
                        {blog.title}
                    </Link>
                    <div>
                        <p className="text-sm text-muted-foreground">
                            {formatDate(blog.createdAt.toDateString())}
                        </p>
                    </div>
                </div>
                <BlogOperations
                    blog={{ id: blog.id, title: blog.title, published: blog.published, thumbnailUrl: blog.thumbnailUrl, content: blog.content }}
                    className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-muted"
                />
            </div>
        </div>
    );
}