"use client";

import { Indicator, Root } from "@atoms/checkbox/atoms";
import { Icon } from "@iconify/react";
import cn from "@lib/cn";
import { Check } from "lucide-react";

type PlantChipProps = {
    name: string;
    icon: string;
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
};

/**
 * Chip-style checkbox with an Iconify icon next to the plant name.
 * Mirrors the style of @atoms/checkbox/checkbox-chip but adds an icon slot.
 */
export default function PlantChip(props: PlantChipProps) {
    const { name, icon, checked, onCheckedChange } = props;

    return (
        <label
            className={cn(
                // Layout
                "flex cursor-pointer items-center gap-2 rounded-full px-3 py-2",
                // Border + transitions
                "border transition-colors",
                checked
                    ? "border-gray-400 bg-gray-100"
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
            <span className="text-foreground text-sm font-medium select-none">{name}</span>
        </label>
    );
}
