import Link from "next/link"
import SectionTitle from "../shared/section-title"

export default function Contacts() {
    return (
        <section className="w-full mt-auto bg-dark border-t border-white/10 rounded-t-4xl p-8 shadow-xl shadow-slate-950/40 lg:w-[95%] self-center">
            <div className="content gap-8">
                <SectionTitle text="Contacts" />
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-0 justify-between">
                    <div className="flex flex-col gap-2 pl-2 text-lg">
                        <Link href="tel:+48123123123"><span className="font-medium">Phone:</span> +48 123 123 123</Link>
                        <Link href="mailto:example@gmail.com"><span className="font-medium">Email:</span> example@gmail.com</Link>
                    </div>
                    <div className="block">
                        <span className="text-4xl font-bold text-accent">SITE LOGO</span>
                    </div>
                </div>
            </div>
        </section>
    )
}