import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import Contacts from "@/components/layout/contacts";
import Footer from "@/components/layout/footer";
import { Roboto_Slab } from "next/font/google"
import "./globals.css";

const font = Roboto_Slab();

export const metadata: Metadata = {
  title: "Listings DEMO",
  description: "My future listings website built with Next.js 16 and Tailwind CSS",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

  return (
    <html lang="en" className={`h-full antialiased ${font.className}`}>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="navbar-top-padding w-full grow">
          {children}
        </main>
        <Contacts />
        <Footer />
      </body>
    </html>
  );
}
