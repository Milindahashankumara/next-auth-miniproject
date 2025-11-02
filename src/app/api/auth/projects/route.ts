import { NextResponse , NextRequest} from 'next/server';
// Lazy-load the DB helper to avoid initializing DB at module import time

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const { title, description, owner } = await request.json();
  const clientPromise = (await import('@/utils/mongodb')).default;
  const client = await clientPromise;
  const db = client.db();

  await db.collection('projects').insertOne({ title, description, owner });

  return NextResponse.json({ message: 'Project saved!' });
}