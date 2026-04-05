"use client";

import { Panel, Root, Trigger } from "@atoms/collapsible/atoms";
import { Icon } from "@iconify/react";
import { getPlantsByIds, mergePlantIds } from "@lib/plants/helpers";
import type { GreenSenseState } from "@lib/poc-state";
import { ChevronRight } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import NavButtons from "./nav-buttons";
import PlantTimeline, { PhaseBar } from "./plant-timeline";

type Step3CalendarProps = {
    state: GreenSenseState;
    setState: Dispatch<SetStateAction<GreenSenseState>>;
};

const MONTH_LABELS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
const NAME_COL_WIDTH = "minmax(110px, 140px)";

export default function Step3Calendar(props: Step3CalendarProps) {
    const { state, setState } = props;

    const allCompanionIds = Object.values(state.companionChoices).flat();
    const allPlantIds = mergePlantIds(state.selectedPlants, allCompanionIds);
    const plants = getPlantsByIds(allPlantIds);

    const handleBack = () => setState((s) => ({ ...s, step: 2 }));

    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <h2 className="text-2xl font-bold">Votre calendrier annuel</h2>
                <p className="text-sm text-gray-600">
                    {plants.length} plante{plants.length > 1 ? "s" : ""} à planifier · cliquez sur une ligne pour voir
                    le détail.
                </p>
            </div>

            {/* Month header + rows share the same grid template */}
            <div className="space-y-2">
                {/* Months row */}
                <div className="grid items-center gap-3 pr-8" style={{ gridTemplateColumns: `${NAME_COL_WIDTH} 1fr` }}>
                    <div />
                    <div className="grid grid-cols-12 text-center text-[10px] font-medium text-gray-400">
                        {MONTH_LABELS.map((m, i) => (
                            <div key={i}>{m}</div>
                        ))}
                    </div>
                </div>

                {/* Plant rows */}
                {plants.map((plant) => (
                    <Root key={plant.id}>
                        <Trigger
                            noStyle
                            className="group w-full cursor-pointer rounded-md py-1.5 text-left hover:bg-gray-50"
                        >
                            <div
                                className="grid items-center gap-3 pr-2"
                                style={{ gridTemplateColumns: `${NAME_COL_WIDTH} 1fr auto` }}
                            >
                                <div className="flex items-center gap-2">
                                    <Icon icon={plant.icon} className="size-6 shrink-0" />
                                    <span className="truncate text-sm font-medium">{plant.name}</span>
                                </div>
                                <PhaseBar phase={plant.phases.harvest} colorClass="bg-orange-500" height="h-2.5" />
                                <ChevronRight className="size-4 text-gray-400 transition-transform group-data-[panel-open]:rotate-90" />
                            </div>
                        </Trigger>
                        <Panel>
                            <div
                                className="grid gap-3 py-3 pr-2"
                                style={{ gridTemplateColumns: `${NAME_COL_WIDTH} 1fr` }}
                            >
                                <div className="text-xs text-gray-500">{plant.description}</div>
                                <PlantTimeline plant={plant} />
                            </div>
                        </Panel>
                    </Root>
                ))}
            </div>

            <NavButtons onBack={handleBack} />
        </div>
    );
}
