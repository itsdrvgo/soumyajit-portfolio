import { Header } from "@/components/auth/header";
import { LogOutButtons } from "@/components/auth/logout-buttons";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign Out",
    description: "Sign out from Soumyajit's official website"
};

export const runtime = "edge";

function SignOutPage() {
    return (
        <>
            <div className="container max-w-[30rem] flex flex-col justify-center items-center gap-8 pb-8 pt-6 md:py-8">
                <Header
                    title="Sign out"
                    description="Are you sure you want to sign out?"
                    size="sm"
                    className="text-center"
                />
                <LogOutButtons />
            </div>
        </>
    );
}

export default SignOutPage;