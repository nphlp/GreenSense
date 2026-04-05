import Button from "@atoms/button";
import Main from "@core/Main";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "GreenSense — Compagnon permaculture",
    description: "Planifie ton potager en permaculture, de la surface du terrain jusqu'à la récolte.",
};

const DECO_EMOJIS = ["🍅", "🥕", "🍓", "🧄", "🌿", "🍎", "🥒", "🧅"];

export default function Page() {
    return (
        <Main vertical="center" horizontal="center">
            <div className="flex flex-col items-center gap-6 text-center">
                <h1 className="text-5xl font-bold tracking-tight md:text-6xl">GreenSense</h1>
                <p className="max-w-md text-lg text-gray-600">Planifie ton potager en permaculture.</p>
                <div className="flex flex-wrap justify-center gap-3 text-4xl md:text-5xl">
                    {DECO_EMOJIS.map((emoji) => (
                        <span key={emoji} aria-hidden>
                            {emoji}
                        </span>
                    ))}
                </div>
                <Link href="/planificateur" className="mt-2">
                    <Button label="Commencer la planification" colors="primary" />
                </Link>
            </div>
        </Main>
    );
}
