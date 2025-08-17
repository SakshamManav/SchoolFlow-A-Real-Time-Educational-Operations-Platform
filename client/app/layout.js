"use client";

import "./globals.css";
import { usePathname } from "next/navigation";
import AdminNavbar from "./admin/components/Navbar";
import StudentNavbar from "./student/components/Navbar";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  if (!pathname) return null; // Prevent rendering until pathname is ready

  const hideNavbarRoutes = ["/login"];

  const showAdminNavbar = pathname.startsWith("/admin");
  const showStudentNavbar = pathname.startsWith("/student");

  const hideNavbar = hideNavbarRoutes.some((route) => pathname === route);

  return (
    <html lang="en">
      <body className="antialiased">
        {!hideNavbar && (
          <>
            {showAdminNavbar && <AdminNavbar />}
            {showStudentNavbar && <StudentNavbar />}
          </>
        )}
        <main>{children}</main>
      </body>
    </html>
  );
}
