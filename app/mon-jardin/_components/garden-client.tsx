"use client";

import NavButtons from "@app/planificateur/_components/nav-buttons";
import Button from "@atoms/button";
import { Icon } from "@iconify/react";
import { resetCookieState } from "@lib/cookie-state-client";
import {
    getHarvestSeasonLabel,
    getPlantsByIds,
    getTotalYield,
    getUsedSurface,
    mergePlantIds,
} from "@lib/plants/helpers";
import "@lib/plants/icons-data";
import { type GreenSenseState, POC_COOKIE_NAME, defaultState } from "@lib/poc-state";
import { Ruler, Scale, Sprout } from "lucide-react";
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
            <div className="flex flex-wrap gap-3">
                <div className="min-w-36 flex-1 rounded-md border border-gray-200 px-4 py-3">
                    <div className="flex items-center gap-1.5 text-sm text-gray-500">
                        <Ruler className="size-4" />
                        Surface
                    </div>
                    <div className="text-2xl font-semibold">
                        {formatNumber(Math.round(usedSurface * 10) / 10)}
                        <span className="ml-1 text-sm font-normal text-gray-500">/ {initialState.surface ?? 0} m²</span>
                    </div>
                </div>
                <div className="min-w-36 flex-1 rounded-md border border-gray-200 px-4 py-3">
                    <div className="flex items-center gap-1.5 text-sm text-gray-500">
                        <Sprout className="size-4" />
                        Plants
                    </div>
                    <div className="text-2xl font-semibold">{totalPlants}</div>
                </div>
                <div className="min-w-36 flex-1 rounded-md border border-gray-200 px-4 py-3">
                    <div className="flex items-center gap-1.5 text-sm text-gray-500">
                        <Scale className="size-4" />
                        Récolte estimée
                    </div>
                    <div className="text-2xl font-semibold">
                        {formatNumber(Math.round(totalYield * 10) / 10)}
                        <span className="ml-1 text-sm font-normal text-gray-500">kg/an</span>
                    </div>
                </div>
            </div>

            {/* Plant grid */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                {plants.map((plant) => {
                    const count = counts[plant.id];
                    const plantSurface = plant.spacePerPlant * count;
                    const plantYield = plant.yieldPerPlant * count;
                    return (
                        <div key={plant.id} className="flex flex-col gap-1.5 rounded-lg border border-gray-200 p-3">
                            <div className="flex items-center gap-2">
                                <Icon icon={plant.icon} className="size-7 shrink-0" />
                                <span className="text-base font-semibold">
                                    {plant.name}
                                    <span className="ml-1.5 text-sm font-normal text-gray-500">×{count}</span>
                                </span>
                            </div>
                            <div className="text-xs text-gray-600">
                                {formatNumber(Math.round(plantSurface * 100) / 100)} m² ·{" "}
                                <span className="font-medium text-gray-800">
                                    {formatNumber(Math.round(plantYield * 10) / 10)} kg/an
                                </span>
                            </div>
                            <div className="text-xs text-gray-500">{getHarvestSeasonLabel(plant)}</div>
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
