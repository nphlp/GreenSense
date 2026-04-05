import cn from "@lib/cn";

type ProgressStepperProps = {
    current: 1 | 2 | 3;
};

const STEPS = [
    { n: 1, label: "Sélection" },
    { n: 2, label: "Associations" },
    { n: 3, label: "Calendrier" },
] as const;

export default function ProgressStepper(props: ProgressStepperProps) {
    const { current } = props;

    return (
        <div className="flex items-center gap-2">
            {STEPS.map((step, i) => (
                <div key={step.n} className="flex items-center gap-2">
                    <div
                        className={cn(
                            "flex size-6 items-center justify-center rounded-full text-xs font-semibold",
                            step.n === current && "bg-gray-900 text-gray-50",
                            step.n < current && "bg-gray-300 text-gray-700",
                            step.n > current && "bg-gray-100 text-gray-400",
                        )}
                    >
                        {step.n}
                    </div>
                    <span className={cn("text-xs font-medium", step.n === current ? "text-gray-900" : "text-gray-400")}>
                        {step.label}
                    </span>
                    {i < STEPS.length - 1 && <div className="h-px w-4 bg-gray-300" />}
                </div>
            ))}
        </div>
    );
}
