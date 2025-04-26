import "./globals.css";

import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import { Outfit } from "next/font/google";

export const metadata: Metadata = {
  title: "vys",
  description: "",
};

const outfit = Outfit();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <div className="bg-black min-h-screen pt-2">
          <div className="min-w-3xl place-self-center">
            <Navbar></Navbar>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
