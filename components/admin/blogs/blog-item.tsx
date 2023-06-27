import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { Blog } from "@/lib/drizzle/schema";
import { BlogOperations } from "./blog-operations";
import { HTMLAttributes } from "react";

interface BlogItemProps extends HTMLAttributes<HTMLElement> {
    blog: Pick<Blog, "id" | "title" | "published" | "createdAt">
}

export function BlogItem({ blog, className }: BlogItemProps) {
    return (
        <div className={className}>
            <div className="grid gap-1">
                <Link
                    href={`/editor/${blog.id}`}
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
            <BlogOperations blog={{ id: blog.id, title: blog.title }} />
        </div>
    );
}