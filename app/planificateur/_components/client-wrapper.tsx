"use client";

import { useCookieState } from "@lib/cookie-state-client";
import { type GreenSenseState, POC_COOKIE_NAME, defaultState } from "@lib/poc-state";
import ProgressStepper from "./progress-stepper";
import Step1Plants from "./step-1-plants";

type ClientWrapperProps = {
    initialState: GreenSenseState | undefined;
};

export default function ClientWrapper(props: ClientWrapperProps) {
    const { initialState } = props;
    const [state, setState] = useCookieState<GreenSenseState>(POC_COOKIE_NAME, initialState ?? defaultState);

    return (
        <div className="w-full max-w-2xl space-y-6">
            <ProgressStepper current={state.step} />

            {state.step === 1 && <Step1Plants state={state} setState={setState} />}
            {state.step === 2 && <div className="text-sm text-gray-500">Étape 2 (à construire)</div>}
            {state.step === 3 && <div className="text-sm text-gray-500">Étape 3 (à construire)</div>}
        </div>
    );
}
