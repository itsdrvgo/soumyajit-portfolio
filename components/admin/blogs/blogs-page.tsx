import { db } from "@/lib/drizzle";
import { blogs } from "@/lib/drizzle/schema";
import { HTMLAttributes } from "react";
import { EmptyPlaceholder } from "@/components/ui/empty-placeholder";
import { BlogCreateButton } from "./blog-create-button";
import { BlogItem } from "./blog-item";

interface PageProps extends HTMLAttributes<HTMLElement> { }

async function BlogsPage({ className }: PageProps) {
    const data = await db.select().from(blogs);

    return (
        <>
            {data.length
                ? <div className={className}>
                    {data.map((blog) => (
                        <BlogItem key={blog.id} blog={blog} className="flex items-center justify-between p-4" />
                    ))}
                </div>
                : <EmptyPlaceholder>
                    <EmptyPlaceholder.Icon name="logs" />
                    <EmptyPlaceholder.Title>No blogs created</EmptyPlaceholder.Title>
                    <EmptyPlaceholder.Description>
                        You don&apos;t have any blogs yet. Start creating content.
                    </EmptyPlaceholder.Description>
                    <BlogCreateButton variant="outline" />
                </EmptyPlaceholder>
            }
        </>
    );
}

export default BlogsPage;