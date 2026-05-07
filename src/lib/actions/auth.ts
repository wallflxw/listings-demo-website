'use server';
import type { FormState } from "@/types";
import { createClient } from "../supabase/server";
import { logError } from "../utils";

export async function signUp(prevState: FormState, formData: FormData): Promise<FormState> {
    const supabase = await createClient();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = formData.get("name") as string
    const { error } = await supabase.auth.signUp({
        email, password,
        options: {
            data: {
                name
            }
        }
    });
    if (error) {
        logError("signUp() failed", error.message);
        return {
            success: false,
            error: error.message
        }
    }
    return { success: true }
}

export async function logIn(prevState: FormState, formData: FormData): Promise<FormState> {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })
    if (error) {
        logError("logIn() failed", error.message);
        return {
            success: false,
            error: error.message
        }
    }
    return { success: true }
}