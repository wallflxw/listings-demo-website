import Link from "next/link"

export default function Footer() {
    return (
        <footer className="flex items-center justify-center bg-black py-2 px-4">
            <div className="content items-center flex-row! justify-between">
                <div>LOGO</div>
                <div>Links</div>
                <div>
                    <Link className="link" href="/privacy-policy">Privacy Policy</Link>
                </div>
            </div>
        </footer>
    )
}