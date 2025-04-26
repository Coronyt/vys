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
        <Navbar></Navbar>
        {children}
      </body>
    </html>
  );
}
