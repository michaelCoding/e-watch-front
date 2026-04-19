export const runtime = 'edge'

import { NextRequest, NextResponse } from 'next/server'
import { sdk } from '@lib/config'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const token = request.cookies.get('_medusa_jwt')?.value
    const authHeaders: Record<string, string> = token ? { authorization: `Bearer ${token}` } : {}
    const cartId = request.cookies.get('_medusa_cart_id')?.value

    if (!cartId) {
      return NextResponse.json({ error: 'No existing cart found' }, { status: 400 })
    }

    const {
      shipping_address,
      billing_address,
      email,
      same_as_billing,
    } = body

    const updateData: Record<string, any> = {
      shipping_address,
      email,
    }

    if (same_as_billing === 'on' || same_as_billing === true) {
      updateData.billing_address = shipping_address
    } else {
      updateData.billing_address = billing_address
    }

    await sdk.store.cart.update(cartId, updateData, {}, authHeaders)

    const countryCode = (shipping_address?.country_code ?? '').toLowerCase()

    return NextResponse.json({
      success: true,
      redirectUrl: `/${countryCode}/checkout?step=delivery`,
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to set addresses' },
      { status: 500 }
    )
  }
}
