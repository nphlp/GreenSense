import { COMPANION_REASONS } from "./companions-reasons";
import { PLANTS } from "./data";
import type { Phase, Plant } from "./types";

/**
 * Find a plant by its ID. Returns undefined if not found.
 */
export function getPlant(id: string): Plant | undefined {
    return PLANTS.find((p) => p.id === id);
}

/**
 * Get the companion plants of a given plant (resolved as Plant objects).
 * Unknown companion IDs are silently dropped.
 */
export function getCompanionsFor(plantId: string): Plant[] {
    const plant = getPlant(plantId);
    if (!plant) return [];
    return plant.companions.map(getPlant).filter((p): p is Plant => p !== undefined);
}

/**
 * Resolve a list of plant IDs into Plant objects, preserving order.
 * Unknown IDs are silently dropped.
 */
export function getPlantsByIds(ids: string[]): Plant[] {
    return ids.map(getPlant).filter((p): p is Plant => p !== undefined);
}

/**
 * Deduplicate plant IDs (for step 3: merging selected + companion choices).
 */
export function mergePlantIds(...idLists: string[][]): string[] {
    const set = new Set<string>();
    for (const list of idLists) {
        for (const id of list) set.add(id);
    }
    return Array.from(set);
}

/**
 * Returns the unique seasons covered by a phase (in calendar order).
 */
function getPhaseSeasons(phase: Phase): string[] {
    const months: number[] = [];
    if (phase.start <= phase.end) {
        for (let m = phase.start; m <= phase.end; m++) months.push(m);
    } else {
        for (let m = phase.start; m <= 12; m++) months.push(m);
        for (let m = 1; m <= phase.end; m++) months.push(m);
    }
    const order = ["Printemps", "Été", "Automne", "Hiver"];
    const seasonOf = (m: number): string => {
        if (m >= 3 && m <= 5) return "Printemps";
        if (m >= 6 && m <= 8) return "Été";
        if (m >= 9 && m <= 11) return "Automne";
        return "Hiver";
    };
    const seasons = new Set<string>();
    months.forEach((m) => seasons.add(seasonOf(m)));
    return order.filter((s) => seasons.has(s));
}

/**
 * Look up the companion-planting rationale for a pair of plants.
 * Returns an empty string if no reason is documented.
 */
export function getCompanionReason(plantA: string, plantB: string): string {
    return COMPANION_REASONS[`${plantA}|${plantB}`] ?? COMPANION_REASONS[`${plantB}|${plantA}`] ?? "";
}

/**
 * Human-readable label for the harvest season(s) of a plant.
 * Examples: "Été", "Été-Automne", "Printemps-Automne".
 */
export function getHarvestSeasonLabel(plant: Plant): string {
    const seasons = getPhaseSeasons(plant.phases.harvest);
    if (seasons.length === 0) return "";
    if (seasons.length === 1) return seasons[0];
    if (seasons.length === 4) return "Toute l’année";
    return `${seasons[0]}-${seasons[seasons.length - 1]}`;
}

/**
 * Total m² used given a mapping of plantId → count.
 */
export function getUsedSurface(plantCounts: Record<string, number>): number {
    let total = 0;
    for (const [id, count] of Object.entries(plantCounts)) {
        const plant = getPlant(id);
        if (plant) total += plant.spacePerPlant * count;
    }
    return total;
}

/**
 * Total kg/year yield given a mapping of plantId → count.
 */
export function getTotalYield(plantCounts: Record<string, number>): number {
    let total = 0;
    for (const [id, count] of Object.entries(plantCounts)) {
        const plant = getPlant(id);
        if (plant) total += plant.yieldPerPlant * count;
    }
    return total;
}

/**
 * Recommended number of plants for a given surface (in m²).
 * Simple tiers:
 *   ≤ 30 m²   → 5-6
 *   31-80 m²  → 6-8
 *   81-150 m² → 8-10
 *   > 150 m²  → 10-12
 */
export function getRecommendedPlantCount(surface: number): { min: number; max: number } {
    if (surface <= 30) return { min: 5, max: 6 };
    if (surface <= 80) return { min: 6, max: 8 };
    if (surface <= 150) return { min: 8, max: 10 };
    return { min: 10, max: 12 };
}
