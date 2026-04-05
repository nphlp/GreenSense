import Main from "@core/Main";
import { getCookieState } from "@lib/cookie-state-server";
import { POC_COOKIE_NAME, greenSenseStateSchema } from "@lib/poc-state";
import type { Metadata } from "next";
import ClientWrapper from "./_components/client-wrapper";

export const metadata: Metadata = {
    title: "Planificateur",
    description: "Planification de votre jardin en permaculture",
};

export default async function Page() {
    const initialState = await getCookieState(POC_COOKIE_NAME, greenSenseStateSchema);

    return (
        <Main vertical="start" horizontal="stretch" fill>
            <ClientWrapper initialState={initialState} />
        </Main>
    );
}
