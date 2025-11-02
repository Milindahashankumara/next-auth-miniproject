import { NextResponse , NextRequest } from 'next/server';
// Lazy-load the DB helper to avoid initializing DB at module import time

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const { email, password, isPremium, name } = await request.json();
  const clientPromise = (await import('@/utils/mongodb')).default;
  const client = await clientPromise;
  const db = client.db();

  // Check if user exists
  const existingUser = await db.collection('users').findOne({ email });
  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  // Store user (hash password in production!)
  const createdAt = new Date();
  await db.collection('users').insertOne({
    email,
    password,
    isPremium: !!isPremium,
    name,
    createdAt
  });

  return NextResponse.json({ message: 'Registration successful!', createdAt });
}