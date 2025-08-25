"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X, GraduationCap, Shield, Users, BookOpen } from 'lucide-react';
import { useNavigationLoader } from '../context/NavigationContext';

export default function HomeNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [studentLoggedIn, setStudentLoggedIn] = useState(false);
  const [teacherLoggedIn, setTeacherLoggedIn] = useState(false);
  const router = useRouter();
  const { startNavigation } = useNavigationLoader();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check admin token
    const adminToken = localStorage.getItem("token");
    if (adminToken) {
      setAdminLoggedIn(true);
    }

    // Check student token
    const studentToken = localStorage.getItem("student_token");
    if (studentToken) {
      setStudentLoggedIn(true);
    }

    // Check teacher token
    const teacherToken = localStorage.getItem("teacher_token");
    if (teacherToken) {
      setTeacherLoggedIn(true);
    }
  }, []);

  const handleAdminPortal = () => {
    if (adminLoggedIn) {
      startNavigation("/admin/dashboard");
    } else {
      startNavigation("/login");
    }
    setMenuOpen(false);
  };

  const handleStudentPortal = () => {
    if (studentLoggedIn) {
      startNavigation("/student/dashboard");
    } else {
      startNavigation("/student/login");
    }
    setMenuOpen(false);
  };

  const handleTeacherPortal = () => {
    if (teacherLoggedIn) {
      startNavigation("/teacher/dashboard");
    } else {
      startNavigation("/teacher/login");
    }
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-700/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-gradient-to-r from-cyan-500 to-sky-600 rounded-lg group-hover:scale-105 transition-transform duration-300 shadow-lg shadow-cyan-500/20">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-sky-400 bg-clip-text text-transparent">
              SchoolFlow
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Admin Portal Button */}
            <button
              onClick={handleAdminPortal}
              className="flex items-center space-x-2 px-6 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors duration-200 font-medium shadow-lg shadow-sky-500/20 hover:shadow-sky-500/30 transform hover:-translate-y-0.5 ring-1 ring-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-400 focus-visible:ring-offset-gray-900"
            >
              <Shield className="w-4 h-4" />
              <span>{adminLoggedIn ? 'Admin Dashboard' : 'Admin Portal'}</span>
            </button>

            {/* Teacher Portal Button */}
            <button
              onClick={handleTeacherPortal}
              className="flex items-center space-x-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 font-medium shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transform hover:-translate-y-0.5 ring-1 ring-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-purple-400 focus-visible:ring-offset-gray-900"
            >
              <BookOpen className="w-4 h-4" />
              <span>{teacherLoggedIn ? 'Teacher Dashboard' : 'Teacher Portal'}</span>
            </button>

            {/* Student Portal Button */}
            <button
              onClick={handleStudentPortal}
              className="flex items-center space-x-2 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200 font-medium shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transform hover:-translate-y-0.5 ring-1 ring-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-gray-900"
            >
              <Users className="w-4 h-4" />
              <span>{studentLoggedIn ? 'Student Dashboard' : 'Student Portal'}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors duration-200"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-700 py-4 animate-in slide-in-from-top-2 duration-200">
            <div className="space-y-3">
              {/* Admin Portal Mobile */}
              <button
                onClick={handleAdminPortal}
                className="flex items-center space-x-3 w-full px-4 py-3 text-white bg-sky-600 rounded-lg hover:bg-sky-700 transition-colors duration-200 font-medium shadow-lg shadow-sky-500/20 hover:shadow-sky-500/30 ring-1 ring-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-400 focus-visible:ring-offset-gray-900"
              >
                <Shield className="w-5 h-5" />
                <span>{adminLoggedIn ? 'Admin Dashboard' : 'Admin Portal'}</span>
              </button>

              {/* Teacher Portal Mobile */}
              <button
                onClick={handleTeacherPortal}
                className="flex items-center space-x-3 w-full px-4 py-3 text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors duration-200 font-medium shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 ring-1 ring-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-purple-400 focus-visible:ring-offset-gray-900"
              >
                <BookOpen className="w-5 h-5" />
                <span>{teacherLoggedIn ? 'Teacher Dashboard' : 'Teacher Portal'}</span>
              </button>

              {/* Student Portal Mobile */}
              <button
                onClick={handleStudentPortal}
                className="flex items-center space-x-3 w-full px-4 py-3 text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors duration-200 font-medium shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 ring-1 ring-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-gray-900"
              >
                <Users className="w-5 h-5" />
                <span>{studentLoggedIn ? 'Student Dashboard' : 'Student Portal'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Subtle gradient accent line */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-sky-500 via-purple-400 via-cyan-400 to-emerald-400 opacity-70" />
    </nav>
  );
}
