'use client';
import { useOptimistic } from "react";
import { addToFavorite, removeFromFavorite } from "@/lib/actions/db";
import FavoriteIcon from "../ui/icons/favorite";

export default function FavoriteButton({ listingID, isFavorite }: { listingID: string, isFavorite: boolean }) {
    const [optimisticIsFavorite, setOptimisticIsFavorite] = useOptimistic(isFavorite);
    async function handleAction(formData: FormData) {
        if (isFavorite) {
            setOptimisticIsFavorite(false);
            await removeFromFavorite(formData);
        }
        else {
            setOptimisticIsFavorite(true);
            await addToFavorite(formData);
        }
    }

    return (
        <div className="absolute right-2 top-2 lg:top-4 lg:right-4 bg-blue-600 p-1 rounded-lg shadow-lg hover:bg-blue-800 transition-colors">
            <form action={handleAction} className="flex items-center">
                <input type="hidden" name="listingID" value={listingID} />
                <button type="submit" aria-label="Add to favorite">
                    <FavoriteIcon className={`w-6 h-6 ${optimisticIsFavorite ? 'fill-white' : 'fill-transparent'}  duration-300 transition-colors`} />
                    {/* <Image src="/star.svg" alt="Favorite" width={24} height={24} className="fill-red-500 text-red-500" /> */}
                </button>
            </form>
        </div >
    )
}