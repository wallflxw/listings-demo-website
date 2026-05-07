import { IBM_Plex_Mono } from "next/font/google";

const font = IBM_Plex_Mono({ weight: "400" });

export default function Hero() {
    return (
        <section className={`hero min-h-140 text-white items-center relative ${font.className}`}>
            {/* eslint-disable-next-line  */}
            <img src="/bg-hero.webp" alt="hero" loading="eager" className="absolute inset-0 object-cover w-full h-full -z-10 select-none" />
            <div className="absolute inset-0 bg-black/50 -z-5"></div>
            <div className="content items-center gap-8 z-100">
                <h1 className="text-7xl text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-blue-600 font-bold pb-2">Find your dream home!</h1>
                <p className="text-2xl text-gray-300">The best real estate listings, all in one place</p>
            </div>
        </section>
    );
}