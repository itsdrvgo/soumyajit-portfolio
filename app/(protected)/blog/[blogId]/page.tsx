import { Suspense } from "react";
import BlogViewPage from "@/components/blog/blog-view-page";
import BlogViewSkeleton from "@/components/skeletons/blog-view-skeleton";
import { env } from "@/env.mjs";
import { Metadata } from "next";
import { blogs } from "@/lib/drizzle/schema";
import { eq } from "drizzle-orm";
import { db } from "@/lib/drizzle";

interface PageProps {
    params: { blogId: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const blog = await db.query.blogs.findFirst({
        where: eq(blogs.id, Number(params.blogId)),
    });
    if (!blog) return {};

    const url = env.NEXT_PUBLIC_APP_URL;
    const ogUrl = new URL(`${url}/blog/${blog.id}`);

    return {
        title: blog.title,
        description: blog.title,
        openGraph: {
            title: blog.title,
            description: blog.title,
            type: "article",
            images: [
                {
                    url: ogUrl.toString(),
                    width: 1200,
                    height: 630,
                    alt: blog.title
                }
            ]
        },
        twitter: {
            card: "summary_large_image",
            title: blog.title,
            description: blog.title,
            images: [ogUrl.toString()]
        }
    };
}

function Page({ params }: PageProps) {
    return (
        <>
            <section className={"space-y-24 pb-8 pt-0 md:pt-10 mb-10 md:mb-20 container max-w-[65rem]"}>
                <Suspense fallback={
                    <BlogViewSkeleton />
                }>
                    <BlogViewPage params={params} />
                </Suspense>
            </section>
        </>
    );
}

export default Page;