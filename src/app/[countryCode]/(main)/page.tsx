export const runtime = 'edge';

import { Metadata } from 'next'
import { getProductsList } from '@lib/data/products'
import { getRegion } from '@lib/data/regions'
import { getBanner } from '@lib/data/cms'
import { heroBannerConfig } from '@lib/config/home'
import Hero from '@modules/home/components/hero'
import { HowWeLive } from '@modules/home/components/how-we-live'
import Moments from '@modules/home/components/moments'
import { QuietMoment } from '@modules/home/components/quiet-moment'

export const metadata: Metadata = {
  title: 'Aevum — The Art of Precision',
  description: 'Precision timepieces engineered for the digital curator. Explore the Aevum collection.',
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await props.params

  const [{ response: { products } }, region, heroBanner] = await Promise.all([
    getProductsList({ pageParam: 0, queryParams: { limit: 9 }, countryCode }),
    getRegion(countryCode),
    getBanner('home'),
  ])

  const heroData = heroBanner
    ? {
        headline: heroBanner.headline,
        text: heroBanner.text,
        cta: { text: heroBanner.cta_text, link: heroBanner.cta_link },
        image: { url: heroBanner.image_url, alt: heroBanner.headline },
      }
    : heroBannerConfig

  return (
    <>
      {/* 1. Hero */}
      <Hero data={heroData} />

      {/* 2. Featured Products */}
      <Moments />

      {/* 3. Technology */}
      {products && region && (
        <QuietMoment products={products} />
      )}

      {/* 4. Newsletter */}
      <HowWeLive />
    </>
  )
}
