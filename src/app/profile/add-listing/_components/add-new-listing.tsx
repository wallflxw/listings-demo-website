'use client';
import LoadingSpinner from "@/components/ui/spinner";
import { ChangeEvent, useActionState, useState } from "react";
import { addNewListing } from "@/lib/actions/db";
import type { FormState } from "@/types";
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

export default function AddListingForm() {
    const initialState: FormState = {};
    const [state, formAction, isPending] = useActionState(addNewListing, initialState);
    const [imgUrl, setImgUrl] = useState("");
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
            <div className="grid lg:grid-cols-2">
                <form action={formAction}>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="form-group">
                            <label className="form-label" htmlFor="title">Title:</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
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
                                className="form-input"
                                placeholder="Villa" required />
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="location">Location:</label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                className="form-input"
                                placeholder="Spain" required />
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="price">Price ($):</label>
                            <input
                                type="text"
                                id="price"
                                name="price"
                                className="form-input"
                                placeholder="125000" required />
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="rooms">Rooms:</label>
                            <input
                                type="text"
                                id="rooms"
                                name="rooms"
                                className="form-input"
                                placeholder="4" maxLength={3} required />
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="bedrooms">Bedrooms:</label>
                            <input
                                type="text"
                                id="bedrooms"
                                name="bedrooms"
                                className="form-input"
                                placeholder="2" required />
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="area">Area (m²):</label>
                            <input
                                type="text"
                                id="area"
                                name="area"
                                className="form-input"
                                placeholder="45" required />
                        </div>
                        <div className="form-group col-span-2">
                            <label className="form-label" htmlFor="image">Image:</label>
                            <input
                                type="text"
                                id="image"
                                name="image"
                                className="form-input"
                                onChange={handleImageChange}
                                placeholder="https://..." required />
                        </div>
                        <div className="form-group col-span-3">
                            <label className="form-label" htmlFor="description">Description:</label>
                            <textarea
                                id="description"
                                name="description"
                                className="form-input resize-none"
                                rows={4}
                                placeholder="Stunning villa featuring spacious rooms..." maxLength={500} required />
                        </div>
                    </div>
                    <button
                        type="submit" className="btn"
                        onClick={() => setImgUrl("")}
                    >
                        {isPending ? (
                            <LoadingSpinner text="Adding..." w={6} h={6} />
                        ) : (
                            "Add new listing"
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