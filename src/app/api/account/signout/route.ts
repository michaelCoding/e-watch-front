export const runtime = 'edge'

import { NextRequest, NextResponse } from 'next/server'
import { sdk } from '@lib/config'

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('_medusa_jwt')?.value

    if (token) {
      await sdk.auth.logout()
    }

    const response = NextResponse.json({ success: true })
    response.cookies.set('_medusa_jwt', '', {
      maxAge: -1,
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
    })

    return response
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to sign out' },
      { status: 500 }
    )
  }
}
