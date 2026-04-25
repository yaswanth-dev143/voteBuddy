import { NextRequest, NextResponse } from 'next/server';
import { decodeFullMeasure } from '@/lib/claude-api';
import { handleAPIError } from '@/lib/error-handler';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { measureText } = body;

    if (!measureText || typeof measureText !== 'string' || measureText.trim().length === 0) {
      return NextResponse.json(
        { error: 'measureText string is required in the request body' },
        { status: 400 }
      );
    }

    if (measureText.length > 10000) {
      return NextResponse.json(
        { error: 'Measure text is too long. Max 10000 characters.' },
        { status: 400 }
      );
    }

    // Call the Claude API wrapper
    const decodedMeasure = await decodeFullMeasure(
      crypto.randomUUID(), 
      'User Provided Measure', 
      measureText.trim()
    );

    return NextResponse.json({ decodedMeasure });
  } catch (error) {
    const errObj = handleAPIError(error);
    return NextResponse.json(errObj, { status: errObj.statusCode });
  }
}
