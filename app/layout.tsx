import "./globals.css";

import { Kode_Mono } from "next/font/google";
import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import { OrderContextProvider } from "@/context/order_context";
import { ResContextProvider } from "@/context/res_context";

export const metadata: Metadata = {
  title: "vys",
  description: "",
};

const default_font = Kode_Mono();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={default_font.className}>
        <ResContextProvider>
          <OrderContextProvider>
            <div className="bg-black min-h-screen pt-2">
              <div className="min-w-3xl place-self-center">
                <Navbar></Navbar>
                {children}
              </div>
            </div>
          </OrderContextProvider>
        </ResContextProvider>
      </body>
    </html>
  );
}
