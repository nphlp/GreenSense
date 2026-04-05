"use client";

import { Panel, Root, Trigger } from "@atoms/collapsible";
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

const MONTH_LABELS = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sept", "Oct", "Nov", "Déc"];

const LEGEND = [
    { label: "Semis", color: "bg-green-300" },
    { label: "Plantation", color: "bg-green-600" },
    { label: "Floraison", color: "bg-pink-400" },
    { label: "Récolte", color: "bg-orange-500" },
] as const;

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

            {/* Color legend */}
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs">
                {LEGEND.map((item) => (
                    <span key={item.label} className="flex items-center gap-1.5">
                        <span className={`inline-block h-2 w-4 rounded-full ${item.color}`} />
                        <span className="text-gray-700">{item.label}</span>
                    </span>
                ))}
            </div>

            {/* Month header + plant rows */}
            <div className="space-y-2">
                {/* Months row (responsive grid template matches plant rows below) */}
                <div className="grid grid-cols-[32px_1fr] items-center gap-2 px-3 pr-10 md:grid-cols-[140px_1fr] md:gap-3 md:pr-11">
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
                            className="group w-full cursor-pointer rounded-md px-3 py-1.5 text-left hover:bg-gray-50"
                        >
                            <div className="grid grid-cols-[32px_1fr_auto] items-center gap-2 md:grid-cols-[140px_1fr_auto] md:gap-3">
                                <div className="flex items-center gap-2">
                                    <Icon icon={plant.icon} className="size-6 shrink-0" />
                                    <span className="hidden truncate text-sm font-medium md:inline">{plant.name}</span>
                                </div>
                                <PhaseBar phase={plant.phases.harvest} colorClass="bg-orange-500" height="h-2.5" />
                                <ChevronRight className="size-4 text-gray-400 transition-transform group-data-panel-open:rotate-90" />
                            </div>
                        </Trigger>
                        <Panel>
                            <div className="mt-1 space-y-2 rounded-md bg-gray-50 px-3 py-3">
                                {/* Name visible on mobile only (in trigger only on md+) */}
                                <span className="text-sm font-semibold md:hidden">{plant.name}</span>
                                {plant.description && <p className="text-xs text-gray-500">{plant.description}</p>}
                                <div className="grid grid-cols-[32px_1fr] gap-2 md:grid-cols-[140px_1fr] md:gap-3">
                                    <div />
                                    <PlantTimeline plant={plant} />
                                </div>
                            </div>
                        </Panel>
                    </Root>
                ))}
            </div>

            <NavButtons onBack={handleBack} />
        </div>
    );
}
