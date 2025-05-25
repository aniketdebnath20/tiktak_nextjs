import { NextResponse } from 'next/server';
import { allPostsQuery } from '@/utils/queries';
import { client } from '@/sanity/lib/client';

export async function GET() {
  const query = allPostsQuery();
  const data = await client.fetch(query);
  return NextResponse.json({ videos: data });
}

export async function POST(request: Request) {
  const doc = await request.json();
  await client.create(doc);
  return NextResponse.json({ message: 'Video created' });
}
