import { Suspense } from "react";
import { Metadata } from "next";
import BlogsPage from "@/components/admin/blogs/blogs-page";
import { BlogCreateButton } from "@/components/admin/blogs/blog-create-button";
import BlogEditSkeleton from "@/components/skeletons/blog-edit-skeleton";

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
                        <BlogCreateButton />
                    </div>
                    <Suspense fallback={
                        <div className="grid grid-cols-1 md:grid-cols-3 justify-items-stretch gap-5">
                            {Array.from({ length: 4 }, (_, index) => (
                                <BlogEditSkeleton key={index} />
                            ))}
                        </div>
                    }>
                        <BlogsPage className="grid grid-cols-1 md:grid-cols-3 justify-items-stretch gap-5" />
                    </Suspense>
                </div>
            </section>
        </>
    );
}

export default Page;