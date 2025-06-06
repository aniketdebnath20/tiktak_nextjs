import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';
import { postDetailQuery } from '@/utils/queries';

// GET single post by ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const query = postDetailQuery(id);
    const data = await client.fetch(query);

    if (!data.length) {
      return NextResponse.json(
        { message: 'Post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(data[0], { status: 200 });
  } catch (error) {
    console.error('Fetch post error:', error);
    return NextResponse.json(
      { message: 'Something went wrong', error },
      { status: 500 }
    );
  }
}
