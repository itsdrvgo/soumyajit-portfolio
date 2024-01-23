"use client";

import { menuConfig } from "@/src/config/menu";
import { siteConfig } from "@/src/config/site";
import { cn } from "@/src/lib/utils";
import {
    Link,
    Navbar as Nav,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
    NavbarProps,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Icons } from "../../icons/icons";

function Navbar({ ...props }: NavbarProps) {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <Nav
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
            shouldHideOnScroll
            maxWidth="xl"
            classNames={{
                item: "font-semibold",
                base: cn(
                    "z-50 bg-transparent md:py-2",
                    pathname === "/" && "fixed"
                ),
            }}
            {...props}
        >
            <NavbarContent justify="start">
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <Link
                        href="/"
                        className="flex items-center gap-2 hover:opacity-100"
                        color="foreground"
                    >
                        <Icons.music />
                        <h4 className="text-lg font-bold md:text-xl">
                            {siteConfig.name}
                        </h4>
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden gap-4 sm:flex" justify="center">
                {menuConfig.length > 0
                    ? menuConfig.map((item, index) => (
                          <NavbarItem key={index}>
                              <Link
                                  className="text-sm font-normal text-white/60"
                                  href={item.href}
                                  color="foreground"
                                  isExternal={item.isExternal}
                              >
                                  {item.title}
                              </Link>
                          </NavbarItem>
                      ))
                    : null}
            </NavbarContent>

            <NavbarMenu className="z-50">
                {menuConfig.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            href={item.href}
                            size="lg"
                            color="foreground"
                            isExternal={item.isExternal}
                            onPress={() => setIsMenuOpen(false)}
                        >
                            {item.title}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Nav>
    );
}

export default Navbar;
