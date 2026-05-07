'use client';
import type { FormState } from "@/types";
import { logIn } from "@/lib/actions/auth";
import { useActionState } from "react";
import FixedErrorMessage from "@/components/features/fixed-error";

export default function LoginForm() {
    const initialState: FormState = {};
    const [state, formAction, isPending] = useActionState(
        async (prevState: FormState, formData: FormData) => {
            const result = await logIn(prevState, formData);
            if (result.success) {
                window.location.href = '/listings';
            }
            return result;
        },
        initialState
    );
    return (
        <>
            <FixedErrorMessage state={state} />
            <h1 className="text-2xl font-semibold mb-2">Login</h1>
            <form action={formAction} className="form-sign-up">
                <div className="form-group">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" className="form-input" required />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" className="form-input" required />
                </div>
                <button className="btn disabled:opacity-50" disabled={isPending}>
                    {isPending ? "Login..." : "Login"}
                </button>
            </form>
        </>
    )
}