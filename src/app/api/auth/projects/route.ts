import { NextResponse , NextRequest} from 'next/server';
import clientPromise from '@/utils/mongodb';

export async function POST(request: NextRequest) {
  const { title, description, owner } = await request.json();
  const client = await clientPromise;
  const db = client.db();

  await db.collection('projects').insertOne({ title, description, owner });

  return NextResponse.json({ message: 'Project saved!' });
}