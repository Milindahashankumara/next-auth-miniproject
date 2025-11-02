import { NextRequest, NextResponse } from 'next/server';
import { verifyJwtToken } from '@/utils/jwt';

// Paths that require authentication
const PROTECTED_PATHS = ['/profile', '/premium'];

// Paths that require premium status
const PREMIUM_PATHS = ['/premium'];

export function middleware(request: NextRequest) {
  // Get token from cookies
  const token = request.cookies.get('auth-token')?.value;

  // Safe pathname: request.nextUrl may be undefined in some runtime contexts,
  // fall back to parsing request.url. Ensure we always have a string before calling startsWith.
  const path = typeof request.nextUrl?.pathname === 'string'
    ? request.nextUrl.pathname
    : (request.url ? new URL(request.url).pathname : '/');

  // Check if the path requires authentication
  if (PROTECTED_PATHS.some(prefix => typeof path === 'string' && path.startsWith(prefix))) {
    // No token - redirect to login
    if (!token) {
      const url = new URL('/login', request.url);
      url.searchParams.set('from', path);
      return NextResponse.redirect(url);
    }
    
    // Verify token
    const payload = verifyJwtToken(token);
    if (!payload) {
      const url = new URL('/login', request.url);
      url.searchParams.set('from', path);
      return NextResponse.redirect(url);
    }
    
    // Check premium access for premium paths
    if (PREMIUM_PATHS.some(prefix => typeof path === 'string' && path.startsWith(prefix)) && !payload.isPremium) {
      return NextResponse.redirect(new URL('/profile', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/profile/:path*',
    '/premium/:path*'
  ]
};