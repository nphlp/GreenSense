import Main from "@core/Main";
import { getCookieState } from "@lib/cookie-state-server";
import { POC_COOKIE_NAME, greenSenseStateSchema } from "@lib/poc-state";
import type { Metadata } from "next";
import GardenClient from "./_components/garden-client";

export const metadata: Metadata = {
    title: "Mon jardin — GreenSense",
    description: "Récapitulatif de votre planification permaculture annuelle.",
};

export default async function Page() {
    const initialState = await getCookieState(POC_COOKIE_NAME, greenSenseStateSchema);

    return (
        <Main vertical="start" horizontal="stretch">
            <GardenClient initialState={initialState} />
        </Main>
    );
}
