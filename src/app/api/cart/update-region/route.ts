export const runtime = 'edge'

import { NextRequest, NextResponse } from 'next/server'
import { sdk } from '@lib/config'
import { getRegion } from '@lib/data/regions'

export async function POST(request: NextRequest) {
  try {
    const { countryCode, currentPath } = await request.json()

    if (!countryCode) {
      return NextResponse.json({ error: 'Missing countryCode' }, { status: 400 })
    }

    const region = await getRegion(countryCode)
    if (!region) {
      return NextResponse.json(
        { error: `Region not found for country code: ${countryCode}` },
        { status: 400 }
      )
    }

    const cartId = request.cookies.get('_medusa_cart_id')?.value
    const token = request.cookies.get('_medusa_jwt')?.value
    const authHeaders: Record<string, string> = token ? { authorization: `Bearer ${token}` } : {}

    if (cartId) {
      await sdk.store.cart.update(cartId, { region_id: region.id }, {}, authHeaders)
    }

    return NextResponse.json({
      success: true,
      redirectUrl: `/${countryCode}${currentPath}`,
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to update region' },
      { status: 500 }
    )
  }
}
