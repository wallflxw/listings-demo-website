export interface ListingFormData {
    title: string,
    type: string,
    location: string,
    price: number,
    description: string,
    rooms: number,
    bedrooms: number,
    area: number,
    image: string,
}

export interface ListingEditFormData extends ListingFormData {
    id: string
}

export interface Listing extends ListingFormData {
    id: string,
    user_id: string,
    created_at: string,
}

export type PrivacyPolicySection = {
    title: string;
    description: string;
    list?: string[];
}

export type FormState = {
    success?: boolean;
    error?: string;
}

export type PaginationProps = {
    totalPages: number;
    currentPage: number;
    isFirstPage: boolean;
    isLastPage: boolean;
}