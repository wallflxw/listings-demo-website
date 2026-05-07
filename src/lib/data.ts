import { createClient } from "./supabase/server";
import type { Listing } from "@/types";
import { redirect } from "next/navigation";
import { logError } from "./utils";

export async function getListingsPerPage(perPage: number, pageNum: number, type?: string) {
    const supabase = await createClient();
    let query = supabase.from("listings")
        .select()
        .order('created_at', { ascending: false })
        .range(pageNum * perPage, (pageNum + 1) * perPage - 1);
    if (type) query = query.eq('type', type);
    const { data: listings, error } = await query;

    if (error) {
        logError("getListingsPerPage() failed", error.message);
        return [];
    }
    return listings as Listing[];
}

export async function getTotalListings(type?: string) {
    const supabase = await createClient();
    let query = supabase.from("listings")
        .select('*', { count: 'exact', head: true });
    if (type) query = query.eq("type", type);
    const { count, error } = await query;
    if (error) {
        logError("getTotalListings() failed", error.message);
        return 0;
    }
    return count;
}

export async function getListingById(id: string) {
    const supabase = await createClient();
    const { data: listing, error } = await supabase.from("listings").select().eq("id", id).single();
    if (error) {
        logError("getListingById() failed", error.message)
        redirect("/listings");
    }
    return listing as Listing;
}