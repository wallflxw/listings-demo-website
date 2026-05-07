import type { Listing } from "@/types";
import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "../features/favorite-button";

export default function ListingCard({ listing, isFavorite }: { listing: Listing, isFavorite: boolean }) {
    return (
        <div
            key={listing.id}
            className="group relative flex flex-col bg-dark/50 rounded-2xl overflow-hidden border border-slate-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10"
        >
            <div className="relative h-64 w-full overflow-hidden">
                <Image
                    src={listing.image}
                    alt={listing.title}
                    fill // Використовуємо fill для адаптивності всередині контейнера
                    className="object-cover transition-transform duration-500 group-hover:scale-110 select-none"
                    draggable={false}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="eager"
                />
                <div className="absolute top-4 left-4 bg-blue-600 px-3 py-1 rounded-lg font-bold shadow-lg">
                    ${listing.price?.toLocaleString()}
                </div>
                <FavoriteButton listingID={listing.id} isFavorite={isFavorite} />
            </div>

            {/* Контент картки */}
            <div className="p-6 flex flex-col grow">
                <div className="mb-2 flex items-center gap-2 text-slate-400 text-sm">
                    <span className="px-2 py-0.5 bg-slate-700 rounded text-xs uppercase tracking-wider">{listing.type}</span>
                    <span>•</span>
                    <span>{listing.location}</span>
                </div>

                <span className="text-xl font-semibold mb-4 group-hover:text-blue-400 transition-colors">
                    {listing.title}
                </span>

                <div className="mt-auto pt-4 border-t border-slate-700 flex justify-between items-center">
                    <Link href={`/listings/${listing.id}`} className="text-sm font-medium text-blue-400 hover:text-blue-300  transition-colors">
                        Details →
                    </Link>
                    <div className="flex gap-3 text-slate-400 text-sm">
                        <span>{listing.area} m²</span>
                    </div>
                </div>
            </div>
        </div>
    )
}