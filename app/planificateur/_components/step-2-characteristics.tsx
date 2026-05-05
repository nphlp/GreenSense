"use client";

import cn from "@lib/cn";
import type { GreenSenseState } from "@lib/poc-state";
import type { Dispatch, SetStateAction } from "react";
import NavButtons from "./nav-buttons";
import ScrollFadeArea from "./scroll-fade-area";
import Step2Exposures from "./step-2-exposures";
import Step2Soils from "./step-2-soils";
import Step2Zones from "./step-2-zones";

type Step2CharacteristicsProps = {
    state: GreenSenseState;
    setState: Dispatch<SetStateAction<GreenSenseState>>;
};

export default function Step2Characteristics(props: Step2CharacteristicsProps) {
    const { state, setState } = props;

    const hasTerrain = state.terrainCells.length > 0;
    const zonesPainted = new Set(state.zones.flatMap((z) => z.cells));
    const isZonesComplete = hasTerrain && state.terrainCells.every((c) => zonesPainted.has(c));
    const isExposuresComplete = hasTerrain && state.terrainCells.every((c) => state.exposures[c]);
    const isSoilsComplete = hasTerrain && state.terrainCells.every((c) => state.soils[c]);
    const isAllComplete = isZonesComplete && isExposuresComplete && isSoilsComplete;

    const handleBack = () => setState((s) => ({ ...s, step: 1 }));
    const handleNext = () => setState((s) => ({ ...s, step: 3 }));

    return (
        <div className="flex min-h-0 flex-1 flex-col gap-4">
            <ScrollFadeArea>
                <div className="flex flex-col gap-10">
                    <Step2Zones state={state} setState={setState} />
                    <div className="border-t border-gray-200" aria-hidden />
                    <Step2Exposures state={state} setState={setState} />
                    <div className="border-t border-gray-200" aria-hidden />
                    <Step2Soils state={state} setState={setState} />
                </div>
            </ScrollFadeArea>

            <div className="flex flex-col items-center gap-2">
                <button
                    type="button"
                    onClick={handleNext}
                    className={cn(
                        "text-xs text-gray-500 underline-offset-2 hover:text-gray-800 hover:underline",
                        "focus-visible:outline-outline outline-2 outline-transparent",
                    )}
                >
                    Passer cette étape →
                </button>
                <NavButtons onBack={handleBack} onNext={handleNext} nextDisabled={!isAllComplete} />
            </div>
        </div>
    );
}
