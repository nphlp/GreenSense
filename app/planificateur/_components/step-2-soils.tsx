"use client";

import cn from "@lib/cn";
import { type GreenSenseState, SOIL_TYPES, type SoilType } from "@lib/poc-state";
import { type Dispatch, type SetStateAction, useMemo, useState } from "react";
import TerrainGrid, { type PaintMode } from "./terrain-grid";
import { SOIL_META } from "./terrain-meta";

type Step2SoilsProps = {
    state: GreenSenseState;
    setState: Dispatch<SetStateAction<GreenSenseState>>;
};

const cellKey = (x: number, y: number) => `${x},${y}`;

export default function Step2Soils(props: Step2SoilsProps) {
    const { state, setState } = props;
    const [activeBrush, setActiveBrush] = useState<SoilType | null>(null);
    const [hoveredBrush, setHoveredBrush] = useState<SoilType | null>(null);

    const terrainSet = useMemo(() => new Set(state.terrainCells), [state.terrainCells]);

    const startPaint = (x: number, y: number): PaintMode | null => {
        if (!activeBrush) return null;
        const key = cellKey(x, y);
        if (!terrainSet.has(key)) return null;
        return state.soils[key] === activeBrush ? "remove" : "add";
    };

    const applyPaint = (x: number, y: number, mode: PaintMode) => {
        if (!activeBrush) return;
        const key = cellKey(x, y);
        if (!terrainSet.has(key)) return;
        setState((s) => {
            const next = { ...s.soils };
            if (mode === "add") next[key] = activeBrush;
            else delete next[key];
            return { ...s, soils: next };
        });
    };

    const cellClassName = (x: number, y: number) => {
        const key = cellKey(x, y);
        if (!terrainSet.has(key)) return "bg-gray-200 opacity-40";
        if (!state.soils[key]) return "bg-white hover:bg-gray-100";
        return "hover:brightness-110";
    };

    const cellStyle = (x: number, y: number) => {
        const key = cellKey(x, y);
        const soil = state.soils[key];
        if (!soil) return undefined;
        return { backgroundColor: SOIL_META[soil].color };
    };

    const isCellPaintable = (x: number, y: number) => terrainSet.has(cellKey(x, y));

    const paintedCount = state.terrainCells.filter((c) => state.soils[c]).length;
    const remainingCount = state.terrainCells.length - paintedCount;

    const focusedBrush = hoveredBrush ?? activeBrush;

    return (
        <div className="flex flex-col gap-4">
            <div className="space-y-1">
                <h3 className="text-lg font-semibold">Définissez le sol</h3>
                <p className="text-sm text-gray-600">
                    Sélectionnez un type de sol et peignez les cases. Survolez une option pour voir sa description.
                </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
                {SOIL_TYPES.map((type) => {
                    const meta = SOIL_META[type];
                    const active = activeBrush === type;
                    return (
                        <button
                            key={type}
                            type="button"
                            onClick={() => setActiveBrush(active ? null : type)}
                            onMouseEnter={() => setHoveredBrush(type)}
                            onMouseLeave={() => setHoveredBrush(null)}
                            onFocus={() => setHoveredBrush(type)}
                            onBlur={() => setHoveredBrush(null)}
                            aria-pressed={active}
                            className={cn(
                                "flex items-center gap-2 rounded-full border px-3 py-1 text-sm transition-colors",
                                "focus-visible:outline-outline outline-2 outline-transparent",
                                active
                                    ? "border-gray-900 bg-gray-50"
                                    : "border-gray-200 bg-white hover:border-gray-300",
                            )}
                        >
                            <span
                                className="size-4 rounded-full border border-black/10"
                                style={{ backgroundColor: meta.color }}
                                aria-hidden
                            />
                            <span className="font-medium">{meta.label}</span>
                        </button>
                    );
                })}
            </div>

            <p className="min-h-[1.5rem] text-xs text-gray-600">
                {focusedBrush ? (
                    <>
                        <span className="font-medium text-gray-900">{SOIL_META[focusedBrush].label}</span> —{" "}
                        {SOIL_META[focusedBrush].description}
                    </>
                ) : (
                    "Sélectionnez ou survolez un type de sol."
                )}
            </p>

            <TerrainGrid
                ariaLabel="Grille des sols"
                cellClassName={cellClassName}
                cellStyle={cellStyle}
                isCellPaintable={isCellPaintable}
                startPaint={startPaint}
                applyPaint={applyPaint}
            />

            <p className="text-xs text-gray-500">
                {paintedCount}/{state.terrainCells.length} cases peintes
                {remainingCount > 0 && ` · ${remainingCount} restante${remainingCount > 1 ? "s" : ""}`}
            </p>
        </div>
    );
}
