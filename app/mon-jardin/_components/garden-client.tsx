"use client";

import NavButtons from "@app/planificateur/_components/nav-buttons";
import Button from "@atoms/button";
import { Icon } from "@iconify/react";
import { resetCookieState } from "@lib/cookie-state-client";
import { getPlantsByIds, getTotalYield, getUsedSurface, mergePlantIds } from "@lib/plants/helpers";
import "@lib/plants/icons-data";
import { type GreenSenseState, POC_COOKIE_NAME, defaultState } from "@lib/poc-state";
import Link from "next/link";
import { useRouter } from "next/navigation";

type GardenClientProps = {
    initialState: GreenSenseState | undefined;
};

function formatNumber(n: number): string {
    return n % 1 === 0 ? String(n) : n.toFixed(1);
}

export default function GardenClient(props: GardenClientProps) {
    const { initialState } = props;
    const router = useRouter();

    // Empty state: no data in cookie or no plants
    if (!initialState || initialState.selectedPlants.length === 0) {
        return (
            <div className="mx-auto max-w-md space-y-4 text-center">
                <h1 className="text-3xl font-bold">Mon jardin</h1>
                <p className="text-sm text-gray-600">Vous n’avez pas encore planifié votre jardin.</p>
                <Link href="/planificateur">
                    <Button label="Commencer la planification" colors="primary" />
                </Link>
            </div>
        );
    }

    const allCompanionIds = Object.values(initialState.companionChoices).flat();
    const allPlantIds = mergePlantIds(initialState.selectedPlants, allCompanionIds);
    const plants = getPlantsByIds(allPlantIds);

    const counts: Record<string, number> = {};
    plants.forEach((p) => {
        counts[p.id] = initialState.plantCounts[p.id] ?? 1;
    });

    const totalPlants = Object.values(counts).reduce((a, b) => a + b, 0);
    const usedSurface = getUsedSurface(counts);
    const totalYield = getTotalYield(counts);

    const handleRestart = () => {
        resetCookieState(POC_COOKIE_NAME, defaultState);
        router.push("/planificateur");
    };

    return (
        <div className="w-full space-y-6">
            <div className="space-y-1">
                <h1 className="text-3xl font-bold">Mon jardin</h1>
                <p className="text-sm text-gray-600">Récapitulatif de votre planification annuelle.</p>
            </div>

            {/* Summary stats */}
            <div className="grid grid-cols-3 gap-3">
                <div className="rounded-md border border-gray-200 px-3 py-2">
                    <div className="text-[11px] text-gray-500">Surface</div>
                    <div className="text-lg font-semibold">
                        {formatNumber(Math.round(usedSurface * 10) / 10)}
                        <span className="ml-1 text-xs font-normal text-gray-500">/ {initialState.surface ?? 0} m²</span>
                    </div>
                </div>
                <div className="rounded-md border border-gray-200 px-3 py-2">
                    <div className="text-[11px] text-gray-500">Plants</div>
                    <div className="text-lg font-semibold">{totalPlants}</div>
                </div>
                <div className="rounded-md border border-gray-200 px-3 py-2">
                    <div className="text-[11px] text-gray-500">Récolte estimée</div>
                    <div className="text-lg font-semibold">
                        {formatNumber(Math.round(totalYield * 10) / 10)}
                        <span className="ml-1 text-xs font-normal text-gray-500">kg/an</span>
                    </div>
                </div>
            </div>

            {/* Plant list */}
            <div className="space-y-2">
                {plants.map((plant) => {
                    const count = counts[plant.id];
                    const plantSurface = plant.spacePerPlant * count;
                    const plantYield = plant.yieldPerPlant * count;
                    return (
                        <div
                            key={plant.id}
                            className="flex items-center gap-3 rounded-md border border-gray-200 px-3 py-2"
                        >
                            <Icon icon={plant.icon} className="size-8 shrink-0" />
                            <div className="min-w-0 flex-1">
                                <div className="text-sm font-medium">
                                    {plant.name}
                                    <span className="ml-2 text-xs font-normal text-gray-500">×{count}</span>
                                </div>
                                <div className="text-[11px] text-gray-500">
                                    {formatNumber(Math.round(plantSurface * 100) / 100)} m² ·{" "}
                                    <span className="font-medium text-gray-700">
                                        {formatNumber(Math.round(plantYield * 10) / 10)} kg/an
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <NavButtons
                onBack={() => router.push("/planificateur")}
                backLabel="Modifier ma sélection"
                onNext={handleRestart}
                nextLabel="Recommencer"
            />
        </div>
    );
}
