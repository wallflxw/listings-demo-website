'use client';
import type { FormState } from "@/types";
import { useActionState } from "react";
import { signUp } from "@/lib/actions/auth";
import FixedErrorMessage from "@/components/features/fixed-error";

export default function SignUpForm() {
    const initialState: FormState = {};
    const [state, formAction, isPending] = useActionState(signUp, initialState);
    return (
        <>
            <FixedErrorMessage state={state} />
            {
                state.success ? (
                    <div className="p-4 shadow-xl">
                        <h2 className="text-3xl font-semibold">Confirmation sent. Please check your email to continue.</h2>
                    </div>
                ) : (
                    <>
                        <h1 className="text-2xl font-semibold mb-2">Sign Up</h1>
                        <form action={formAction} className="form-sign-up">
                            <div className="form-group">
                                <label className="form-label" htmlFor="name">Name</label>
                                <input type="name" id="name" name="name" className="form-input" required />
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" className="form-input" required />
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="password">Password</label>
                                <input type="password" id="password" name="password" className="form-input" placeholder="••••••••" required />
                            </div>
                            <label htmlFor="remember" className="flex items-center mb-5">
                                <input id="remember"
                                    type="checkbox"
                                    value=""
                                    className="w-4 h-4 border rounded-md"
                                    required />
                                <p className="ms-2 font-medium text-base select-none">I agree with the <a href="/privacy-policy" className="text-blue-500 underline">terms and conditions</a>.</p>
                            </label>
                            <button className="btn disabled:opacity-50" disabled={isPending}>
                                {isPending ? "Creating account..." : "Register"}
                            </button>
                        </form>
                    </>
                )
            }

        </>
    )
}