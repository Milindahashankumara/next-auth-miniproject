import jwt from 'jsonwebtoken';

export const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export const JWT_EXPIRES_IN = '1h';

export interface jwtPayload {
    id: string;
  email: string;
  name: string;
  isPremium: boolean;
  iat?: number; // Issued at
  exp?: number; // Expiration time
}

//Generate JWT token
export function signJwtToken(payload: Omit<jwtPayload, 'iat' | 'exp'>): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

// Verify and decode JWT token
export function verifyJwtToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch (error) {
    console.error('JWT verification failed:', error);
    return null;
  }
}