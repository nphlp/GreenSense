import { PLANTS } from "./data";
import type { Plant } from "./types";

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
