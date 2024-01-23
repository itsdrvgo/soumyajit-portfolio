"use client";

import { cn } from "@/src/lib/utils";
import { Link } from "@nextui-org/react";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { Icons } from "../../icons/icons";

function Footer({
    className,
    ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) {
    return (
        <footer
            className={cn(
                "flex w-full cursor-default flex-col items-center justify-center border-t border-white/10 px-2 py-4",
                className
            )}
            {...props}
        >
            <div className="flex w-full max-w-4xl flex-col items-center gap-2 text-balance text-center md:flex-row md:justify-between md:gap-7 2xl:max-w-6xl">
                <Icons.music width={25} height={25} />

                <p className="text-sm">
                    © {new Date().getFullYear()}{" "}
                    <Link
                        href={"/"}
                        underline="always"
                        className="text-sm font-semibold text-primary-700"
                    >
                        Soumyajit Chakraborty.
                    </Link>{" "}
                    All rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;
