import { Skeleton } from "../ui/skeleton";

function BlogsSkeleton() {
    return (
        <>
            <div className="divide-y divide-border rounded-md border">
                <div className="flex items-center justify-between p-4">
                    <div className="space-y-2">
                        <Skeleton className="w-40 h-9 bg-gray-700" />
                        <Skeleton className="w-28 h-6 bg-gray-700" />
                    </div>
                    <div>
                        <Skeleton className="w-7 h-7 bg-gray-700" />
                    </div>
                </div>
                <div className="flex items-center justify-between p-4">
                    <div className="space-y-2">
                        <Skeleton className="w-40 h-9 bg-gray-700" />
                        <Skeleton className="w-28 h-6 bg-gray-700" />
                    </div>
                    <div>
                        <Skeleton className="w-7 h-7 bg-gray-700" />
                    </div>
                </div>
                <div className="flex items-center justify-between p-4">
                    <div className="space-y-2">
                        <Skeleton className="w-40 h-9 bg-gray-700" />
                        <Skeleton className="w-28 h-6 bg-gray-700" />
                    </div>
                    <div>
                        <Skeleton className="w-7 h-7 bg-gray-700" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default BlogsSkeleton;