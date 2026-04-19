export const runtime = 'edge'

import { NextRequest, NextResponse } from 'next/server'
import { sdk } from '@lib/config'
import { getRegion } from '@lib/data/regions'

export async function POST(request: NextRequest) {
  try {
    const { variantId, quantity, countryCode } = await request.json()

    if (!variantId) {
      return NextResponse.json({ error: 'Missing variant ID' }, { status: 400 })
    }

    const region = await getRegion(countryCode)
    if (!region) {
      return NextResponse.json({ error: `Region not found for: ${countryCode}` }, { status: 400 })
    }

    const token = request.cookies.get('_medusa_jwt')?.value
    const authHeaders: Record<string, string> = token ? { authorization: `Bearer ${token}` } : {}
    const existingCartId = request.cookies.get('_medusa_cart_id')?.value

    let cart: any = null
    let newCartCreated = false

    if (existingCartId) {
      try {
        const { cart: existing } = await sdk.store.cart.retrieve(existingCartId, {}, authHeaders)
        cart = existing
        if (cart.region_id !== region.id) {
          const { cart: updated } = await sdk.store.cart.update(existingCartId, { region_id: region.id }, {}, authHeaders)
          cart = updated
        }
      } catch {
        cart = null
      }
    }

    if (!cart) {
      const { cart: newCart } = await sdk.store.cart.create({ region_id: region.id })
      cart = newCart
      newCartCreated = true
    }

    await sdk.store.cart.createLineItem(
      cart.id,
      { variant_id: variantId, quantity },
      {},
      authHeaders
    )

    const response = NextResponse.json({ success: true })

    if (newCartCreated) {
      response.cookies.set('_medusa_cart_id', cart.id, {
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
      })
    }

    return response
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to add to cart' },
      { status: 500 }
    )
  }
}
