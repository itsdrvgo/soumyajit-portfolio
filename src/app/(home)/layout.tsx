import Footer from "@/src/components/global/footer/footer";
import Navbar from "@/src/components/global/navbar/navbar";
import { RootLayoutProps } from "@/src/types";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Home",
};

function Layout({ children }: RootLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="relative flex-1">{children}</main>
            <Footer />
        </div>
    );
}

export default Layout;
