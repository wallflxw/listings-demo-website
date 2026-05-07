'use client';
import { removeListing } from "@/lib/actions/db";
import { useActionState } from "react";
import FixedErrorMessage from "./fixed-error";
import type { FormState } from "@/types";


export default function RemoveButton({ id }: { id: string }) {
    const initialState: FormState = {};
    const [state, formAction] = useActionState(removeListing, initialState);


    return (
        <form action={formAction}>
            <FixedErrorMessage state={state} />
            <input type="text" name="id" id="id" value={id} hidden readOnly />
            <button type="submit" className="bg-red-400 py-1 px-2 rounded-md hover:brightness-90">Remove</button>
        </form>
    )
}