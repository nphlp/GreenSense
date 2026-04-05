"use client";

import { PLANTS } from "@lib/plants/data";
import { getHarvestSeasonLabel } from "@lib/plants/helpers";
import type { GreenSenseState } from "@lib/poc-state";
import type { Dispatch, SetStateAction } from "react";
import NavButtons from "./nav-buttons";
import PlantChip from "./plant-chip";

type Step1PlantsProps = {
    state: GreenSenseState;
    setState: Dispatch<SetStateAction<GreenSenseState>>;
};

export default function Step1Plants(props: Step1PlantsProps) {
    const { state, setState } = props;

    const togglePlant = (id: string) => {
        setState((s) => {
            const selected = s.selectedPlants.includes(id)
                ? s.selectedPlants.filter((p) => p !== id)
                : [...s.selectedPlants, id];
            return { ...s, selectedPlants: selected };
        });
    };

    const handleNext = () => setState((s) => ({ ...s, step: 2 }));

    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <h2 className="text-2xl font-bold">Qu’est-ce que je veux dans mon jardin ?</h2>
                <p className="text-sm text-gray-600">Sélectionnez les fruits et légumes que vous souhaitez planter.</p>
            </div>
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
            <NavButtons onNext={handleNext} nextDisabled={state.selectedPlants.length === 0} />
        </div>
    );
}
