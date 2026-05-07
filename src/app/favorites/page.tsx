import PageTitle from "@/components/shared/page-title";
import { createClient } from "@/lib/supabase/server";
import type { Listing } from "@/types";
import ListingCard from "@/components/shared/listing-card";

export default async function FavoritesPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    let favoriteListings: Listing[] = [];

    if (user) {
        const { data: listingIds } = await supabase
            .from("user_favorites")
            .select("listing_id")
            .eq("user_id", user.id);

        const listingIdsArr = listingIds?.map(e => e.listing_id) || [];

        if (listingIdsArr.length > 0) {
            const { data } = await supabase
                .from("listings")
                .select()
                .in("id", listingIdsArr);

            favoriteListings = data || [];
        }
    }
    return (
        <>
            <PageTitle text="Your favorites listings" />
            <section>
                <div className="content">
                    {
                        favoriteListings.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                                {favoriteListings.map((listing) => (
                                    <ListingCard key={listing.id} listing={listing} isFavorite={true} />
                                ))}
                            </div>
                        ) : (
                            <span className="text-2xl text-second">There is nothing to show :(</span>
                        )
                    }
                </div>
            </section>
        </>

    )
}