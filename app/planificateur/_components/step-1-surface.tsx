"use client";

import { Indicator, Root } from "@atoms/checkbox";
import cn from "@lib/cn";
import type { GreenSenseState } from "@lib/poc-state";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import NavButtons from "./nav-buttons";
import ScrollFadeArea from "./scroll-fade-area";

type Step1SurfaceProps = {
    state: GreenSenseState;
    setState: Dispatch<SetStateAction<GreenSenseState>>;
};

const PRESETS = [10, 15, 20, 30, 40, 50, 70, 100, 200] as const;

export default function Step1Surface(props: Step1SurfaceProps) {
    const { state, setState } = props;
    const router = useRouter();

    const selectSurface = (value: number) => {
        setState((s) => ({ ...s, surface: value }));
    };

    const handleManualChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.valueAsNumber;
        setState((s) => ({ ...s, surface: Number.isNaN(value) || value <= 0 ? null : value }));
    };

    const handleBack = () => router.push("/");
    const handleNext = () => setState((s) => ({ ...s, step: 2 }));

    const isPreset = state.surface !== null && (PRESETS as readonly number[]).includes(state.surface);
    const manualValue = state.surface !== null && !isPreset ? state.surface : "";

    return (
        <div className="flex min-h-0 flex-1 flex-col gap-6">
            <ScrollFadeArea>
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold">Bienvenue dans le planificateur</h2>
                    <p className="text-sm text-gray-600">
                        Vous allez définir votre terrain, choisir vos fruits et légumes, les associer, visualiser votre
                        calendrier annuel et ajuster les quantités.
                    </p>
                </div>
                <div className="flex flex-wrap gap-3 text-3xl">
                    {["🍅", "🥕", "🍓", "🧄", "🌿", "🍎", "🥒", "🧅"].map((emoji) => (
                        <span key={emoji} aria-hidden>
                            {emoji}
                        </span>
                    ))}
                </div>
                <div className="space-y-1">
                    <h3 className="text-lg font-semibold">Pour commencer, quelle est la surface de votre terrain ?</h3>
                    <p className="text-sm text-gray-600">
                        Choisissez une surface indicative parmi les propositions ou saisissez la vôtre.
                    </p>
                </div>

                <div className="flex flex-wrap gap-2">
                    {PRESETS.map((value) => {
                        const selected = state.surface === value;
                        return (
                            <label
                                key={value}
                                className={cn(
                                    "flex cursor-pointer items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                                    "has-focus-visible:outline-outline outline-2 outline-transparent",
                                    selected
                                        ? "border-gray-400 bg-gray-50/70"
                                        : "border-gray-200 hover:border-gray-300 active:border-gray-400",
                                )}
                            >
                                <Root
                                    checked={selected}
                                    onCheckedChange={() => selectSurface(value)}
                                    className={cn(
                                        "size-4 rounded-sm",
                                        "data-unchecked:border data-unchecked:border-gray-300",
                                        "data-checked:bg-gray-900",
                                        "outline-none",
                                    )}
                                >
                                    <Indicator className="text-gray-50">
                                        <Check className="size-2.5" />
                                    </Indicator>
                                </Root>
                                <span>{value} m²</span>
                            </label>
                        );
                    })}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <label className="text-sm text-gray-600" htmlFor="surface-manual">
                        Ou entrez une valeur personnalisée :
                    </label>
                    <div className="flex items-center gap-2">
                        <input
                            id="surface-manual"
                            type="number"
                            min={1}
                            step={1}
                            placeholder="ex: 35"
                            value={manualValue}
                            onChange={handleManualChange}
                            className={cn(
                                "w-24 rounded-md border border-gray-200 px-3 py-1.5 text-sm",
                                "focus-visible:outline-outline outline-2 outline-transparent",
                                !isPreset && state.surface !== null && "border-gray-400 bg-gray-50/70",
                            )}
                        />
                        <span className="text-sm text-gray-600">m²</span>
                    </div>
                </div>
            </ScrollFadeArea>

            <NavButtons onBack={handleBack} onNext={handleNext} nextDisabled={state.surface === null} />
        </div>
    );
}
