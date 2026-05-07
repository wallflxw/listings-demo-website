import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { PaginationProps } from "@/types";
import { getTotalListings, getListingsPerPage } from "@/lib/data";
import { createClient } from "@/lib/supabase/server";
import { logError } from "@/lib/utils";
import ListingCard from "@/components/shared/listing-card";
import PageTitle from "@/components/shared/page-title";
import ListingGridSkeleton from "@/components/shared/listings-skeleton";
import Pagination from "./_components/pagination";
import Filters from "./_components/filters";

interface SearchParams {
    page: string | undefined;
    type: string | undefined;
}

const PER_PAGE = 6;


export default async function Listings({ searchParams }: { searchParams: Promise<SearchParams> }) {
    const pageParam = (await searchParams).page;
    const filters = await searchParams;
    const typeFilter = filters?.type;
    const total = await getTotalListings(typeFilter);
    const totalPages = total ? (Math.ceil(total / PER_PAGE)) : 0;
    const currentPage = Number(pageParam) || 1;

    if (pageParam !== undefined) {
        const isInvalid = isNaN(Number(pageParam)) || currentPage < 1 || currentPage > totalPages;
        if (isInvalid) notFound();
    }
    return (
        <>
            <PageTitle text={`Total listings: ${total}`} />
            <section className="py-20">
                <div className="content w-full items-center gap-4">
                    <Filters />
                    <Suspense fallback={<ListingGridSkeleton />}>
                        <ListingsGrid currentPage={currentPage} totalPages={totalPages} typeFilter={typeFilter} />
                    </Suspense>
                </div>
            </section>
        </>
    );
}


async function ListingsGrid({ currentPage, totalPages, typeFilter }: { currentPage: number, totalPages: number, typeFilter: string | undefined }) {
    const listings = await getListingsPerPage(PER_PAGE, currentPage - 1, typeFilter);
    const isFirstPage = currentPage <= 1;
    const isLastPage = currentPage >= totalPages;
    const pagesInfo: PaginationProps = {
        totalPages, currentPage, isFirstPage, isLastPage
    }
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
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                {listings.map((listing) => (
                    <ListingCard key={listing.id} listing={listing} isFavorite={favoriteIds.has(listing.id)} />
                ))}
            </div>
            <Pagination pagesInfo={pagesInfo} typeFilter={typeFilter} />
        </>
    ) : (
        <p className="text-2xl text-second">Currently there is nothing to show :(</p>
    )
}