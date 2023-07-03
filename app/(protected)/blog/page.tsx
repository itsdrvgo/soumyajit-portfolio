import BlogsPage from "@/components/blog/blogs-page";
import BlogsSkeleton from "@/components/skeletons/blogs-skeleton";
import { Suspense } from "react";

function Page() {
    return (
        <>
            <section className={"space-y-8 pb-8 pt-0 md:pt-16 min-h-[calc(100vh-5rem)] mb-10 md:mb-20 container max-w-[75rem]"}>
                <div className="space-y-3 text-center">
                    <p className="text-5xl font-bold">Blog</p>
                    <p className="text-gray-500">Search a blog written by Soumyajit</p>
                </div>
                <Suspense fallback={
                    <BlogsSkeleton />
                }>
                    <BlogsPage className="grid grid-cols-1 md:grid-cols-3 justify-items-stretch gap-5" />
                </Suspense>
            </section>
        </>
    );
}

export default Page;