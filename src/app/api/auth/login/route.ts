import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { signJwtToken } from '@/utils/jwt';


// Simple in-memory user store for demo
const users = [
  {
    id: '1',
    email: 'user@example.com',
    password: 'password123',
    name: 'John Doe',
    isPremium: false,
  },
  {
    id: '2',
    email: 'premium@example.com',
    password: 'premium123',
    name: 'Jane Smith',
    isPremium: true,
  },
  {
    id: '3',
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Admin User',
    isPremium: true,
  },
];

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

    // Find user
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Create user object without password
    const userWithoutPassword = {
      id: user.id,
      email: user.email,
      name: user.name,
      isPremium: user.isPremium
    };

    // Generate JWT token
    const token = signJwtToken(userWithoutPassword);

    // Set JWT token in HTTP-only cookie
    const cookieStore = await cookies();
(cookieStore as any).set('auth-token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 60 * 60 * 24 * 7, // 7 days
  path: '/'
});

    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}