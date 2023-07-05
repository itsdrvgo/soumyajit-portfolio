import { db } from "@/lib/drizzle";
import { blogs } from "@/lib/drizzle/schema";
import { HTMLAttributes } from "react";
import { EmptyPlaceholder } from "../ui/empty-placeholder";
import { eq } from "drizzle-orm";
import { GoBackButton } from "../global/go-back-button";
import BlogSearch from "./blog-search";

interface PageProps extends HTMLAttributes<HTMLElement> { }

async function BlogsPage({ className }: PageProps) {
    const blogData = await db.select().from(blogs).where(eq(blogs.published, true));

    return (
        <>
            {blogData.length
                ? <BlogSearch blogData={blogData} />
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