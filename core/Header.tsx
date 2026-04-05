"use client";

import { HEADER_HEIGHT } from "@core/config";
import cn from "@lib/cn";
import Link from "next/link";
import { useSyncExternalStore } from "react";

const scrollStore = (() => {
    const subscribe = (cb: () => void) => {
        window.addEventListener("scroll", cb, { passive: true });
        return () => window.removeEventListener("scroll", cb);
    };
    const getSnapshot = () => window.scrollY > 0;
    const getServerSnapshot = () => false;
    return { subscribe, getSnapshot, getServerSnapshot };
})();

export default function Header() {
    const scrolled = useSyncExternalStore(
        scrollStore.subscribe,
        scrollStore.getSnapshot,
        scrollStore.getServerSnapshot,
    );

    return (
        <header
            style={{ height: `${HEADER_HEIGHT}rem` }}
            className={cn(
                "bg-background",
                "sticky inset-x-0 top-0 z-10",
                "flex items-center justify-center",
                "px-4 py-3 md:px-7",
                "border-b transition-colors duration-200",
                scrolled ? "border-gray-200" : "border-transparent",
            )}
        >
            {/* TODO: reset POC progression on click */}
            <Link href="/" className="text-2xl font-bold">
                GreenSense
            </Link>
        </header>
    );
}
