import { Suspense } from "react";
import ListingCard from "@/components/shared/listing-card";
import Link from "next/link";
import { getListingsPerPage } from "@/lib/data";
import { createClient } from "@/lib/supabase/server";
import { logError } from "@/lib/utils";
import PageTitle from "@/components/shared/page-title";
import ListingGridSkeleton from "@/components/shared/listings-skeleton";


export default async function LastListings() {

    return (
        // bg-dark border-t border-white/10 rounded-t-4xl shadow-xl shadow-slate-950/40 w-[95%]
        <section className="mt-6">
            <div className="content w-full items-center relative z-2">
                <PageTitle text="Last added" />
                <div className="absolute border inset-0 lg:-mr-20 lg:-ml-60 lg:-my-5 bg-dark border-white/10 rounded-4xl shadow-xl shadow-slate-950/40 -z-5"></div>
                <Suspense fallback={<ListingGridSkeleton />}>
                    <ListingsGrid />
                </Suspense>
                <Link href="/listings" className="btn mt-4">View All Listings</Link>
            </div>
        </section>
    );
}

async function ListingsGrid() {
    const listings = await getListingsPerPage(6, 0);
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    let favoriteIds = new Set();
    if (user) {
        const { error, data: favorites } = await supabase
            .from('user_favorites')
            .select('listing_id')
            .eq('user_id', user.id);
        if (error) logError(error.message);
        favoriteIds = new Set(favorites?.map(f => f.listing_id));
    }
    return listings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} isFavorite={favoriteIds.has(listing.id)} />
            ))}
        </div>
    ) : (
        <p className="text-2xl text-second pb-4">There is nothing to show :(</p>
    )
}