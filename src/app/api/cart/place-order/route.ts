export const runtime = 'edge'

import { NextRequest, NextResponse } from 'next/server'
import { sdk } from '@lib/config'

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('_medusa_jwt')?.value
    const authHeaders: Record<string, string> = token ? { authorization: `Bearer ${token}` } : {}
    const cartId = request.cookies.get('_medusa_cart_id')?.value

    if (!cartId) {
      return NextResponse.json({ error: 'No existing cart found' }, { status: 400 })
    }

    const result = await sdk.store.cart.complete(cartId, {}, authHeaders)

    if (result.type === 'order') {
      const countryCode = result.order.shipping_address?.country_code?.toLowerCase()
      const orderId = result.order.id

      const response = NextResponse.json({
        success: true,
        redirectUrl: `/${countryCode}/order/confirmed/${orderId}`,
      })

      response.cookies.set('_medusa_cart_id', '', { maxAge: -1 })

      return response
    }

    return NextResponse.json({ success: false, cart: result.cart })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to place order' },
      { status: 500 }
    )
  }
}
