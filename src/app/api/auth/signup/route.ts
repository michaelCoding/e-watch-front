export const runtime = 'edge'

import { NextRequest, NextResponse } from 'next/server'
import { sdk } from '@lib/config'
import { setAuthToken } from '@lib/data/cookies'

export async function POST(request: NextRequest) {
  try {
    const { email, password, first_name, last_name, phone } = await request.json()

    const token = await sdk.auth.register('customer', 'emailpass', { email, password })
    const customHeaders = { authorization: `Bearer ${token}` }
    await sdk.store.customer.create({ email, first_name, last_name, phone }, {}, customHeaders)

    const loginToken = await sdk.auth.login('customer', 'emailpass', { email, password })
    await setAuthToken(typeof loginToken === 'string' ? loginToken : loginToken.location)

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || error.toString() },
      { status: 400 }
    )
  }
}
