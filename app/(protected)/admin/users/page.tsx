import UserPage from "@/components/admin/users/users-page";
import UserTableSkeleton from "@/components/skeletons/users-table-skeleton";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Users Panel",
    description: "Manager users connected to the site"
};

function Page() {
    return (
        <>
            <section className={"space-y-24 pb-8 pt-0 md:pt-16 min-h-[calc(100vh-5rem)] mb-10 md:mb-20 container max-w-[75rem]"}>
                <div className="space-y-16">
                    <div className="flex flex-col items-center justify-center">
                        <p className="text-4xl font-bold">Users Table</p>
                        <p className="text-gray-400">Manage your users from here</p>
                    </div>
                    <Suspense fallback={
                        <UserTableSkeleton />
                    }>
                        <UserPage className="w-full overflow-x-scroll md:overflow-x-auto" />
                    </Suspense>
                </div>
            </section>
        </>
    );
}

export default Page;