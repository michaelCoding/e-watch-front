'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

type SortOptions = 'created_at' | 'price_asc' | 'price_desc'

const categories = ['All', 'Smartwatch', 'Classic', 'Sport', 'Limited']
const materials = ['Titanium', 'Steel', 'Carbon']

export default function StoreFilterBar({ sortBy }: { sortBy: SortOptions }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const setSort = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set('sortBy', value)
      router.push(`${pathname}?${params.toString()}`)
    },
    [router, pathname, searchParams]
  )

  return (
    <div className="sticky top-20 z-40 bg-surface py-6 mt-4 border-b border-outline-variant/20">
      <div className="flex flex-col medium:flex-row medium:items-center justify-between gap-6 px-8 max-w-screen-2xl mx-auto">

        {/* Category + material pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-on-surface-variant mr-2">Filter:</span>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                className={[
                  'px-4 py-1.5 rounded-full text-sm font-medium transition-colors',
                  cat === 'All'
                    ? 'bg-primary-fixed text-on-primary-fixed'
                    : 'bg-secondary-container text-on-surface hover:bg-surface-container-high',
                ].join(' ')}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="h-6 w-px bg-outline-variant/40 mx-2 hidden medium:block" />

          {/* Material pills */}
          <div className="flex flex-wrap gap-2">
            {materials.map((mat) => (
              <button
                key={mat}
                className="px-4 py-1.5 rounded-full border border-outline-variant text-on-surface-variant text-sm font-medium hover:bg-surface-container transition-colors"
              >
                {mat}
              </button>
            ))}
          </div>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold text-on-surface-variant">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSort(e.target.value)}
            className="bg-surface-container-low border-none text-sm font-medium focus:ring-1 focus:ring-primary/30 rounded-lg pr-10 text-on-surface"
          >
            <option value="created_at">Newest Arrivals</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>

      </div>
    </div>
  )
}
