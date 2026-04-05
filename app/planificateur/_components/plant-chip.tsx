"use client";

import { Indicator, Root } from "@atoms/checkbox";
import { Icon } from "@iconify/react";
import cn from "@lib/cn";
import { Check } from "lucide-react";

type PlantChipProps = {
    name: string;
    icon: string;
    caption?: string;
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
};

/**
 * Chip-style checkbox with an Iconify icon next to the plant name.
 * Mirrors the style of @atoms/checkbox/checkbox-chip but adds an icon slot.
 * The optional caption renders under the name (used for season labels).
 */
export default function PlantChip(props: PlantChipProps) {
    const { name, icon, caption, checked, onCheckedChange } = props;

    return (
        <label
            className={cn(
                // Layout
                "flex cursor-pointer items-center gap-3 rounded-full py-1.5 pr-5 pl-4",
                // Border + transitions
                "border transition-colors",
                checked
                    ? "border-gray-400 bg-gray-50/70"
                    : "border-gray-200 hover:border-gray-300 active:border-gray-400",
                // Outline
                "has-focus-visible:outline-outline outline-2 outline-transparent",
            )}
        >
            <Root
                checked={checked}
                onCheckedChange={onCheckedChange}
                className={cn(
                    // Reset default checkbox styles
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
            <Icon icon={icon} className="size-5" />
            <span className="flex flex-col leading-tight select-none">
                <span className="text-foreground text-sm font-medium">{name}</span>
                {caption && <span className="text-[10px] text-gray-500">{caption}</span>}
            </span>
        </label>
    );
}
