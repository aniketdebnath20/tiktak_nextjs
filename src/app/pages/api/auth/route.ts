import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

export async function POST(request: NextRequest) 
{
  try {
    const doc = await request.json();
    console.log("doc post request routes",doc)
    await client.createIfNotExists(doc);
    return NextResponse.json({ message: 'Login successful' }, { status: 200 });
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ message: 'Login failed' }, { status: 500 });
  }
}
