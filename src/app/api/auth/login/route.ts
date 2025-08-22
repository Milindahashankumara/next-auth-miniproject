import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

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

    // Create session token (in production, use proper JWT)
    const sessionToken = btoa(JSON.stringify({ 
      userId: user.id, 
      email: user.email,
      timestamp: Date.now() 
    }));

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set('auth-token', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json(userWithoutPassword);

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}