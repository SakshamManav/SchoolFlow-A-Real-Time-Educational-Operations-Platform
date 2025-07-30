"use client";

import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { usePathname } from "next/navigation";
import Navbar from "./components/Navbar";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const hideNavbarRoutes = ["/login"];

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {!hideNavbarRoutes.includes(pathname) && <Navbar />}
        <main>{children}</main>
      </body>
    </html>
  );
}
