import { notFound } from "next/navigation";
import { getListingById } from "@/lib/data";
import ListingContent from "./_components/listing";

export default async function SingleListing({ params }: { params: Promise<{ listingId: string }> }) {
    const { listingId } = await params;
    const listing = await getListingById(listingId);
    if (!listing) {
        notFound();
    }
    return (
        <section>
            <div className="content items-center">
                <ListingContent listing={listing} />
            </div>
        </section>
    )
}