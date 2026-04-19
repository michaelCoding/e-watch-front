export const runtime = 'edge'

import { NextRequest, NextResponse } from 'next/server'
import { sdk } from '@lib/config'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const token = request.cookies.get('_medusa_jwt')?.value
    const authHeaders: Record<string, string> = token
      ? { authorization: `Bearer ${token}` }
      : {}

    await sdk.store.customer.createAddress(body, {}, authHeaders)

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to add address' },
      { status: 500 }
    )
  }
}
