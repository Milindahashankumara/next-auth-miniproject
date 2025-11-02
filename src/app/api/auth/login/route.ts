import { NextRequest, NextResponse } from 'next/server';
import { signJwtToken } from '@/utils/jwt';

export const dynamic = 'force-dynamic';

// Provide a safe GET handler so Next's "collecting page data" step (or any
// accidental GETs) get a quick, deterministic response instead of running
// the full POST logic which touches DB / JWT and can trigger surprising
// runtime paths during build-time data collection.
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}

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

  // Lazy-load the MongoDB client to avoid touching DB-related modules during
  // build-time data collection or other GET/time-limited operations.
  const clientPromise = (await import('@/utils/mongodb')).default;
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
  createdAt: user.createdAt 
};

    // Generate JWT token
    const token = signJwtToken(userWithoutPassword);

    // Create response with user data
    const response = NextResponse.json({ token, ...userWithoutPassword });

    // Set JWT token in HTTP-only cookie
    const isProduction = process.env.NODE_ENV === 'production';
    const secureFlag = isProduction ? 'Secure; ' : '';
    const cookieValue = `auth-token=${token}; HttpOnly; Path=/; Max-Age=604800; ${secureFlag}SameSite=Strict`;
    
    response.headers.set('Set-Cookie', cookieValue);

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}