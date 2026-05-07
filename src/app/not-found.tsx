import Link from "next/link"

export default function NotFound() {
    return (
        <section className="min-h-[50vh]">
            <div className="content items-center justify-center">
                <div className="flex flex-col gap-4 items-center">
                    <h1 className="text-8xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-sky-400 to-blue-600 tracking-tight">
                        404
                    </h1>
                    <h2 className="mt-4 text-2xl md:text-4xl font-bold text-white">
                        Page Not Found
                    </h2>
                    <Link className="btn" href="/">Return Home</Link>
                </div>
            </div>
        </section>
    )
}