"use client"

import Link from "next/link";
import AuthLinks from "./navbar-auth";
import { useState } from "react";
import { usePathname } from "next/navigation";


export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const [prevPathname, setPrevPathname] = useState(pathname);
    if (pathname !== prevPathname) {
        setPrevPathname(pathname);
        setIsMenuOpen(false);
    }
    return (
        <nav className="fixed top-0 left-0 right-0 bg-black h-16 shadow-md text-white z-999 flex items-center justify-center">
            <div className="w-full px-2 lg:px-4">
                <div className="hidden lg:grid grid-cols-3 items-center">
                    <span className="text-2xl font-bold">Logo Site</span>
                    <div className="flex gap-4 justify-center">
                        <Link href="/" className="link-navbar">
                            Main
                        </Link>
                        <Link href="/listings" className="link-navbar">
                            Listings
                        </Link>
                    </div>
                    <div className="flex gap-4 min-w-xs justify-end">
                        <AuthLinks />
                    </div>
                </div>
                <div className="lg:hidden grid grid-cols-3 items-center lg:justify-items-center">
                    <span className="text-2xl font-bold">Logo Site</span>
                    <Link href="/" className="link-navbar text-center">
                        Main
                    </Link>
                    <div className="flex justify-end">
                        <BurgerButton isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                    </div>
                </div>
                {isMenuOpen && (
                    <div className="lg:hidden absolute top-full left-0 w-full flex flex-col shadow-lg bg-dark gap-2 items-center py-2" onClick={() => { setIsMenuOpen(!isMenuOpen) }}>
                        <Link href="/listings" className="link-navbar">
                            Listings
                        </Link>
                        <Link href="/profile/favorites" className="link-navbar">
                            Favorites
                        </Link>
                        <AuthLinks />
                    </div>
                )}
            </div>
        </nav>
    );
}

function BurgerButton({ isMenuOpen, setIsMenuOpen }: { isMenuOpen: boolean, setIsMenuOpen: (val: boolean) => void }) {
    return (
        <button className="lg:hidden flex flex-col gap-1.5 p-2 cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Menu">
            <span
                className={`w-6 h-0.5 transition-all duration-300 bg-white ${isMenuOpen && "rotate-45 translate-y-2"}`}></span>
            <span
                className={`w-6 h-0.5 transition-all duration-300 bg-white ${isMenuOpen && "opacity-0"}`}></span>
            <span
                className={`w-6 h-0.5 transition-all duration-300 bg-white ${isMenuOpen && "-rotate-45 -translate-y-2"}`}></span>
        </button>
    )
}