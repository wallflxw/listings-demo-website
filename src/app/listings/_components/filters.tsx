"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";

export default function Filters() {
    const router = useRouter();
    const searchParams = useSearchParams();

    function handleFilter(e: ChangeEvent<HTMLSelectElement>) {
        const params = new URLSearchParams(searchParams.toString());
        const value = e.target.value;
        if (value) {
            params.delete("page");
            params.set("type", value);
        }
        else {
            params.delete("type");
        }
        router.push(`/listings?${params.toString()}`);
    }

    return (
        <div className="flex gap-4 items-center self-start">
            <label htmlFor="type" className="font-medium text-lg">Type:</label>
            <select className="form-input inline! w-auto! bg-dark!"
                name="type" id="type"
                value={searchParams.get("type") ?? ""}
                onChange={handleFilter}
            >
                <option value="">All types</option>
                <option value="Apartment">Apartment</option>
                <option value="Bungalow">Bungalow</option>
                <option value="Cabin">Cabin</option>
                <option value="Chalet">Chalet</option>
                <option value="Cottage">Cottage</option>
                <option value="Loft">Loft</option>
                <option value="Penthouse">Penthouse</option>
                <option value="Studio">Studio</option>
                <option value="Villa">Villa</option>
            </select>
        </div>
    )
}