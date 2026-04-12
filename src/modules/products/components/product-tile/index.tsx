import { useMemo } from 'react'
import { formatNameForTestId } from '@lib/util/formatNameForTestId'
import LocalizedClientLink from '@modules/common/components/localized-client-link'
import { LoadingImage } from './loading-image'
import ProductPrice from './price'
import { ProductActions } from './action'

export function ProductTile({
  product,
  regionId,
}: {
  product: {
    id: string
    created_at: string
    title: string
    handle: string
    thumbnail: string | null
    calculatedPrice: string | null
    salePrice: string | null
  }
  regionId: string
}) {
  const isNew = useMemo(() => {
    const days = (Date.now() - new Date(product.created_at).getTime()) / 86400000
    return days <= 7
  }, [product.created_at])

  return (
    <div
      className="group flex flex-col bg-surface-container-lowest rounded-xl p-4 md:p-6 transition-all duration-500 hover:shadow-[0_12px_40px_rgba(25,28,29,0.06)]"
      data-testid={formatNameForTestId(`${product.title}-product-tile`)}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-surface-container-low aspect-square rounded-lg mb-4">
        {isNew && (
          <span className="absolute top-3 left-3 z-10 text-[10px] uppercase tracking-widest bg-primary-container text-on-primary-container px-3 py-1 rounded-full font-bold">
            New
          </span>
        )}
        <LocalizedClientLink href={`/products/${product.handle}`}>
          <LoadingImage
            src={product.thumbnail}
            alt={product.title}
            loading="lazy"
            className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-110"
          />
        </LocalizedClientLink>
        {/* Quick add on hover */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-on-surface/90">
          <ProductActions productHandle={product.handle} regionId={regionId} />
        </div>
      </div>

      {/* Info */}
      <div className="pt-2 pb-1">
        <LocalizedClientLink href={`/products/${product.handle}`}>
          <p className="font-bold text-on-surface leading-snug mb-1 hover:text-primary transition-colors duration-200">
            {product.title}
          </p>
        </LocalizedClientLink>
        <ProductPrice calculatedPrice={product.calculatedPrice} salePrice={product.salePrice} />
      </div>
    </div>
  )
}
