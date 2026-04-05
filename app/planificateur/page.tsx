import Main from "@core/Main";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Planificateur",
    description: "Planification de votre jardin en permaculture",
};

export default async function Page() {
    return (
        <Main>
            <div className="space-y-4">
                <h2 className="text-4xl font-semibold">Planificateur</h2>
                <p className="text-lg text-gray-600">À construire prochainement…</p>
            </div>
        </Main>
    );
}
