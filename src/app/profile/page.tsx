import { redirect } from "next/navigation";
import PageTitle from "@/components/shared/page-title";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";


export default async function Profile() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user === null) {
        redirect("/login");
    }
    const name = user?.user_metadata.name;
    const email = user?.user_metadata.email;
    return (
        <>
            <PageTitle text="Your profile" />
            <section>
                <div className="content gap-4">
                    <div className="flex flex-col gap-2 w-fit">
                        <span className="font-medium text-xl">Name</span>
                        <span className="p-2 rounded-md bg-second/20">{name}</span>
                    </div>
                    <div className="flex flex-col gap-2 w-fit">
                        <span className="font-medium text-xl">Email</span>
                        <span className="p-2 rounded-md bg-second/20">{email}</span>
                    </div>
                    <Link className="btn w-fit" href="/profile/add-listing">Add new Listing</Link>
                </div>
            </section>
        </>
    )
}