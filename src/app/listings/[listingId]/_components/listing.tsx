import EditButton from "@/components/features/edit-button";
import FavoriteButton from "@/components/features/favorite-button"
import RemoveButton from "@/components/features/remove-button";
import { createClient } from "@/lib/supabase/server"
import type { Listing } from "@/types"
import Image from "next/image"

export default async function ListingContent({ listing }: { listing: Listing }) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    let isFavorite = false;
    if (user) {
        const { data: isExists } = await supabase
            .from("user_favorites")
            .select("listing_id")
            .eq("user_id", user.id)
            .eq("listing_id", listing.id)
            .single();
        if (isExists) isFavorite = true;
    }
    const isOwner = user?.id === listing.user_id;

    return (
        <div className="grid lg:grid-cols-2 w-full gap-2">
            <div className="aspect-3/2 overflow-hidden p-1">
                <Image
                    src={listing?.image ?? "/cat-1.jpg"}
                    alt={listing?.title ?? "no photo available"}
                    width={800}
                    height={633}
                    loading="eager"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="rounded-lg aspect-3/2 object-cover"
                />
            </div>
            <div className="p-1 pl-4 flex flex-col gap-2 relative">
                <FavoriteButton listingID={listing.id} isFavorite={isFavorite} />
                <h1 className="text-2xl font-bold">{listing?.title ?? "Listing not found"}</h1>
                <span className="inline-flex gap-2">
                    <Image src="/location.svg" width={24} height={24} alt="location icon" />
                    {listing?.location}
                </span>
                <span className="px-1 bg-slate-700 rounded text-lg font-semibold  w-fit">{listing?.type}</span>
                <p className="text-gray-300 mt-4 text-lg">{listing?.description ?? "No description available"}</p>
                <ul className="space-y-4 pl-4 mt-4 text-xl">
                    <li>
                        Rooms: {listing?.rooms}
                    </li>
                    <li>
                        Bedrooms: {listing?.bedrooms}
                    </li>
                    <li>
                        Area: {listing?.area} m²
                    </li>
                </ul>
                <p className="mt-auto text-xl">Contacts: TODO</p>
                <p className="p-3 mt-auto w-fit bg-blue-600 rounded-lg">
                    <span className="text-3xl font-semibold tracking-wider">${listing?.price?.toLocaleString()}</span>
                </p>
                {isOwner && (
                    <div className="flex gap-4">
                        <RemoveButton id={listing.id} />
                        <EditButton id={listing.id} />
                    </div>
                )}
            </div>
        </div>
    )
}