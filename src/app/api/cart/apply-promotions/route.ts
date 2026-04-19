export const runtime = 'edge'

import { NextRequest, NextResponse } from 'next/server'
import { sdk } from '@lib/config'

export async function POST(request: NextRequest) {
  try {
    const { codes } = await request.json()

    const token = request.cookies.get('_medusa_jwt')?.value
    const authHeaders: Record<string, string> = token ? { authorization: `Bearer ${token}` } : {}
    const cartId = request.cookies.get('_medusa_cart_id')?.value

    if (!cartId) {
      return NextResponse.json({ error: 'No existing cart found' }, { status: 400 })
    }

    await sdk.store.cart.update(cartId, { promo_codes: codes }, {}, authHeaders)

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to apply promotions' },
      { status: 500 }
    )
  }
}
