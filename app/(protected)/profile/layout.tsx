import { homeMenuConfig } from "@/config/menu";
import { MainNav } from "@/components/global/main-nav";
import { SiteFooter } from "@/components/global/site-footer";
import { ReactNode } from "react";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/drizzle";
import { eq } from "drizzle-orm";
import { users } from "@/lib/drizzle/schema";
import Auth from "@/components/global/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Profile",
    description: "Customize your profile settings"
};

async function Layout({ children }: { children: ReactNode }) {
    const { userId } = auth();
    if (!userId) redirect("/signin");

    const dbUser = await db.query.users.findFirst({ where: eq(users.id, userId) });
    if (!dbUser) redirect("/");

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