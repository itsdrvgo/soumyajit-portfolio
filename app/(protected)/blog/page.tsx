import BlogsPage from "@/components/blog/blogs-page";
import BlogsSkeleton from "@/components/skeletons/blogs-skeleton";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";

function Page() {
    return (
        <>
            <section className={"space-y-8 pb-8 pt-0 md:pt-16 min-h-[calc(100vh-5rem)] mb-10 md:mb-20 container max-w-[75rem]"}>
                <div className="space-y-2">
                    <p className="text-5xl font-bold">Blog</p>
                    <p className="text-gray-400">Read blogs written by Soumyajit</p>
                </div>
                <Separator />
                <Suspense fallback={
                    <div className="grid grid-cols-1 md:grid-cols-3 justify-items-stretch gap-5">
                        {Array.from({ length: 4 }, (_, index) => (
                            <BlogsSkeleton key={index} />
                        ))}
                    </div>
                }>
                    <BlogsPage className="grid grid-cols-1 md:grid-cols-3 justify-items-stretch gap-5" />
                </Suspense>
            </section>
        </>
    );
}

export default Page;