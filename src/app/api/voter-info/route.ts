import { NextRequest, NextResponse } from 'next/server';
import { getVoterInfo } from '@/lib/civic-api';
import { handleAPIError } from '@/lib/error-handler';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const address = searchParams.get('address');

    if (!address) {
      return NextResponse.json(
        { error: 'Address parameter is required' },
        { status: 400 }
      );
    }

    const voterInfo = await getVoterInfo(address);

    return NextResponse.json({ voterInfo });
  } catch (error) {
    const errObj = handleAPIError(error);
    return NextResponse.json(errObj, { status: errObj.statusCode });
  }
}
