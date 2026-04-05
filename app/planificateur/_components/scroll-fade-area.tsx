import type { ReactNode } from "react";

type ScrollFadeAreaProps = {
    children: ReactNode;
};

/**
 * Scrollable container with gradient fades at top and bottom edges.
 * Content that scrolls behind the fade progressively disappears — purely aesthetic.
 */
export default function ScrollFadeArea(props: ScrollFadeAreaProps) {
    const { children } = props;

    return (
        <div className="relative flex min-h-0 flex-1 flex-col">
            <div className="-mx-4 flex-1 space-y-6 overflow-y-auto px-4 py-4">{children}</div>
            {/* Top fade */}
            <div className="from-background pointer-events-none absolute inset-x-0 top-0 h-4 bg-gradient-to-b to-transparent" />
            {/* Bottom fade */}
            <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t to-transparent" />
        </div>
    );
}
