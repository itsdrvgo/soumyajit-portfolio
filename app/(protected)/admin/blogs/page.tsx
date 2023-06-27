import { Suspense } from "react";
import { Metadata } from "next";
import BlogsPage from "@/components/admin/blogs/blogs-page";
import { BlogCreateButton } from "@/components/admin/blogs/blog-create-button";
import BlogsSkeleton from "@/components/skeletons/blogs-skeleton";

export const metadata: Metadata = {
    title: "Blogs Panel",
    description: "Create and manage blogs"
};

function Page() {
    return (
        <>
            <section className={"space-y-24 pb-8 pt-0 md:pt-16 mb-10 md:mb-20 container max-w-[75rem]"}>
                <div className="space-y-16">
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col gap-2 justify-center">
                            <p className="text-4xl font-bold">Blogs</p>
                            <p className="text-gray-400">Create and manage blogs</p>
                        </div>
                        <BlogCreateButton disabled />
                    </div>
                    <Suspense fallback={
                        <BlogsSkeleton />
                    }>
                        <BlogsPage className="w-full divide-y divide-border rounded-md border" />
                    </Suspense>
                </div>
            </section>
        </>
    );
}

export default Page;