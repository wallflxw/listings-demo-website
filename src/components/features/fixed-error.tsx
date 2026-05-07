import type { FormState } from "@/types"
import { useEffect, useState } from "react";

export default function FixedErrorMessage({ state }: { state: FormState }) {
    const [isVisible, setIsVisible] = useState(false);
    const [prevState, setPrevState] = useState(state);
    if (state !== prevState) {
        setPrevState(state);
        if (state.success !== undefined) {
            setIsVisible(true);
        }
    }
    useEffect(() => {
        if (!isVisible) return;
        const timer = setTimeout(() => setIsVisible(false), 4000);
        return () => clearTimeout(timer);
    }, [isVisible]);

    if (!isVisible || state.success === undefined) return null;
    return (
        <div className="fixed p-2 bg-gray-500 bottom-10 right-10 rounded-lg animate-fade-in">
            {state.success ?
                (
                    <span className="text-green-400 font-semibold">Success!</span>
                ) : (
                    <span className="text-red-300 font-semibold">{state.error}</span>
                )
            }
        </div>
    )
}