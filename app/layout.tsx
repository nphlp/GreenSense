import ToastProvider from "@atoms/toast";
import Breakpoints from "@comps/breakpoints";
import Header from "@core/Header";
import { DEBUG_LAYOUT } from "@core/config";
import cn from "@lib/cn";
import "@public/globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
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
                <ToastProvider>
                    <NuqsAdapter>
                        <Header />
                        {children}
                        <Breakpoints mode="onResize" />
                    </NuqsAdapter>
                </ToastProvider>
            </body>
        </html>
    );
}
