import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyJwtToken } from '@/utils/jwt';

export async function GET(request: NextRequest) {
  try {
    // Try to get token from Authorization header
    const authHeader = request.headers.get('authorization');
    let token = null;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } else {
  // Fallback: get token from cookies (await required)
  const cookieStore = await cookies();
  token = (cookieStore as any).get('auth-token')?.value;
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
      isPremium: payload.isPremium
    });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}