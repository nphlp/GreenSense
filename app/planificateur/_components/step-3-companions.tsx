"use client";

import { Icon } from "@iconify/react";
import cn from "@lib/cn";
import {
    getCompanionReason,
    getCompanionsFor,
    getPlant,
    getRecommendedPlantCount,
    mergePlantIds,
} from "@lib/plants/helpers";
import type { GreenSenseState } from "@lib/poc-state";
import type { Dispatch, SetStateAction } from "react";
import NavButtons from "./nav-buttons";
import PlantChip from "./plant-chip";

type Step3CompanionsProps = {
    state: GreenSenseState;
    setState: Dispatch<SetStateAction<GreenSenseState>>;
};

export default function Step3Companions(props: Step3CompanionsProps) {
    const { state, setState } = props;

    const toggleCompanion = (plantId: string, companionId: string) => {
        setState((s) => {
            const current = s.companionChoices[plantId] ?? [];
            const next = current.includes(companionId)
                ? current.filter((id) => id !== companionId)
                : [...current, companionId];
            return {
                ...s,
                companionChoices: { ...s.companionChoices, [plantId]: next },
            };
        });
    };

    const handleBack = () => setState((s) => ({ ...s, step: 2 }));
    const handleNext = () => setState((s) => ({ ...s, step: 4 }));

    const allCompanionIds = Object.values(state.companionChoices).flat();
    const totalCount = mergePlantIds(state.selectedPlants, allCompanionIds).length;
    const recommendation = state.surface !== null ? getRecommendedPlantCount(state.surface) : null;
    const isInRange = recommendation !== null && totalCount >= recommendation.min && totalCount <= recommendation.max;

    return (
        <div className="flex min-h-0 flex-1 flex-col gap-6">
            <div className="flex-1 space-y-6 overflow-y-auto">
                <div className="space-y-1">
                    <h2 className="text-2xl font-bold">Quelles plantes compagnes ?</h2>
                    <p className="text-sm text-gray-600">
                        Ces associations protègent vos cultures et optimisent la croissance.
                    </p>
                </div>
                {recommendation && state.surface !== null && (
                    <div className="text-xs text-gray-600">
                        Pour {state.surface} m², nous recommandons{" "}
                        <span className="font-medium text-gray-900">
                            {recommendation.min}-{recommendation.max} plantes
                        </span>
                        {" · "}
                        <span className={cn("font-medium", isInRange ? "text-green-600" : "text-orange-500")}>
                            {totalCount} plante{totalCount > 1 ? "s" : ""} au total
                        </span>
                    </div>
                )}

                <div className="space-y-8">
                    {state.selectedPlants.map((plantId) => {
                        const plant = getPlant(plantId);
                        const companions = getCompanionsFor(plantId);
                        if (!plant) return null;

                        return (
                            <section key={plantId} className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <Icon icon={plant.icon} className="size-8" />
                                    <div>
                                        <h3 className="font-semibold">{plant.name}</h3>
                                        <p className="text-xs text-gray-500">
                                            {companions.length} associations possibles
                                        </p>
                                    </div>
                                </div>
                                {companions.length > 0 ? (
                                    <div className="flex flex-wrap gap-2">
                                        {companions.map((companion) => (
                                            <PlantChip
                                                key={companion.id}
                                                name={companion.name}
                                                icon={companion.icon}
                                                caption={getCompanionReason(plantId, companion.id)}
                                                checked={(state.companionChoices[plantId] ?? []).includes(companion.id)}
                                                onCheckedChange={() => toggleCompanion(plantId, companion.id)}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500">Pas d’association suggérée.</p>
                                )}
                            </section>
                        );
                    })}
                </div>
            </div>

            <NavButtons onBack={handleBack} onNext={handleNext} />
        </div>
    );
}
