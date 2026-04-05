import cn from "@lib/cn";
import type { Phase, Plant } from "@lib/plants/types";

/**
 * Continuous bar spanning months start..end on a 12-column grid.
 * Handles year-wrapping phases (e.g. ail planting from October to March).
 */
export function PhaseBar(props: { phase: Phase; colorClass: string; height?: string }) {
    const { phase, colorClass, height = "h-2" } = props;
    const segments: Array<[number, number]> = [];
    if (phase.start <= phase.end) {
        segments.push([phase.start, phase.end]);
    } else {
        segments.push([phase.start, 12]);
        segments.push([1, phase.end]);
    }

    return (
        <div className="relative grid grid-cols-12">
            {/* Background grid */}
            {Array.from({ length: 12 }, (_, i) => (
                <div key={i} className="border-l border-gray-100 first:border-l-0" />
            ))}
            {/* Colored segments */}
            {segments.map(([start, end], i) => (
                <div
                    key={i}
                    style={{ gridColumn: `${start} / ${end + 1}`, gridRow: 1 }}
                    className={cn("my-auto rounded-full", colorClass, height)}
                />
            ))}
        </div>
    );
}

/**
 * Detailed view: all 4 phases as separate continuous bars.
 */
export default function PlantTimeline(props: { plant: Plant }) {
    const { plant } = props;
    const { phases } = plant;

    return (
        <div className="space-y-1.5">
            {phases.sowing && <PhaseBar phase={phases.sowing} colorClass="bg-green-300" />}
            {phases.planting && <PhaseBar phase={phases.planting} colorClass="bg-green-600" />}
            {phases.flowering && <PhaseBar phase={phases.flowering} colorClass="bg-pink-400" />}
            <PhaseBar phase={phases.harvest} colorClass="bg-orange-500" />
        </div>
    );
}
