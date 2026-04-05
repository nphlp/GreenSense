import cn from "@lib/cn";
import type { Phase, Plant } from "@lib/plants/types";

const MONTH_LABELS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
const MONTH_NAMES = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
];

/**
 * Returns the list of active months (1-12) for a phase.
 * Handles year-wrapping phases (e.g. ail planting from October to March).
 */
function getActiveMonths(phase: Phase): number[] {
    const months: number[] = [];
    if (phase.start <= phase.end) {
        for (let m = phase.start; m <= phase.end; m++) months.push(m);
    } else {
        for (let m = phase.start; m <= 12; m++) months.push(m);
        for (let m = 1; m <= phase.end; m++) months.push(m);
    }
    return months;
}

function formatPhase(phase: Phase): string {
    if (phase.start === phase.end) return MONTH_NAMES[phase.start - 1];
    return `${MONTH_NAMES[phase.start - 1]}–${MONTH_NAMES[phase.end - 1]}`;
}

type PhaseBarProps = {
    phase: Phase | undefined;
    color: string;
};

function PhaseBar(props: PhaseBarProps) {
    const { phase, color } = props;
    const activeMonths = phase ? getActiveMonths(phase) : [];

    return (
        <div className="grid grid-cols-12 gap-px">
            {Array.from({ length: 12 }, (_, i) => (
                <div key={i} className={cn("h-2 rounded-sm", activeMonths.includes(i + 1) ? color : "bg-gray-100")} />
            ))}
        </div>
    );
}

type PlantTimelineProps = {
    plant: Plant;
};

export default function PlantTimeline(props: PlantTimelineProps) {
    const { plant } = props;
    const { phases } = plant;

    return (
        <div className="space-y-2">
            {/* Month labels */}
            <div className="grid grid-cols-12 gap-px">
                {MONTH_LABELS.map((m, i) => (
                    <div key={i} className="text-center text-[10px] font-medium text-gray-400">
                        {m}
                    </div>
                ))}
            </div>

            {/* Stacked phase bars */}
            <div className="space-y-1">
                {phases.sowing && <PhaseBar phase={phases.sowing} color="bg-green-300" />}
                {phases.planting && <PhaseBar phase={phases.planting} color="bg-green-600" />}
                {phases.flowering && <PhaseBar phase={phases.flowering} color="bg-pink-400" />}
                <PhaseBar phase={phases.harvest} color="bg-orange-500" />
            </div>

            {/* Legend text */}
            <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-gray-600">
                {phases.sowing && (
                    <span>
                        <span className="font-medium">Semis</span> {formatPhase(phases.sowing)}
                    </span>
                )}
                {phases.planting && (
                    <span>
                        <span className="font-medium">Plantation</span> {formatPhase(phases.planting)}
                    </span>
                )}
                {phases.flowering && (
                    <span>
                        <span className="font-medium">Floraison</span> {formatPhase(phases.flowering)}
                    </span>
                )}
                <span>
                    <span className="font-medium">Récolte</span> {formatPhase(phases.harvest)}
                </span>
            </div>
        </div>
    );
}
