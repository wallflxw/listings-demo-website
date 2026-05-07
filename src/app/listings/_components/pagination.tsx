import Link from "next/link"
import type { PaginationProps } from "@/types";

const linkClass = "text-lg px-2 hover:bg-gray-500 transition-colors py-0.5 bg-blue-500  rounded-lg";
const linkClassDisabled = "text-lg px-2 transition-colors py-0.5 bg-gray-700 rounded-lg cursor-not-allowed";

export default function Pagination({ pagesInfo, typeFilter }: { pagesInfo: PaginationProps, typeFilter: string | undefined }) {
    const { isFirstPage, currentPage, totalPages, isLastPage } = pagesInfo;
    const prevPageLink =
        typeFilter ?
            `/listings?page=${Number(currentPage) - 1}&type=${typeFilter}`
            : `/listings?page=${Number(currentPage) - 1}`;
    const nextPageLink =
        typeFilter ?
            `/listings?page=${Number(currentPage) + 1}&type=${typeFilter}` :
            `/listings?page=${Number(currentPage) + 1}`;
    return (
        <div className="mt-6 flex gap-4 items-center justify-center">
            {isFirstPage ? (<span className={`${linkClassDisabled}`}>Prev</span>) :
                (
                    <Link
                        className={linkClass}
                        href={prevPageLink}>
                        Prev
                    </Link>
                )}
            <span className="text-xl font-semibold">Page {currentPage} / {totalPages}</span>
            {isLastPage ? (<span className={`${linkClassDisabled}`}>Next</span>) :
                (
                    <Link
                        className={linkClass}
                        href={nextPageLink}>
                        Next
                    </Link>
                )}
        </div>
    )
}