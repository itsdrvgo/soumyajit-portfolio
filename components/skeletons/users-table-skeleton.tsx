import { Skeleton } from "../ui/skeleton";

function UserTableSkeleton() {
    return (
        <>
            <div>
                <div className="flex items-center justify-between py-4">
                    <Skeleton className="w-1/3 h-9 bg-gray-700" />
                    <Skeleton className="w-1/12 h-9 bg-gray-700" />
                </div>
                <div className="border rounded-md overflow-hidden">
                    <Skeleton className="w-full h-32 bg-gray-700 rounded-none" />
                </div>
                <div className="flex items-center justify-end space-x-2 py-4">
                    <div className="flex-1 text-sm text-muted-foreground">
                        <Skeleton className="w-1/4 h-9 bg-gray-700" />
                    </div>
                    <div className="flex gap-2">
                        <Skeleton className="w-20 h-10 bg-gray-700" />
                        <Skeleton className="w-20 h-10 bg-gray-700" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserTableSkeleton;