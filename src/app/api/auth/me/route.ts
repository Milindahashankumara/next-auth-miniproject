import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Same user store as login
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

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get('auth-token');

    if (!authToken) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Decode session token
    const sessionData = JSON.parse(atob(authToken.value));
    
    // Check if token is expired (7 days)
    const tokenAge = Date.now() - sessionData.timestamp;
    if (tokenAge > 7 * 24 * 60 * 60 * 1000) {
      return NextResponse.json(
        { error: 'Token expired' },
        { status: 401 }
      );
    }

    // Find user
    const user = users.find(u => u.id === sessionData.userId);

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json(userWithoutPassword);

  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { error: 'Invalid token' },
      { status: 401 }
    );
  }
}