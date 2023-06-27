import { HTMLAttributes } from "react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Icons } from "../icons/icons";

function SiteFooter({ className }: HTMLAttributes<HTMLElement>) {
    return (
        <footer className={cn(className)}>
            <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
                <div className="flex flex-col md:flex-row justify-center md:justify-between w-full items-center gap-8 md:gap-0">
                    <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                        <Icons.music />
                        <p className="text-center text-sm leading-loose md:text-left">Copyright © 2023 <Link href="https://youtube.com/@soumyajitchakrabortyofficial" className="underline underline-offset-2 text-blue-500 font-bold">Soumyajit Chakraborty</Link>, All rights reserved.</p>
                    </div>
                    <div className="flex gap-4 items-center">
                        <Link href={siteConfig.links.facebook}><Icons.facebook /></Link>
                        <Link href={siteConfig.links.youtube}><Icons.youtube /></Link>
                        <Link href={siteConfig.links.instagram}><Icons.instagram /></Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export { SiteFooter };