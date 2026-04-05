import cn from "@lib/cn";
import type { Phase, Plant } from "@lib/plants/types";

/**
 * Returns the grid segments (column ranges) for a phase, handling year-wrapping.
 */
function getSegments(phase: Phase): Array<[number, number]> {
    if (phase.start <= phase.end) return [[phase.start, phase.end]];
    return [
        [phase.start, 12],
        [1, phase.end],
    ];
}

/**
 * Continuous bar on a 12-column grid.
 * Vertical separators span the full height of the parent (min-h-full).
 */
export function PhaseBar(props: { phase: Phase; colorClass: string }) {
    const { phase, colorClass } = props;
    const segments = getSegments(phase);

    return (
        <div className="grid h-full grid-cols-12">
            {/* Vertical separators (full height) */}
            {Array.from({ length: 12 }, (_, i) => (
                <div
                    key={`sep-${i}`}
                    className="border-l border-gray-200 first:border-l-0"
                    style={{ gridColumn: `${i + 1} / ${i + 2}`, gridRow: 1 }}
                />
            ))}
            {/* Colored segments (centered vertically) */}
            {segments.map(([start, end], i) => (
                <div
                    key={`seg-${i}`}
                    style={{ gridColumn: `${start} / ${end + 1}`, gridRow: 1 }}
                    className={cn("my-auto h-2 rounded-full", colorClass)}
                />
            ))}
        </div>
    );
}

/**
 * Detailed view: all phases as bars sharing the same vertical separators.
 * Uses a single grid so separators span the full stack.
 */
export default function PlantTimeline(props: { plant: Plant }) {
    const { phases } = props.plant;
    const entries: Array<{ phase: Phase; color: string }> = [];
    if (phases.sowing) entries.push({ phase: phases.sowing, color: "bg-green-300" });
    if (phases.planting) entries.push({ phase: phases.planting, color: "bg-green-600" });
    if (phases.flowering) entries.push({ phase: phases.flowering, color: "bg-pink-400" });
    entries.push({ phase: phases.harvest, color: "bg-orange-500" });

    return (
        <div className="grid grid-cols-12" style={{ gridAutoRows: "20px" }}>
            {/* Vertical separators span all phase rows */}
            {Array.from({ length: 12 }, (_, i) => (
                <div
                    key={`sep-${i}`}
                    className="border-l border-gray-200 first:border-l-0"
                    style={{ gridColumn: `${i + 1} / ${i + 2}`, gridRow: "1 / -1" }}
                />
            ))}
            {/* Phase bars */}
            {entries.map((entry, idx) =>
                getSegments(entry.phase).map(([start, end], sIdx) => (
                    <div
                        key={`${idx}-${sIdx}`}
                        style={{ gridColumn: `${start} / ${end + 1}`, gridRow: idx + 1 }}
                        className={cn("my-auto h-2 rounded-full", entry.color)}
                    />
                )),
            )}
        </div>
    );
}
