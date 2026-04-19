export const runtime = 'edge'

import { NextRequest, NextResponse } from 'next/server'
import { sdk } from '@lib/config'

export async function POST(request: NextRequest) {
  try {
    const { lineId } = await request.json()

    if (!lineId) {
      return NextResponse.json({ error: 'Missing lineId' }, { status: 400 })
    }

    const cartId = request.cookies.get('_medusa_cart_id')?.value
    if (!cartId) {
      return NextResponse.json({ error: 'Missing cart ID' }, { status: 400 })
    }

    const token = request.cookies.get('_medusa_jwt')?.value
    const authHeaders: Record<string, string> = token ? { authorization: `Bearer ${token}` } : {}

    await sdk.store.cart.deleteLineItem(cartId, lineId, authHeaders)

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to delete line item' },
      { status: 500 }
    )
  }
}
