"use client";

import { Panel, Root, Trigger } from "@atoms/collapsible";
import { Icon } from "@iconify/react";
import cn from "@lib/cn";
import { getPlantsByIds, mergePlantIds } from "@lib/plants/helpers";
import type { GreenSenseState } from "@lib/poc-state";
import { ChevronRight } from "lucide-react";
import { type Dispatch, type SetStateAction, useState } from "react";
import NavButtons from "./nav-buttons";
import { PhaseBar } from "./plant-timeline";

type Step4CalendarProps = {
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

export default function Step4Calendar(props: Step4CalendarProps) {
    const { state, setState } = props;

    const allCompanionIds = Object.values(state.companionChoices).flat();
    const allPlantIds = mergePlantIds(state.selectedPlants, allCompanionIds);
    const plants = getPlantsByIds(allPlantIds);

    const [openPlantId, setOpenPlantId] = useState<string | null>(plants[0]?.id ?? null);

    const handleBack = () => setState((s) => ({ ...s, step: 3 }));
    const handleNext = () => setState((s) => ({ ...s, step: 5 }));

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
                    <Root
                        key={plant.id}
                        open={openPlantId === plant.id}
                        onOpenChange={(open) => setOpenPlantId(open ? plant.id : null)}
                        className={cn(
                            "rounded-md transition-[margin,background-color]",
                            openPlantId === plant.id && "bg-gray-50/70",
                        )}
                    >
                        <Trigger
                            noStyle
                            className="group w-full cursor-pointer rounded-md px-3 py-1.5 text-left hover:bg-gray-50"
                        >
                            <div className="grid grid-cols-[32px_1fr_auto] items-stretch gap-2 md:grid-cols-[140px_1fr_auto] md:gap-3">
                                <div className="flex items-center gap-2">
                                    <Icon icon={plant.icon} className="size-6 shrink-0" />
                                    <span className="hidden truncate text-sm font-medium md:inline">{plant.name}</span>
                                </div>
                                <PhaseBar phase={plant.phases.harvest} colorClass="bg-orange-500" />
                                <ChevronRight className="my-auto size-4 text-gray-400 transition-transform group-data-panel-open:rotate-90" />
                            </div>
                        </Trigger>
                        <Panel>
                            <div className="px-3 pt-1 pb-3">
                                {/* Name visible on mobile only (in trigger only on md+) */}
                                <span className="text-sm font-semibold md:hidden">{plant.name}</span>
                                {plant.description && (
                                    <p className="mt-1 mb-2 text-xs text-gray-500">{plant.description}</p>
                                )}
                                <div className="grid grid-cols-[32px_1fr_16px] items-stretch gap-2 md:grid-cols-[140px_1fr_16px] md:gap-3">
                                    {plant.phases.sowing && (
                                        <>
                                            <div className="flex items-center text-xs text-gray-600">
                                                <span className="hidden md:inline">Semis</span>
                                            </div>
                                            <PhaseBar phase={plant.phases.sowing} colorClass="bg-green-300" />
                                            <div />
                                        </>
                                    )}
                                    {plant.phases.planting && (
                                        <>
                                            <div className="flex items-center text-xs text-gray-600">
                                                <span className="hidden md:inline">Plantation</span>
                                            </div>
                                            <PhaseBar phase={plant.phases.planting} colorClass="bg-green-600" />
                                            <div />
                                        </>
                                    )}
                                    {plant.phases.flowering && (
                                        <>
                                            <div className="flex items-center text-xs text-gray-600">
                                                <span className="hidden md:inline">Floraison</span>
                                            </div>
                                            <PhaseBar phase={plant.phases.flowering} colorClass="bg-pink-400" />
                                            <div />
                                        </>
                                    )}
                                    <div className="flex items-center text-xs text-gray-600">
                                        <span className="hidden md:inline">Récolte</span>
                                    </div>
                                    <PhaseBar phase={plant.phases.harvest} colorClass="bg-orange-500" />
                                    <div />
                                </div>
                            </div>
                        </Panel>
                    </Root>
                ))}
            </div>

            <NavButtons onBack={handleBack} onNext={handleNext} />
        </div>
    );
}
