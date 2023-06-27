import { homeMenuConfig } from "@/config/menu";
import { MainNav } from "@/components/global/main-nav";
import { SiteFooter } from "@/components/global/site-footer";
import { ReactNode } from "react";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/drizzle";
import { eq } from "drizzle-orm";
import { users } from "@/lib/drizzle/schema";
import { Header } from "@/components/auth/header";
import { GoBackButton } from "@/components/global/go-back-button";
import Auth from "@/components/global/auth";

async function Layout({ children }: { children: ReactNode }) {
    const user = await currentUser();
    if (!user) redirect("/sign-in");

    const dbUser = await db.query.users.findFirst({ where: eq(users.id, user.id) });;
    if (!dbUser) redirect("/");

    if (dbUser.role === "user") return (
        <>
            <main className="flex-1">
                <div className="min-h-[calc(100vh-5rem)] container max-w-[30rem] flex flex-col justify-center items-center gap-8 pb-8 pt-6 md:py-8">
                    <Header
                        title="Restricted Area"
                        description="You do not have access to view the content of the page."
                        size="sm"
                        className="text-center"
                    />
                    <GoBackButton />
                </div>
            </main>
        </>
    );

    return (
        <div className="flex min-h-screen flex-col">
            <header className="z-40 bg-background sticky top-0 w-full">
                <div className="flex h-20 items-center justify-between py-6 container">
                    <MainNav items={homeMenuConfig.mainNav} className="flex gap-6 md:gap-10" />
                    <nav>
                        <Auth />
                    </nav>
                </div>
            </header>
            <main className="flex-1">{children}</main>
            <SiteFooter />
        </div>
    );
}

export default Layout;