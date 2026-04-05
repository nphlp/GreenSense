import { z } from "zod";

/**
 * Cookie name for the POC state.
 * Clicking the "GreenSense" logo in the header calls removeCookieState(POC_COOKIE_NAME).
 */
export const POC_COOKIE_NAME = "greensense-poc";

export type GreenSenseState = {
    step: 1 | 2 | 3;
    selectedPlants: string[];
    companionChoices: Record<string, string[]>;
};

export const greenSenseStateSchema = z.object({
    step: z.union([z.literal(1), z.literal(2), z.literal(3)]),
    selectedPlants: z.array(z.string()),
    companionChoices: z.record(z.string(), z.array(z.string())),
}) satisfies z.ZodType<GreenSenseState>;

export const defaultState: GreenSenseState = {
    step: 1,
    selectedPlants: [],
    companionChoices: {},
};
