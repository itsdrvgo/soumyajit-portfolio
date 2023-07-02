import { HTMLAttributes } from "react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Icons } from "../icons/icons";
import VercelLogo from "@/public/vercel-logotype-light.png";
import Image from "next/image";

function SiteFooter({ className }: HTMLAttributes<HTMLElement>) {
    return (
        <footer className={cn(className)}>
            <div className="flex items-center justify-center py-10 md:h-24 md:py-0 w-full">
                {/* <div className="flex flex-col md:flex-row justify-center md:justify-between container items-center gap-8 md:gap-0"> */}
                <div className="grid grid-cols-1 md:grid-cols-3 justify-items-stretch gap-8 md:gap-2 container">
                    <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:px-0">
                        <Icons.music className="visible md:hidden" />
                        <p className="text-center text-sm leading-loose md:text-left">Copyright © 2023 <Link href="https://youtube.com/@soumyajitchakrabortyofficial" className="underline underline-offset-2 text-blue-500 font-bold">Soumyajit Chakraborty</Link>, All rights reserved.</p>
                    </div>
                    <div className="flex gap-4 items-center justify-center">
                        <Link href={siteConfig.links.facebook}><Icons.facebook /></Link>
                        <Link href={siteConfig.links.youtube}><Icons.youtube /></Link>
                        <Link href={siteConfig.links.instagram}><Icons.instagram /></Link>
                    </div>
                    <div className="flex justify-center items-center gap-2">
                        <p className="text-center text-sm leading-loose md:text-left">Powered by</p>
                        <Link href={"https://vercel.com/"} className="cursor-pointer">
                            <Image src={VercelLogo} alt="vercel" height={75} width={75} />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export { SiteFooter };