"use client";

import { useCookieState } from "@lib/cookie-state-client";
import "@lib/plants/icons-data";
// registers Noto icons for <Icon /> components
import { type GreenSenseState, POC_COOKIE_NAME, defaultState } from "@lib/poc-state";
import { AnimatePresence, motion } from "motion/react";
import ProgressStepper from "./progress-stepper";
import Step1Surface from "./step-1-surface";
import Step2Characteristics from "./step-2-characteristics";
import Step3Plants from "./step-3-plants";
import Step4Companions from "./step-4-companions";
import Step5Calendar from "./step-5-calendar";
import Step6Counts from "./step-6-counts";

type ClientWrapperProps = {
    initialState: GreenSenseState | undefined;
};

export default function ClientWrapper(props: ClientWrapperProps) {
    const { initialState } = props;
    const [state, setState] = useCookieState<GreenSenseState>(POC_COOKIE_NAME, initialState ?? defaultState);

    return (
        <div className="flex min-h-0 w-full flex-1 flex-col gap-6">
            <ProgressStepper current={state.step} onStepClick={(step) => setState((s) => ({ ...s, step }))} />

            <AnimatePresence mode="wait">
                <motion.div
                    key={state.step}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="flex min-h-0 flex-1 flex-col"
                >
                    {state.step === 1 && <Step1Surface state={state} setState={setState} />}
                    {state.step === 2 && <Step2Characteristics state={state} setState={setState} />}
                    {state.step === 3 && <Step3Plants state={state} setState={setState} />}
                    {state.step === 4 && <Step4Companions state={state} setState={setState} />}
                    {state.step === 5 && <Step5Calendar state={state} setState={setState} />}
                    {state.step === 6 && <Step6Counts state={state} setState={setState} />}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
