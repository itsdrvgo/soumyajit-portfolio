import { homeMenuConfig } from "@/config/menu";
import { MainNav } from "@/components/global/main-nav";
import { SiteFooter } from "@/components/global/site-footer";
import { ReactNode, Suspense } from "react";
import Auth from "@/components/global/auth";
import "./page.css";
import { Metadata } from "next";
import LoginButton from "@/components/global/login-button";

export const metadata: Metadata = {
    title: "Home"
};

function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col">
            <header className="z-40 bg-background sticky top-0 w-full">
                <div className="flex h-20 items-center justify-between py-6 container">
                    <MainNav items={homeMenuConfig.mainNav} className="flex gap-6 md:gap-10" />
                    <nav>
                        <Suspense fallback={
                            <LoginButton className="px-4 flex gap-2 items-center" />
                        }>
                            <Auth />
                        </Suspense>
                    </nav>
                </div>
            </header>
            <main className="flex-1">{children}</main>
            <SiteFooter />
        </div>
    );
}

export default Layout;