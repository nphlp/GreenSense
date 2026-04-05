import { DEBUG_LAYOUT, HEADER_HEIGHT } from "@core/config";
import cn from "@lib/cn";
import "@public/globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ReactNode } from "react";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
    title: "GreenSense",
    description: "Compagnon permaculture",
};

type LayoutProps = Readonly<{
    children: ReactNode;
}>;

export default async function Layout(props: LayoutProps) {
    const { children } = props;

    return (
        <html lang="fr" className={cn("min-h-dvh", DEBUG_LAYOUT && "bg-amber-100")} suppressHydrationWarning>
            <body
                className={cn(
                    geistSans.variable,
                    geistMono.variable,
                    "bg-background text-foreground",
                    "isolate", // Base UI for portaled elements
                    "antialiased", // Nextjs recommendation for font rendering
                    "min-h-dvh",
                    DEBUG_LAYOUT && "bg-red-100",
                )}
            >
                {/* TODO: make header clickable to reset POC progression */}
                <header
                    style={{ height: `${HEADER_HEIGHT}rem` }}
                    className="flex items-center justify-center border-b border-gray-200"
                >
                    <h1 className="text-2xl font-bold">GreenSense</h1>
                </header>
                {children}
            </body>
        </html>
    );
}
