"use client";

import Card from "@atoms/card";
import { Icon } from "@iconify/react";
import { getCompanionsFor, getHarvestSeasonLabel, getPlant } from "@lib/plants/helpers";
import type { GreenSenseState } from "@lib/poc-state";
import type { Dispatch, SetStateAction } from "react";
import NavButtons from "./nav-buttons";
import PlantChip from "./plant-chip";

type Step2CompanionsProps = {
    state: GreenSenseState;
    setState: Dispatch<SetStateAction<GreenSenseState>>;
};

export default function Step2Companions(props: Step2CompanionsProps) {
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

    const handleBack = () => setState((s) => ({ ...s, step: 1 }));
    const handleNext = () => setState((s) => ({ ...s, step: 3 }));

    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <h2 className="text-2xl font-bold">Quelles plantes compagnes ?</h2>
                <p className="text-sm text-gray-600">
                    Ces associations protègent vos cultures et optimisent la croissance.
                </p>
            </div>

            <div className="space-y-4">
                {state.selectedPlants.map((plantId) => {
                    const plant = getPlant(plantId);
                    const companions = getCompanionsFor(plantId);
                    if (!plant) return null;

                    return (
                        <Card key={plantId}>
                            <div className="flex items-center gap-3">
                                <Icon icon={plant.icon} className="size-8" />
                                <div>
                                    <h3 className="font-semibold">{plant.name}</h3>
                                    <p className="text-xs text-gray-500">{companions.length} associations possibles</p>
                                </div>
                            </div>
                            {companions.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {companions.map((companion) => (
                                        <PlantChip
                                            key={companion.id}
                                            name={companion.name}
                                            icon={companion.icon}
                                            caption={getHarvestSeasonLabel(companion)}
                                            checked={(state.companionChoices[plantId] ?? []).includes(companion.id)}
                                            onCheckedChange={() => toggleCompanion(plantId, companion.id)}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500">Pas d’association suggérée.</p>
                            )}
                        </Card>
                    );
                })}
            </div>

            <NavButtons onBack={handleBack} onNext={handleNext} />
        </div>
    );
}
