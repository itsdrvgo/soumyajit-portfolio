import { Icons } from "@/components/icons/icons";
import { ReactNode } from "react";

async function Layout({ children }: { children: ReactNode }) {
    return (
        <main className="space-y-6">
            <div className="flex gap-2 items-center justify-center w-full text-white bg-red-700 p-2">
                <Icons.warning className="h-5 w-5" />
                <p>This page is not mobile ready</p>
            </div>
            {children}
        </main>
    );
}

export default Layout;