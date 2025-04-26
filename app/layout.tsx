import "./globals.css";

import type { Metadata } from "next";
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
        {children}
      </body>
    </html>
  );
}
