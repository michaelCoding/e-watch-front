export const runtime = 'edge'

import { NextRequest, NextResponse } from 'next/server'
import { sdk } from '@lib/config'

export async function POST(request: NextRequest) {
  try {
    const { cartId, providerId, context } = await request.json()

    if (!cartId || !providerId) {
      return NextResponse.json({ error: 'Missing cartId or providerId' }, { status: 400 })
    }

    const token = request.cookies.get('_medusa_jwt')?.value
    const authHeaders: Record<string, string> = token ? { authorization: `Bearer ${token}` } : {}

    const { cart } = await sdk.store.cart.retrieve(cartId, {}, authHeaders)

    await sdk.store.payment.initiatePaymentSession(
      cart,
      { provider_id: providerId, context },
      {},
      authHeaders
    )

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to initiate payment session' },
      { status: 500 }
    )
  }
}
