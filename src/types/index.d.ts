import { HTMLAttributes, ReactNode } from "react";

export type NavItem = {
    title: string;
    href: string;
    isExternal?: boolean;
};

export type SiteConfig = {
    name: string;
    description: string;
    url: string;
    ogImage: string;
    keywords: string[];
    links: {
        youtube: string;
        instagram: string;
        facebook: string;
    };
};

export type DefaultProps = HTMLAttributes<HTMLElement>;

export interface RootLayoutProps {
    children: ReactNode;
}
