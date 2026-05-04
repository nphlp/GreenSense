"use client";

import { Indicator, Root } from "@atoms/checkbox";
import cn from "@lib/cn";
import type { GreenSenseState } from "@lib/poc-state";
import { Check } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import {
    type ChangeEvent,
    type Dispatch,
    type PointerEvent as ReactPointerEvent,
    type SetStateAction,
    useEffect,
    useRef,
} from "react";
import NavButtons from "./nav-buttons";
import ScrollFadeArea from "./scroll-fade-area";

type Step1SurfaceProps = {
    state: GreenSenseState;
    setState: Dispatch<SetStateAction<GreenSenseState>>;
};

const PRESETS = [10, 15, 20, 30, 40, 50, 70, 100, 200] as const;

const GRID_COLS = 20;
const GRID_ROWS = 20;
const cellKey = (x: number, y: number) => `${x},${y}`;

// Lucide Pencil icon as data URL cursor; white fill + black stroke stays visible on both empty and filled cells.
// Hotspot (2, 22) aligns with the pencil tip at the bottom-left of the 24x24 viewBox.
const PENCIL_CURSOR =
    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='white' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z'/><path d='m15 5 4 4'/></svg>\") 2 22, crosshair";

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

    const selectedCells = new Set(state.terrainCells);
    const paintModeRef = useRef<"add" | "remove" | null>(null);

    const applyCell = (x: number, y: number, mode: "add" | "remove") => {
        const key = cellKey(x, y);
        setState((s) => {
            const has = s.terrainCells.includes(key);
            if (mode === "add" && has) return s;
            if (mode === "remove" && !has) return s;
            const next = new Set(s.terrainCells);
            if (mode === "add") next.add(key);
            else next.delete(key);
            return { ...s, terrainCells: Array.from(next) };
        });
    };

    const handleCellPointerDown = (e: ReactPointerEvent<HTMLButtonElement>, x: number, y: number) => {
        e.preventDefault();
        const mode: "add" | "remove" = selectedCells.has(cellKey(x, y)) ? "remove" : "add";
        paintModeRef.current = mode;
        applyCell(x, y, mode);
    };

    const handleGridPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
        if (!paintModeRef.current) return;
        const el = document.elementFromPoint(e.clientX, e.clientY);
        if (!(el instanceof HTMLElement)) return;
        const cell = el.closest<HTMLElement>("[data-cell]");
        if (!cell?.dataset.cell) return;
        const [xStr, yStr] = cell.dataset.cell.split(",");
        const x = Number(xStr);
        const y = Number(yStr);
        if (Number.isNaN(x) || Number.isNaN(y)) return;
        applyCell(x, y, paintModeRef.current);
    };

    useEffect(() => {
        const stop = () => {
            paintModeRef.current = null;
        };
        window.addEventListener("pointerup", stop);
        window.addEventListener("pointercancel", stop);
        return () => {
            window.removeEventListener("pointerup", stop);
            window.removeEventListener("pointercancel", stop);
        };
    }, []);

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
                            <motion.label
                                key={value}
                                whileTap={{ scale: 0.96 }}
                                transition={{ duration: 0.08 }}
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
                            </motion.label>
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

                <div className="space-y-1 pt-2">
                    <h3 className="text-lg font-semibold">Dessinez la forme de votre terrain</h3>
                    <p className="text-sm text-gray-600">
                        Cliquez sur les cases pour matérialiser votre terrain. La taille de chaque case sera déduite de
                        la surface choisie.
                    </p>
                </div>

                <div className="-mx-4 overflow-x-auto px-4">
                    <div
                        className="grid w-fit gap-0.5 rounded-md bg-gray-100 p-1"
                        style={{
                            gridTemplateColumns: `repeat(${GRID_COLS}, minmax(0, 1fr))`,
                            cursor: PENCIL_CURSOR,
                        }}
                        role="grid"
                        aria-label="Grille de sélection du terrain"
                        onPointerMove={handleGridPointerMove}
                    >
                        {Array.from({ length: GRID_ROWS }).map((_, y) =>
                            Array.from({ length: GRID_COLS }).map((_, x) => {
                                const key = cellKey(x, y);
                                const selected = selectedCells.has(key);
                                return (
                                    <button
                                        key={key}
                                        type="button"
                                        data-cell={key}
                                        onPointerDown={(e) => handleCellPointerDown(e, x, y)}
                                        aria-pressed={selected}
                                        aria-label={`Case colonne ${x + 1}, ligne ${y + 1}`}
                                        style={{ touchAction: "none", cursor: "inherit" }}
                                        className={cn(
                                            "size-7 rounded-sm transition-colors",
                                            "focus-visible:outline-outline outline-2 outline-transparent",
                                            selected
                                                ? "bg-gray-900 hover:bg-gray-800"
                                                : "bg-white hover:bg-gray-200 active:bg-gray-300",
                                        )}
                                    />
                                );
                            }),
                        )}
                    </div>
                </div>

                <p className="text-xs text-gray-500">
                    {selectedCells.size} case{selectedCells.size > 1 ? "s" : ""} sélectionnée
                    {selectedCells.size > 1 ? "s" : ""}
                </p>
            </ScrollFadeArea>

            <NavButtons onBack={handleBack} onNext={handleNext} nextDisabled={state.surface === null} />
        </div>
    );
}
