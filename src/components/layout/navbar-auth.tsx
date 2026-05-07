'use client';
import Link from "next/link"
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import ProfileDropdown from "./profile-dropdown";


export default function AuthLinks() {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const supabase = createClient();
    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            setIsLoading(false);
        }
        getUser();
        const { data: { } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setIsLoading(false);
        });
    }, [supabase.auth])

    if (isLoading) {
        return <div className="w-60 h-10 bg-gray-900 animate-pulse rounded-full translate-x-3"></div>;
    }

    if (user) {
        return (
            <ProfileDropdown user={user} />
        )
    }

    return (
        <>
            <Link href="/login" className="link-brand">
                Log In
            </Link>
            <Link href="/signup" className="link-brand">
                Sign Up
            </Link>
        </>
    )
}