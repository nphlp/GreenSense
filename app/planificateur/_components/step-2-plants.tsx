"use client";

import cn from "@lib/cn";
import { PLANTS } from "@lib/plants/data";
import { getHarvestSeasonLabel, getRecommendedPlantCount } from "@lib/plants/helpers";
import type { GreenSenseState } from "@lib/poc-state";
import type { Dispatch, SetStateAction } from "react";
import NavButtons from "./nav-buttons";
import PlantChip from "./plant-chip";

type Step2PlantsProps = {
    state: GreenSenseState;
    setState: Dispatch<SetStateAction<GreenSenseState>>;
};

export default function Step2Plants(props: Step2PlantsProps) {
    const { state, setState } = props;

    const togglePlant = (id: string) => {
        setState((s) => {
            const selected = s.selectedPlants.includes(id)
                ? s.selectedPlants.filter((p) => p !== id)
                : [...s.selectedPlants, id];
            return { ...s, selectedPlants: selected };
        });
    };

    const handleBack = () => setState((s) => ({ ...s, step: 1 }));
    const handleNext = () => setState((s) => ({ ...s, step: 3 }));

    const selectedCount = state.selectedPlants.length;
    const recommendation = state.surface !== null ? getRecommendedPlantCount(state.surface) : null;
    const isInRange =
        recommendation !== null && selectedCount >= recommendation.min && selectedCount <= recommendation.max;

    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <h2 className="text-2xl font-bold">Qu’est-ce que je veux dans mon jardin ?</h2>
                <p className="text-sm text-gray-600">Sélectionnez les fruits et légumes que vous souhaitez planter.</p>
            </div>
            {recommendation && state.surface !== null && (
                <div className="text-xs text-gray-600">
                    Pour {state.surface} m², nous recommandons{" "}
                    <span className="font-medium text-gray-900">
                        {recommendation.min}-{recommendation.max} plantes
                    </span>
                    {" · "}
                    <span
                        className={cn(
                            "font-medium",
                            selectedCount === 0 && "text-gray-400",
                            selectedCount > 0 && isInRange && "text-green-600",
                            selectedCount > 0 && !isInRange && "text-orange-500",
                        )}
                    >
                        Vous avez choisi {selectedCount} plante{selectedCount > 1 ? "s" : ""}
                    </span>
                </div>
            )}
            <div className="flex flex-wrap gap-2">
                {PLANTS.map((plant) => (
                    <PlantChip
                        key={plant.id}
                        name={plant.name}
                        icon={plant.icon}
                        caption={getHarvestSeasonLabel(plant)}
                        checked={state.selectedPlants.includes(plant.id)}
                        onCheckedChange={() => togglePlant(plant.id)}
                    />
                ))}
            </div>
            <NavButtons onBack={handleBack} onNext={handleNext} nextDisabled={state.selectedPlants.length === 0} />
        </div>
    );
}
