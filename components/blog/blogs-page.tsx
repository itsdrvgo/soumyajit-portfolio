import { db } from "@/lib/drizzle";
import { blogs } from "@/lib/drizzle/schema";
import { HTMLAttributes } from "react";
import { EmptyPlaceholder } from "../ui/empty-placeholder";
import { BlogItem } from "./blog-item";
import Link from "next/link";
import { eq } from "drizzle-orm";
import { GoBackButton } from "../global/go-back-button";

interface PageProps extends HTMLAttributes<HTMLElement> { }

async function BlogsPage({ className }: PageProps) {
    const data = await db.select().from(blogs).where(eq(blogs.published, true));

    return (
        <>
            {data.length
                ? <div className={className}>
                    {data.map((blog) => (
                        <Link key={blog.id} href={`/blog/${blog.id}`}>
                            <BlogItem blog={blog} className="border border-gray-500 rounded-md flex flex-col gap-2 items-center h-full overflow-hidden cursor-pointer" />
                        </Link>
                    ))}
                </div>
                : <EmptyPlaceholder>
                    <EmptyPlaceholder.Icon name="document" />
                    <EmptyPlaceholder.Title>No blogs created</EmptyPlaceholder.Title>
                    <EmptyPlaceholder.Description>
                        Soumyajit has not posted any blogs yet.
                    </EmptyPlaceholder.Description>
                    <GoBackButton />
                </EmptyPlaceholder>
            }
        </>
    );
}

export default BlogsPage;