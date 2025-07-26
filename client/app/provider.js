"use client";
import { SessionProvider } from "next-auth/react";
import Navbar from "./components/Navbar";

export function Providers({ children }) {
  return (
    <SessionProvider>
      <Navbar />
      {children}
    </SessionProvider>
  );
}
