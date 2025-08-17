
"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, X, GraduationCap } from 'lucide-react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleNavigation = (href) => {
    if (pathname !== href) {
      setIsLoading(true);
      setMenuOpen(false); // Close mobile menu
      router.push(href);
    }
  };

  // Reset loading state when pathname changes (page loaded)
  useEffect(() => {
    setIsLoading(false);
  }, [pathname]);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="bg-black shadow-xl sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/student/dashboard" className="flex items-center space-x-2 group">
            <div className="bg-white/10 backdrop-blur-md p-2 rounded-xl group-hover:bg-white/20 transition-all duration-300">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">
              MySchool
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {[
                { href: "/student/profile", label: "Profile" },
                { href: "/student/attendance", label: "Attendance" },
                { href: "/student/time-table", label: "Time Table" },
                { href: "/student/result", label: "Result" },
            ].map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavigation(item.href)}
                className="px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg font-medium transition-all duration-200 backdrop-blur-sm"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white p-2 rounded-lg hover:bg-white/10 transition-all"
            >
              {menuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            {[
                { href: "/student/profile", label: "Profile" },
                { href: "/student/attendance", label: "Attendance" },
                { href: "/student/time-table", label: "Time Table" },
                { href: "/student/result", label: "Result" },
            ].map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavigation(item.href)}
                className="block w-full text-left px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg font-medium transition-all duration-200"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
      
      {/* Loading Progress Bar */}
      {isLoading && (
        <div className="fixed top-16 left-0 right-0 z-40">
          <div className="h-1 bg-gray-200/50">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-1000 ease-in-out"
              style={{
                width: '0%',
                animation: 'loadingBar 2s ease-in-out infinite'
              }}
            ></div>
          </div>
        </div>
      )}
      
      <style jsx global>{`
        @keyframes loadingBar {
          0% { 
            width: 0%; 
            margin-left: 0%; 
          }
          50% { 
            width: 75%; 
            margin-left: 25%; 
          }
          100% { 
            width: 0%; 
            margin-left: 100%; 
          }
        }
      `}</style>
    </nav>
  );
}
