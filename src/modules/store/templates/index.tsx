import { Suspense } from 'react'
import SkeletonProductGrid from '@modules/skeletons/templates/skeleton-product-grid'
import { SortOptions } from '@modules/store/components/refinement-list/sort-products'
import { BannerData } from '@lib/data/cms'
import PaginatedProducts from './paginated-products'
import StoreFilterBar from './store-filter-bar'

const FALLBACK = {
  headline: 'Precision Timepieces.',
  text: 'Browse the Aevuno collection — discover what feels right.',
  cta_text: 'Shop the Collection',
  cta_link: '/store',
  image_url: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1600&q=80',
}

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
  banner,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
  banner?: BannerData | null
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || 'created_at'
  const b = banner ?? FALLBACK

  return (
    <div className="bg-surface min-h-screen">

      {/* CMS-controlled banner */}
      <div className="px-8 max-w-screen-2xl mx-auto">
        <section className="mt-8 rounded-xl overflow-hidden relative aspect-[21/9] medium:aspect-[21/7]">
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${b.image_url}')` }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-on-surface/60 to-transparent" />
          {/* Content */}
          <div className="absolute inset-0 flex items-center px-12">
            <div className="max-w-md space-y-4">
              <h2 className="text-4xl medium:text-5xl large:text-6xl font-bold tracking-tight text-surface leading-tight">
                {b.headline}
              </h2>
              {b.text && (
                <p className="text-surface/90 font-medium text-lg">{b.text}</p>
              )}
              {b.cta_text && (
                <a
                  href={b.cta_link}
                  className="mt-4 inline-block text-white px-8 py-3 rounded-full font-semibold transition-all hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg, #006875 0%, #00e5ff 100%)' }}
                >
                  {b.cta_text}
                </a>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* Sticky filter + sort bar */}
      <StoreFilterBar sortBy={sort} />

      {/* Product grid */}
      <div
        className="px-8 max-w-screen-2xl mx-auto py-12"
        data-testid="category-container"
      >
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            countryCode={countryCode}
          />
        </Suspense>
      </div>

    </div>
  )
}

export default StoreTemplate
