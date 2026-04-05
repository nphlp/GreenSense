"use client";

import { Icon } from "@iconify/react";
import cn from "@lib/cn";
import { getPlantsByIds, getUsedSurface, mergePlantIds } from "@lib/plants/helpers";
import type { GreenSenseState } from "@lib/poc-state";
import { Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Dispatch, SetStateAction } from "react";
import NavButtons from "./nav-buttons";
import ScrollFadeArea from "./scroll-fade-area";

type Step5CountsProps = {
    state: GreenSenseState;
    setState: Dispatch<SetStateAction<GreenSenseState>>;
};

function formatNumber(n: number): string {
    return n % 1 === 0 ? String(n) : n.toFixed(2).replace(/\.?0+$/, "");
}

export default function Step5Counts(props: Step5CountsProps) {
    const { state, setState } = props;
    const router = useRouter();

    const allCompanionIds = Object.values(state.companionChoices).flat();
    const allPlantIds = mergePlantIds(state.selectedPlants, allCompanionIds);
    const plants = getPlantsByIds(allPlantIds);

    const getCount = (plantId: string): number => state.plantCounts[plantId] ?? 1;

    const updateCount = (plantId: string, delta: number) => {
        setState((s) => {
            const current = s.plantCounts[plantId] ?? 1;
            const next = Math.max(0, current + delta);
            return { ...s, plantCounts: { ...s.plantCounts, [plantId]: next } };
        });
    };

    const effectiveCounts: Record<string, number> = {};
    plants.forEach((p) => {
        effectiveCounts[p.id] = getCount(p.id);
    });

    const usedSurface = getUsedSurface(effectiveCounts);
    const totalSurface = state.surface ?? 0;
    const percent = totalSurface > 0 ? (usedSurface / totalSurface) * 100 : 0;
    const capped = Math.min(100, percent);

    const barColor = percent <= 80 ? "bg-green-500" : percent <= 100 ? "bg-orange-500" : "bg-red-500";

    const handleBack = () => setState((s) => ({ ...s, step: 4 }));
    const handleFinish = () => router.push("/mon-jardin");

    return (
        <div className="flex min-h-0 flex-1 flex-col gap-6">
            <ScrollFadeArea>
                <div className="space-y-1">
                    <h2 className="text-2xl font-bold">Combien de plants ?</h2>
                    <p className="text-sm text-gray-600">Ajustez le nombre de plants selon la surface disponible.</p>
                </div>

                {/* Surface progress bar (opaque wrapper hides rounded corners, shadow for elevation) */}
                <div className="bg-background sticky -top-4 z-10 pt-4 pb-2">
                    <div className="bg-background">
                        <div className="bg-background space-y-1.5 rounded-xl border border-gray-200 px-3 py-2.5 shadow-md">
                            <div className="flex items-baseline justify-between gap-3 text-xs">
                                <span className="flex items-baseline gap-2">
                                    <span className="text-gray-500">Surface</span>
                                    <span className="font-medium">
                                        {formatNumber(Math.round(usedSurface * 10) / 10)} m² / {totalSurface} m²
                                    </span>
                                </span>
                                <span
                                    className={cn(
                                        "font-medium",
                                        percent <= 80 && "text-green-600",
                                        percent > 80 && percent <= 100 && "text-orange-500",
                                        percent > 100 && "text-red-600",
                                    )}
                                >
                                    {percent > 100 ? "Surface dépassée" : `${Math.round(percent)}% utilisé`}
                                </span>
                            </div>
                            <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                                <div
                                    className={cn("h-full transition-all", barColor)}
                                    style={{ width: `${capped}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Plant count controls */}
                <div className="space-y-2">
                    {plants.map((plant) => {
                        const count = getCount(plant.id);
                        const plantSurface = plant.spacePerPlant * count;
                        const plantYield = plant.yieldPerPlant * count;
                        return (
                            <div
                                key={plant.id}
                                className="flex items-center gap-3 rounded-md border border-gray-200 px-3 py-2"
                            >
                                <Icon icon={plant.icon} className="size-8 shrink-0" />
                                <div className="min-w-0 flex-1">
                                    <div className="text-sm font-medium">{plant.name}</div>
                                    <div className="text-[11px] text-gray-500">
                                        {formatNumber(Math.round(plantSurface * 100) / 100)} m² ·{" "}
                                        {formatNumber(Math.round(plantYield * 10) / 10)} kg/an
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => updateCount(plant.id, -1)}
                                        disabled={count === 0}
                                        className={cn(
                                            "flex size-8 items-center justify-center rounded-full border border-gray-200 transition-colors",
                                            "focus-visible:outline-outline outline-2 outline-transparent",
                                            count === 0
                                                ? "cursor-not-allowed text-gray-300"
                                                : "cursor-pointer text-gray-700 hover:bg-gray-50 active:bg-gray-100",
                                        )}
                                        aria-label={`Retirer un plant de ${plant.name}`}
                                    >
                                        <Minus className="size-4" />
                                    </button>
                                    <span className="w-6 text-center text-sm font-semibold tabular-nums">{count}</span>
                                    <button
                                        type="button"
                                        onClick={() => updateCount(plant.id, 1)}
                                        className={cn(
                                            "flex size-8 cursor-pointer items-center justify-center rounded-full border border-gray-200 text-gray-700 transition-colors hover:bg-gray-50 active:bg-gray-100",
                                            "focus-visible:outline-outline outline-2 outline-transparent",
                                        )}
                                        aria-label={`Ajouter un plant de ${plant.name}`}
                                    >
                                        <Plus className="size-4" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </ScrollFadeArea>

            <NavButtons onBack={handleBack} onNext={handleFinish} nextLabel="Finir" />
        </div>
    );
}
