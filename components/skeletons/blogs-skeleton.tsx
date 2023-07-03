import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

function BlogsSkeleton() {
    return (
        <>
            <Skeleton className="w-full h-16" />
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-3 justify-items-stretch gap-5">
                {Array.from({ length: 4 }, (_, index) => (
                    <div key={index} className="border border-gray-500 rounded-md flex flex-col gap-2 items-center overflow-hidden">
                        <Skeleton className="w-full h-full aspect-video" />
                        <div className="flex justify-between w-full items-center p-5">
                            <div className="space-y-2">
                                <Skeleton className="w-40 h-9 bg-gray-700" />
                                <Skeleton className="w-28 h-6 bg-gray-700" />
                            </div>
                            <div>
                                <Skeleton className="w-7 h-7 bg-gray-700" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default BlogsSkeleton;