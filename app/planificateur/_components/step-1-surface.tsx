"use client";

import cn from "@lib/cn";
import type { GreenSenseState } from "@lib/poc-state";
import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import NavButtons from "./nav-buttons";

type Step1SurfaceProps = {
    state: GreenSenseState;
    setState: Dispatch<SetStateAction<GreenSenseState>>;
};

const PRESETS = [20, 50, 70, 100, 200] as const;

export default function Step1Surface(props: Step1SurfaceProps) {
    const { state, setState } = props;

    const selectSurface = (value: number) => {
        setState((s) => ({ ...s, surface: value }));
    };

    const handleManualChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.valueAsNumber;
        setState((s) => ({ ...s, surface: Number.isNaN(value) || value <= 0 ? null : value }));
    };

    const handleNext = () => setState((s) => ({ ...s, step: 2 }));

    const isPreset = state.surface !== null && (PRESETS as readonly number[]).includes(state.surface);
    const manualValue = state.surface !== null && !isPreset ? state.surface : "";

    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <h2 className="text-2xl font-bold">Quelle est la surface de votre terrain ?</h2>
                <p className="text-sm text-gray-600">
                    Choisissez une surface indicative parmi les propositions ou saisissez la vôtre.
                </p>
            </div>

            <div className="flex flex-wrap gap-2">
                {PRESETS.map((value) => {
                    const selected = state.surface === value;
                    return (
                        <button
                            key={value}
                            type="button"
                            onClick={() => selectSurface(value)}
                            className={cn(
                                "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                                "focus-visible:outline-outline outline-2 outline-transparent",
                                selected
                                    ? "border-gray-400 bg-gray-50/70"
                                    : "cursor-pointer border-gray-200 hover:border-gray-300 active:border-gray-400",
                            )}
                        >
                            {value} m²
                        </button>
                    );
                })}
            </div>

            <div className="space-y-1.5">
                <label className="text-sm text-gray-600" htmlFor="surface-manual">
                    Ou entrez une valeur personnalisée
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
                            "w-32 rounded-md border border-gray-200 px-3 py-1.5 text-sm",
                            "focus-visible:outline-outline outline-2 outline-transparent",
                            !isPreset && state.surface !== null && "border-gray-400 bg-gray-50/70",
                        )}
                    />
                    <span className="text-sm text-gray-600">m²</span>
                </div>
            </div>

            <NavButtons onNext={handleNext} nextDisabled={state.surface === null} />
        </div>
    );
}
