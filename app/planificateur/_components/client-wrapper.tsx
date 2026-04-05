"use client";

import { useCookieState } from "@lib/cookie-state-client";
import "@lib/plants/icons-data";
// registers Noto icons for <Icon /> components
import { type GreenSenseState, POC_COOKIE_NAME, defaultState } from "@lib/poc-state";
import ProgressStepper from "./progress-stepper";
import Step1Surface from "./step-1-surface";
import Step2Plants from "./step-2-plants";
import Step3Companions from "./step-3-companions";
import Step4Calendar from "./step-4-calendar";
import Step5Counts from "./step-5-counts";

type ClientWrapperProps = {
    initialState: GreenSenseState | undefined;
};

export default function ClientWrapper(props: ClientWrapperProps) {
    const { initialState } = props;
    const [state, setState] = useCookieState<GreenSenseState>(POC_COOKIE_NAME, initialState ?? defaultState);

    return (
        <div className="w-full space-y-6">
            <ProgressStepper current={state.step} onStepClick={(step) => setState((s) => ({ ...s, step }))} />

            {state.step === 1 && <Step1Surface state={state} setState={setState} />}
            {state.step === 2 && <Step2Plants state={state} setState={setState} />}
            {state.step === 3 && <Step3Companions state={state} setState={setState} />}
            {state.step === 4 && <Step4Calendar state={state} setState={setState} />}
            {state.step === 5 && <Step5Counts state={state} setState={setState} />}
        </div>
    );
}
