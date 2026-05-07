import LoadingSpinner from "@/components/ui/spinner"
export default function Loading() {
    return (
        <section className="min-h-100">
            <div className="content items-center justify-center">
                <LoadingSpinner />
            </div>
        </section>
    )
}