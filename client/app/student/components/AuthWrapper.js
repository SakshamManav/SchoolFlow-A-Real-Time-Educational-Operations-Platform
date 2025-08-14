"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function StudentAuthWrapper({ children }) {
    const router = useRouter();
    const [hydrated, setHydrated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        setHydrated(true);
        // Only run client-side
        setTimeout(() => {
            const studentToken = window.localStorage.getItem('student_token');
            const studentUser = window.localStorage.getItem('student_user');
            console.log('AuthWrapper - Checking auth state:');
            console.log('Token exists:', !!studentToken);
            console.log('User data exists:', !!studentUser);
            if (!studentToken || !studentUser) {
                console.log('Authentication failed, redirecting to login...');
                router.replace('/student/login');
                return;
            }
            setIsAuthenticated(true);
            setLoading(false);
        }, 100);
    }, [router]);

    // Hydration guard
    if (!hydrated) return null;

    // Show loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    // Only render children if authenticated
    return isAuthenticated ? children : null;
}
