import { z } from "zod";

/**
 * Cookie name for the POC state.
 * Clicking the "GreenSense" logo in the header calls removeCookieState(POC_COOKIE_NAME).
 */
export const POC_COOKIE_NAME = "greensense-poc";

export const EXPOSURE_TYPES = ["sun", "partial-shade", "shade"] as const;
export type ExposureType = (typeof EXPOSURE_TYPES)[number];

export const SOIL_TYPES = ["clay", "sand", "loam", "limestone", "humus"] as const;
export type SoilType = (typeof SOIL_TYPES)[number];

export type Zone = {
    id: string;
    name: string;
    color: string;
    cells: string[];
};

export type GreenSenseState = {
    step: 1 | 2 | 3 | 4 | 5 | 6;
    surface: number | null;
    terrainCells: string[];
    zones: Zone[];
    exposures: Record<string, ExposureType>;
    soils: Record<string, SoilType>;
    selectedPlants: string[];
    companionChoices: Record<string, string[]>;
    plantCounts: Record<string, number>;
};

const zoneSchema = z.object({
    id: z.string(),
    name: z.string(),
    color: z.string(),
    cells: z.array(z.string()),
}) satisfies z.ZodType<Zone>;

export const greenSenseStateSchema = z.object({
    step: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6)]),
    surface: z.number().nullable(),
    terrainCells: z.array(z.string()),
    zones: z.array(zoneSchema),
    exposures: z.record(z.string(), z.enum(EXPOSURE_TYPES)),
    soils: z.record(z.string(), z.enum(SOIL_TYPES)),
    selectedPlants: z.array(z.string()),
    companionChoices: z.record(z.string(), z.array(z.string())),
    plantCounts: z.record(z.string(), z.number()),
}) satisfies z.ZodType<GreenSenseState>;

export const defaultState: GreenSenseState = {
    step: 1,
    surface: null,
    terrainCells: [],
    zones: [],
    exposures: {},
    soils: {},
    selectedPlants: [],
    companionChoices: {},
    plantCounts: {},
};
