export const runtime = 'edge'

import { NextRequest, NextResponse } from 'next/server'
import { sdk } from '@lib/config'

export async function POST(request: NextRequest) {
  try {
    const { cartId, shippingMethodId } = await request.json()

    if (!cartId || !shippingMethodId) {
      return NextResponse.json({ error: 'Missing cartId or shippingMethodId' }, { status: 400 })
    }

    const token = request.cookies.get('_medusa_jwt')?.value
    const authHeaders: Record<string, string> = token ? { authorization: `Bearer ${token}` } : {}

    await sdk.store.cart.addShippingMethod(
      cartId,
      { option_id: shippingMethodId },
      {},
      authHeaders
    )

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to set shipping method' },
      { status: 500 }
    )
  }
}
