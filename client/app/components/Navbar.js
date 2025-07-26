"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, X, User, GraduationCap, LogOut, ChevronDown } from "lucide-react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  
  const toggleProfile = (e) => {
    e.stopPropagation();
    setProfileOpen(!profileOpen);
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close mobile menu when screen size changes
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
          <Link href="/" className="flex items-center space-x-2 group">
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
              { href: "/students", label: "Students" },
              { href: "/fees", label: "Fees" },
              { href: "/teachers", label: "Teachers" },
              { href: "/reports", label: "Reports" },
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

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center">
            {status === "loading" ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-white/30 rounded-full animate-pulse"></div>
                <span className="text-white/80">Loading...</span>
              </div>
            ) : session ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={toggleProfile}
                  className="flex items-center space-x-3 px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {session.user.name?.charAt(0) || session.user.email?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <span className="text-white font-medium max-w-32 truncate">
                    {session.user.name || 'User'}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-white/80 transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Profile Dropdown */}
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl py-2 animate-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-3 border-b border-gray-200/50">
                      <p className="font-semibold text-gray-800">{session.user.name}</p>
                      <p className="text-sm text-gray-600 truncate">{session.user.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        signOut();
                        setProfileOpen(false);
                      }}
                      className="w-full flex items-center space-x-2 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => signIn("google")}
                className="px-6 py-2 bg-white text-indigo-600 hover:bg-white/90 font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Sign In with Google
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-white/20 py-4 animate-in slide-in-from-top-2 duration-200">
            <div className="space-y-2">
              {[
                { href: "/students", label: "Students" },
                { href: "/fees", label: "Fees" },
                { href: "/teachers", label: "Teachers" },
                { href: "/reports", label: "Reports" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg font-medium transition-all duration-200"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mobile Auth Section */}
            <div className="mt-6 pt-4 border-t border-white/20">
              {status === "loading" ? (
                <div className="flex items-center space-x-2 px-4">
                  <div className="w-4 h-4 bg-white/30 rounded-full animate-pulse"></div>
                  <span className="text-white/80">Loading...</span>
                </div>
              ) : session ? (
                <div className="space-y-3">
                  <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {session.user.name?.charAt(0) || session.user.email?.charAt(0) || 'U'}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-semibold">{session.user.name}</p>
                        <p className="text-white/70 text-sm truncate">{session.user.email}</p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      signOut();
                      setMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-500/20 text-red-100 hover:bg-red-500/30 rounded-lg font-medium transition-all duration-200 border border-red-500/30"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    signIn("google");
                    setMenuOpen(false);
                  }}
                  className="w-full px-4 py-3 bg-white text-indigo-600 hover:bg-white/90 font-semibold rounded-lg transition-all duration-300 shadow-lg"
                >
                  Sign In with Google
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}