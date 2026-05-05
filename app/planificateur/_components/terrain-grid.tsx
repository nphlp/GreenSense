"use client";

import cn from "@lib/cn";
import { type CSSProperties, type PointerEvent as ReactPointerEvent, useEffect, useRef } from "react";

export type PaintMode = "add" | "remove";

type TerrainGridProps = {
    cols?: number;
    rows?: number;
    ariaLabel?: string;
    /** Resolves the className for a given cell (background, hover, etc.). */
    cellClassName: (x: number, y: number) => string;
    /** Inline style for a given cell — useful for dynamic colors (zones). */
    cellStyle?: (x: number, y: number) => CSSProperties | undefined;
    /** Returns false to disable the cell (greyed out, no pointer events). Defaults to true. */
    isCellPaintable?: (x: number, y: number) => boolean;
    /** Called on pointerdown. Return null to abort the drag, or "add" / "remove" to set the paint mode. */
    startPaint: (x: number, y: number) => PaintMode | null;
    /** Called for the initial cell and each cell entered while dragging. */
    applyPaint: (x: number, y: number, mode: PaintMode) => void;
};

const cellKey = (x: number, y: number) => `${x},${y}`;

// Lucide Pencil icon as data URL cursor; white fill + black stroke stays visible on both empty and filled cells.
// Hotspot (2, 22) aligns with the pencil tip at the bottom-left of the 24x24 viewBox.
const PENCIL_CURSOR =
    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='white' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z'/><path d='m15 5 4 4'/></svg>\") 2 22, crosshair";

export default function TerrainGrid(props: TerrainGridProps) {
    const {
        cols = 20,
        rows = 20,
        ariaLabel = "Grille du terrain",
        cellClassName,
        cellStyle,
        isCellPaintable,
        startPaint,
        applyPaint,
    } = props;

    const paintModeRef = useRef<PaintMode | null>(null);

    const handleCellPointerDown = (e: ReactPointerEvent<HTMLButtonElement>, x: number, y: number) => {
        e.preventDefault();
        const mode = startPaint(x, y);
        if (!mode) return;
        paintModeRef.current = mode;
        applyPaint(x, y, mode);
    };

    const handleGridPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
        if (!paintModeRef.current) return;
        const el = document.elementFromPoint(e.clientX, e.clientY);
        if (!(el instanceof HTMLElement)) return;
        const cell = el.closest<HTMLElement>("[data-cell]");
        if (!cell?.dataset.cell) return;
        if (cell.getAttribute("aria-disabled") === "true") return;
        const [xStr, yStr] = cell.dataset.cell.split(",");
        const x = Number(xStr);
        const y = Number(yStr);
        if (Number.isNaN(x) || Number.isNaN(y)) return;
        applyPaint(x, y, paintModeRef.current);
    };

    useEffect(() => {
        const stop = () => {
            paintModeRef.current = null;
        };
        window.addEventListener("pointerup", stop);
        window.addEventListener("pointercancel", stop);
        return () => {
            window.removeEventListener("pointerup", stop);
            window.removeEventListener("pointercancel", stop);
        };
    }, []);

    return (
        <div className="-mx-4 overflow-x-auto px-4">
            <div
                className="grid w-fit gap-0.5 rounded-md bg-gray-100 p-1"
                style={{
                    gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                    cursor: PENCIL_CURSOR,
                }}
                role="grid"
                aria-label={ariaLabel}
                onPointerMove={handleGridPointerMove}
            >
                {Array.from({ length: rows }).map((_, y) =>
                    Array.from({ length: cols }).map((_, x) => {
                        const key = cellKey(x, y);
                        const paintable = isCellPaintable ? isCellPaintable(x, y) : true;
                        return (
                            <button
                                key={key}
                                type="button"
                                data-cell={key}
                                aria-disabled={!paintable}
                                aria-label={`Case colonne ${x + 1}, ligne ${y + 1}`}
                                onPointerDown={paintable ? (e) => handleCellPointerDown(e, x, y) : undefined}
                                disabled={!paintable}
                                style={{
                                    touchAction: "none",
                                    cursor: paintable ? "inherit" : "not-allowed",
                                    ...(cellStyle?.(x, y) ?? {}),
                                }}
                                className={cn(
                                    "size-7 rounded-sm transition-colors",
                                    "focus-visible:outline-outline outline-2 outline-transparent",
                                    cellClassName(x, y),
                                )}
                            />
                        );
                    }),
                )}
            </div>
        </div>
    );
}
