export const runtime = 'edge'

import { NextRequest, NextResponse } from 'next/server'
import { sdk } from '@lib/config'
import { getRegion } from '@lib/data/regions'
import { getProductByHandle } from '@lib/data/products'

export async function POST(request: NextRequest) {
  try {
    const { productHandle, regionId, countryCode } = await request.json()

    if (!productHandle || !regionId || !countryCode) {
      return NextResponse.json(
        { success: false, error: 'Missing required parameters' },
        { status: 400 }
      )
    }

    const detailedProduct = await getProductByHandle(productHandle, regionId)

    if (!detailedProduct) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 })
    }

    if (!detailedProduct.variants || detailedProduct.variants.length === 0) {
      return NextResponse.json({ success: false, error: 'No variants available' })
    }

    // Find the cheapest variant
    const cheapestVariant = detailedProduct.variants.reduce(
      (cheapest, current) =>
        (cheapest.calculated_price?.original_amount ?? Infinity) <
        (current.calculated_price?.original_amount ?? Infinity)
          ? cheapest
          : current
    )

    if ((cheapestVariant.inventory_quantity ?? 0) <= 0) {
      return NextResponse.json({ success: false, error: 'Product is out of stock' })
    }

    if (!cheapestVariant.id) {
      return NextResponse.json({ success: false, error: 'Variant ID not found' })
    }

    const token = request.cookies.get('_medusa_jwt')?.value
    const authHeaders: Record<string, string> = token ? { authorization: `Bearer ${token}` } : {}
    const existingCartId = request.cookies.get('_medusa_cart_id')?.value

    const region = await getRegion(countryCode)
    if (!region) {
      return NextResponse.json(
        { success: false, error: `Region not found for: ${countryCode}` },
        { status: 400 }
      )
    }

    let cart: any = null
    let newCartCreated = false

    if (existingCartId) {
      try {
        const { cart: existing } = await sdk.store.cart.retrieve(existingCartId, {}, authHeaders)
        cart = existing
        if (cart.region_id !== region.id) {
          const { cart: updated } = await sdk.store.cart.update(
            existingCartId,
            { region_id: region.id },
            {},
            authHeaders
          )
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
      { variant_id: cheapestVariant.id, quantity: 1 },
      {},
      authHeaders
    )

    const response = NextResponse.json({ success: true, message: 'Product added to cart' })

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
      { success: false, error: error.message || 'An unknown error occurred' },
      { status: 500 }
    )
  }
}
