import { NextRequest, NextResponse } from 'next/server';
import { verifyJwtToken } from '@/utils/jwt';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Try to get token from Authorization header
    const authHeader = request.headers.get('authorization');
    let token = null;

    if (authHeader && typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } else {
      // Fallback: get token from cookies
      token = request.cookies.get('auth-token')?.value;
    }

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Verify and decode JWT token
    const payload = verifyJwtToken(token);

    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    // Return user data from the token payload
        return NextResponse.json({
      id: payload.id,
      email: payload.email,
      name: payload.name,
      isPremium: payload.isPremium,
      createdAt: payload.createdAt 
});
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}