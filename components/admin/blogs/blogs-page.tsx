import { db } from "@/lib/drizzle";
import { blogs } from "@/lib/drizzle/schema";
import { HTMLAttributes } from "react";
import { EmptyPlaceholder } from "@/components/ui/empty-placeholder";
import { BlogCreateButton } from "./blog-create-button";
import { BlogItem } from "./blog-item";
import FAQAccordian from "./faq-accordian";
import { Separator } from "@/components/ui/separator";

interface PageProps extends HTMLAttributes<HTMLElement> { }

async function BlogsPage({ className }: PageProps) {
    const data = await db.select().from(blogs);

    return (
        <>
            {data.length
                ? <div className={className}>
                    {data.map((blog) => (
                        <BlogItem key={blog.id} blog={blog} className="border border-gray-500 rounded-md flex flex-col gap-2 items-center overflow-hidden" />
                    ))}
                </div>
                : <EmptyPlaceholder>
                    <EmptyPlaceholder.Icon name="document" />
                    <EmptyPlaceholder.Title>No blogs created</EmptyPlaceholder.Title>
                    <EmptyPlaceholder.Description>
                        You don&apos;t have any blogs yet. Start creating content.
                    </EmptyPlaceholder.Description>
                    <BlogCreateButton variant="outline" />
                </EmptyPlaceholder>
            }
            <div className="space-y-4">
                <p className="text-4xl font-bold">F.A.Q.</p>
                <Separator className="h-[2px] w-12 bg-blue-300" />
                <FAQAccordian className="w-full" />
            </div>
        </>
    );
}

export default BlogsPage;