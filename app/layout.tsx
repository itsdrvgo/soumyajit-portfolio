import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
    variable: "--font-poppins"
});

export const metadata = {
    title: "Next.JS Template",
    description: "Next.JS Template Application",
};

interface RootLayoutProps {
    children: React.ReactNode
}

function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head />
            <body className={`${poppins.className} min-h-screen antialiased overflow-x-hidden scroll-smooth`}>
                {children}
            </body>
        </html>
    );
}

export default RootLayout;