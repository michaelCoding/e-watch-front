export const runtime = 'edge'

import { NextRequest, NextResponse } from 'next/server'
import { sdk } from '@lib/config'
import { setAuthToken } from '@lib/data/cookies'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()
    const token = await sdk.auth.login('customer', 'emailpass', { email, password })
    await setAuthToken(typeof token === 'string' ? token : token.location)
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || error.toString() },
      { status: 400 }
    )
  }
}
