"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function StudentAuthWrapper({ children }) {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.replace('/student/login');
        }
    }, [router]);

    // Don't render children until we're sure there's a token
    if (typeof window !== 'undefined' && !localStorage.getItem('token')) {
        return null; // Return nothing to prevent flash
    }

    return children;
}
