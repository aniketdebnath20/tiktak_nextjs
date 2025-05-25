import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';
import { allUsersQuery } from '@/utils/queries';

export async function GET() {
  try {
    const data = await client.fetch(allUsersQuery());
    return NextResponse.json(data);
  } catch (error) {
    console.error("Fetch users error:", error);
    return NextResponse.json({ message: 'Failed to fetch users' }, { status: 500 });
  }
}
