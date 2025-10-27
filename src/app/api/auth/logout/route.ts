import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Create response
    const response = NextResponse.json({ success: true });
    
    // Clear the auth token cookie by setting it to expire
    const expiredDate = new Date(0).toUTCString();
    const cookieValue = `auth-token=; HttpOnly; Path=/; Expires=${expiredDate}; ${
      process.env.NODE_ENV === 'production' ? 'Secure; ' : ''
    }SameSite=Strict`;
    
    response.headers.set('Set-Cookie', cookieValue);
    
    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}