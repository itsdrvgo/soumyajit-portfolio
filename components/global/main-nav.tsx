"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { MainNavItem } from "@/types";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons/icons";
import { MobileNav } from "@/components/global/mobile-nav";
import { HTMLAttributes, ReactNode, useState } from "react";

interface MainNavProps extends HTMLAttributes<HTMLElement> {
    items?: MainNavItem[]
}

function MainNav({ items, children, className }: MainNavProps) {
    const segment = useSelectedLayoutSegment();
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    return (
        <div className={className}>
            <Link href="/" className="hidden items-center space-x-2 md:flex">
                <Icons.music />
                <span className="hidden font-bold sm:inline-block">
                    {siteConfig.name}
                </span>
            </Link>
            {items?.length ? (
                <nav className="hidden gap-6 md:flex">
                    {items?.map((item, index) => (
                        <Link
                            key={index}
                            href={item.disabled ? "#" : item.href}
                            className={cn(
                                "flex items-center gap-1 text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm relative",
                                item.href.startsWith(`/${segment}`)
                                    ? "text-foreground"
                                    : "text-foreground/60",
                                item.disabled && "cursor-not-allowed opacity-80"
                            )}
                        >
                            <p>{item.title}</p>
                            {item.title === "Blog"
                                ? <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                                : null
                            }
                        </Link>
                    ))}
                </nav>
            ) : null}
            <button
                className="flex items-center space-x-2 md:hidden"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
                {showMobileMenu ? <Icons.close /> : <Icons.music />}
                <span className="font-bold">Menu</span>
            </button>
            {showMobileMenu && items && (
                <MobileNav items={items}>{children}</MobileNav>
            )}
        </div>
    );
}

export { MainNav };