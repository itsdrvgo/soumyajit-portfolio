import ProfilePage from "@/components/profile/profile-page";
import ProfileSkeleton from "@/components/skeletons/profile-skeleton";
import { currentUser } from "@clerk/nextjs";
import { Suspense } from "react";

async function Page() {
    const user = await currentUser();

    return (
        <>
            <section className={"space-y-24 pb-8 pt-0 md:pt-16 mb-10 md:mb-20 container max-w-[75rem]"}>
                <div className="space-y-10">
                    <div className="flex flex-col justify-center">
                        <p className="text-4xl font-bold">Profile</p>
                        <p className="text-gray-400">Manage your profile from here</p>
                    </div>
                    <Suspense fallback={
                        <ProfileSkeleton className="space-y-6" />
                    }>
                        <ProfilePage className="space-y-6" user={user!} />
                    </Suspense>
                </div>
            </section>
        </>
    );
}

export default Page;