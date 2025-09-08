import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { signJwtToken } from '@/utils/jwt';
import clientPromise from '@/utils/mongodb';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Connect to MongoDB and find user
    const client = await clientPromise;
    const db = client.db();
    const user = await db.collection('users').findOne({ email, password });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Create user object without password
   const userWithoutPassword = {
  id: user._id.toString(), // Convert ObjectId to string
  email: user.email,
  name: user.name || '',
  isPremium: user.isPremium || false,
  createdAt: user.createdAt // Ensure createdAt is included
};

    // Generate JWT token
    const token = signJwtToken(userWithoutPassword);

    // Set JWT token in HTTP-only cookie
    const cookieStore = cookies();
    (cookieStore as any).set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/'
    });
  return NextResponse.json({ token, ...userWithoutPassword });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}