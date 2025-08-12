
"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, GraduationCap } from 'lucide-react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

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
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg font-medium transition-all duration-200 backdrop-blur-sm"
              >
                {item.label}
              </Link>
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
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg font-medium transition-all duration-200"
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
