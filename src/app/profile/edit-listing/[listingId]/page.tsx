import PageTitle from "@/components/shared/page-title"
import { getListingById } from "@/lib/data";
import EditListingForm from "./_components/edit-listing";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function EditListing({ params }: { params: Promise<{ listingId: string }> }) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const { listingId } = await params;
    const listing = await getListingById(listingId);
    if (!user || user.id !== listing.user_id) redirect("/login");
    console.log(user);
    return (
        <>
            <PageTitle text="Edit listing" />
            <section>
                <div className="content">
                    <EditListingForm listing={listing} />
                </div>
            </section>
        </>
    )
}