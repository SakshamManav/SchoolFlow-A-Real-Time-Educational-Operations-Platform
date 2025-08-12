import { NextResponse } from 'next/server';

export function middleware(request) {
    // Get the path
    const path = request.nextUrl.pathname;

    // Check if it's a student route (except login)
    if (path.startsWith('/student') && !path.includes('/login')) {
        // Check for auth token
        const token = request.cookies.get('token');
        if (!token) {
            // Redirect to login if no token found
            return NextResponse.redirect(new URL('/student/login', request.url));
        }
    }

    // If it's the login page and user is authenticated, redirect to dashboard
    if (path === '/student/login') {
        const token = request.cookies.get('token');
        if (token) {
            return NextResponse.redirect(new URL('/student/dashboard', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/student/:path*'  // Match all student routes
    ]
};
