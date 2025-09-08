import { NextResponse , NextRequest } from 'next/server';
import clientPromise from '@/utils/mongodb';

export async function POST(request: NextRequest) {
  const { email, password, isPremium } = await request.json();
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
    createdAt
  });

  return NextResponse.json({ message: 'Registration successful!', createdAt });
}