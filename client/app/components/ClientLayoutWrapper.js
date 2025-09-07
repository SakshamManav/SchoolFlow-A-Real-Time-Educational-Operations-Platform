"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import AdminNavbar from "../admin/components/Navbar";
import StudentNavbar from "../student/components/Navbar";
import TeacherNavbar from "../teacher/components/Navbar";
import { NavigationProvider } from "../context/NavigationContext";
import NavigationProgressBar from "./NavigationProgressBar";

export default function ClientLayoutWrapper({ children }) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Check authentication for protected routes
  useEffect(() => {
    if (typeof window === 'undefined' || !pathname) return;

    const isAdminRoute = pathname.startsWith("/admin") && pathname !== "/admin/login";
    const isStudentRoute = pathname.startsWith("/student") && pathname !== "/student/login";
    const isTeacherRoute = pathname.startsWith("/teacher") && pathname !== "/teacher/login";
    
    if (isAdminRoute || isStudentRoute || isTeacherRoute) {
      let token = null;
      
      if (isAdminRoute) {
        token = localStorage.getItem("token");
      } else if (isStudentRoute) {
        token = localStorage.getItem("student_token");
      } else if (isTeacherRoute) {
        token = localStorage.getItem("teacher_token");
      }
      
      if (!token) {
        setIsAuthenticated(false);
        setIsAuthChecked(true);
        if (isAdminRoute) {
          router.replace("/login");
        } else if (isStudentRoute) {
          router.replace("/student/login");
        } else if (isTeacherRoute) {
          router.replace("/teacher/login");
        }
        return;
      }
    }
    
    setIsAuthenticated(true);
    setIsAuthChecked(true);
  }, [pathname, router]);

  const hideNavbarRoutes = ["/login", "/teacher/login", "/student/login"];

  const showAdminNavbar = pathname?.startsWith("/admin") && pathname !== "/admin/login";
  const showStudentNavbar = pathname?.startsWith("/student") && pathname !== "/student/login";
  const showTeacherNavbar = pathname?.startsWith("/teacher") && pathname !== "/teacher/login";

  const hideNavbar = pathname && hideNavbarRoutes.some((route) => pathname === route);

  // Show loading for protected routes until auth is checked
  const isProtectedRoute = pathname?.startsWith("/admin") && pathname !== "/admin/login" ||
                          pathname?.startsWith("/student") && pathname !== "/student/login" ||
                          pathname?.startsWith("/teacher") && pathname !== "/teacher/login";

  if (isProtectedRoute && (!isAuthChecked || !isAuthenticated)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <NavigationProvider>
      {isHydrated && pathname && (
        <>
          {!hideNavbar && (
            <>
              {showAdminNavbar && <AdminNavbar />}
              {showStudentNavbar && <StudentNavbar />}
              {showTeacherNavbar && <TeacherNavbar />}
            </>
          )}
          <NavigationProgressBar />
          <main>{children}</main>
        </>
      )}
    </NavigationProvider>
  );
}
