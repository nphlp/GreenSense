import type { ExposureType, SoilType } from "@lib/poc-state";

/**
 * Palette of zone colors, cycled by zone index.
 * Hex values used inline (style.backgroundColor) since zones are user-created.
 */
export const ZONE_PALETTE = [
    "#fbbf24", // amber-400
    "#34d399", // emerald-400
    "#60a5fa", // blue-400
    "#f472b6", // pink-400
    "#a78bfa", // violet-400
    "#fb923c", // orange-400
    "#22d3ee", // cyan-400
    "#84cc16", // lime-500
];

export const EXPOSURE_META: Record<ExposureType, { label: string; color: string; emoji: string }> = {
    sun: { label: "Soleil", color: "#facc15", emoji: "☀️" },
    "partial-shade": { label: "Mi-ombre", color: "#fb923c", emoji: "⛅" },
    shade: { label: "Ombre", color: "#3b82f6", emoji: "☁️" },
};

export const SOIL_META: Record<SoilType, { label: string; color: string; description: string }> = {
    clay: {
        label: "Argile",
        color: "#92400e",
        description: "Sol lourd, retient l'eau et les nutriments, lent à se réchauffer.",
    },
    sand: {
        label: "Sable",
        color: "#fde68a",
        description: "Sol léger, très drainant, pauvre en nutriments.",
    },
    loam: {
        label: "Limon",
        color: "#a3a3a3",
        description: "Sol équilibré, fertile, facile à travailler.",
    },
    limestone: {
        label: "Calcaire",
        color: "#e5e7eb",
        description: "Sol alcalin, drainant, défavorable aux plantes acidophiles.",
    },
    humus: {
        label: "Humus",
        color: "#1c1917",
        description: "Riche en matière organique, fertile, retient l'eau.",
    },
};
