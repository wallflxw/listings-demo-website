import Link from "next/link";
import { User } from "@supabase/supabase-js";

import SignOutButton from "./signout-button";

export default function ProfileDropdown({ user }: { user: User }) {
    return (
        <div className="relative group inline-block">
            <Link href="/profile" className="link-brand">
                {user?.user_metadata.name}
            </Link>
            <div className="absolute right-0 mt-2 w-48 bg-dark border border-white/20 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <ul className="flex flex-col py-2 text-sm font-medium">
                    <li>
                        <Link href="/profile" className="block px-4 py-2 hover:bg-second/10">
                            Profile
                        </Link>
                    </li>
                    <li>
                        <Link href="/profile/favorites" className="block px-4 py-2 hover:bg-second/10">
                            Favorites
                        </Link>
                    </li>
                    <hr className="my-1 border-gray-200" />
                    <li>
                        <SignOutButton className="block w-full text-left px-4 py-2 text-red-600 hover:bg-second/10" />
                    </li>
                </ul>
            </div>

        </div>
    );
}