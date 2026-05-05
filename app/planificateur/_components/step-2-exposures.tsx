"use client";

import cn from "@lib/cn";
import { EXPOSURE_TYPES, type ExposureType, type GreenSenseState } from "@lib/poc-state";
import { type Dispatch, type SetStateAction, useMemo, useState } from "react";
import TerrainGrid, { type PaintMode } from "./terrain-grid";
import { EXPOSURE_META } from "./terrain-meta";

type Step2ExposuresProps = {
    state: GreenSenseState;
    setState: Dispatch<SetStateAction<GreenSenseState>>;
};

const cellKey = (x: number, y: number) => `${x},${y}`;

export default function Step2Exposures(props: Step2ExposuresProps) {
    const { state, setState } = props;
    const [activeBrush, setActiveBrush] = useState<ExposureType | null>(null);

    const terrainSet = useMemo(() => new Set(state.terrainCells), [state.terrainCells]);

    const startPaint = (x: number, y: number): PaintMode | null => {
        if (!activeBrush) return null;
        const key = cellKey(x, y);
        if (!terrainSet.has(key)) return null;
        return state.exposures[key] === activeBrush ? "remove" : "add";
    };

    const applyPaint = (x: number, y: number, mode: PaintMode) => {
        if (!activeBrush) return;
        const key = cellKey(x, y);
        if (!terrainSet.has(key)) return;
        setState((s) => {
            const next = { ...s.exposures };
            if (mode === "add") next[key] = activeBrush;
            else delete next[key];
            return { ...s, exposures: next };
        });
    };

    const cellClassName = (x: number, y: number) => {
        const key = cellKey(x, y);
        if (!terrainSet.has(key)) return "bg-gray-200 opacity-40";
        if (!state.exposures[key]) return "bg-white hover:bg-gray-100";
        return "hover:brightness-110";
    };

    const cellStyle = (x: number, y: number) => {
        const key = cellKey(x, y);
        const expo = state.exposures[key];
        if (!expo) return undefined;
        return { backgroundColor: EXPOSURE_META[expo].color };
    };

    const isCellPaintable = (x: number, y: number) => terrainSet.has(cellKey(x, y));

    const paintedCount = state.terrainCells.filter((c) => state.exposures[c]).length;
    const remainingCount = state.terrainCells.length - paintedCount;

    return (
        <div className="flex flex-col gap-4">
            <div className="space-y-1">
                <h3 className="text-lg font-semibold">Définissez l&apos;ensoleillement</h3>
                <p className="text-sm text-gray-600">
                    Sélectionnez un niveau d&apos;ensoleillement et peignez les cases du terrain.
                </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
                {EXPOSURE_TYPES.map((type) => {
                    const meta = EXPOSURE_META[type];
                    const active = activeBrush === type;
                    return (
                        <button
                            key={type}
                            type="button"
                            onClick={() => setActiveBrush(active ? null : type)}
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
                            <span aria-hidden>{meta.emoji}</span>
                            <span className="font-medium">{meta.label}</span>
                        </button>
                    );
                })}
            </div>

            {activeBrush ? (
                <p className="text-xs text-gray-600">
                    Pinceau actif :{" "}
                    <span className="font-medium text-gray-900">{EXPOSURE_META[activeBrush].label}</span>. Cliquez à
                    nouveau pour reposer le pinceau.
                </p>
            ) : (
                <p className="text-xs text-gray-500">Sélectionnez un niveau pour activer le pinceau.</p>
            )}

            <TerrainGrid
                ariaLabel="Grille des expositions"
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
