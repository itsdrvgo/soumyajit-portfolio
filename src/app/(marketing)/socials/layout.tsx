import { RootLayoutProps } from "@/src/types";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Socials",
    description: "Follow Soumyajit on all major social media platforms.",
};

function Layout({ children }: RootLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col">
            <main className="relative flex-1">{children}</main>
        </div>
    );
}

export default Layout;
