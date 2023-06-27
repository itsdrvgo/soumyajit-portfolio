import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Poppins } from "next/font/google";
import { siteConfig } from "@/config/site";
import { Toaster } from "@/components/ui/toaster";
import { Metadata } from "next";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
    variable: "--font-poppins"
});

export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `${siteConfig.name} | %s`,
    },
    description: siteConfig.description,
    keywords: ["Soumyajit", "Soumyajit Chakraborty", "Soumyajit Official", "Soumyajit Charkborty Singer", "Soumyajit Charkborty Official", "iamsoumyajit"],
    authors: [
        {
            name: "DRVGO",
            url: "https://itsdrago.tk",
        }
    ],
    creator: "DRVGO",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: siteConfig.url,
        title: siteConfig.name,
        description: siteConfig.description,
        siteName: siteConfig.name,
    },
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon-16x16.png",
        apple: "/apple-touch-icon.png",
    },
    metadataBase: new URL(siteConfig.url)
};

interface RootLayoutProps {
    children: React.ReactNode
}

function RootLayout({ children }: RootLayoutProps) {
    return (
        <ClerkProvider>
            <html lang="en" suppressHydrationWarning>
                <head />
                <body className={`${poppins.className} min-h-screen antialiased overflow-x-hidden scroll-smooth`}>
                    {children}
                    <Toaster />
                </body>
            </html>
        </ClerkProvider>
    );
}

export default RootLayout;