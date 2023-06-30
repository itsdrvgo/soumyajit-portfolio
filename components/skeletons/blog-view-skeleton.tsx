import { Skeleton } from "../ui/skeleton";

function BlogViewSkeleton() {
    return (
        <>
            <div className="flex gap-4 flex-col w-full">
                <Skeleton className="w-full h-14" />
                <div className="flex gap-3 text-xs items-center md:text-sm">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="w-28 h-7" />
                        <Skeleton className="w-44 h-7" />
                    </div>
                </div>
                <Skeleton className="aspect-video" />
                <Skeleton className="w-full h-56" />
            </div>
        </>
    );
}

export default BlogViewSkeleton;