"use client";

import "./globals.css";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import AdminNavbar from "./admin/components/Navbar";
import StudentNavbar from "./student/components/Navbar";
import TeacherNavbar from "./teacher/components/Navbar";

export default function RootLayout({ children }) {
  const [isHydrated, setIsHydrated] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const hideNavbarRoutes = ["/login", "/teacher/login"];

  const showAdminNavbar = pathname?.startsWith("/admin");
  const showStudentNavbar = pathname?.startsWith("/student");
  const showTeacherNavbar = pathname?.startsWith("/teacher");

  const hideNavbar = pathname && hideNavbarRoutes.some((route) => pathname === route);

  return (
    <html lang="en">
      <body className="antialiased" suppressHydrationWarning>
        {isHydrated && pathname && (
          <>
            {!hideNavbar && (
              <>
                {showAdminNavbar && <AdminNavbar />}
                {showStudentNavbar && <StudentNavbar />}
                {showTeacherNavbar && <TeacherNavbar />}
              </>
            )}
            <main>{children}</main>
          </>
        )}
      </body>
    </html>
  );
}
