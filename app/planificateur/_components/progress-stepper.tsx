"use client";

import cn from "@lib/cn";

type Step = 1 | 2 | 3 | 4 | 5;

type ProgressStepperProps = {
    current: Step;
    onStepClick: (step: Step) => void;
};

const STEPS = [
    { n: 1 as Step, label: "Sélection" },
    { n: 2 as Step, label: "Associations" },
    { n: 3 as Step, label: "Calendrier" },
] as const;

export default function ProgressStepper(props: ProgressStepperProps) {
    const { current, onStepClick } = props;

    return (
        <div className="flex flex-wrap items-center gap-1">
            {STEPS.map((step) => {
                const isCurrent = step.n === current;
                const isPast = step.n < current;
                const isDisabled = step.n > current;

                return (
                    <button
                        key={step.n}
                        type="button"
                        onClick={() => onStepClick(step.n)}
                        disabled={isDisabled}
                        className={cn(
                            // Layout
                            "flex items-center gap-2 rounded-full py-1.5 pr-4 pl-1.5",
                            // Interactions
                            "transition-colors",
                            isDisabled ? "cursor-not-allowed" : "cursor-pointer hover:bg-gray-100",
                            // Focus
                            "focus-visible:outline-outline outline-2 outline-transparent",
                        )}
                    >
                        <span
                            className={cn(
                                "flex size-6 items-center justify-center rounded-full text-xs font-semibold",
                                isCurrent && "bg-gray-900 text-gray-50",
                                isPast && "bg-gray-300 text-gray-700",
                                isDisabled && "bg-gray-100 text-gray-400",
                            )}
                        >
                            {step.n}
                        </span>
                        <span
                            className={cn(
                                "text-xs font-medium",
                                isCurrent && "text-gray-900",
                                isPast && "text-gray-600",
                                isDisabled && "text-gray-400",
                            )}
                        >
                            {step.label}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}
