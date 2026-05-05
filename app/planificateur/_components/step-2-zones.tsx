"use client";

import cn from "@lib/cn";
import type { GreenSenseState, Zone } from "@lib/poc-state";
import { Plus, X } from "lucide-react";
import { type Dispatch, type SetStateAction, useMemo, useState } from "react";
import TerrainGrid, { type PaintMode } from "./terrain-grid";
import { ZONE_PALETTE } from "./terrain-meta";

type Step2ZonesProps = {
    state: GreenSenseState;
    setState: Dispatch<SetStateAction<GreenSenseState>>;
};

const cellKey = (x: number, y: number) => `${x},${y}`;

function makeZoneId() {
    return `zone-${Math.random().toString(36).slice(2, 10)}`;
}

export default function Step2Zones(props: Step2ZonesProps) {
    const { state, setState } = props;
    const [activeZoneId, setActiveZoneId] = useState<string | null>(null);

    const terrainSet = useMemo(() => new Set(state.terrainCells), [state.terrainCells]);
    const cellToZone = useMemo(() => {
        const m = new Map<string, string>();
        state.zones.forEach((z) => z.cells.forEach((c) => m.set(c, z.id)));
        return m;
    }, [state.zones]);
    const zoneById = useMemo(() => new Map(state.zones.map((z) => [z.id, z])), [state.zones]);

    const addZone = () => {
        const color = ZONE_PALETTE[state.zones.length % ZONE_PALETTE.length];
        const zone: Zone = {
            id: makeZoneId(),
            name: `Zone ${state.zones.length + 1}`,
            color,
            cells: [],
        };
        setState((s) => ({ ...s, zones: [...s.zones, zone] }));
        setActiveZoneId(zone.id);
    };

    const renameZone = (id: string, name: string) => {
        setState((s) => ({
            ...s,
            zones: s.zones.map((z) => (z.id === id ? { ...z, name } : z)),
        }));
    };

    const removeZone = (id: string) => {
        setState((s) => ({ ...s, zones: s.zones.filter((z) => z.id !== id) }));
        if (activeZoneId === id) setActiveZoneId(null);
    };

    const startPaint = (x: number, y: number): PaintMode | null => {
        if (!activeZoneId) return null;
        const key = cellKey(x, y);
        if (!terrainSet.has(key)) return null;
        const inActive = cellToZone.get(key) === activeZoneId;
        return inActive ? "remove" : "add";
    };

    const applyPaint = (x: number, y: number, mode: PaintMode) => {
        if (!activeZoneId) return;
        const key = cellKey(x, y);
        if (!terrainSet.has(key)) return;
        setState((s) => {
            const zones = s.zones.map((z) => {
                if (mode === "add") {
                    if (z.id === activeZoneId) {
                        return z.cells.includes(key) ? z : { ...z, cells: [...z.cells, key] };
                    }
                    // Remove from any other zone (1 cell = 1 zone max)
                    return z.cells.includes(key) ? { ...z, cells: z.cells.filter((c) => c !== key) } : z;
                }
                // mode === "remove" — only act on active zone
                if (z.id === activeZoneId) {
                    return z.cells.includes(key) ? { ...z, cells: z.cells.filter((c) => c !== key) } : z;
                }
                return z;
            });
            return { ...s, zones };
        });
    };

    const cellClassName = (x: number, y: number) => {
        const key = cellKey(x, y);
        if (!terrainSet.has(key)) return "bg-gray-200 opacity-40";
        const zoneId = cellToZone.get(key);
        if (!zoneId) return "bg-white hover:bg-gray-100";
        return "hover:brightness-110";
    };

    const cellStyle = (x: number, y: number) => {
        const key = cellKey(x, y);
        const zoneId = cellToZone.get(key);
        if (!zoneId) return undefined;
        const zone = zoneById.get(zoneId);
        return zone ? { backgroundColor: zone.color } : undefined;
    };

    const isCellPaintable = (x: number, y: number) => terrainSet.has(cellKey(x, y));

    const paintedCount = state.zones.reduce((sum, z) => sum + z.cells.length, 0);
    const remainingCount = state.terrainCells.length - paintedCount;

    return (
        <div className="flex flex-col gap-4">
            <div className="space-y-1">
                <h3 className="text-lg font-semibold">Définissez vos zones</h3>
                <p className="text-sm text-gray-600">
                    Créez des zones (potager, compost, jardin nord, etc.), sélectionnez-en une comme pinceau, puis
                    peignez-la sur les cases du terrain. 1 case ne peut appartenir qu&apos;à 1 zone.
                </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
                {state.zones.map((zone) => {
                    const active = zone.id === activeZoneId;
                    return (
                        <div
                            key={zone.id}
                            className={cn(
                                "flex items-center gap-1.5 rounded-full border pr-1 pl-1.5 transition-colors",
                                active
                                    ? "border-gray-900 bg-gray-50"
                                    : "border-gray-200 bg-white hover:border-gray-300",
                            )}
                        >
                            <button
                                type="button"
                                onClick={() => setActiveZoneId(active ? null : zone.id)}
                                className="focus-visible:outline-outline size-5 rounded-full border border-black/10 outline-2 outline-transparent"
                                style={{ backgroundColor: zone.color }}
                                aria-label={`Sélectionner la zone ${zone.name}`}
                                aria-pressed={active}
                            />
                            <input
                                type="text"
                                value={zone.name}
                                onChange={(e) => renameZone(zone.id, e.currentTarget.value)}
                                className={cn(
                                    "max-w-32 min-w-0 truncate bg-transparent py-1 text-sm font-medium",
                                    "focus-visible:outline-none",
                                )}
                                aria-label={`Nom de la zone ${zone.name}`}
                            />
                            <button
                                type="button"
                                onClick={() => removeZone(zone.id)}
                                className="flex size-5 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                                aria-label={`Supprimer la zone ${zone.name}`}
                            >
                                <X className="size-3.5" />
                            </button>
                        </div>
                    );
                })}
                <button
                    type="button"
                    onClick={addZone}
                    className={cn(
                        "flex items-center gap-1.5 rounded-full border border-dashed border-gray-300 px-3 py-1 text-sm text-gray-600",
                        "hover:border-gray-500 hover:text-gray-900",
                        "focus-visible:outline-outline outline-2 outline-transparent",
                    )}
                >
                    <Plus className="size-3.5" />
                    Ajouter une zone
                </button>
            </div>

            {activeZoneId ? (
                <p className="text-xs text-gray-600">
                    Pinceau actif :{" "}
                    <span className="font-medium text-gray-900">{zoneById.get(activeZoneId)?.name ?? "?"}</span>.
                    Cliquez/glissez sur la grille pour peindre. Cliquez à nouveau sur la zone pour reposer le pinceau.
                </p>
            ) : (
                <p className="text-xs text-gray-500">
                    Sélectionnez une zone (clic sur la pastille de couleur) pour activer le pinceau.
                </p>
            )}

            <TerrainGrid
                ariaLabel="Grille des zones"
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
