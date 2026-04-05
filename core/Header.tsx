"use client";

import { HEADER_HEIGHT } from "@core/config";
import cn from "@lib/cn";
import { resetCookieState } from "@lib/cookie-state-client";
import { POC_COOKIE_NAME, defaultState } from "@lib/poc-state";
import Image from "next/image";
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

    const handleReset = () => {
        resetCookieState(POC_COOKIE_NAME, defaultState);
    };

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
            <button type="button" onClick={handleReset} className="flex cursor-pointer items-center gap-2">
                <Image src="/logo.webp" alt="" width={32} height={32} className="size-8" />
                <span className="text-2xl font-bold">GreenSense</span>
            </button>
        </header>
    );
}
