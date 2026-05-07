'use client';
import LoadingSpinner from "@/components/ui/spinner";
import { ChangeEvent, useActionState, useState } from "react";
import { editListing } from "@/lib/actions/db";
import type { FormState, Listing } from "@/types";
import FixedErrorMessage from "@/components/features/fixed-error";
import Image from "next/image";

function isValidUrl(url: string) {
    try {
        const parsed = new URL(url);
        return parsed.protocol === "https:";
    } catch {
        return false;
    }
}

export default function EditListingForm({ listing }: { listing: Listing }) {
    const initialState: FormState = {};
    const [state, formAction, isPending] = useActionState(editListing, initialState);
    const [imgUrl, setImgUrl] = useState(listing.image);
    const [imgError, setImgError] = useState(false);

    function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
        if (isValidUrl(e.target.value)) {
            setImgUrl(e.target.value);
            setImgError(false);
        }
    }
    return (
        <>
            <FixedErrorMessage state={state} />
            <div className="grid grid-cols-2">
                <form action={formAction}>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="form-group">
                            <label className="form-label" htmlFor="title">Title:</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                defaultValue={listing.title}
                                className="form-input"
                                placeholder="The Beautiful Villa"
                                required />
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="type">Type:</label>
                            <input
                                type="text"
                                id="type"
                                name="type"
                                defaultValue={listing.type}
                                className="form-input"
                                placeholder="Villa" required />
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="location">Location:</label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                defaultValue={listing.location}
                                className="form-input"
                                placeholder="Spain" required />
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="price">Price ($):</label>
                            <input
                                type="text"
                                id="price"
                                name="price"
                                defaultValue={listing.price}
                                className="form-input"
                                placeholder="125000" required />
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="rooms">Rooms:</label>
                            <input
                                type="text"
                                id="rooms"
                                name="rooms"
                                defaultValue={listing.rooms}
                                className="form-input"
                                placeholder="4" maxLength={3} required />
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="bedrooms">Bedrooms:</label>
                            <input
                                type="text"
                                id="bedrooms"
                                name="bedrooms"
                                defaultValue={listing.bedrooms}
                                className="form-input"
                                placeholder="2" required />
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="area">Area (m²):</label>
                            <input
                                type="text"
                                id="area"
                                name="area"
                                defaultValue={listing.area}
                                className="form-input"
                                placeholder="45" required />
                        </div>
                        <div className="form-group col-span-2">
                            <label className="form-label" htmlFor="image">Image:</label>
                            <input
                                type="text"
                                id="image"
                                name="image"
                                defaultValue={listing.image}
                                className="form-input"
                                onChange={handleImageChange}
                                placeholder="https://..." required />
                        </div>
                        <div className="form-group col-span-3">
                            <label className="form-label" htmlFor="description">Description:</label>
                            <textarea
                                id="description"
                                name="description"
                                defaultValue={listing.description}
                                className="form-input resize-none"
                                rows={4}
                                placeholder="Stunning villa featuring spacious rooms..." maxLength={500} required />
                        </div>
                        <input type="text" name="listingId" defaultValue={listing.id} hidden />
                    </div>
                    <button
                        type="submit" className="btn"
                        onClick={() => setImgUrl("")}
                    >
                        {isPending ? (
                            <LoadingSpinner text="Editing..." w={6} h={6} />
                        ) : (
                            "Edit & Save"
                        )
                        }
                    </button>
                </form>
                <div className="flex items-center aspect-3/2 p-2 rounded-md relative">
                    {imgUrl.length > 0 && isValidUrl(imgUrl) && !imgError ? (
                        <Image
                            src={imgUrl}
                            alt="preview"
                            className="object-cover h-full rounded-md"
                            loading="eager"
                            onError={() => setImgError(true)}
                            width={800} height={600} />
                    ) : (
                        <Image
                            src="https://placehold.co/800x600/EEE/31343C"
                            loading="eager"
                            unoptimized
                            alt="placeholder preview"
                            className="object-cover h-full rounded-md"
                            width={800} height={600} />
                    )
                    }
                    {imgError && <p className="absolute top-4 left-4 text-lg font-semibold text-second">Image URL is empty or broken</p>}
                </div>
            </div>
        </>
    )
}