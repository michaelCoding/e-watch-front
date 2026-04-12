import { getProductPrice } from '@lib/util/get-product-price'
import { StoreProduct } from '@medusajs/types'
import LocalizedClientLink from '@modules/common/components/localized-client-link'
import { ProductTile } from '../product-tile'
import CarouselWrapper from './carousel-wrapper'

interface ViewAllProps { link: string; text?: string }
interface ProductCarouselProps {
  products: StoreProduct[]
  regionId: string
  label?: string
  title: string
  viewAll?: ViewAllProps
  testId?: string
}

export function ProductCarousel({ products, regionId, label, title, viewAll, testId }: ProductCarouselProps) {
  return (
    <section className="content-container py-20 large:py-28 overflow-hidden" data-testid={testId}>
      {/* Header */}
      <div className="flex items-end justify-between mb-10">
        <div>
          {label && (
            <p className="text-xs uppercase tracking-widest text-primary font-bold mb-4">{label}</p>
          )}
          <h2 className="text-4xl font-bold tracking-tight text-on-surface">
            {title}
          </h2>
        </div>
        {viewAll && (
          <LocalizedClientLink
            href={viewAll.link}
            className="hidden medium:inline-flex text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 font-semibold text-sm"
          >
            {viewAll.text || 'View all'} →
          </LocalizedClientLink>
        )}
      </div>

      {/* Carousel */}
      <CarouselWrapper title={title} productsCount={products.length}>
        <div className="flex gap-4">
          {products.map((item, index) => {
            const { cheapestPrice } = getProductPrice({ product: item })
            return (
              <div
                key={item.id ?? index}
                className="flex-[0_0_calc(75%-16px)] small:flex-[0_0_calc(50%-16px)] medium:flex-[0_0_calc(35%-16px)] xl:flex-[0_0_calc(28%-16px)]"
              >
                <ProductTile
                  product={{
                    id: item.id ?? '',
                    created_at: item.created_at ?? '',
                    title: item.title ?? '',
                    handle: item.handle ?? '',
                    thumbnail: item.thumbnail ?? null,
                    calculatedPrice: cheapestPrice?.calculated_price ?? null,
                    salePrice: cheapestPrice?.original_price ?? null,
                  }}
                  regionId={regionId}
                />
              </div>
            )
          })}
        </div>
      </CarouselWrapper>

      {/* Mobile view all */}
      {viewAll && (
        <div className="mt-8 text-center medium:hidden">
          <LocalizedClientLink
            href={viewAll.link}
            className="text-on-surface-variant hover:text-primary transition-colors font-semibold text-sm"
          >
            {viewAll.text || 'View all'} →
          </LocalizedClientLink>
        </div>
      )}
    </section>
  )
}
