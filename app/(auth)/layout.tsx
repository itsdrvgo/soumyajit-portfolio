import { homeMenuConfig } from "@/config/menu";
import { MainNav } from "@/components/global/main-nav";
import { SiteFooter } from "@/components/global/site-footer";
import { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col">
            <header className="z-40 bg-background sticky top-0 w-full">
                <div className="flex h-20 items-center justify-between py-6 container">
                    <MainNav items={homeMenuConfig.mainNav} className="flex gap-6 md:gap-10" />
                </div>
            </header>
            <main className="flex-1">{children}</main>
            <SiteFooter />
        </div>
    );
}

export default Layout;