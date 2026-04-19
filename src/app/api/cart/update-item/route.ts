export const runtime = 'edge'

import { NextRequest, NextResponse } from 'next/server'
import { sdk } from '@lib/config'

export async function POST(request: NextRequest) {
  try {
    const { lineId, quantity, cartId: cartIdFromBody } = await request.json()

    if (!lineId) {
      return NextResponse.json({ error: 'Missing lineId' }, { status: 400 })
    }

    const cartId = cartIdFromBody ?? request.cookies.get('_medusa_cart_id')?.value
    if (!cartId) {
      return NextResponse.json({ error: 'Missing cart ID' }, { status: 400 })
    }

    const token = request.cookies.get('_medusa_jwt')?.value
    const authHeaders: Record<string, string> = token ? { authorization: `Bearer ${token}` } : {}

    await sdk.store.cart.updateLineItem(cartId, lineId, { quantity }, {}, authHeaders)

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to update line item' },
      { status: 500 }
    )
  }
}
