"use client";
import { SessionProvider } from "next-auth/react";
import Navbar from "./components/Navbar";
import { usePathname } from "next/navigation";

export function Providers({ children }) {
  const pathname = usePathname();

  // List of routes where Navbar should be hidden
  const hideNavbarOn = ["/login", "/register"];

  const shouldHideNavbar = hideNavbarOn.includes(pathname);

  return (
    <SessionProvider>
      {!shouldHideNavbar && <Navbar />}
      {children}
    </SessionProvider>
  );
}
