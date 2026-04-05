"use client";

import { useCookieState } from "@lib/cookie-state-client";
import { type GreenSenseState, POC_COOKIE_NAME, defaultState } from "@lib/poc-state";

type ClientWrapperProps = {
    initialState: GreenSenseState | undefined;
};

export default function ClientWrapper(props: ClientWrapperProps) {
    const { initialState } = props;
    const [state, setState] = useCookieState<GreenSenseState>(POC_COOKIE_NAME, initialState ?? defaultState);

    return (
        <div className="w-full max-w-2xl space-y-6">
            <div className="text-sm text-gray-500">Étape {state.step} / 3 (squelette)</div>

            {/* TODO: step 1, 2, 3 components */}
            <pre className="overflow-auto rounded-md bg-gray-100 p-4 text-xs">{JSON.stringify(state, null, 2)}</pre>

            <div className="flex gap-2">
                {state.step > 1 && (
                    <button
                        type="button"
                        onClick={() => setState((s) => ({ ...s, step: (s.step - 1) as 1 | 2 | 3 }))}
                        className="rounded-md border px-3 py-1 text-sm"
                    >
                        Retour (debug)
                    </button>
                )}
                {state.step < 3 && (
                    <button
                        type="button"
                        onClick={() => setState((s) => ({ ...s, step: (s.step + 1) as 1 | 2 | 3 }))}
                        className="rounded-md border px-3 py-1 text-sm"
                    >
                        Suivant (debug)
                    </button>
                )}
            </div>
        </div>
    );
}
