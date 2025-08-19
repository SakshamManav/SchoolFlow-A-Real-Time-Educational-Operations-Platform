"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const TeacherAuthWrapper = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const router = useRouter();

  // Immediate auth check
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const token = localStorage.getItem("teacher_token");
    if (!token) {
      setIsAuthenticated(false);
      router.replace("/teacher/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (isAuthenticated === null || isAuthenticated === false) {
    return null; // Prevent rendering during auth check or if unauthenticated
  }

  return <>{children}</>;
};

export default TeacherAuthWrapper;
