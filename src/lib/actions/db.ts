'use server';
import { createClient } from "../supabase/server";
import { redirect } from "next/navigation";
import type { FormState, ListingFormData, ListingEditFormData } from "@/types";
import { logError } from "../utils";
import { revalidatePath } from "next/cache";

export async function addToFavorite(formData: FormData) {
    const listingID = formData.get('listingID');
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
        redirect("/login");
    }
    const user_id = data.user?.id;
    const { error } = await supabase.from("user_favorites")
        .insert({ user_id, listing_id: listingID });
    if (error) {
        logError("addToFavorite() failed", error.message);
    }
    revalidatePath('/listings');
}

export async function removeFromFavorite(formData: FormData) {
    const listingID = formData.get('listingID');
    const supabase = await createClient();
    const { error, count } = await supabase.from("user_favorites")
        .delete({ count: 'exact' })
        .eq("listing_id", listingID) // TODO: add user_id condition
    if (count === 0) {
        logError("removeFromFavorite() failed. Nothing was deleted.");
    }
    if (error) {
        logError("removeFromFavorite() failed", error.message);
    }
    revalidatePath('/listings');
}

export async function addNewListing(prevState: FormState, formData: FormData): Promise<FormState> {
    const title = formData.get("title") as string;
    const type = formData.get("type") as string;
    const location = formData.get("location") as string;
    const price = formData.get("price") as string;
    const description = formData.get("description") as string;
    const rooms = formData.get("rooms") as string;
    const bedrooms = formData.get("bedrooms") as string;
    const area = formData.get("area") as string;
    const image = formData.get("image") as string;


    if (!title || !type || !location || !price || !description || !rooms || !bedrooms || !area || !image) {
        return {
            success: false,
            error: "All fields are required"
        };
    }
    if (!image.startsWith("https://")) {
        return {
            success: false,
            error: "Bad Image Url"
        };
    }
    const numericError = isNaN(Number(price)) || isNaN(Number(rooms)) || isNaN(Number(bedrooms)) || isNaN(Number(area));
    if (numericError) {
        return {
            success: false,
            error: "Price, Rooms, Bedrooms, Area must be the number"
        }
    }

    const listingData: ListingFormData = {
        title, type, location,
        price: Number(price), description, rooms: Number(rooms),
        bedrooms: Number(bedrooms), area: Number(area), image
    }
    const supabase = await createClient();

    const { error } = await supabase.from('listings')
        .insert(listingData)
    if (error) {
        logError("addListing() failed", error.message);
        return {
            success: false,
            error: "Error while adding new listing. Sowwy."
        }
    }
    return { success: true }
}

export async function removeListing(prevState: FormState, formData: FormData): Promise<FormState> {
    const id = formData.get("id") as string;
    const supabase = await createClient();

    const { error, count } = await supabase.from("listings")
        .delete({ count: 'exact' })
        .eq("id", id);
    if (count === 0) {
        logError("removeListing() failed. Nothing was deleted.");
    }
    if (error) {
        logError("removeListing() failed", error.message);
        return {
            success: false,
            error: "Error while removing listing. Sowwy."
        }
    }
    redirect("/listings");
}

export async function editListing(prevState: FormState, formData: FormData): Promise<FormState> {
    const title = formData.get("title") as string;
    const type = formData.get("type") as string;
    const location = formData.get("location") as string;
    const price = formData.get("price") as string;
    const description = formData.get("description") as string;
    const rooms = formData.get("rooms") as string;
    const bedrooms = formData.get("bedrooms") as string;
    const area = formData.get("area") as string;
    const image = formData.get("image") as string;
    const listingId = formData.get("listingId") as string;
    console.log("INFO", listingId)


    if (!title || !type || !location || !price || !description || !rooms || !bedrooms || !area || !image) {
        return {
            success: false,
            error: "All fields are required"
        };
    }
    if (!image.startsWith("https://")) {
        return {
            success: false,
            error: "Bad Image Url"
        };
    }
    const numericError = isNaN(Number(price)) || isNaN(Number(rooms)) || isNaN(Number(bedrooms)) || isNaN(Number(area));
    if (numericError) {
        return {
            success: false,
            error: "Price, Rooms, Bedrooms, Area must be the number"
        }
    }

    const listingData: ListingEditFormData = {
        id: listingId,
        title, type, location,
        price: Number(price), description, rooms: Number(rooms),
        bedrooms: Number(bedrooms), area: Number(area), image
    }
    const supabase = await createClient();

    const { error } = await supabase.from('listings')
        .update(listingData)
        .eq("id", listingId);

    if (error) {
        logError("editListing() failed", error.message);
        return {
            success: false,
            error: "Error while editing new listing. Sowwy."
        }
    }
    redirect(`/listings/${listingId}`)
}