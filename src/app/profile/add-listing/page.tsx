import PageTitle from "@/components/shared/page-title";
import AddListingForm from "./_components/add-new-listing";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AddListingProfile() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user === null) {
        redirect("/login");
    }
    return (
        <>
            <PageTitle text="Add new listing" />
            <section>
                <div className="content">
                    <AddListingForm />
                </div>
            </section>
        </>
    )
}