"use client";

import Card from "@atoms/card";
import { Icon } from "@iconify/react";
import { getPlantsByIds, mergePlantIds } from "@lib/plants/helpers";
import type { GreenSenseState } from "@lib/poc-state";
import type { Dispatch, SetStateAction } from "react";
import NavButtons from "./nav-buttons";
import PlantTimeline from "./plant-timeline";

type Step3CalendarProps = {
    state: GreenSenseState;
    setState: Dispatch<SetStateAction<GreenSenseState>>;
};

const LEGEND = [
    { label: "Semis", color: "bg-green-300" },
    { label: "Plantation", color: "bg-green-600" },
    { label: "Floraison", color: "bg-pink-400" },
    { label: "Récolte", color: "bg-orange-500" },
] as const;

export default function Step3Calendar(props: Step3CalendarProps) {
    const { state, setState } = props;

    // Merge selected plants + all companion choices (deduped)
    const allCompanionIds = Object.values(state.companionChoices).flat();
    const allPlantIds = mergePlantIds(state.selectedPlants, allCompanionIds);
    const plants = getPlantsByIds(allPlantIds);

    const handleBack = () => setState((s) => ({ ...s, step: 2 }));

    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <h2 className="text-2xl font-bold">Votre calendrier annuel</h2>
                <p className="text-sm text-gray-600">
                    {plants.length} plante{plants.length > 1 ? "s" : ""} à planifier cette année.
                </p>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
                {LEGEND.map((item) => (
                    <span key={item.label} className="flex items-center gap-1.5">
                        <span className={`inline-block size-3 rounded-sm ${item.color}`} />
                        {item.label}
                    </span>
                ))}
            </div>

            {/* Plant cards */}
            <div className="space-y-3">
                {plants.map((plant) => (
                    <Card key={plant.id}>
                        <div className="flex items-start gap-3">
                            <Icon icon={plant.icon} className="size-8 shrink-0" />
                            <div className="min-w-0 flex-1">
                                <h3 className="font-semibold">{plant.name}</h3>
                                {plant.description && <p className="text-xs text-gray-500">{plant.description}</p>}
                            </div>
                        </div>
                        <PlantTimeline plant={plant} />
                    </Card>
                ))}
            </div>

            <NavButtons onBack={handleBack} />
        </div>
    );
}
