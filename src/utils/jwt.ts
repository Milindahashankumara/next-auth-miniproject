import jwt from 'jsonwebtoken';
export const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export const JWT_EXPIRES_IN = '1h';

export interface jwtPayload {
  id: string;
  email: string;
  name: string;
  isPremium: boolean;
  createdAt?: string; 
  iat?: number;
  exp?: number;
}

//Generate JWT token
export function signJwtToken(payload: Omit<jwtPayload, 'iat' | 'exp'>): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

// Verify and decode JWT token
export function verifyJwtToken(token: string): jwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as jwtPayload;
  } catch (error: any) {
    // Don't log errors for expired tokens (expected behavior)
    if (error?.name !== 'TokenExpiredError' && error?.name !== 'JsonWebTokenError') {
      console.error('JWT verification failed:', error);
    }
    return null;
  }
}